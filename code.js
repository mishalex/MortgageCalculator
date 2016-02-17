var Sum = 1500000; // todo использовать в именовании lowerCamelCase стиль
var Months = 240;
var MonthsPayment; // todo не правильно переведена фраза "ежемесяный платеж"
var Percent = 13.5;
MonthsPayment = ((Percent/12/100)*(Math.pow((1+Percent/12/100),Months))/(Math.pow((1+Percent/12/100),Months)-1))*Sum; //todo отформатировать формулу, после запятой всегда и везде ставится пробел, мат. знаки отделяются пробелами от операндов
console.log(MonthsPayment);









