const fs = require('fs');
const file = fs.createWriteStream('./big.txt');

for (let i = 0; i <= 10_000_000; i++) {
    file.write('Hello. We are going to make a big file. I am telling you. Please keep watching it.\n');
};
file.end();