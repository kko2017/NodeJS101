const { odd, even } = require('./var');
const checkNumber = require('./func');
console.time('check');
 function checkStringOddOrEven(str) {
     if(str.length % 2) {
        return odd;
     } else {
         return even;
     }
 }
console.timeEnd('check');

console.log(checkNumber(12));
console.log(checkStringOddOrEven('Hello'));

console.table([{name: "Oh", birth: 1981},{name: "Kang", birth: 1981}]);
