'use strict';

const pluginRE = /^(@micro-app\/|microapp-|@[\w-]+(\.)?[\w-]+\/microapp-)plugin-/;
const officialRE = /^@micro-app\//;

exports.isPlugin = id => pluginRE.test(id);

exports.isOfficialPlugin = id => exports.isPlugin(id) && officialRE.test(id);

exports.getPluginLink = id => {
    let pkg = {};
    try {
        pkg = require(`${id}/package.json`);
    } catch (e) { /* nothing */ }
    return (
        pkg.homepage ||
        (pkg.repository && pkg.repository.url) ||
        `https://www.npmjs.com/package/${id.replace('/', '%2F')}`
    );
};
