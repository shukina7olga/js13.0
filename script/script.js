document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    class First {
        hello(){
            console.log('Привет! Я метод родителя!');
        }
    }

    class Second extends First {       
        hello(){
            super.hello();
            console.log('А я наследуемый метод!');
        }       
    }

    const obj = new Second();
    obj.hello();

});
