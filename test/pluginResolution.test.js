'use strict';

/* global expect */

const { pluginResolution } = require('..');

describe('pluginResolution', () => {

    it('isPlugin', () => {
        const pname = 'microapp-plugin-abc';
        expect(pluginResolution.isPlugin(pname)).toBeTruthy();
        expect(pluginResolution.isOfficialPlugin(pname)).toBeFalsy();
    });

    it('isOfficialPlugin', () => {
        const pname = '@micro-app/plugin-abc';
        expect(pluginResolution.isPlugin(pname)).toBeTruthy();
        expect(pluginResolution.isOfficialPlugin(pname)).toBeTruthy();
    });

    it('getPluginLink', () => {
        const pname = 'microapp-plugin-abc';
        expect(pluginResolution.getPluginLink(pname)).toEqual(`https://www.npmjs.com/package/${pname.replace('/', '%2F')}`);
    });

});
