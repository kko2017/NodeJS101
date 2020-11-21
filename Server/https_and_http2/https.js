const https = require('https');
const fs = require('fs');

// 인증서 받는 부분은 어차피 모든 사이트가 처음 시작할때 진행되기 때문에 비동기를 할 필요가 없다. 그래서 fs.readFileSync를 쓴다.
// https를 위한 무료인증기관: Let's Encrypt
https.createServer({
  cert: fs.readFileSync('도메인 인증서 경로'),
  key: fs.readFileSync('도메인 비밀키 경로'),
  ca: [
    fs.readFileSync('상위 인증서 경로'),
    fs.readFileSync('상위 인증서 경로'),
  ],
}, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})
  .listen(443, () => {
    console.log('443번 포트에서 서버 대기 중입니다!');
  });

// https는 443번 포트가 기본, http는 80번 포트가 기본. 기본 포트를 벗어나면 에러가 발생한다. 참고로 localhost는 8080이 기본