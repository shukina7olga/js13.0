let money = 900000,
    income = 'фриланс',
    addExpenses = 'Продукты, Учеба, ЖКХ',
    deposit = true,
    mission = Infinity,
    period = 5,
    budgetDay;

console.log(' money: ', typeof money, '\n', 'income: ',
     typeof income, '\n', 'deposit: ', typeof deposit);

console.log(addExpenses.length);

console.log('Период равен:', period, 'месяцев', 'Цель: заработать', mission, 'рублей');

console.log(addExpenses.toLowerCase().split(','));

console.log('budgetDay: ', budgetDay = money/30);

