'use strict';

/* global expect */

const { loadFile } = require('../');

describe('loadFile', () => {

    it('not params', () => {
        const file = loadFile();

        expect(file).toBeNull();
    });

    it('not exist', () => {
        const file = loadFile(__dirname, 'abc.jsx');

        expect(file).toBeNull();
    });

    it('not file', () => {
        const file = loadFile(__dirname, '../');

        expect(file).toBeNull();
    });

    it('success', () => {
        const file = loadFile(__dirname, 'a.js');

        expect(file).not.toBeNull();
    });

});
