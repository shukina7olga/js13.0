//document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    let start = document.getElementById('start'),
        incomePlus = document.getElementsByTagName('button')[0],
        expensesPlus = document.getElementsByTagName('button')[1],
        checkbox = document.querySelector('#deposit-check'), // с диезом - ID
        additionalIncome = document.querySelectorAll('.additional_income-item'), // с точкой - КЛАСС
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
    
        addExpenses = document.querySelector('.additional_expenses-item'),
        mission = document.querySelector('.target-amount'),
        periodSelect = document.querySelector('.period-select');



    let isNumber = function(n) { // принимает число и возвращает + или -
        return !isNaN(parseFloat(n)) && isFinite(n); // ! чтобы +если число, - если стр
    }; // isFinite(n) если число бесконечно, то вернет -


    let appData = { // объект, содержащий все созданные переменные
        income: {}, // название доп дохода 
        addIncome: [], // дополнит доходы 
        expenses: {}, //обязательные расходы . объект
        addExpenses: [], // возможные расходы
        deposit: false, // депозит в банке
        percentDeposit: 0, // процент депозита
        moneyDeposit: 0, // сколько человек денег заложил
        mission: 50000, // цель накопить денег
        period: 0, // 
        budget: 0,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0, //сумма всех обязательных расходов за месяц
        start: function() {
            if(salaryAmount.value === ''){
                alert('Ошибка. Заполните поле "Месячный доход"');
                return;
            }
            appData.budget = salaryAmount.value;

            appData.getExpenses();
            appData.getIncome();
            appData.getExpensesMonth();
            appData.getBudget();
            
            appData.showResult();
        },
        showResult: function(){
            budgetMonthValue = appData.budgetMonth;
            budgetDayValue = appData.budgetDay;
            expensesMonthValue = appData.expensesMonth;
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
            incomeItems.forEach(function(item){ // перебирать будем элементы
                let itemIncome = +item.querySelector('input.income-title').value;
                let cashIncome = +item.querySelector('.income-amount').value;

                if(itemIncome !== '' && cashIncome !== ''){
                    appData.income[itemIncome] = cashIncome;
                }
            });
        },
        getExpenses: function(){
            expensesItems.forEach(function(item){ // перебирать будем элементы
                let itemExpenses = +item.querySelector('input.expenses-title').value;
                let cashExpenses = +item.querySelector('.expenses-amount').value;

                if(itemExpenses !== '' && cashExpenses !== ''){
                    appData.expenses[itemExpenses] = cashExpenses;
                }
            });
        },
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
            
        },
        getExpensesMonth: function() { //сумма всех обязательных расходов за месяц
            for (let item in appData.expenses) {
                appData.expensesMonth += appData.expenses[item];
            }
        },
        getBudget: function() { //бюджет на месяц и на день
            appData.budget = salaryAmount.value;
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

    start.addEventListener('click', appData.start);

    expensesPlus.addEventListener('click', appData.addExpensesBlock);
    incomePlus.addEventListener('click', appData.addIncomeBlock);
  
    appData.getTargetMonth();
    appData.getStatusIncome();
    appData.getInfoDeposit();
    appData.calcSaveMoney();

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
    // была проблема работы цикла! тк в addExpenses.toLowerCase().split(', ')  было без пробела split(',') и 0 символом считывался именно пробел


    //console.log(appData.getStatusIncome());
   // console.log('Рассходы за месяц', +appData.expensesMonth);
    //console.log('Месяцев, что бы накопить', appData.mission, 'будет',  Math.ceil(appData.period));
   // console.log('Бюджет на 1 день:', Math.floor(appData.budgetDay));


    //for(let item in appData) { // цикл, перебирающий все данные в объекте appData
    //    console.log('Наша программа включает в себя данные:', item, appData[item]);
    //}

    // console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSaveMoney());

//});