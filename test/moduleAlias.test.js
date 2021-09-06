'use strict';

/* global expect */

const { moduleAlias } = require('../');
const Module = moduleAlias.Module;

describe('moduleAlias', () => {

    it('addPath', () => {

        moduleAlias.addPath(__dirname);
        moduleAlias.addPaths([ __dirname ]);

        expect(Module._modulePaths).toContain(__dirname);
    });

    it('add', () => {

        moduleAlias.add({
            abcd: __dirname,
        });

        expect(Module._moduleAliasNames.includes('abcd')).toBeTruthy();
        expect(Module._moduleAliases.abcd).toContain(__dirname);
    });

});
