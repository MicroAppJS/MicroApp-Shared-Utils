'use strict';

/* global expect */

const { stringifyObject } = require('../');

describe('stringifyObject', () => {

    it('require', () => {
        const pretty = stringifyObject({
            abc: '123',
            cc: function abc() {
                return 'cc';
            },
            cbc: Symbol('fff'),
        }, {
            indent: '  ',
            singleQuotes: false,
        });
        console.info(pretty);
    });

});
