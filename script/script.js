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
    income: {}, // название доп дохода . не использ
    addIncome: [], // дополнит доходы . не использ
    expenses: {}, //обязательные расходы . объект
    addExpenses: [], // возможные расходы
    deposit: false, // депозит в банке
    mission: 50000, // цель накопить денег
    period: 5,
    budget: {},
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0, //сумма всех обязательных расходов за месяц
    month: 0,
    asking: function(){ // метод, спрашивающий у пользователя возможные расходы, депозит, обязательные расходы // НИЧЕГО НЕ ВОЗВРАЩАЕТ, А ДОБАВЛЯЕТ ЗНАЧЕНИЕ В ОБЪЕКТ
        let addExpenses  = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let expense;
        let count;
        for (let i = 0; i < 2; i++) {
            expense = prompt('Введите обязательную статью расходов');    
            do {
              count = +prompt('Во сколько это обойдется?');  
            } while(!isNumber(count));
            appData.expenses[expense] = +count;
        }
        console.log(appData.expenses, appData.expenses[expense], typeof appData.expenses[expense]); // так смотрим значение под ключом!
        //  объект appData = {} / можно  прописать ключ так appData.expenses = ... /а можно так let expenses = ... appData[expenses] = ..
        // при этом значение переменной expenses будет передано как ключ
        //если let expenses = 'Медведь'
        //то appData[expenses] = 'Бурый'
        //в объект запишется - appData = {'Медведь': 'Бурый'}
    },
    getExpensesMonth: function() { //сумма всех обязательных расходов за месяц
        for (let item in appData.expenses) {
            appData.expensesMonth += appData.expenses[item];
        }
    },
    getBudget: function() { //бюджет на месяц и на день
        appData.budget = money;
        appData.budgetMonth = appData.budget - appData.expensesMonth; 
        appData.budgetDay =  Math.floor(appData.budgetMonth) / 30;
    },
    getTargetMonth: function() { // сколько месяцев надо что бы накопить
        appData.month = appData.mission / appData.budgetMonth;
        console.log('цель накопить', appData.mission, typeof appData.mission);
        console.log('бюджет на месяц', appData.budgetMonth, typeof appData.budgetMonth);
        return Math.ceil(appData.month);
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
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

if (appData.month < 0) {
    console.log('Цель не будет достигнута');
} else {
    console.log('Цель осуществима');
}

console.log(appData.getStatusIncome());
console.log('Рассходы за месяц', +appData.expensesMonth);
console.log('Месяцев, что бы накопить', appData.mission, 'будет',  Math.ceil(appData.month));
console.log('Бюджет на 1 день:', Math.floor(appData.budgetDay));

for(let item in appData) {
    console.log('Наша программа включает в себя данные:', item, appData[item]);
}
