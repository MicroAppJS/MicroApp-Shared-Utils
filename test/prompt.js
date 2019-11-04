'use strict';

const prompt = require('../src/prompt');

(async () => {

    const a = await prompt.confirm('confirm?');
    console.log(a);
    const b = await prompt.select('select?', {
        choices: [
            'a', 'b',
        ],
    });
    console.log(b);
    const c = await prompt.input('input?');
    console.log(c);

})();
