'use strict';

const logger = require('../logger');

class Constants {

    constructor() {
        this.NAME = 'Micro App';
        this.SCOPE_NAME = '@micro-app';
        this.INJECT_ID = '_MICRO_APP_INJECT_';
    }

    set(key, value) {
        this[key] = value;
    }

    get(key) {
        return this[key] || null;
    }

    freeze(key, value) {
        Object.defineProperty(this, key, {
            get() { return value; },
            set() {
                logger.warn('[freeze]', `"${key}" be freezed, Not Allow Change!`);
            },
            enumerable: true,
        });
    }
}

module.exports = new Constants();
