const {even, odd} = require('./var.js');
// const value= require('./var.js');
// const even = value.even;
// const odd = value.odd;

// console.log(even);
// console.log(odd);

function checkOddEven(number) {
    if(number % 2) {
        return odd;
    } else {
        return even;
    }
}

module.exports = checkOddEven;