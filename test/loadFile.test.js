'use strict';

/* global expect */

const { loadFile } = require('../');

const ROOT = __dirname;

describe('loadFile', () => {

    it('not params', () => {
        const file = loadFile();

        expect(file).toBeNull();
    });

    it('not exist', () => {
        const file = loadFile(ROOT, './demo/abc.jsx');

        expect(file).toBeNull();
    });

    it('not file', () => {
        const file = loadFile(ROOT, './demo/aa');

        expect(file).toBeNull();
    });

    it('success', () => {
        const file = loadFile(ROOT, './demo/a.js');

        expect(file).not.toBeNull();
    });

    it('yaml', () => {
        const file = loadFile(ROOT, './demo/a.yaml');

        expect(file).not.toBeNull();
    });

    it('json', () => {
        const file = loadFile(process.cwd() + '/package.json');

        expect(file).not.toBeNull();
    });

});
