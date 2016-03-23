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
			months.style.display = "block";
			payment.style.display = "block";
			percent.style.display = "block";
			break;
		
		case 1:
			sum.style.display = "block";
			months.style.display = "none";
			payment.style.display = "block";
			percent.style.display = "block";
			break;
		   	   
   	   case 2:
	   	   	sum.style.display = "block";
			months.style.display = "block";
			payment.style.display = "block";
			percent.style.display = "none";
			break;
		
		case 3:
			sum.style.display = "block";
			months.style.display = "block";
			payment.style.display = "none";
			percent.style.display = "block";
}
}

var calculateSum = function(payment, percent, months) {
	var price = payment / ((percent / 12 / 100) * (Math.pow((1 + percent / 12 / 100), months)) / (Math.pow((1 + percent / 12 / 100), months) - 1));
	return (Number(price)).toFixed(2);
}

var calculateMonthlyPayment = function(price, months, percent) {
	var payment = ((percent / 12 / 100) * (Math.pow((1 + percent / 12 / 100), months)) / (Math.pow((1 + percent / 12 / 100), months) - 1)) * price;
	return  (Number(payment)).toFixed(2);
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
  	for (var i = 0; i < months; i++) {
		var firstDate = new Date(year, month + i + 1, 1);
		createRow(table, i, firstDate, payment);		
	}	
	document.body.appendChild(table);
}

var createRow = function(table, i, date, payment) {
	var row = table.insertRow(-1),
		cell = row.insertCell(-1),
		cellDate = row.insertCell(-1),
		cellPayment = row.insertCell(-1),
		// cellSumma = row.insertCell(-1),
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
	// cellSumma.innerHTML = "1";
}

var configureTable = function() {
	var table = document.createElement('table'),
 		header = table.createTHead(),
		row = header.insertRow(0),
    	cellNumber = row.insertCell(-1),
    	cellDate = row.insertCell(-1),
    	cellPayment = row.insertCell(-1);
    	// cellSumma = row.insertCell(-1);
    table.id = 't1';
	table.width = 500;
	table.border = 1;
	table.createTHead();
	cellNumber.innerHTML = "<b>№</b>";
    cellDate.innerHTML = "<b>Дата</b>";
    cellPayment.innerHTML = "<b>Платеж</b>";
    // cellSumma.innerHTML = "<b>Остаток<b>";
    return table;
} 

var validateMonthlyPaymentValues = function(form) {
	var price = document.getElementById("price"),
		months = document.getElementById("months"),
		percent = document.getElementById("percent"),
		falsePrice = document.getElementById("false"),
		errorSum = document.getElementById("errorSum"),
		errorPercent = document.getElementById("errorPercent"),
		errorMonths = document.getElementById("errorMonths");
	if (percent.value > 100 || percent.value < 0) {
		errorPercent.style.display = "block";
		return false;
	}
	if (months.value > 360 || months.value < 6) {
		errorMonths.style.display = "block";
		return false;
	}
	if (price.value > 100000000 || price.value < 10000) {
		errorSum.style.display = "block";
		return false;
	}
	return true;
}

var validatePriceValues = function() {
	var months = document.getElementById("months"),
		percent = document.getElementById("percent"),
		payment = document.getElementById("monthlyPayment"),
		errorPayment = document.getElementById("errorPayment"),
		errorPercent = document.getElementById("errorPercent"),
		errorMonths = document.getElementById("errorMonths");
	if (percent.value > 100 || percent.value < 0) {
		errorPercent.style.display = "block";
		return false;
	}
	if (months.value > 360 || months.value < 6) {
		errorMonths.style.display = "block";
		return false;
	}
	if (monthlyPayment.value < 1000) {
		errorPayment.style.display = "block";
		return false;
	}
	return true;
}

var validateMonthsValues = function() {
	var price = document.getElementById("price"),
		percent = document.getElementById("percent"),
		monthlyPayment = document.getElementById("monthlyPayment"),
		errorPayment = document.getElementById("errorPayment"),
		errorPercent = document.getElementById("errorPercent"),
		errorSum = document.getElementById("errorSum");

	if (monthlyPayment.value < (price.value * percent.value / 100 / 12)) {
		errorPayment.style.display = "block";
		return false;
	}
	if (percent.value > 100 || percent.value < 0) {
		errorPercent.style.display = "block";
		return false;
	}
	if (price.value > 100000000 || price.value < 10000) {
		errorSum.style.display = "block";
		return false;
	}
	if (monthlyPayment.value < 1000) {
		monthlyPayment.value = "неверный месячный платеж";
		monthlyPayment.style.color = "red";
		return false;
	}
	return true;
}

var validatePercentValues = function() {
	var price = document.getElementById("price"),
		months = document.getElementById("months"),
		payment = document.getElementById("monthlyPayment"),
		errorPayment = document.getElementById("errorPayment"),
		errorMonths = document.getElementById("errorMonths"),
		errorSum = document.getElementById("errorSum");
	if (months.value > 360 || months.value < 6) {
		errorMonths.style.display = "block";
		return false;
	}
	if (price.value > 100000000 || price.value < 10000) {
		errorSum.style.display = "block";
		return false;
	}
	if (monthlyPayment.value < 1000) {
		errorPayment.style.display = "block";
		return false;
	}
	return true;
}