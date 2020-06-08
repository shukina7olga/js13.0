'use strict';
let lang = document.getElementsByTagName('html')[0].getAttribute('lang');

if (lang === "ru") {
    console.log('понедельник вторник среда четверг пятница суббота воскресение');
} else {
    console.log('monday tuesday wednesday thursday friday saturday sunday');
}


switch (lang) {
    case "ru":
        console.log('понедельник вторник среда четверг пятница суббота воскресение');
        break;
    default:
        console.log('monday tuesday wednesday thursday friday saturday sunday');
        break;
}



let arr = [['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресение'],
            ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']];

let i = 7;
while (lang === "ru" && i === 7) { 
  console.log(arr[0][0], arr[0][1], arr[0][2], arr[0][3], arr[0][4], arr[0][5], arr[0][6]);
  i --; // для выхода из цикла. иначе пипец, будет бесконечно крутить
}

while (lang === "en" && i === 7) { 
    console.log(arr[1][0], arr[1][1], arr[1][2], arr[1][3], arr[1][4], arr[1][5], arr[1][6]);
    i --;
}

/* альтернатива второму заданию
let namePerson = prompt('Ты хто?'), n, b, a;
a = (namePerson === 'Артем') ? console.log('директор') : n ;
n = (namePerson === 'Максим') ? console.log('преподаватель') : b;
b = (namePerson !== 'Артем' && namePerson !== 'Максим') ? console.log('студент') : a ; 
*/

let namePerson = prompt('Ты хто по жизни?');
(namePerson === 'Артем') ? console.log('директор') : (namePerson === 'Максим') ? console.log('преподаватель') : console.log('студент'); 