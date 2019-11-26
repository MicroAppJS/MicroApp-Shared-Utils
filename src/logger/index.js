'use strict';

const npmlog = require('npmlog');
const assert = require('assert');
const chalk = require('chalk');
const utils = require('util');
const ora = require('ora');
const os = require('os');
const stringifyObject = require('stringify-object');
const _ = require('lodash');

npmlog.heading = require('../constants').SCOPE_NAME || '@micro-app';

// npmlog.prefixStyle = {};
const CUSTOM_LEVEL = {
    success: {
        level: 3001,
        fg: 'brightWhite',
        bg: 'green',
        bold: true,
    },
    noise: {
        level: 10000,
        bg: 'magenta',
        beep: true,
    },
};
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
        return process.stderr.write.bind(process.stderr);
    }
    return process.stdout.write.bind(process.stdout);
};

function formatObject(message) {
    if (_.isString(message)) {
        return message;
    }
    return stringifyObject(message, {
        indent: '  ',
        singleQuotes: false,
        inlineCharacterLimit: 12,
    });
}

// TODO 优化输出
function dyeMessage(type, message) {
    message = formatObject(message);
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
    debug() {
        const message = utils.format(...(arguments || []));
        return `${chalk.bgMagenta(' DEBUG ')} ${dyeMessage('debug', message)} ${os.EOL}`;
    },
    warn() {
        const message = utils.format(...(arguments || []));
        return `${chalk.bgYellowBright.black(' WARN ')} ${dyeMessage('warn', message)} ${os.EOL}`;
    },
    error() {
        const message = utils.format(...(arguments || []));
        return `${chalk.bgRed(' ERROR ')} ${dyeMessage('error', message)} ${os.EOL}`;
    },
    info() {
        const message = utils.format(...(arguments || []));
        return `${chalk.bgBlue(' INFO ')} ${dyeMessage('info', message)} ${os.EOL}`;
    },
    success() {
        const message = utils.format(...(arguments || []));
        return `${chalk.bgHex('#007007')(' SUCCESS ')} ${dyeMessage('success', message)} ${os.EOL}`;
    },
};

class Logger {

    constructor(log, { alias = new Map(), customFormat = new Map() }) {
        this.npmlog = log;
        this.aliasMap = new Map(alias);
        // 兼容
        this.customFormatMap = new Map(customFormat);
    }

    debug() {
        return this.getMethod('debug')(...arguments);
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

    /**
     * spinner
     *
     * @param {string} message msg
     * @return {ora} ora
     */
    spinner(message) {
        const defulatOpts = {
            text: message,
            color: 'yellow',
            prefixText: `${chalk.bgHex('#EE6B2C')(' PENDING ')} `,
        };
        return ora(typeof message === 'string' ? defulatOpts : Object.assign({}, defulatOpts, message));
    }

    throw(e) {
        if (e instanceof Error) {
            const error = e;
            this.error(...Array.prototype.splice.call(arguments, 1));
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
            this.throw('[assert]', err.message);
        }
    }

    getMethod(type) {
        if ([ 'debug' ].includes(type)) { // 不再需要 debug
            type = 'verbose';
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
        if (typeof this.npmlog[type] === 'function') {
            return this.npmlog[type].bind(this.npmlog);
        }
        return this.npmlog[type];
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

    addCustomToString(key, value) {
        this.customFormatMap.set(key, value);
    }

    newGroup(name, ...args) {
        const newLog = this.npmlog.newGroup(name, ...args);
        return factroy(newLog, { alias: this.aliasMap, customFormat: this.customFormatMap });
    }

    get format() { // 兼容 toString
        return new Proxy(this, {
            get(target, prop) {
                return target.customFormatMap.get(prop);
            },
        });
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
            return log[prop];
        },
        set(target, prop, value) {
            log[prop] = value;
            return true;
        },
    });
}

module.exports = factroy(npmlog, { customFormat: Object.entries(format) });

module.exports.getStdoutMethod = getStdoutMethod;

module.exports.Logger = Logger;
