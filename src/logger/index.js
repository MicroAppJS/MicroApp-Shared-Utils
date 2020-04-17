'use strict';

const npmlog = require('npmlog');
const assert = require('assert');
const chalk = require('chalk');
const utils = require('util');
const ora = require('ora');
const os = require('os');
const stringifyObject = require('stringify-object');
const _ = require('lodash');

const CONSTANTS = require('../constants');
// npmlog.heading = CONSTANTS.SCOPE_NAME || '@micro-app';

if (process.stdout) {
    npmlog.stream = process.stdout;
}

const _disp = npmlog.disp;
npmlog.disp = new Proxy(_disp, {
    set(target, prop, value) {
        if (value) {
            const pad = 5 - value.length;
            if (pad > 0) {
                target[prop] = ` ${value}${' '.repeat(pad)}`;
                return true;
            }
        }
        target[prop] = value;
        return true;
    },
});
Object.keys(_disp).forEach(key => {
    npmlog.disp[key] = _disp[key];
});

// npmlog.prefixStyle = {};
const CUSTOM_LEVEL = require('./levels');
Object.keys(CUSTOM_LEVEL).forEach(key => {
    const style = CUSTOM_LEVEL[key];
    const disp = style.disp || (key.length > 4 ? key.substr(0, 4) : key).toUpperCase();
    npmlog.addLevel(key, style.level || 'info', style, disp);
});

const getStdoutMethod = function(type) {
    if ([ 'debug', 'success' ].includes(type)) {
        type = 'log';
    }
    if (!process) {
        if (type) {
            return console[type].bind(console);
        }
        return console.log.bind(console);
    }
    if (type === 'error') {
        return function(...args) {
            const message = utils.format(...args.concat(os.EOL));
            return process.stderr.write(message);
        };
    }
    return function(...args) {
        const message = utils.format(...args.concat(os.EOL));
        return process.stdout.write(message);
    };
};

function formatObject(message) {
    if (_.isString(message)) {
        return message;
    }
    return os.EOL + stringifyObject(message, {
        indent: '  ',
        singleQuotes: false,
        inlineCharacterLimit: 12,
    });
}

// color优化输出
function dyeMessage(type, message) {
    switch (type.toLowerCase()) {
        case 'warn': {
            return chalk.yellowBright(message);
        }
        case 'error': {
            return chalk.redBright(message);
        }
        case 'info': {
            return chalk.blueBright(message);
        }
        case 'success': {
            return chalk.greenBright(message);
        }
        case 'noise': {
            return chalk.magentaBright(message);
        }
        default: {
            return message;
        }
    }
}

const format = {
    // debug(...arrs) {
    //     const message = utils.format(...(arrs || []));
    //     return `${chalk.bgMagenta(' DEBUG ')} ${dyeMessage('debug', message)}`;
    // },
    // warn(...arrs) {
    //     const message = utils.format(...(arrs || []));
    //     return `${chalk.bgYellowBright.black(' WARN ')} ${dyeMessage('warn', message)}`;
    // },
    // error(...arrs) {
    //     const message = utils.format(...(arrs || []));
    //     return `${chalk.bgRed(' ERROR ')} ${dyeMessage('error', message)}`;
    // },
    // info(...arrs) {
    //     const message = utils.format(...(arrs || []));
    //     return `${chalk.bgBlue(' INFO ')} ${dyeMessage('info', message)}`;
    // },
    // success(...arrs) {
    //     const message = utils.format(...(arrs || []));
    //     return `${chalk.bgHex('#007007')(' SUCCESS ')} ${dyeMessage('success', message)}`;
    // },
    logo(...arrs) {
        const message = utils.format(...(arrs || []));
        const { NAME } = CONSTANTS;
        return `${chalk.bgHex('#662F88')(` ${NAME} `)} ${message}`;
    },
    json(...arrs) {
        const message = utils.format(...(arrs || []).map(item => formatObject(item)));
        return `${chalk.bgRgb(20, 68, 106)(' JSON ')} ${message}`;
    },
};

class Logger {

    constructor(log, { alias = new Map() }) {
        this.npmlog = log;
        this.aliasMap = new Map(alias);
    }

    checkLevel(l) {
        return npmlog.levels[npmlog.level] > l;
    }

