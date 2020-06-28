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
            this.budget = +salaryAmount.value;

            this.getExpenses();
            this.getIncome();
            this.getExpensesMonth();
            this.getBudget();
            this.getAddExpenses();
            this.getAddIncome();
            this.showResult();
        },
        showResult: function(){
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = Math.floor(this.budgetDay);
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            targetMonthValue.value = this.getTargetMonth();
            incomePeriodValue.value = this.calcPeriod();
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
                let itemIncome = item.querySelector('input.income-title').value;
                let cashIncome = +item.querySelector('.income-amount').value;
                if(itemIncome !== '' && cashIncome !== ''){
                    appData.income[itemIncome + index] = cashIncome;
                }
            });

            for(let key in this.income){
                this.incomeMonth += +this.income[key];
            }
        },
        getExpenses: function(){
            expensesItems.forEach(function(item, index){ // перебирать будем элементы
                let itemExpenses = item.querySelector('input.expenses-title').value;
                let cashExpenses = +item.querySelector('.expenses-amount').value;
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
                    this.addExpenses.push(item);
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
            for (let item in this.expenses) {
                this.expensesMonth += this.expenses[item];
            }
        },
        getBudget: function() { //бюджет на месяц и на день
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth; 
            this.budgetDay =  Math.floor(this.budgetMonth) / 30;
        },
        getTargetMonth: function() { // сколько месяцев надо что бы накопить
            return Math.ceil(targetAmount.value / this.budgetMonth);
        },
        getStatusIncome: function() {
            if (this.budgetDay > 1200) {
                return('У вас высокий уровень дохода');
            } else if (1200 >= this.budgetDay >= 600) {     //budgetDay > 600 && budgetDay < 1200 
                return('У вас средний уровень дохода');
            } else if (this.budgetDay > 600 || this.budgetDay === 0) {
                return('К сожалению, у вас уровень дохода ниже среднего');
            } else if (this.budgetDay < 0) {
                return('Что-то пошло не так');
            }
        },
        getInfoDeposit: function() { // спрашиваем доп инфу о депозите
            if(this.deposit){
                do {
                    this.percentDeposit = prompt('Какой годовой процент?', 10);
                    this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
                } while(!isNumber(this.percentDeposit) || !isNumber(this.moneyDeposit));    
            }
        },
        calcPeriod: function() { // метод умножает период на месячный бюджет
            return this.budgetMonth * periodSelect.value;
        },
        reset: function() {
            
            
            let cleanInput = document.querySelectorAll('input[type=text]');
            if(start.disabled === false){
                cleanInput = '';
                //cleanInput.disabled = true;
                this.income = {}; // название доп дохода 
                this.addIncome = []; // дополнит доходы 
                this.incomeMonth = 0;
                this.expenses = {}; //обязательные расходы . объект
                this.addExpenses = []; // возможные расходы
                this.deposit = false; // депозит в банке
                this.percentDeposit = 0; // процент депозита
                this.moneyDeposit = 0; // сколько человек денег заложил
                this.budget = 0;
                this.budgetDay = 0;
                this.budgetMonth = 0;
                this.expensesMonth = 0; //сумма всех обязательных расходов за месяц
                periodSelect.addEventListener('input', function() { // для того,чтобы цифра менялась на полосе на 1
                    periodAmount.innerHTML = 1;
                });
                //start.style.display = start.style.display === 'none';
                start.innerHTML = 'Сброс';

            }
        },
    };

    
    start.disabled = true; // проверка введено ли значение месячного дохода
    salaryAmount.addEventListener('input', function() {
        if (salaryAmount.value) {
          start.disabled = false;
        } else {
          start.disabled = true;
        }
    });

    

    start.addEventListener('click', appData.start.bind(appData));

    expensesPlus.addEventListener('click', appData.addExpensesBlock);
    incomePlus.addEventListener('click', appData.addIncomeBlock);
    periodSelect.addEventListener('input', function() { // для того,чтобы цифра менялась на полосе
        periodAmount.innerHTML = periodSelect.value;
    });


    start.addEventListener('click', appData.reset.bind(appData));



    console.log(appData);
});