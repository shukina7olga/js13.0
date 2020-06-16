'use strict';
let isNumber = function(n) { // принимает число и возвращает + или -
    return !isNaN(parseFloat(n)) && isFinite(n); // ! чтобы +если число, - если стр
}; // isFinite(n) если число бесконечно, то вернет -


let money;
const start = function() {
    do{
        money = +prompt('Ваш месячный доход', 90000); 
    } while (!isNumber(money));
};
start();

let appData = { // объект, содержащий все созданные переменные
    income: {}, // название доп дохода . не использ
    addIncome: [], // дополнит доходы . не использ
    expenses: {}, //обязательные расходы . объект
    addExpenses: [], // возможные расходы
    deposit: false, // депозит в банке
    percentDeposit: 0, // процент депозита
    moneyDeposit: 0, // сколько человек денег заложил
    mission: 50000, // цель накопить денег
    period: 3, // 
    budget: {},
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0, //сумма всех обязательных расходов за месяц
    month: 0,
    asking: function(){ // метод, спрашивающий у пользователя возможные расходы, депозит, обязательные расходы // НИЧЕГО НЕ ВОЗВРАЩАЕТ, А ДОБАВЛЯЕТ ЗНАЧЕНИЕ В ОБЪЕКТ
        
        if(confirm('Есть ли у вас дополнительный зароботок?')){
            let itemIncome, cashIncome;
            do{
                itemIncome = prompt('Какой у вас дополнительный зароботок?', 'фриланс');  
            } while (isNumber(itemIncome));
            do{
                cashIncome = prompt('Сколько на этом зарабатываете?', 10000);
            } while (!isNumber(cashIncome));     
            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses;
        do{
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Еда, Вода, ЖКХ');        
        } while (isNumber(addExpenses));    
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let expense;
        let count;
        for (let i = 0; i < 2; i++) {
            do{
                expense = prompt('Введите обязательную статью расходов', 'пицца');  
            } while (isNumber(expense));     
            do {
              count = +prompt('Во сколько это обойдется?', 7000);  
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
    getInfoDeposit: function() { // спрашиваем доп инфу о депозите
        if(appData.deposit){
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', 10);
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while(!isNumber(appData.percentDeposit) || !isNumber(appData.moneyDeposit));    
        }
    },
    calcSaveMoney: function() { // метод умножает период на месячный бюджет
        return appData.budgetMonth * appData.period;
    }  
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();
appData.calcSaveMoney();

if (appData.month < 0) {
    console.log('Цель не будет достигнута');
} else {
    console.log('Цель осуществима');
}

const forStr = function() {
    let newStr = [];
    for(let i = 0; i < appData.addExpenses.length; i++) {
        newStr[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1);
        console.log(newStr[i]);
    }
    console.log(newStr.join(', '));
};
forStr();


console.log(appData.getStatusIncome());
console.log('Рассходы за месяц', +appData.expensesMonth);
console.log('Месяцев, что бы накопить', appData.mission, 'будет',  Math.ceil(appData.month));
console.log('Бюджет на 1 день:', Math.floor(appData.budgetDay));




for(let item in appData) { // цикл, перебирающий все данные в объекте appData
    console.log('Наша программа включает в себя данные:', item, appData[item]);
}

// console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSaveMoney());