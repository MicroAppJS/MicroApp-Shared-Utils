'use strict';

/* global expect */

const { logger } = require('../..');

describe('Logger', () => {

    it('logger debug', () => {

        logger.debug('abc');

    });

    it('logger error', () => {

        logger.error('abc');

    });

    it('logger info', () => {

        logger.info('abc');

    });

    it('logger success', () => {

        logger.success('abc');

    });

    it('logger warn', () => {

        logger.warn('abc');

    });

    it('logger spinner', () => {

        const spinner = logger.spinner('abc');
        spinner.start();
        setTimeout(() => {
            spinner.success('cc');
        }, 3000);

    });

    it('logger npmlog', () => {

        const npmlog = require('npmlog');
        npmlog.info('abcddd');

    });

});
