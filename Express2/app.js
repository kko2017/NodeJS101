const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

// port는 process.env.PORT 이거나 3000이다 셋팅
app.set('port', process.env.PORT || 3000);

// 배포 상황에서는 좀 더 자세한 combined
// 개발 상황에서는 dev
// 같은 방법
// app.use((req, res, next) => {
//     morgan('dev')(req, res, next);
// })
app.use(morgan('dev'));
// 예) app.use('요청 경로', express.static('실제 경로'));
// 요청경로: localhost:3000/fiftho.html
// 실제경로: learn-express/public-3030/fiftho.html
// 보안에 용이하다.
app.use('/', express.static(path.join(__dirname, 'public-3030')));
app.use(cookieParser());
// app.use(cookieParser('fifthopassword')); // 서명된 쿠키사용시 
// client로부터 request된 JSON파일을 풀어줌
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'fifthopassword',
    cookie: {
        httpOnly: true,
    },
    name: 'connect.sid',
}));
// 미들웨어 확장법
// app.use('/', (req, res, next) => {
//     if (req.session.id) {
//         express.static(path.join(__dirname, 'public-3030'))(req, res, next);
//     } else {
//         next();
//     }
// });

app.use(express.json());
// form에서 submit된 request를 urlencoded파일을 풀어줌
// true면 qs, false면 querystring 모쥴을 부르는데
// qs가 더 좋기때문에 true를 권장함 
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.data = 'fiftho 비번';
});

app.get('/', (req, res) => {
    req.data // fiftho 비번
    // req은 어딜가나 같기 때문에 프로퍼티를 새로 만들
    // 어서 자료를 저장한 후 필요한 라우터에서 꺼내쓰면
    // 된다. 라우터는 next()로 끝나기 때문에 쓴 데이터
    // 는 자연스럽게 일회성으로 사라진다.

    // request 프로퍼티에 name이 있으면 이렇게 간단히
    // 호출할 수 있다. express.json()과 express.urlencoded()
    // 가 필요한 이유
    // const name = req.body.name 

    // req.cookies // {mycookie: 'test'};
    // req.signedCookies; // 서명된 쿠키: 보안상승
    // 'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`
    // req.cookie('name', encodeURIComponent(name), {
    //     expires: new Date(),
    //     httpOnly: true,
    //     path: '/',
    // });
    // req.clearCookie('name', encodeURIComponent(name), {
    //     httpOnly: true,
    //     path: '/',
    // });
    // req.session.id = 'hello';
    res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/about', (req, res) => {
    res.send('hello express');
});

app.use((req, res, next) => {
    res.status(404).send('404 없는 페이지입니다.');
})

app.use((err, req, res, next) => {
    console.error(err);
    res.status(200).send('에러 났지롱. 근데 안알려주지롱');
});

app.listen(app.get('port'), () => {
    console.log("3000 port is ready now...");
});