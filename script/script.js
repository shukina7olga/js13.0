document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    let btnStart = document.getElementById('start'),
        btnPlus0 = document.getElementsByTagName('button')[0],
        btnPlus1 = document.getElementsByTagName('button')[1],
        checkbox = document.querySelector('#deposit-check'), // с диезом - ID
        additionalIncome = document.querySelectorAll('.additional_income-item'), // с точкой - КЛАСС
        // поля ввода слева
        budgetMonthValue = document.querySelector('.budget_month-value'),
        budgetDayValue = document.querySelector('.budget_day-value'),
        expensesMonthValue = document.querySelector('.expenses_month-value'),
        additionalIncomeValue = document.querySelector('.additional_income-value'),
        additionalExpensesValue = document.querySelector('.additional_expenses-value'),
        incomePeriodValue = document.querySelector('.income_period-value'),
        targetMonthValue = document.querySelector('.target_month-value'),

        butgetMonth = document.querySelector('.salary-amount'),

        itemIncome = document.querySelector('input.income-title'),
        cashIncome = document.querySelector('.income-amount'),

        itemExpense = document.querySelector('input.expenses-title'),
        cashExpense = document.querySelector('.expenses-amount'),
    
        addExpenses = document.querySelector('.additional_expenses-item'),
        mission = document.querySelector('.target-amount'),
        periodSelect = document.querySelector('.period-select');

        console.log(btnStart,'\n', btnPlus0,'\n', btnPlus1,'\n', checkbox,'\n', additionalIncome,'\n',budgetMonthValue,'\n',
        budgetDayValue,'\n',expensesMonthValue,'\n', additionalIncomeValue,'\n', additionalExpensesValue,'\n',
        incomePeriodValue,'\n', targetMonthValue,'\n', butgetMonth,'\n', itemIncome,'\n', cashIncome,'\n', 
        itemExpense,'\n', cashExpense,'\n', addExpenses,'\n', mission,'\n', periodSelect);



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
        period: 0, // 
        budget: {},
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0, //сумма всех обязательных расходов за месяц
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
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
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
            //то appData[expenses] = 'Белый'
            //в объект запишется - appData = {'Медведь': 'Белый'}
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
            appData.period = appData.mission / appData.budgetMonth;
            console.log('цель накопить', appData.mission, typeof appData.mission);
            console.log('бюджет на месяц', appData.budgetMonth, typeof appData.budgetMonth);
            return Math.ceil(appData.period);
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

    if (appData.period < 0) {
        console.log('Цель не будет достигнута');
    } else {
        console.log('Цель осуществима');
    }


    let newStr = [];
    for(let i = 0; i < appData.addExpenses.length; i++) { 
        newStr[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].substr(1);
        console.log(newStr[i]);
    }
    console.log(newStr.join(', ')); // метод делает из массива - строку
    //метод toUpperCase() возвращает значение строки 
    //Содержимое строки в JavaScript нельзя изменить!
    //Нельзя просто взять символ посередине и заменить его. Как только строка создана — она такая навсегда.
    //   В новый массив записали => певая буква в верхнем регистре + строка со 2го элемента
    // была проблема работы цикла! тк в addExpenses.toLowerCase().split(', ')  было без пробела split(',') и 0 символом считывался именно пробел


    console.log(appData.getStatusIncome());
    console.log('Рассходы за месяц', +appData.expensesMonth);
    console.log('Месяцев, что бы накопить', appData.mission, 'будет',  Math.ceil(appData.period));
    console.log('Бюджет на 1 день:', Math.floor(appData.budgetDay));


    //for(let item in appData) { // цикл, перебирающий все данные в объекте appData
    //    console.log('Наша программа включает в себя данные:', item, appData[item]);
    //}

    // console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSaveMoney());

});
