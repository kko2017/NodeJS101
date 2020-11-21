const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') =>
    cookie.split(';')
        .map(v => v.split('='))
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});


http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    // 확인해보기 parseCookies 함수
    // console.log(typeof req.headers.cookie);
    // let test = '';
    // if (req.headers.cookie !== undefined) {
    //     test = req.headers.cookie;
    // }
    // console.log('Split; ', test.split(';'));
    // console.log('Map= ', test.split(';').map(v => v.split('=')));
    // console.log('reduce: ', test.split(';').map(v => v.split('=')).reduce((acc, [k, v]) => {
    //     console.log('k: ', k);
    //     console.log('v: ', v);
    //     acc[k.trim()] = decodeURIComponent(v);
    //     return acc;
    // }, {}));

    // 주소가 /login으로 시작되는 경우
    if (req.url.startsWith('/login')) {
        // console.log('url parse', url.parse(req.url));
        const { query } = url.parse(req.url);
        // console.log('querystring parse: ', qs.parse(query));
        const { name } = qs.parse(query);
        const expires = new Date();
        // console.log('expires: ', expires);
        // console.log('expires getMinutes: ', expires.getMinutes());
        // 쿠키 유효 시간을 현재시간 + 5분으로 설정
        expires.setMinutes(expires.getMinutes() + 5);
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`
        });
        // Location: '/'은 리다이렉션 될 위치를 설정
        // path=/ 의미는 localhost:8087/ 아래의 모든 url에 이 쿠키가 유효하다는 걸 의미함
        res.end()
    } else if (cookies.name) { // 쿠키 name이 있는 경우
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${cookies.name}님 안녕하세요`);
    } else {
        try {
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(err.message);
        }
    }
})
    .listen(8087, () => {
        console.log('Port 8087 is ready now...');
    });