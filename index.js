'use strict';

const internal = [
    'moduleAlias',
    'getPadLength',
    'injectHtml',
    'loadFile',
    'logger',
    'smartMerge',
    'virtualFile',
].reduce((obj, key) => {
    obj[key] = require(`./src/${key}`);
    return obj;
}, {});

internal.assert = internal.logger.assert.bind(internal.logger);

const thirdParty = {
    fs: 'fs-extra',
    chalk: 'chalk',
    cheerio: 'cheerio',
    semver: 'semver',
    semverRegex: 'semver-regex',
    _: 'lodash',
    tryRequire: 'try-require',
    ora: 'ora',
    dedent: 'dedent',
    globby: 'globby',
    globParent: 'glob-parent',
    isGlob: 'is-glob',
    npa: 'npm-package-arg',
    parseGitUrl: 'git-url-parse',
};

Object.keys(thirdParty).forEach(key => {
    // lazy
    Object.defineProperty(internal, key, {
        get() {
            return require(thirdParty[key]);
        },
    });
});

module.exports = internal;
