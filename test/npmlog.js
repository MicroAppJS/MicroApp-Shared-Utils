'use strict';

const npmlog = require('../src/logger');

// npmlog.prefixStyle = {

// };

// npmlog.heading = '333'

// npmlog.headingStyle = {
//     bg: 'red',
// };

npmlog.info('abc', 'haha..');
npmlog.error('abc', 'haha..');
npmlog.warn('abc', 'haha..');
npmlog.warn('', 'haha..');
npmlog.success('haha..');
npmlog.debug('111haha..');
npmlog.noise(false, 'haha..');

npmlog.throw(new Error('abbdd'), 'abc..');

// console.log(npmlog.record)
// console.log(npmlog.level)
