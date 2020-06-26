document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    let start = document.getElementById('start'),
        incomePlus = document.getElementsByTagName('button')[0],
        expensesPlus = document.getElementsByTagName('button')[1],
        depositСheck = document.querySelector('#deposit-check'), // с диезом - ID
        additionalIncomeItem = document.querySelectorAll('.additional_income-item'), // с точкой - КЛАСС
        // поля ввода справа
        budgetMonthValue = document.querySelector('.budget_month-value'),
        budgetDayValue = document.querySelector('.budget_day-value'),
        expensesMonthValue = document.querySelector('.expenses_month-value'),
        additionalIncomeValue = document.querySelector('.additional_income-value'),
        additionalExpensesValue = document.querySelector('.additional_expenses-value'), 
        incomePeriodValue = document.querySelector('.income_period-value'),
        targetMonthValue = document.querySelector('.target_month-value'),

        salaryAmount = document.querySelector('.salary-amount'),

        itemIncome = document.querySelector('input.income-title'),
        incomeItems = document.querySelectorAll('.income-items'),

        itemExpense = document.querySelector('input.expenses-title'),
        expensesItems = document.querySelectorAll('.expenses-items'),
    
        additionalExpensesItem = document.querySelector('.additional_expenses-item'), // инпут возможных расходов 
        targetAmount = document.querySelector('.target-amount'), // цель накопить
        periodSelect = document.querySelector('.period-select'),
        periodAmount = document.querySelector('.period-amount'); // цифра под полоской



    let isNumber = function(n) { // принимает число и возвращает + или -
        return !isNaN(parseFloat(n)) && isFinite(n); // ! чтобы +если число, - если стр
    }; // isFinite(n) если число бесконечно, то вернет -


    let appData = { // объект, содержащий все созданные переменные
        income: {}, // название доп дохода 
        addIncome: [], // дополнит доходы 
        incomeMonth: 0,
        expenses: {}, //обязательные расходы . объект
        addExpenses: [], // возможные расходы
        deposit: false, // депозит в банке
        percentDeposit: 0, // процент депозита
        moneyDeposit: 0, // сколько человек денег заложил
        budget: 0,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0, //сумма всех обязательных расходов за месяц
        start: function() {
            appData.budget = +salaryAmount.value.replace(/^\d+$/);

            appData.getExpenses();
            appData.getIncome();
            appData.getExpensesMonth();
            appData.getBudget();
            appData.getAddExpenses();
            appData.getAddIncome();
            appData.showResult();
        },
        showResult: function(){
            budgetMonthValue.value = appData.budgetMonth;
            budgetDayValue.value = Math.floor(appData.budgetDay);
            expensesMonthValue.value = appData.expensesMonth;
            additionalExpensesValue.value = appData.addExpenses.join(', ');
            additionalIncomeValue.value = appData.addIncome.join(', ');
            targetMonthValue.value = appData.getTargetMonth();
            incomePeriodValue.value = appData.calcPeriod();
            periodSelect.addEventListener('input', function() {
                incomePeriodValue.value = appData.calcPeriod();
            });
        },
        addExpensesBlock: function(){
            
            let cloneExpensesItem = expensesItems[0].cloneNode(true);// взяли родителя .expenses-items
                expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
                expensesItems = document.querySelectorAll('.expenses-items');
            if(expensesItems.length === 3){
                expensesPlus.style.display = 'none';
            }
            
        },
        addIncomeBlock: function(){ // для добавления новых полей при нажатии плюса
            
            let cloneIncomeItem = incomeItems[0].cloneNode(true);// взяли родителя .income-items
                incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
                incomeItems = document.querySelectorAll('.income-items');
            if(incomeItems.length === 3){
                incomePlus.style.display = 'none';
            }
            
        },
        getIncome: function(){
            incomeItems.forEach(function(item, index){ // перебирать будем элементы
                let itemIncome = /^[а-яё]+$/.item.querySelector('input.income-title').value;
                let cashIncome = +item.querySelector('.income-amount').value;
                //cashIncome.value = /^\d+$/;
                //itemIncome = "";
                //cashIncome = "";
                if(itemIncome !== '' && cashIncome !== ''){
                    appData.income[itemIncome + index] = cashIncome;
                }
            });

            for(let key in appData.income){
                appData.incomeMonth += +appData.income[key];
            }
        },
        getExpenses: function(){
            expensesItems.forEach(function(item, index){ // перебирать будем элементы
                let itemExpenses = item.querySelector('input.expenses-title').value;
                let cashExpenses = +item.querySelector('.expenses-amount').value;
                //cashExpenses.value = cashExpenses.value.replace(/^\d+$/);
                //itemExpenses = "";
                //cashExpenses = "";
                if(itemExpenses !== '' && cashExpenses !== ''){
                    appData.expenses[itemExpenses + index] = cashExpenses;
                }
            });
        },
        getAddExpenses: function(){ // возможные расходы ввод строкой
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function(item){
                item = item.trim();
                if(item !== ''){
                    appData.addExpenses.push(item);
                }
            });
        },
        getAddIncome: function(){ // доп доходы
            additionalIncomeItem.forEach(function(item){
                let itemValue = item.value.trim();
                if(itemValue !== ''){
                    appData.addIncome.push(itemValue);
                }
            });
        },
        getExpensesMonth: function() { //сумма всех обязательных расходов за месяц
            for (let item in appData.expenses) {
                appData.expensesMonth += appData.expenses[item];
            }
        },
        getBudget: function() { //бюджет на месяц и на день
            appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth; 
            appData.budgetDay =  Math.floor(appData.budgetMonth) / 30;
        },
        getTargetMonth: function() { // сколько месяцев надо что бы накопить
            return Math.ceil(targetAmount.value / appData.budgetMonth);
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
        calcPeriod: function() { // метод умножает период на месячный бюджет
            return appData.budgetMonth * periodSelect.value;
        }  
    };

    start.disabled = true; // проверка введено ли значение месячного дохода
    salaryAmount.addEventListener('input', function() {
        if (salaryAmount.value) {
          start.disabled = false;
        } else {
          start.disabled = true;
        }
    });


    start.addEventListener('click', appData.start);

    expensesPlus.addEventListener('click', appData.addExpensesBlock);
    incomePlus.addEventListener('click', appData.addIncomeBlock);
    periodSelect.addEventListener('input', function() { // для того,чтобы цифра менялась на полосе
        periodAmount.innerHTML = periodSelect.value;
    });

    //if (appData.period < 0) {
    //    console.log('Цель не будет достигнута');
    //} else {
    //    console.log('Цель осуществима');
    //}


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
    // была проблема работы цикла! тк в addExpenses.toLowerCase().split(', ')  
    //было без пробела split(',') и 0 символом считывался именно пробел


    //for(let item in appData) { // цикл, перебирающий все данные в объекте appData
    //    console.log('Наша программа включает в себя данные:', item, appData[item]);
    //}


    console.log(appData);
});