/// <reference types="node"/>

import fs from 'fs-extra';
import chalk from 'chalk';
import cheerio from 'cheerio';
import semver from 'semver';
import semverRegex from 'semver-regex';
import _ from 'lodash';
import ora from 'ora';
import dedent from 'dedent';
import globby from 'globby';
import globParent from 'glob-parent';
import isGlob from 'is-glob';
import npa from 'npm-package-arg';
import parseGitUrl from 'git-url-parse';
import multimatch from 'multimatch';
import stringifyObject from 'stringify-object';
import LRU from 'lru-cache';
import inquirer from 'inquirer';
import execa from 'execa';
import yParser from 'yargs-parser';
import yUnParser from 'yargs-unparser';
import debug from 'debug';

export function tryRequire( id: string, req?: Object): any | null;
export function assert(value: any, message?: string | Error): void;

import * as moduleAlias from './src/moduleAlias';
import * as getPadLength from './src/getPadLength';
import * as injectHtml from './src/injectHtml';
import * as logger from './src/logger';
import * as prompt from './src/prompt';
import * as smartMerge from './src/smartMerge';
import * as virtualFile from './src/virtualFile';
import * as openBrowser from './src/openBrowser';
import * as env from './src/env';
import validateSchema from './src/validateSchema';
import loadFile from './src/loadFile';

export {
    moduleAlias,
    getPadLength,
    injectHtml,
    loadFile,
    smartMerge,
    virtualFile,
    logger,
    prompt,
    openBrowser,
    env,
};

export {
    assert,
    fs,
    chalk,
    cheerio,
    semver,
    semverRegex,
    _,
    ora,
    dedent,
    globby,
    globParent,
    isGlob,
    npa,
    parseGitUrl,
    multimatch,
    stringifyObject,
    LRU,
    inquirer,
    execa,
    yParser,
    yUnParser,
    debug
}
