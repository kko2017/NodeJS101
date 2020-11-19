const http = require('http');
const fs = require('fs').promises;

// http.createServer((req, res) => {
//     res.write('<h1>Hello Node!</h1>');
//     res.write('<p>Hello Server</p>');
//     res.end('<p>Hello Alex</p>');
// })
//     .listen(8080, () => {
//         console.log('8080 server stand by now...');
//     });

const server = http.createServer(async (req, res) => {
    try {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        // res.write('<h1>Hello Node!</h1>');
        // res.write('<p>Hello Server</p>');
        // res.end('<p>Hello Alex</p>');
        const data = await fs.readFile('./server2.html');
        res.end(data);   
    } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(err.message);
    }
})
    .listen(8080);

server.on('listening', () => {
    console.log('8080 port stand by now....');
});

server.on('error', (error) => {
    console.log(error);
});

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//     res.write('<h1>Hello Node!</h1>');
//     res.write('<p>Hello Server</p>');
//     res.end('<p>Hello Alex</p>');
// })
//     .listen(8081);

// 이런식으로 포트 2개를 활용하여 서버2개를 돌릴 수 있다. 도메인을 여러개 살 필요없이 도메인 하나로 포트 여러개를 활용하면 여러 서버를 확보할 수 있다.