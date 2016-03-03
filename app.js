window.onload = function() { 
	var button = document.getElementById('calculateButton'),
		option = document.getElementById('newselect'),
		buttonTable = document.getElementById('buttonTable');
	button.onclick = onCalculateButtonClick; 	
	option.onchange = onNoneOption;	
	buttonTable.onclick = onButtonTableClick;
}

var onNoneOption = function() {
	var sum = document.getElementById("optSum"),
		months = document.getElementById("optMonths"),
		payment = document.getElementById("optPayment"),
		percent = document.getElementById("optPercent"),
		select = document.getElementById("newselect");
	switch (select.selectedIndex) {
		case 0:
		sum.style.display = "none";
		months.style.display = "table-row";
		payment.style.display = "table-row";
		percent.style.display = "table-row";
		break;
		
		case 1:
		sum.style.display = "table-row";
		months.style.display = "none";
		payment.style.display = "table-row";
		percent.style.display = "table-row";
		break;
		   	   
   	   case 2:
   	   	sum.style.display = "table-row";
		months.style.display = "table-row";
		payment.style.display = "table-row";
		percent.style.display = "none";
		break;
		
		case 3:
		sum.style.display = "table-row";
		months.style.display = "table-row";
		payment.style.display = "none";
		percent.style.display = "table-row";
}
}

var calculateSum = function(payment, percent, months) {
	var price = payment / ((percent / 12 / 100) * (Math.pow((1 + percent / 12 / 100), months)) / (Math.pow((1 + percent / 12 / 100), months) - 1));
	return price;
}

var calculateMonthlyPayment = function(price, months, percent) {
	var payment = ((percent / 12 / 100) * (Math.pow((1 + percent / 12 / 100), months)) / (Math.pow((1 + percent / 12 / 100), months) - 1)) * price;
	return  payment;
}

var calculateMonths = function(price, payment, percent) {
	var	i = 0;
	while (price > 0) {
		i++;
		price = price - (payment - price * percent / 100 / 12);
	}
	return i;
}

var calculatePercent = function() { //todo реализовать расчет процентов
	return 'calculatePercent';
}

var onCalculateButtonClick = function() {
	var price = document.getElementById("price"),
		months = document.getElementById("months"),
		percent = document.getElementById("percent"),
		payment = document.getElementById("monthlyPayment"),
		result = document.getElementById('result'),
		resultValue,
		select = document.getElementById("newselect").selectedIndex;

	switch (select) { 
		case 0:
		if (validatePriceValues()) {
			resultValue = calculateSum(payment.value, percent.value, months.value);
		}
		else {
			return;
		}
		break;
		
		case 1: 
		if (validateMonthsValues()) {
			resultValue = calculateMonths(price.value, payment.value, percent.value);
		}
		else {
			return;
		}
		break;			
	
		case 2:
		if (validatePercentValues()) {
		resultValue = calculatePercent();
		}
		else {
			return;
		}
		break;				
	
		case 3:
		if (validateMonthlyPaymentValues()) {
			resultValue = calculateMonthlyPayment(price.value, months.value, percent.value);
		}
		else {
			return;
		}
		break;
		}
	result.value = resultValue;
}

var onButtonTableClick = function() {
 	var months = document.getElementById("months").value,
 		payment = document.getElementById("result").value,
 		table = configureTable(),
 		date = new Date(),
 		year = date.getFullYear(),
 		month = date.getMonth();
  	for (var count = 0; count < months; count++) {
		var firstDate = new Date(year, month + count + 1, 1);
		createRow(table, count, firstDate, payment);		
	}	
	document.body.appendChild(table);
}

var createRow = function(table, i, date, payment) {
	var row = table.insertRow(-1),
		cell = row.insertCell(-1),
		cellDate = row.insertCell(-1),
		cellPayment = row.insertCell(-1),
		optionsDate  = {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric'
		};
	cellDate.width = "45%";
	cellPayment.width = "45%";
	cell.innerHTML = i + 1;
	cellDate.innerHTML = date.toLocaleString("ru", optionsDate);
	cellPayment.innerHTML = (Number(payment)).toFixed(2);
}

