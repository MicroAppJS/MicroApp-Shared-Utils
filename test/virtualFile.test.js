'use strict';

/* global expect */

const fs = require('fs-extra');
const path = require('path');
const { virtualFile } = require('../');

describe('virtualFile', () => {

    it('require', () => {
        const file = path.resolve(__dirname, 'a.js');
        const jsText = fs.readFileSync(file);
        virtualFile.register(file, jsText);

        virtualFile.require(file);
    });

    it('require test', () => {
        const file = path.resolve(__dirname, 'b.js');
        const jsText = fs.readFileSync(file);
        virtualFile.register(file, jsText);

        virtualFile.require(file);
    });

    it('require node_modules', () => {
        const file = require.resolve('lodash');
        virtualFile.register(file, content => {
            return content;
        });

        const _ = virtualFile.require(file);
        expect(_).not.toBeUndefined();
        expect(_).not.toBeNull();
    });

    it('require function', () => {
        const file = path.resolve(__dirname, '../libs/logger.js');
        virtualFile.register(file, content => {
            return content.replace('const { NAME } = CONSTANTS;', 'const NAME = "CCTV"');
        });

        const logger = virtualFile.require(file);
        expect(logger.info).not.toBeUndefined();
        expect(logger.info).not.toBeNull();

        logger.info('haha...');
    });

    it('require cache', () => {
        const cache = virtualFile.require.cache;
        expect(cache).not.toBeUndefined();
        expect(cache).not.toBeNull();

        // console.warn(cache);
        expect(cache).toBeInstanceOf(Array);
    });

});
