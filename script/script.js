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
    ExpensesMonth,
    accumulatedMonth,
    budgetDay,
    month;

const showTypeOf = function(data) {
   console.log('Значение переменной', data, 'тип этой переменной', typeof(data)); 
};
const getExpensesMonth = function(amount1, amount2) { //сумма всех обязательных расходов за мес
    return amount1 + amount2;
};
const getAccumulatedMonth = function(money, ExpensesMonth) { //накопления за месяц
    return money - ExpensesMonth;
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
        return('К сожалению у вас уровень дохода ниже среднего');
    } else if (budgetDay < 0) {
        return('Что-то пошло не так');
    }
};

ExpensesMonth = getExpensesMonth(amount1, amount2); //сумма трат за месяц 
accumulatedMonth = getAccumulatedMonth(money, ExpensesMonth);
month = getTargetMonth(mission, accumulatedMonth);
budgetDay = accumulatedMonth / 30;

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(getStatusIncome());
console.log('Рассходы за месяц', ExpensesMonth);
console.log('Разбили строку на массив из строк', addExpenses.toLowerCase().split(','));
console.log('Месяцев, что бы накопить', mission, 'будет', Math.ceil(month));
console.log('Бюджет на 1 день:', Math.floor(budgetDay));
