var Sum = 1500000;
var Months = 240;
var MonthsPayment;
var Percent = 13.5;
MonthsPayment = ((Percent/12/100)*(Math.pow((1+Percent/12/100),Months))/(Math.pow((1+Percent/12/100),Months)-1))*Sum;
console.log(MonthsPayment);









