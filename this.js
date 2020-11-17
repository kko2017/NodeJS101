console.log(this);
console.log(this === module.exports);

function test() {
    console.log(this === global);
}

test();