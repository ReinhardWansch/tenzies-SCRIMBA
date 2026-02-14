
let arr= new Array(5);

console.log(arr);
arr.fill(0);
let randArr= arr.map(()=>Math.ceil(Math.random()*6));
console.log(arr);
console.log(randArr);