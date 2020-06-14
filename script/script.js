'use strict';
let arr = []; // создаем массив
    for(let i=0; i < 7; i++) {

        arr[i] = prompt('Введите число').trim(); // Заполняем массив
        console.log(arr[i], typeof arr[i]);

        if(arr[i] === '') { // если  имя не введено
            arr[i] = prompt('Введите число').trim(); 
        }
        
    }
console.log(arr, typeof arr);

arr.forEach((item) => {
    if (item.startsWith('2') || item.startsWith('4')) {
      console.log('Числа начинающиеся на 2 или 4', item, typeof item);
    }
  });
/*
let arr = ['634', '234', '4574', '32', '234', '8490', '32',];



for (let i = 0; i < arr.length; i++) {
    let a = arr[i].split('');
    //a[i] = Number.parseInt(arr[i]);
    //console.log(arr[i] = Number.parseInt(arr[i]), typeof arr);
    //console.log(arr[4] = Number.parseInt(arr[4]), typeof arr[4]);
    //console.log(a[i], typeof a[i]);
    for (let j = 0; j < a[i].length; j++) {
        //let a = arr[i][j].substring(1,0);
        a[i][j] = Number.parseInt(a[i][j]);
        
        console.log(a[i][j], typeof a[i][j]);
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