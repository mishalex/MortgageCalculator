// var priceJS = document.getElementById("price");
// sum = priceJS;
// console.log(sum);
// // var firstPriceJS = document.getElementById("firstPrice");
// // sdfsdf = firstPriceJS;
// // console.log(sum);
// var yearJS = document.getElementById("year");
// months = yearJS;
// console.log(months);
// var PercentJS = document.getElementById("Percent");
// percent = PercentJS;
// console.log(percent);


sum = prompt("Сумму кредита");
months = prompt("Срок выплаты, в месяцах");
percent = prompt("Процентная ставка");


// var sum = 1000; 
// var months = 120;
// var percent = 10;
var monthlyPayment;
monthlyPayment = ((percent / 12 / 100) * (Math.pow((1 + percent / 12 / 100), months)) / (Math.pow((1 + percent / 12 / 100), months) - 1)) * sum; 
document.write(monthlyPayment);














