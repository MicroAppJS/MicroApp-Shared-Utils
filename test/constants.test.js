'use strict';

/* global expect */

const { CONSTANTS } = require('..');

describe('CONSTANTS', () => {

    it('set', () => {

        CONSTANTS.set('foo', 'bar');
        expect(CONSTANTS.get('foo')).toEqual('bar');

    });

    it('get', () => {

        CONSTANTS.get('foo1');
        expect(CONSTANTS.get('foo1')).toEqual(null);
        expect(CONSTANTS.get('NAME')).toEqual(CONSTANTS.NAME);

    });

    it('freeze', () => {

        CONSTANTS.freeze('foo', 'ff');
        CONSTANTS.set('foo', 'bar');
        expect(CONSTANTS.get('foo')).toEqual('ff');

    });

});
