'use strict';
function DomElement(selector, height, width, bg, fontSize){
    this.selector = selector; 
    this.height = height; 
    this.width = width; 
    this.bg = bg;
    this.fontSize = fontSize;
}

DomElement.prototype.system = function(){ // добавили метод к прототипу объекта
    console.log('function');
};
let domElement = new DomElement();

domElement.system();
console.log(DomElement);
console.log(domElement);