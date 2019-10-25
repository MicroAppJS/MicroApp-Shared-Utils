'use strict';

[
    'moduleAlias',
    'getPadLength',
    'injectHtml',
    'loadFile',
    'logger',
    'smartMerge',
    'virtualFile',
].forEach(m => {
    Object.assign(exports, {
        [m]: require(`./libs/${m}`),
    });
});

exports.assert = require('assert');
exports.fs = require('fs-extra');
exports.chalk = require('chalk');
exports.cheerio = require('cheerio');
exports.semver = require('semver');
exports.semverRegex = require('semver-regex');
exports._ = require('lodash');
exports.tryRequire = require('try-require');
exports.ora = require('ora');
