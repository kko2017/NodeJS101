const path = require('path');

console.log(path.join(__dirname, 'var.js'));
console.log(path.join(__dirname, '..', 'var.js')); 

// built in 모듈인 path를 이용하면 윈도우에서는 \NodeJS\var.js, 리눅스나 맥에서는 /NodeJS/var.js, 또는 \\NodeJS\\var.js 같이 더블 슬래쉬를 쓰는 곳에서도 그에 맞게 설정을 변경해 준다.

console.log(path.join(__dirname, '..', '/var.js')); 

console.log(path.resolve(__dirname, '..', '/var.js')); 