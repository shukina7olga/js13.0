'use strict';
function DomElement(selector, height, width, bg, fontSize){
    this.selector = selector; 
    this.height = height; 
    this.width = width; 
    this.bg = bg;
    this.fontSize = fontSize;
}

DomElement.prototype.system = function(){ // добавили метод к прототипу объекта
    
    if(this.selector[0] === '.'){
        console.log('див');
        let div = document.createElement('div');
        div.className = this.selector.substring(1);
        div.innerHTML = 'это блок';
        div.style.height = this.height;
        div.style.width = this.width;
        div.style.background = this.bg;
        div.style.sfontSize = this.fontSize;
        document.body.append(div);
    }
    if(this.selector[0] === '#'){
        console.log('парагр');
        let paragr = document.createElement('p');
        paragr.id = this.selector.substring(1);
        paragr.innerHTML = 'это параграф';
        paragr.style.height = this.height;
        paragr.style.width = this.width;
        paragr.style.background = this.bg;
        paragr.style.fontSize = this.fontSize;
        document.body.append(paragr);
    }
    
};
let domElementDiv = new DomElement('.block', '50px', '40px', 'red', '10px');
let domElementP = new DomElement('#best', '150px', '100px', 'green', '20px');

domElementDiv.system();
domElementP.system();

