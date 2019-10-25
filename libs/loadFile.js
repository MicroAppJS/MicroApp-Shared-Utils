'use strict';

const tryRequire = require('try-require');
const fs = require('fs-extra');
const path = require('path');

function load(root, filename) {
    const filePath = path.resolve(root, filename);
    if (!fs.existsSync(filePath)) {
        return null;
    }
    if (!fs.statSync(filePath).isFile()) {
        return null;
    }
    return tryRequire(filePath);
}

function loadFile(root, filename, { before, after } = {}) {
    if (!root || !filename) {
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