var configureTable = function() {
	var table = document.createElement('table'),
 		header = table.createTHead(),
		row = header.insertRow(0),
    	cellNumber = row.insertCell(-1),
    	cellDate = row.insertCell(-1),
    	cellPayment = row.insertCell(-1);
    table.id = 't1';
	table.width = 500;
	table.border = 1;
	table.createTHead();
    cellNumber.innerHTML = "<b>№</b>";
    cellDate.innerHTML = "<b>Дата</b>";
    cellPayment.innerHTML = "<b>Платеж</b>";
    return table;
} 

var validateMonthlyPaymentValues = function(form) {
	var price = document.getElementById("price"),
		months = document.getElementById("months"),
		percent = document.getElementById("percent"),
		falsePrice = document.getElementById("false");	
	if (percent.value > 100 || percent.value < 0) {
		console.log("Введенное значение для процентов указано не верно. Значение процентов должно быть в пределах от 0 до 100");
		return false;
	}
	if (months.value > 360 || months.value < 6) {
		console.log("Введенное значение для срока кредита указано не верно. Срок кредита в пределах от 6 до 360 месяцев");
		return false;
	}
	if (price.value > 100000000 || price.value < 10000) {
		falsePrice.style.display = "table-row";
		console.log("Введенное значение для цены покупки указано не верно. Цена покупки должна быть в пределах от 100000 до 10000000");
		return false;
	}
	return true;
}

var validatePriceValues = function() {
	var months = document.getElementById("months"),
		percent = document.getElementById("percent"),
		payment = document.getElementById("monthlyPayment");
	if (percent.value > 100 || percent.value < 0) {
	console.log("Введенное значение для процентов указано не верно. Значение процентов должно быть в пределах от 0 до 100");
		return false;
	}
	if (months.value > 360 || months.value < 6) {
		console.log("Введенное значение для срока кредита указано не верно. Срок кредита в пределах от 6 до 360 месяцев");
		return false;
	}
	if (monthlyPayment.value < 1000) {
		console.log("Введенное значение для месячного платежа указано не верно. Месячный платеж должен быть больше 1000");
		return false;
	}
	return true;
}

var validateMonthsValues = function() {
	var price = document.getElementById("price"),
		percent = document.getElementById("percent"),
		payment = document.getElementById("monthlyPayment"),
		monthlyPayment = document.getElementById("monthlyPayment");

	if (monthlyPayment.value < (price.value * percent.value / 100 / 12)) {
	console.log("Месячный платеж меньше выплачеваемых процентов по кредиту. Необходима увеличить сумму месячного платежа");
		return false;
	}
	if (percent.value > 100 || percent.value < 0) {
	console.log("Введенное значение для процентов указано не верно. Значение процентов должно быть в пределах от 0 до 100");
		return false;
	}
	if (price.value > 100000000 || price.value < 10000) {
		console.log("Введенное значение для цены покупки указано не верно. Цена покупки должна быть в пределах от 100000 до 10000000");
		return false;
	}
	if (monthlyPayment.value < 1000) {
		console.log("Введенное значение для месячного платежа указано не верно. Месячный платеж должен быть больше 1000");
		return false;
	}
	return true;
}

var validatePercentValues = function() {
	var price = document.getElementById("price"),
		months = document.getElementById("months"),
		payment = document.getElementById("monthlyPayment");
	if (months.value > 360 || months.value < 6) {
		console.log("Введенное значение для срока кредита указано не верно. Срок кредита в пределах от 6 до 360 месяцев");
		return false;
	}
	if (price.value > 100000000 || price.value < 10000) {
		console.log("Введенное значение для цены покупки указано не верно. Цена покупки должна быть в пределах от 100000 до 10000000");
		return false;
	}
	if (monthlyPayment.value < 1000) {
		console.log("Введенное значение для месячного платежа указано не верно. Месячный платеж должен быть больше 1000");
		return false;
	}
	return true;
}