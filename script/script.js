'use strict';
let str;    
let getString = function(str) {
    if(typeof str === typeof '') {      
        str = str.trim(); // метод, который удаляет пробелы с конца и начала
        if(str.length > 4) {
            str = str.substr(0, 4) + '...';
            return str;
        }
        return str;   
    } else {
        console.log('В качестве аргумента не строка');
    }
};

str = getString('     бобрабобрабобрабобрабобрабобрабобра   ');
//str = getString(7); // но почему-то выводит еще undefined
console.log(str);
    