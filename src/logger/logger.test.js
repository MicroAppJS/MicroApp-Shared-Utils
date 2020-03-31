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
            spinner.succeed('cc');
        }, 3000);

    });

    it('logger npmlog', () => {

        const npmlog = require('npmlog');
        npmlog.info('abcddd', 'ttt');

    });

    it('logger debug', () => {
        logger.level = 'silly';
        logger.debug('abcdef');
    });

    it('logger timing', () => {
        logger.timing('abcdef');
    });

    it('logger http', () => {
        logger.http('abcdef');
    });

    it('logger notice', () => {
        logger.notice('abcdef');
    });

    it('logger noise', () => {
        logger.noise('abcdef', 'sdd');
    });

    it('logger logo', () => {
        logger.logo('abcdef', 'sdd');
    });

    it('logger json', () => {
        logger.json('abcdef', 'sdd');
    });

    it('logger alias', () => {
        logger.setAlias('cctv', 'logo');
        logger.cctv('abcdef', 'sdd');
    });

    it('logger group', () => {
        const newLogger = logger.newGroup('cctv', 'logo');
        newLogger.info('abcdef', 'sdd');
    });

    it('logger createInstance', () => {
        const { createInstance } = require('.');
        const newLogger = createInstance();
        newLogger.info('createInstance', 'pause...');
        newLogger.pause();
        newLogger.info('createInstance', 'new...');
        newLogger.resume();
        newLogger.info('createInstance', 'resume...');
    });

});
