//콜백 헬

const fs = require('fs');

fs.readFile('./read.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('No 1', data.toString());
    fs.readFile('./read.txt', (err, data) => {
        if (err) {
            throw err;
        }
        console.log('No 2', data.toString());
        fs.readFile('./read.txt', (err, data) => {
            if (err) {
                throw err;
            }
            console.log('No 3', data.toString());
            fs.readFile('./read.txt', (err, data) => {
                if (err) {
                    throw err;
                }
                console.log('No 4', data.toString());
                fs.readFile('./read.txt', (err, data) => {
                    if (err) {
                        throw err;
                    }
                    console.log('No 5', data.toString());
                });
            });
        });
        
    });
});