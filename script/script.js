'use strict';
let money,
    income = 'фриланс',
    addExpenses,
    deposit,
    mission = 900000,
    period = 5,
    budgetDay,
    expenses1,
    amount1,
    expenses2,
    amount2,
    budgetMonth,
    month;

//пункт_3_4 спрашиваем данные у пользователя через поле ввода в модалке
money = prompt('Ваш месячный доход');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
//пункт_5 доп вопросы
expenses1 = prompt('Введите обязательную статью расходов');
amount1 = prompt('Во сколько это ообйдется?');
expenses2 = prompt('Введите обязательную статью расходов');
amount2 = prompt('Во сколько это обойдется?');

//пункт_6 вычисляем бюджет на месяц
budgetMonth = money - (+amount1 + (+amount2));
//альтернатива budgetMonth = money - (Number(amount1) + Number(amount2));

//пункт_7 за сколько месяцев достигнем цели
month = mission/budgetMonth;

//пункт_8 деньги на день
budgetDay = budgetMonth/30;



//из 2 домашки
console.log(' Месячный доход money: ', typeof money, '\n', 'Дополнительный доход income: ',
     typeof income, '\n', 'Есть депозит в банке? deposit: ', typeof deposit);
console.log('Длина введенной строки', addExpenses.length);
console.log('Период равен:', period, 'месяцев', 'Цель: заработать', mission, 'рублей');
console.log('Разбили строку на массив из строк', addExpenses.toLowerCase().split(','));

//из 3 домашки
console.log('Месячный доход:', money, '\n', addExpenses, '\n','Есть депозит в банке? deposit:', deposit, '\n',
    expenses1, ':', amount1,'\n', expenses2,':', amount2);
console.log('Бюджет на месяц:', budgetMonth);
console.log('Месяцев, что бы накопить', mission, 'будет', Math.ceil(month));
console.log('Бюджет на 1 день:', Math.floor(budgetDay));

//пункт_9 
if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
} else if (1200 >= budgetDay >= 600) {     //budgetDay > 600 && budgetDay < 1200 
    console.log('У вас средний уровень дохода');
} else if (budgetDay > 600 || budgetDay === 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
    console.log('Что то пошло не так');
} 

/* Тут ведь нельзя использовать swich из-за того, что в скобках "switch (budgetDay)" 
    должно присутствовать именно булево значение? Или в скобки просто надо было прописать что-то другое?

switch (budgetDay) { 
    case budgetDay > 1200:
        console.log('У вас высокий уровень дохода');
        break;
    case budgetDay > 600 && budgetDay < 1200:
        console.log('У вас средний уровень дохода');
        break;
    case budgetDay > 600 || 0:
        console.log('К сожалению у вас уровень дохода ниже среднего');
        break;
    case budgetDay < 0: 
        console.log('Что то пошло не так');
        break;
} */