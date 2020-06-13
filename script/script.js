'use strict';
let arr = ['334', '234', '444', '32', '234', '444', '32',];

console.log(arr, typeof arr);
for (let i = 0; i < arr.length; i++) {
    arr[i].split('');
    //arr[i] = Number.parseInt(arr[i]);
    console.log(arr[i], typeof arr[i]);
    //console.log(q);
    for (let j = 0; j < arr[i].length; j++) {
        arr[i][j] = Number.parseInt(arr[i][j]);
        console.log(arr[i][j], typeof arr[i][j]);
    }
    
}
/*
let a = arr[0].split('');
let b = arr[1].split('');
let c = arr[2].split('');
let d = arr[3].split('');
let e = arr[4].split('');
let f = arr[5].split('');
let g = arr[6].split('');


console.log(a, typeof a);
console.log(b, typeof b);
console.log(c, typeof c);
console.log(d, typeof d);
console.log(e, typeof e);
console.log(f, typeof f);
console.log(g, typeof g);





    if(arr[0] === 2 || arr[0] === 4) {
         c
    }
*/