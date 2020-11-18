const fs = require('fs').promises;

async function main() {
    let data = await fs.readFile('./read.txt');
    console.log('No 1', data.toString());

    data = await fs.readFile('./read.txt');
    console.log('No 2', data.toString());

    data = await fs.readFile('./read.txt');
    console.log('No 3', data.toString());

    data = await fs.readFile('./read.txt');
    console.log('No 4', data.toString());
}

main();