const express = require('express');

const router = express.Router();

// GET /user 라우터
router.get('/', (req, res) => { // GET /user/
    res.send('Hello, User');
})

// 라우터 그룹화하기
// router.route('/')
//     .get((req, res) => {
//         res.send('GET /user');
//     })
//     .post((req, res) => {
//         res.send('POST /user');
//     });



module.exports = router;