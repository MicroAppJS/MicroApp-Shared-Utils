'use strict';

const logger = require('../src/logger');

// npmlog.prefixStyle = {

// };

// npmlog.heading = '333'

// npmlog.headingStyle = {
//     bg: 'red',
// };

// logger.npmlog.level = 'verbose';
logger.level = 'silly';
console.warn(logger.level);
console.warn(logger.npmlog.level);

logger.info('abc', 'haha..');
logger.error('abc', 'haha..');
logger.warn('abc', 'haha..');
logger.warn('', 'haha..');
logger.success('haha..');
logger.debug('111haha..');
logger.verbose('111haha..');
logger.noise(false, 'haha..');

// logger.throw(new Error('abbdd'), 'abc..');

// console.log(npmlog.record)
// console.log(npmlog.level)
// logger.assert(1 === 2, 'not eq!!');


logger.debug('1 abc');

const nl = logger.newGroup('abc');
nl.error('ccc');
nl.debug('cccd');
nl.success('cccd');
nl.debug('111 scccd');
nl.silly('cccd');
