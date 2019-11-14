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

export function tryRequire( id: string, req?: Object): any | null;
export function assert(value: any, message?: string | Error): void;

import * as moduleAlias from './src/moduleAlias';
import * as getPadLength from './src/getPadLength';
import * as injectHtml from './src/injectHtml';
import * as loadFile from './src/loadFile';
import * as logger from './src/logger';
import * as smartMerge from './src/smartMerge';
import * as virtualFile from './src/virtualFile';

export {
    moduleAlias,
    getPadLength,
    injectHtml,
    loadFile,
    logger,
    smartMerge,
    virtualFile,
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
}
