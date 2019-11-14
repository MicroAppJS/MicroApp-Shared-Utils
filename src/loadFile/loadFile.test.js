'use strict';

/* global expect */

const { loadFile } = require('../..');

describe('loadFile', () => {

    it('not params', () => {
        const file = loadFile();

        expect(file).toBeNull();
    });

    it('not exist', () => {
        const file = loadFile(process.cwd(), 'abc.jsx');

        expect(file).toBeNull();
    });

    it('not file', () => {
        const file = loadFile(process.cwd(), './');

        expect(file).toBeNull();
    });

    it('success', () => {
        const file = loadFile(process.cwd(), 'test/a.js');

        expect(file).not.toBeNull();
    });

    it('json', () => {
        const file = loadFile(process.cwd(), 'package.json');

        expect(file).not.toBeNull();
    });

    it('yaml', () => {
        const file = loadFile(process.cwd(), 'test/a.yaml');

        expect(file).not.toBeNull();
    });

});
