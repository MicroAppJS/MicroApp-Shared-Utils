'use strict';

const {
    yParser,
} = require('@micro-app/shared-utils');

console.warn(yParser([ 'abc', '--skip-plugins', 'ac', 'bd', 'ccc' ], {
    array: [ 'skip-plugins' ],
    configuration: {
        'greedy-arrays': true,
    },
}));
