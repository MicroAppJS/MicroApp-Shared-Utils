'use strict';

const npmlog = require('npmlog');

const chalk = require('chalk');
const utils = require('util');
const ora = require('ora');
const os = require('os');

npmlog.heading = require('../constants').SCOPE_NAME || '@micro-app';

if (process.env.MICRO_APP_LOGGER_LEVEL) {
    npmlog.level = process.env.MICRO_APP_LOGGER_LEVEL === 'true' ? 'silly' : process.env.MICRO_APP_LOGGER_LEVEL;
}
// npmlog.prefixStyle = {};
const CUSTOM_LEVEL = {
    debug: {
        disp: '*DEBUG*',
        bg: 'magenta',
    },
    info: {
        fg: 'brightGreen',
    },
    success: {
        fg: 'brightWhite',
        bg: 'green',
        bold: true,
    },
    noise: {
        fg: 'blue',
        level: 10000,
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

const getNpmlogMethod = function(type) {
    return npmlog[type].bind(npmlog);
};

const toString = {
    debug() {
        const message = utils.format(...(arguments || []));
        return `${chalk.bgMagenta(' DEBUG ')} ${message} ${os.EOL}`;
    },
    warn() {
        const message = utils.format(...(arguments || []));
        return `${chalk.bgYellowBright.black(' WARN ')} ${chalk.yellowBright(message)} ${os.EOL}`;
    },
    error() {
        const message = utils.format(...(arguments || []));
        return `${chalk.bgRed(' ERROR ')} ${chalk.redBright(message)} ${os.EOL}`;
    },
    info() {
        const message = utils.format(...(arguments || []));
        return `${chalk.bgBlue(' INFO ')} ${chalk.blueBright(message)} ${os.EOL}`;
    },
    success() {
        const message = utils.format(...(arguments || []));
        return `${chalk.bgHex('#007007')(' SUCCESS ')} ${chalk.greenBright(message)} ${os.EOL}`;
    },
};

const getMethod = function(type) {
    const logger = getNpmlogMethod(type);
    return function(...args) {
        if (args.length <= 1) {
            return logger(false, ...args);
        }
        return logger(...args);
    };
    // const logger = getStdoutMethod(type);
    // return function(...args) {
    //     return logger(toString[type].call(toString, ...args));
    // };
};

const logger = {
    toString,
    debug() {
        if (!process.env.MICRO_APP_DEBUG_LOGGER) return; // 是否开启
        return getMethod('debug')(...arguments);
    },
    warn() {
        return getMethod('warn')(...arguments);
    },
    error() {
        return getMethod('error')(...arguments);
    },
    info() {
        return getMethod('info')(...arguments);
    },
    success() {
        return getMethod('success')(...arguments);
    },

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
    },

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
    },
};
module.exports = new Proxy(logger, {
    get(target, prop) {
        if (!(prop in target) && typeof prop === 'string') {
            return getMethod(prop).bind(target);
        }
        return target[prop];
    },
});

module.exports.npmlog = npmlog;
module.exports.getStdoutMethod = getStdoutMethod;
module.exports.getNpmlogMethod = getNpmlogMethod;
module.exports.getMethod = getMethod;
