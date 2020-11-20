const http = require('http');
const fs = require('fs').promises;

let users = {};

http.createServer(async (req, res) => {
    try {
        if (req.method === 'GET') {
            if (req.url === '/') {
                const main = await fs.readFile('./main.html');
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                return res.end(main);
            } else if (req.url === '/about') {
                const about = await fs.readFile('./about.html');
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utr-8' });
                return res.end(about);
            } else if (req.url === '/users') {
                res.writeHead(200, { 'Content-Type': 'text/application; charset=utf-8' });
                return res.end(JSON.stringify(users));
            }

            try {
                // 기타 frontEnd.js, main.css 등을 호출하기 위해 필요
                const data = await fs.readFile(`.${req.url}`);
                const tmp = req.url.lastIndexOf('.');
                const extension = req.url.substring(tmp + 1);
                if (extension === 'css') {
                    res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
                }
                return res.end(data);
            } catch (err) {
                // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
            }
        } else if (req.method === 'POST') {
            if (req.url === '/user') {
                let body = '';
                req.on('data', (data) => {
                    body += data; 
                });
                return req.on('end', () => {
                    console.log('POST Body: ', body);
                    const key = Date.now();
                    const { name } = JSON.parse(body);
                    users[key] = name;
                    res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
                    res.end('ok');
                });
            }
        } else if (req.method === 'PUT') {
            if (req.url.startsWith('/user/')) {
                const key = req.url.split('/')[2];
                let body = "";
                req.on('data', (data) => {
                    body += data;
                })
                return req.on('end', () => {
                    console.log('PUT 본문(Body): ', body);
                    const { name } = JSON.parse(body);
                    users[key] = name;
                    res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
                    res.end('ok');
                })
            }
        } else if (req.method === 'DELETE') {
            if (req.url.startsWith('/user')) {
                const key = req.url.split('/')[2];
                delete users[key];
                res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
                return res.end('ok');
            }
        }
        res.writeHead(404);
        res.end("NOT FOUND");
    } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(err.message);
    }
})
    .listen(8083, () => {
        console.log("8083 port is working now...");
    });