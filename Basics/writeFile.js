const fs = require('fs').promises;

fs.writeFile('./write.txt', 'Write something here')
    .then(() => {
        return fs.readFile('./write.txt');
    })
    .then((data) => {
        console.log(data.toString());
    })
    .catch((err) => {
        throw err;
    });