document.addEventListener('DOMContentLoaded', function() {
'use strict';   

let booksBox = document.querySelector('.books'),
    books = document.querySelectorAll('.book'),
    titleFix = document.getElementsByTagName('a'),
    spam = document.querySelector('.adv'),
    chapters = document.getElementsByTagName('li'),
    chapBox = document.getElementsByTagName('ul'),
    newElem = document.createElement('li');   

booksBox.append(books[2]); // метод переместил 6 книгу в конец родителя
booksBox.prepend(books[1]); // метод переместил 1 книгу вначало родителя
books[4].after(books[3]); // 4 перенес после 3

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)'; // заменили фон

titleFix[2].textContent = 'Книга 3. this и Прототипы Объектов';

spam.remove(); // удалили из DOM рекламу

// исправлен порядок тем 2 книги 
chapters[9].after(chapters[12]);
chapters[10].after(chapters[14]);
chapters[15].after(chapters[8]);

// исправлен порядок тем 5 книги
chapters[37].after(chapters[45]);
chapters[41].after(chapters[39]);
chapters[44].after(chapters[42]);

// добавили новую главу в 6 книгу
chapBox[5].append(newElem);
newElem.textContent = 'Глава 8: За пределами ES6';
chapters[55].after(chapters[57]);

console.log(booksBox,'\n', books);
console.log(titleFix);
console.log(chapters);
console.log(chapBox);
});