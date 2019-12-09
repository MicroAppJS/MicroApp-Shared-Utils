'use strict';

// 自定义等级
module.exports = {
    verbose: {
        level: 1000,
        fg: 'blue',
        bg: 'black',
        disp: 'verb',
    },
    info: {
        level: 2000,
        fg: 'black',
        bg: 'blue',
    },
    timing: {
        level: 2500,
        fg: 'green',
        bg: 'black',
        disp: 'timing',
    },
    http: {
        level: 3000,
        fg: 'black',
        bg: 'cyan',
    },
    notice: {
        level: 3500,
        fg: 'blue',
        bg: 'black',
        disp: 'notice',
    },
    success: {
        level: 3600,
        fg: 'black',
        bg: 'green',
    },
    warn: {
        level: 4000,
        fg: 'black',
        bg: 'yellow',
    },
    error: {
        level: 5000,
        fg: 'black',
        bg: 'red',
        disp: 'ERR!',
    },
    noise: {
        level: 10000,
        fg: 'black',
        bg: 'magenta',
        beep: true,
    },
};
