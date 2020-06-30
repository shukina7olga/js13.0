document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    let start = document.getElementById('start'),
        cancel = document.getElementById('cancel'),
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
        periodAmount = document.querySelector('.period-amount'), // цифра под полоской
        depositBank = document.querySelector('.deposit-bank'),
        depositAmount = document.querySelector('.deposit-amount'),
        depositPercent = document.querySelector('.deposit-percent');



    const isNumber = (n) => { // принимает число и возвращает + или -
        return !isNaN(parseFloat(n)) && isFinite(n); // ! чтобы +если число, - если стр
    }; // isFinite(n) если число бесконечно, то вернет -


    class AppData {
        constructor(){
            this.income = {}; // название доп дохода 
            this.addIncome =  []; // дополнит доходы 
            this.incomeMonth = 0;
            this.expenses =  {}; //обязательные расходы . объект
            this.addExpenses =  []; // возможные расходы
            this.deposit =  false; // депозит в банке
            this.percentDeposit =  0; // процент депозита
            this.moneyDeposit =  0; // сколько человек денег заложил
            this.budget =  0;
            this.budgetDay =  0;
            this.budgetMonth =  0;
            this.expensesMonth =  0; //сумма всех обязательных расходов за месяц
        }

        start() {
            this.budget = +salaryAmount.value;

            this.getExpenses();
            this.getIncome();
            this.getExpensesMonth();
            this.getInfoDeposit();
            this.getBudget();
            this.getAddExpenses();
            this.getAddIncome();
            this.showResult();
            incomePlus.disabled = true;
            expensesPlus.disabled = true;
            const cleanInput = document.querySelectorAll('input[type="text"]');
            for (let i = 0; i < cleanInput.length; i++) {
                cleanInput[i].disabled = true;
            }
        }

        showResult() {
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = Math.floor(this.budgetDay);
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            targetMonthValue.value = this.getTargetMonth();
            incomePeriodValue.value = this.calcPeriod();
            periodSelect.addEventListener('input', () => {
                incomePeriodValue.value = this.calcPeriod();
            });
        }
        
        addExpensesBlock() {
            const cloneExpensesItem = expensesItems[0].cloneNode(true);// взяли родителя .expenses-items
                expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
                expensesItems = document.querySelectorAll('.expenses-items');
            if(expensesItems.length === 3){
                expensesPlus.style.display = 'none';
            }      
        }
    
        addIncomeBlock() { // для добавления новых полей при нажатии плюса
            const cloneIncomeItem = incomeItems[0].cloneNode(true);// взяли родителя .income-items
                incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
                incomeItems = document.querySelectorAll('.income-items');
            if(incomeItems.length === 3){
                incomePlus.style.display = 'none';
            }     
        }
    
        getIncome() {
            incomeItems.forEach((item, index) => { // перебирать будем элементы
                const itemIncome = item.querySelector('input.income-title').value;
                const cashIncome = +item.querySelector('.income-amount').value;
                if(itemIncome !== '' && cashIncome !== ''){
                    this.income[itemIncome + index] = cashIncome;
                }
            });
    
            for(let key in this.income){
                this.incomeMonth += +this.income[key];
            }
        }
    
        getExpenses() {
            expensesItems.forEach((item, index) => { // перебирать будем элементы
                const itemExpenses = item.querySelector('input.expenses-title').value;
                const cashExpenses = +item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== ''){
                    this.expenses[itemExpenses + index] = cashExpenses;
                }
            });
        }
    
        getAddExpenses() { // возможные расходы ввод строкой
            const addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach((item) => {
                item = item.trim();
                if(item !== ''){
                    this.addExpenses.push(item);
                }
            });
        }

        getAddIncome() { // доп доходы
            additionalIncomeItem.forEach((item) => {
                const itemValue = item.value.trim();
                if(itemValue !== ''){
                    this.addIncome.push(itemValue);
                }
            });
        }
    
        getExpensesMonth() { //сумма всех обязательных расходов за месяц
            for (const item in this.expenses) {
                this.expensesMonth += this.expenses[item];
            }
        }
    
        getBudget() { //бюджет на месяц и на день
            const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit; 
            this.budgetDay =  Math.floor(this.budgetMonth) / 30;
        }
    
        getTargetMonth() { // сколько месяцев надо что бы накопить
            return Math.ceil(targetAmount.value / this.budgetMonth);
        }
    
        getStatusIncome() {
            if (this.budgetDay > 1200) {
                return('У вас высокий уровень дохода');
            } else if (1200 >= this.budgetDay >= 600) {     //budgetDay > 600 && budgetDay < 1200 
                return('У вас средний уровень дохода');
            } else if (this.budgetDay > 600 || this.budgetDay === 0) {
                return('К сожалению, у вас уровень дохода ниже среднего');
            } else if (this.budgetDay < 0) {
                return('Что-то пошло не так');
            }
        }
    
        getInfoDeposit() { // спрашиваем доп инфу о депозите
            if(this.deposit){
                do {
                    this.percentDeposit = depositPercent.value;
                    this.moneyDeposit = depositAmount.value; // деньги, которые вложили
                } while(!isNumber(this.percentDeposit) || !isNumber(this.moneyDeposit));    
            }
        }
    
        calcPeriod() { // метод умножает период на месячный бюджет
            return this.budgetMonth * periodSelect.value;
        }
    
        btnMain() {
            start.style.display = 'none';
            cancel.style.display = 'block';
        }
    
        btnMainRevers() {
            start.style.display = 'block';
            cancel.style.display ='none';
            if (salaryAmount.value) {
                start.disabled = false; 
            } else {
                start.disabled = true;
            }
        }
    
        reset() {   
            const cleanInput = document.querySelectorAll('input[type="text"]');
            for (let i = 0; i < cleanInput.length; i++) {
                cleanInput[i].value = '' ;
                cleanInput[i].disabled = false;
            }
    
            incomeItems = document.querySelectorAll('.income-items');
            incomeItems.forEach((item, index) => {
                if(index !==0) {
                    item.remove();
                }
            });
            expensesItems = document.querySelectorAll('.expenses-items');
            expensesItems.forEach((item, index) => {
                if(index !==0) {
                    item.remove();
                }
            });
            if(incomePlus.style.display === 'none' || expensesPlus.style.display === 'none'){
                incomePlus.style.display = 'block';
                expensesPlus.style.display = 'block';
            }  
            
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
    
            periodSelect.value = 1;
            periodAmount.innerHTML = 1;
            incomePlus.disabled = false;
            expensesPlus.disabled = false;
        }
        
        changePercent() { // узнаем какой банк выбран
            const valueSelect = this.value;
            if(valueSelect === 'other'){
                depositPercent.value = '';
                depositPercent.style.display = 'inline-block';

            } else {
                depositPercent.value = valueSelect;
                depositPercent.style.display = 'none';
            }
        }
        
        depositHandler() { // проверяем стоит галочка или нет
            if(depositСheck.checked) { // галка установлена
                depositBank.style.display = 'inline-block';
                depositAmount.style.display = 'inline-block';
                this.deposit = true;
                depositBank.addEventListener('change', this.changePercent);
            } else {
                depositBank.style.display = 'none';
                depositAmount.style.display = 'none';
                depositBank.value = '';
                depositAmount.value = '';
                this.deposit = false;
                depositBank.removeEventListener('change', this.changePercent);
            }
        }

        eventsListeners() {
            start.disabled = true; // проверка введено ли значение месячного дохода
            salaryAmount.addEventListener('input', () => {
                if (salaryAmount.value) {
                  start.disabled = false; 
                } else {
                  start.disabled = true;
                }
            });
    
            start.addEventListener('click', this.start.bind(this));
            start.addEventListener('click', this.btnMain.bind(this));
        
            expensesPlus.addEventListener('click', this.addExpensesBlock);
            incomePlus.addEventListener('click', this.addIncomeBlock);
            periodSelect.addEventListener('input', () => { // для того,чтобы цифра менялась на полосе
                periodAmount.innerHTML = periodSelect.value;
            });
        
        
            cancel.addEventListener('click', this.reset.bind(this));
            cancel.addEventListener('click', this.btnMainRevers.bind(this));

            depositСheck.addEventListener('change', this.depositHandler.bind(this));
        }

    }
    



    const appData = new AppData();
    appData.eventsListeners();

    console.log(appData);  

});
