'use strict';

const fs = require('fs-extra');
const _ = require('lodash');

const loadFile = function loadFile(filepath) {
    const content = fs.readFileSync(filepath, 'utf8');
    return content;
};

let importFresh;
const loadJs = function loadJs(filepath) {
    if (!importFresh) {
        importFresh = require('import-fresh');
    }

    const result = importFresh(filepath);
    return result;
};

let parseJson;
const loadJson = function loadJson(filepath, content) {
    if (!parseJson) {
        parseJson = require('parse-json');
    }
    if (_.isUndefined(content)) {
        content = loadFile(filepath);
    }
    try {
        const result = parseJson(content);
        return result;
    } catch (error) {
        error.message = `JSON Error in ${filepath}:\n${error.message}`;
        throw error;
    }
};

let yaml;
const loadYaml = function loadYaml(filepath, content) {
    if (!yaml) {
        yaml = require('yaml');
    }
    if (_.isUndefined(content)) {
        content = loadFile(filepath);
    }
    try {
        const result = yaml.parse(content, { prettyErrors: true });
        return result;
    } catch (error) {
        error.message = `YAML Error in ${filepath}:\n${error.message}`;
        throw error;
    }
};

module.exports = { loadJs, loadJson, loadYaml };
