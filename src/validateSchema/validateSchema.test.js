'use strict';

/* global expect */

const validateSchema = require('.');

const schema = {
    additionalProperties: false,
    properties: {
        name: {
            description: '名称. ( string )',
            type: 'string',
        },
    },
    type: 'object',
};

describe('validateSchema', () => {

    it('validate', () => {
        const result = validateSchema(schema, {
            name: 'test',
        });
        expect(result.length).toEqual(0);
    });

    it('validate error', () => {
        const result = validateSchema(schema, {
            name: 'test',
            desc: 'bbb',
        });
        expect(result.length).toEqual(1);
    });

    it('validate error2', () => {
        const result = validateSchema(schema, {
            name: [ 'test' ],
            desc: 'bbb',
        });
        expect(result.length).toEqual(2);
    });

});
