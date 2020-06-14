'use strict';
let isNumber = function(n) { // принимает число и возвращает + или -
    return !isNaN(parseFloat(n)) && isFinite(n); // ! чтобы +если число, - если стр
}; // isFinite(n) если число бесконечно, то вернет -


let money;
const start = function() {
    do{
        money = +prompt('Ваш месячный доход'); 
    } while (!isNumber(money));
};
start();

let appData = { // объект, содержащий все созданные переменные
    income: {},
    addIncome: [], // дополнит доходы
    expenses: {}, //дополнительные рассходы
    addExpenses: [], // возможные рассходы
    deposit: false,
    mission: 50000,
    period: 5,
    asking: function(){ // метод, спрашивающий у пользоват
        let addExpenses  = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
    },
    budget: {},
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function() { //сумма всех обязательных расходов за мес
        let sum = 0;
        let count;
        for (let i = 0; i < 2; i++) {
            appData.expenses[i] = prompt('Введите обязательную статью расходов');
            do {
                count = +prompt('Во сколько это обойдется?');
            } while(!isNumber(count));
            sum += count; 
        }
        return sum;
    },
    getAccumulatedMonth: function(money, expensesAmount) { //накопления за месяц
        return money - expensesAmount;
    },
    getTargetMonth: function(mission, accumulatedMonth) { // результат месячного накопления
        return mission / accumulatedMonth;
    },
    getStatusIncome: function() {
        if (appData.budgetDay > 1200) {
            return('У вас высокий уровень дохода');
        } else if (1200 >= appData.budgetDay >= 600) {     //budgetDay > 600 && budgetDay < 1200 
            return('У вас средний уровень дохода');
        } else if (appData.budgetDay > 600 || appData.budgetDay === 0) {
            return('К сожалению, у вас уровень дохода ниже среднего');
        } else if (appData.budgetDay < 0) {
            return('Что-то пошло не так');
        }
    },
    

};

let expensesAmount,
    accumulatedMonth,   
    month;
    
appData.asking();
expensesAmount = appData.getExpensesMonth();
accumulatedMonth = appData.getAccumulatedMonth(money, expensesAmount);
month = appData.getTargetMonth(appData.mission, accumulatedMonth);
if (month < 0) {
    console.log('Цель не будет достигнута');
} else {
    console.log('Цель осуществима');
}

appData.budgetDay = accumulatedMonth / 30;

console.log(appData.getStatusIncome());
console.log('Рассходы за месяц', +expensesAmount);
console.log('Месяцев, что бы накопить', appData.mission, 'будет', Math.ceil(month));
console.log('Бюджет на 1 день:', Math.floor(appData.budgetDay));
