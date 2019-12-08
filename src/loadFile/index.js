'use strict';

const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');

const loaders = require('./loaders');
const logger = require('../logger');

const DEFAULT_LOADERS = Object.freeze({
    '.js': loaders.loadJs,
    '.json': loaders.loadJson,
    '.yaml': loaders.loadYaml,
    '.yml': loaders.loadYaml,
    noExt: loaders.loadYaml,
});

function loaderExt(filename) {
    return path.extname(filename) || 'noExt';
}

function isSupport(filename) {
    const _ext = loaderExt(filename);
    return Object.keys(DEFAULT_LOADERS).some(ext => {
        return ext === _ext;
    });
}

function load(root, filename) {
    const filePath = path.resolve(root, filename);
    if (!fs.existsSync(filePath)) {
        return null;
    }
    if (!fs.statSync(filePath).isFile()) {
        return null;
    }
    const loaderKey = loaderExt(filename);
    const loader = DEFAULT_LOADERS[loaderKey];
    if (!loader) {
        logger.throw(`No loader specified for extension "${loaderKey}", so "${filename}" is invalid`);
    }
    try {
        return loader(filePath);
    } catch (err) {
        logger.throw(err);
    }
}

function loadFile(root, filename, { before, after } = {}) {
    if (!_.isEmpty(root) && _.isEmpty(filename)) {
        filename = path.basename(root);
        root = path.dirname(root);
    }
    if (_.isEmpty(root) || _.isEmpty(filename)) {
        return null;
    }
    if (!isSupport(filename)) {
        logger.warn(`Not Support extension, so "${filename}" is invalid`);
        return null;
    }
    if (before && !before(root, filename)) {
        return null;
    }
    if (!fs.existsSync(root)) {
        return null;
    }
    if (!fs.statSync(root).isDirectory()) {
        return null;
    }
    const file = load(root, filename);
    if (after && !after(root, filename, file)) {
        return null;
    }
    return file;
}

module.exports = loadFile;
