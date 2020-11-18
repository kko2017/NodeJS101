const buffer = Buffer.from('Hello I am buffer.');
console.log(buffer);
console.log(buffer.length);
console.log(buffer.toString());

const array = [Buffer.from('Hi '), Buffer.from('There. '), Buffer.from('Bye.')];
console.log(Buffer.concat(array).toString());

console.log(Buffer.alloc(5));
// 5byte buffer space
