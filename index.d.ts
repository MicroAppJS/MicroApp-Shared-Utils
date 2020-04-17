/// <reference types="node"/>

export * as  fs from 'fs-extra';
export * as  chalk from 'chalk';
export * as  cheerio from 'cheerio';
export * as  semver from 'semver';
export * as  semverRegex from 'semver-regex';
export * as  _ from 'lodash';
export * as  ora from 'ora';
export * as  dedent from 'dedent';
export * as  globby from 'globby';
export * as  globParent from 'glob-parent';
export * as  isGlob from 'is-glob';
export * as  npa from 'npm-package-arg';
export * as  parseGitUrl from 'git-url-parse';
export * as  multimatch from 'multimatch';
export * as  stringifyObject from 'stringify-object';
export * as  LRU from 'lru-cache';
export * as  inquirer from 'inquirer';
export * as  execa from 'execa';
export * as  yParser from 'yargs-parser';
export * as  yUnParser from 'yargs-unparser';
export * as  debug from 'debug';
export * as  importFresh from 'import-fresh';
export * as shell from 'shelljs';
export * as onExit from 'signal-exit';
export * as hash from 'hash-sum';
export * as path from 'path';

export function tryRequire(id: string, req?: Object): any | null;
export function assert(value: any, message?: string | Error): void;

export * as moduleAlias from './src/moduleAlias';
export * as getPadLength from './src/getPadLength';
export * as injectHtml from './src/injectHtml';
export * as logger from './src/logger';
export * as prompt from './src/prompt';
export * as smartMerge from './src/smartMerge';
export * as virtualFile from './src/virtualFile';
export * as openBrowser from './src/openBrowser';
export * as Env from './src/Env';
export * as validateSchema from './src/validateSchema';
export * as loadFile from './src/loadFile';
