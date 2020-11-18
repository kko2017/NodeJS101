const fs = require('fs');

const writeStream = fs.createWriteStream('./write2.txt');

// finish: EventListener
writeStream.on('finish', () => {
    console.log('Complete writing file');
})

writeStream.write("Write 1 \n");
writeStream.write('Write 2');
writeStream.end();