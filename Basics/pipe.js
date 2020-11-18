const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('./read2.txt', { highWaterMark: 16 });
// const writeStream = fs.createWriteStream('./write2.txt');
// readStream.pipe(writeStream);
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./write3.txt.gz');
readStream.pipe(zlibStream).pipe(writeStream);