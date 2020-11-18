// 콜백이나 promise 다 비동기 함수이기 때문에 순서대로 시작되지 않을 수 있다. 랜덤으로 시작되기 때문에 콜백은 특히 사용을 조심해야 한다.

const fs = require('fs');

fs.readFile('./read.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('No 1', data.toString());
});

fs.readFile('./read.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('No 2', data.toString());
});

fs.readFile('./read.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('No 3', data.toString());
});

fs.readFile('./read.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('No 4', data.toString());
});

fs.readFile('./read.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('No 5', data.toString());
});