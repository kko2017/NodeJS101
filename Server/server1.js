const http = require('http');

// http.createServer((req, res) => {
//     res.write('<h1>Hello Node!</h1>');
//     res.write('<p>Hello Server</p>');
//     res.end('<p>Hello Alex</p>');
// })
//     .listen(8080, () => {
//         console.log('8080 server stand by now...');
//     });

const server = http.createServer((req, res) => {
    res.write('<h1>Hello Node!</h1>');
    res.write('<p>Hello Server</p>');
    res.end('<p>Hello Alex</p>');
})
    .listen(8080);

server.on('listening', () => {
    console.log('8080 port stand by now....');
});

server.on('error', (error) => {
    console.log(error);
});