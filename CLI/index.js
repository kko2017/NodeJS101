#!/usr/bin/env node
// console.log('Hello CLI', process.argv);
const readline = require('readline');

const rl = readline.Interface({
    input: process.stdin,
    output: process.stdout,
});

console.clear();
const answerCallback = (answer) => {
    if (answer === 'y') {
        console.log('Thanks!');
        rl.close();
    } else if (answer === 'n') {
        console.log('Sorry about that.');
        rl.close();
    } else {
        console.clear();
        console.log('Please input y or n.');
        rl.question('Do you enjoy the class? (y/n)', answerCallback);        
    }

};

rl.question('Do you enjoy the class? (y/n)', answerCallback);