'use strict';

const chalk = require('chalk').default;
const utils = require('util');
const ora = require('ora');

const getStdoutMethod = function(type) {
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

const toString = {
    debug() {
        const message = utils.format(...(arguments || []));
        return `${chalk.bgMagenta(' DEBUG ')} ${message} \r\n`;
    },
    warn() {
        const message = utils.format(...(arguments || []));
        return `${chalk.bgYellowBright.black(' WARN ')} ${chalk.yellowBright(message)} \r\n`;
    },
    error() {
        const message = utils.format(...(arguments || []));
        return `${chalk.bgRed(' ERROR ')} ${chalk.redBright(message)} \r\n`;
    },
    info() {
        const message = utils.format(...(arguments || []));
        return `${chalk.bgBlue(' INFO ')} ${chalk.blueBright(message)} \r\n`;
    },
    success() {
        const message = utils.format(...(arguments || []));
        return `${chalk.bgHex('#007007')(' SUCCESS ')} ${chalk.greenBright(message)} \r\n`;
    },
};

module.exports = {
    toString,
    debug() {
        if (!process.env.MICRO_DEBUG_LOGGER) return; // 是否开启
        return getStdoutMethod('log')(toString.debug.call(toString, ...arguments));
    },
    warn() {
        return getStdoutMethod('warn')(toString.warn.call(toString, ...arguments));
    },
    error() {
        return getStdoutMethod('error')(toString.error.call(toString, ...arguments));
    },
    info() {
        return getStdoutMethod('info')(toString.info.call(toString, ...arguments));
    },
    success() {
        return getStdoutMethod('log')(toString.success.call(toString, ...arguments));
    },
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
            getStdoutMethod('error')(chalk.grey(stack.slice(1).join('\r\n')) + '\r\n');
        } else {
            const error = new Error();
            this.error(...arguments);
            const stack = error.stack.split(/\r?\n/mg);
            getStdoutMethod('error')(chalk.grey(stack.slice(2).join('\r\n')) + '\r\n');
        }
        process.exit(1);
    },
};

module.exports.getStdoutMethod = getStdoutMethod;