    debug() {
        return this.getMethod('verbose')(...arguments);
    }
    warn() {
        return this.getMethod('warn')(...arguments);
    }
    error() {
        return this.getMethod('error')(...arguments);
    }
    info() {
        return this.getMethod('info')(...arguments);
    }
    success() {
        return this.getMethod('success')(...arguments);
    }
    json() {
        if (this.checkLevel(3500)) return;
        return this.getMethod('json')(...arguments);
    }
    logo() { // 不会禁用
        return this.getMethod('logo')(...arguments);
    }

    /**
     * spinner
     *
     * @param {string} message msg
     * @return {ora} ora
     */
    spinner(message) {
        const defulatOpts = {
            text: typeof message === 'string' ? `${message}\n` : '',
            color: 'yellow',
            prefixText: chalk.bgHex('#EC6D29')(chalk.white(' WAIT ')),
        };
        return ora(typeof message === 'string' ? defulatOpts : Object.assign({}, defulatOpts, message));
    }

    throw(e) {
        if (e instanceof Error) {
            const error = e;
            const msgs = Array.prototype.splice.call(arguments, 1);
            if (msgs.length === 0) {
                msgs.push(e.message);
            }
            this.error(...msgs);
            const stack = error.stack.split(/\r?\n/mg);
            getStdoutMethod('error')(chalk.grey(stack.slice(1).join(os.EOL)) + os.EOL);
        } else {
            const error = new Error();
            this.error(...arguments);
            const stack = error.stack.split(/\r?\n/mg);
            getStdoutMethod('error')(chalk.grey(stack.slice(2).join(os.EOL)) + os.EOL);
        }
        process.exit(1);
    }

    assert(...args) {
        try {
            assert(...args);
        } catch (err) {
            const e = new Error(err.message);
            e.stack = e.stack.split(/\r?\n/mg).slice(1).join(os.EOL);
            this.throw(e, '[assert]', err.message);
        }
    }

    getMethod(type) {
        if ([ 'logo', 'json' ].includes(type)) {
            const logger = this.getStdoutMethod(type);
            return (...args) => {
                return logger(format[type](...args));
            };
        }
        const logger = this.getNpmlogMethod(type);
        if (typeof logger !== 'function') {
            return logger;
        }
        return function(...args) {
            if (args.length <= 1) {
                return logger(false, ...args.map(arg => dyeMessage(type, arg)));
            }
            return logger(args[0], ...args.splice(1).map(arg => dyeMessage(type, arg)));
        };
    }

    getNpmlogMethod(type) {
        const log = this.npmlog[type];
        if (typeof log === 'function') {
            return log.bind(this.npmlog);
        }
        return log;
    }

    getStdoutMethod(type) {
        if (![ 'info', 'error', 'warn' ].includes(type)) {
            type = 'log';
        }
        return getStdoutMethod(type);
    }

    setAlias(type, value) {
        return this.aliasMap.set(type, value);
    }

    removeAlias(type) {
        return this.aliasMap.delete(type);
    }

    getAlias(type) {
        return this.aliasMap.get(type);
    }

    newGroup(name, ...args) {
        const newLog = this.npmlog.newGroup(name, ...args);
        return factroy(newLog, { alias: this.aliasMap });
    }
}

function factroy(log, opts = {}) {
    return new Proxy(new Logger(log, opts), {
        get(target, prop) {
            if (prop in target) {
                return target[prop];
            }
            if ([ 'silly', 'verbose', 'info', 'timing', 'http', 'notice', 'warn', 'error', 'silent' ].includes(prop)) {
                return target.getMethod(prop);
            }
            const alias = target.getAlias(prop);
            if (alias) {
                return target.getMethod(alias);
            }
            const item = log[prop];
            if (_.isFunction(item)) {
                return item.bind(log);
            }
            return item;
        },
        set(target, prop, value) {
            log[prop] = value;
            return true;
        },
    });
}

function createInstance() {
    return factroy(npmlog);
}

module.exports = createInstance();

module.exports.createInstance = createInstance;

module.exports.getStdoutMethod = getStdoutMethod;

module.exports.Logger = Logger;

module.exports.SPACE_CHAR = ' '.repeat(4);
