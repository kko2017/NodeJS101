const fs = require('fs').promises;

fs.readFile('./read.txt')
    .then((data) => {
        console.log('No 1', data.toString());
        return fs.readFile('./read.txt');
    })
    .then((data) => {
        console.log('No 2', data.toString());
        return fs.readFile('./read.txt');
    })
    .then((data) => {
        console.log('No 3', data.toString());
        return fs.readFile('./read.txt');
    })
    .then((data) => {
        console.log('No 4', data.toString());
    })
    .catch((err) => {
        throw err;
    });