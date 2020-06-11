'use strict';
let getString = function(str) {
    if(typeof str === 'string') {      
        str = str.trim(); // метод, который удаляет пробелы с конца и начала
        if(str.length > 30) {
            str = str.substr(0, 30) + '...';
            return str;
        }
        return str;   
    } else {
        return 'В качестве аргумента не строка';
    }
};

console.log(getString('     бобрабобрабобрабобрабобрабобрабобра   '));
console.log(getString(7));
    