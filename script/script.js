'use strict';
let isNumber = function(n) { // принимает число и возвращает + или -
    return !isNaN(parseFloat(n)) && isFinite(n); // ! чтобы +если число, - если стр
}; // isFinite(n) если число бесконечно, то вернет -

let money,
    income = 'фриланс',
    addExpenses,
    deposit,
    mission = 900000,
    period = 5,
    expenses = [],
    expensesAmount,
    accumulatedMonth,
    budgetDay,
    month;
     // while (isNaN(money) || money.trim() === '' || money === null) {
     //     money = +prompt('Ваш месячный доход');
const start = function() {
    money = +prompt('Ваш месячный доход');
    do{
        money = +prompt('Ваш месячный доход'); 
    } while (!isNumber(money));
};
const showTypeOf = function(data) {
   console.log('Значение переменной', data, 'тип этой переменной', typeof(data)); 
};
const getExpensesMonth = function() { //сумма всех обязательных расходов за мес
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        expenses[i] = +prompt('Введите обязательную статью расходов');
        //while(isNumber(sum)) {
            sum += +prompt('Во сколько это обойдется?');
        //}
    }
    console.log(expenses);
    return sum;
};
const getAccumulatedMonth = function(money, expensesAmount) { //накопления за месяц
    return money - expensesAmount;
};
const getTargetMonth = function(mission, accumulatedMonth) { // результат месячного накопления
    return mission / accumulatedMonth;
};
const getStatusIncome = function() {
    if (budgetDay > 1200) {
        return('У вас высокий уровень дохода');
    } else if (1200 >= budgetDay >= 600) {     //budgetDay > 600 && budgetDay < 1200 
        return('У вас средний уровень дохода');
    } else if (budgetDay > 600 || budgetDay === 0) {
        return('К сожалению, у вас уровень дохода ниже среднего');
    } else if (budgetDay < 0) {
        return('Что-то пошло не так');
    }
};

start();
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
expensesAmount = getExpensesMonth();
accumulatedMonth = getAccumulatedMonth(money, expensesAmount);
month = getTargetMonth(mission, accumulatedMonth);
if (month < 0) {
    console.log('Цель не будет достигнута');
}
budgetDay = accumulatedMonth / 30;

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(getStatusIncome());
console.log('Рассходы за месяц', +expensesAmount);
console.log('Разбили строку на массив из строк', addExpenses.toLowerCase().split(','));
console.log('Месяцев, что бы накопить', mission, 'будет', Math.ceil(month));
console.log('Бюджет на 1 день:', Math.floor(budgetDay));
