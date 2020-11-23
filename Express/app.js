const express = require('express');
const path = require('path');
const app = express();

// port는 process.env.PORT 이거나 3000이다 셋팅
app.set('port', process.env.PORT || 3000);

// 미들웨어는 req, res, next 인수가 들어있는 콜백을
// 말하고, app.use를 통해 미들웨어를 쓰는 것이다. 
app.use((req, res, next) => {
    console.log('모든 요청에 실행하고 싶어요.');
    // 미들웨어는 next()를 호출해야 다음으로 넘어간다.
    next();
});

// 에러상황 연출
// app.use((req, res, next) => {
//     console.log('모든 요청에 실행하고 싶어요.');
//     // 미들웨어는 next()를 호출해야 다음으로 넘어간다.
//     // throw new Error('에러 났어요.');
//     try {
//         console.log(asdfasdfasdfas);
//     } catch (err) {
//         next(err);
//     }
// });

// app.use('/about', (req, res, next) => {
//     console.log('about 요청에 실행하고 싶어요.');
//     // 미들웨어는 next()를 호출해야 다음으로 넘어간다.
//     next();
// });

// app.use((req, res, next) => {
//     console.log('요청1에 실행하고 싶어요.');
//     // 미들웨어는 next()를 호출해야 다음으로 넘어간다.
//     next();
// }, (req, res, next) => {
//     console.log('요청2에 실행하고 싶어요.');
//     // 미들웨어는 next()를 호출해야 다음으로 넘어간다.
//     next();
// }, (req, res, next) => {
//     console.log('요청3에 실행하고 싶어요.');
//     // 미들웨어는 next()를 호출해야 다음으로 넘어간다.
//     next();
// });

// *를 모두를 부르기 때문에 미들웨어 사용시 가장 밑에 위치시킨다. 그렇지 않으면 여기서 끝이 난다.
// app.get('*', (req, res) => {
//     res.send('hello express');
// });

app.get('/', (req, res) => {
    // res.send('hello express');
    res.sendFile(path.join(__dirname, './index.html'));
    // send, json, writehead를 추가로 넣으면 에러발생한다.
    // res.send('안녕하세요.');
    // res.json({ hello: 'fiftho' });
});

// app.get('/', (req, res, next) => {
//     // res.send('hello express');
//     res.sendFile(path.join(__dirname, './index.html'));
//     if (true) {
//         // 바로 밑 실행되나요 콜백을 무시하고, 다음 라우터로 고고!!
//         next('route');
//     } else {
//         // 실행되나요 콜백으로 진행.
//         next();
//     }
// }, (req, res) => {
//         console.log('실행되나요?');
// });

app.get('/about', (req, res) => {
    res.send('hello express');
});

// :name 와일드 카드 category내 수많은 라우터들을 들어가려고 일일이 메서드를 만들면 비효율 적이기 때문에 와일드 카드를 작성하여 효율을 높일 수 있다.
// app.get('/category/:name', (req, res) => {
//     // req.params.name 라우터 매개변수 이름
//     // res.send(`hello ${req.params.name}`);
//     res.send('hello category name');
// });

// 미들웨어가 있는 경우 와일드카드가 우선되고 끝나기 때문에 무조건 와일드카드를 밑으로 넣는다.
// app.get('category/javscript', (req, res) => {
//     res.send('hello category javascript');
// });

// http모듈을 사용할때보다 get, post, put, delete 사용
// 용이하다. get, post, put, delete과 주소가 적혀있는
// 메소드를 라우터라 한다.
// app.post('/', (req, res) => {
//     res.send('hello express');
// });

// 404 에러 커스터마이징 => 미들웨어 에러처리보다 위에 
// 있어야 한다.
app.use((req, res, next) => {
    res.status(404).send('404 없는 페이지입니다.');
})

// 미들웨어로 에러를 직접처리하는 코드를 넣을 수 있다.
// 숫자를 임의로 조작해서 해커들로부터 공격을 피한다.
// 404, 500 이런 번호들로 해커들이 에러를 유추할 수 있다.
app.use((err, req, res, next) => {
    console.error(err);
    // res.status(500).send('에러 났지롱. 근데 안알려주지롱');
    res.status(200).send('에러 났지롱. 근데 안알려주지롱');
});

// 셋팅이 되어 있기 때문에 부르면 된다.
app.listen(app.get('port'), () => {
    console.log("3000 port is ready now...");
});

// app.listen(3000, () => {
//     console.log("3000 port is ready now...");
// });