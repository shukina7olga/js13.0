'use strict';
let money = +prompt('Ваш месячный доход'),
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 900000,
    period = 5,
    expenses1 = prompt('Введите обязательную статью расходов'),
    amount1 = +prompt('Во сколько это ообйдется?'),
    expenses2 = prompt('Введите обязательную статью расходов'),
    amount2 = +prompt('Во сколько это обойдется?'),
    budgetMonth = money - (amount1 + amount2), //пункт_6 вычисляем бюджет на месяц  альтернатива budgetMonth = money - (Number(amount1) + Number(amount2));
    budgetDay = budgetMonth/30,//пункт_8 деньги на день
    month = mission/budgetMonth; //пункт_7 за сколько месяцев достигнем цели

switch (true) { 
    case budgetDay > 1200:
        console.log('У вас высокий уровень дохода');
        break;
    case budgetDay > 600 && budgetDay < 1200:
        console.log('У вас средний уровень дохода');
        break;
    case budgetDay > 600 || 0:
        console.log('К сожалению у вас уровень дохода ниже среднего');
        break;
    default:
        console.log('Хьюстон, у вас проблемы!');
        break;
}
/*пункт_9 альтернатива
if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
} else if (1200 >= budgetDay >= 600) {     //budgetDay > 600 && budgetDay < 1200 
    console.log('У вас средний уровень дохода');
} else if (budgetDay > 600 || budgetDay === 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
    console.log('Что то пошло не так');
} */

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





