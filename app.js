window.onload = function() { //todo перенести объявление всех переменных в начало функции, использовать ключевое слово var только один раз, как например в функции-обработчике onCalculateButtonClick
	var button = document.getElementById('calculateButton');
	button.onclick = onCalculateButtonClick; 
	var option = document.getElementById('newselect');
	option.onchange = onNoneOption;
	var buttonTable = document.getElementById('buttonTable');
	buttonTable.onclick = onButtonTableClick;
}

var onNoneOption = function() { //todo использовать ключевое слово var только один раз, как например в функции-обработчике onCalculateButtonClick, переименовать opt1-4 во что-нибудь значащее
	var sum = document.getElementById("opt1");
	var months = document.getElementById("opt2");
	var payment = document.getElementById("opt3");
	var percent = document.getElementById("opt4");
	var select = document.getElementById("newselect");
	if (select.selectedIndex == 0) { //todo переделать на switch
		sum.style.display = "none";
		months.style.display = "table-row";
		payment.style.display = "table-row";
		percent.style.display = "table-row";
	}
	if (select.selectedIndex == 1) {
		sum.style.display = "table-row";
		months.style.display = "none";
		payment.style.display = "table-row";
		percent.style.display = "table-row";
	}
	if (select.selectedIndex == 2) {
		sum.style.display = "table-row";
		months.style.display = "table-row";
		payment.style.display = "none";
		percent.style.display = "table-row";
	}
	if (select.selectedIndex == 3) {
		sum.style.display = "table-row";
		months.style.display = "table-row";
		payment.style.display = "table-row";
		percent.style.display = "none";
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

var calculateMonths = function() { //todo забыл параметры передать
	var payment = ((percent / 12 / 100) * (Math.pow((1 + percent / 12 / 100), months)) / (Math.pow((1 + percent / 12 / 100), months) - 1)) * price;
	return months; 
}

var calculatePercent = function() { //todo реализовать расчет процентов
	return 'calculate percent';
}

var onCalculateButtonClick = function() {
	var price = document.getElementById("price"),
		months = document.getElementById("months"),
		percent = document.getElementById("percent"),
		payment = document.getElementById("monthlyPayment"),
		result = document.getElementById('result'),
		resultValue,
		select = document.getElementById("newselect").selectedIndex;

	if (select == 0) { //todo переделать на switch
		var priceCorrect = validatePriceValues();
		if (priceCorrect) {
			resultValue = calculateSum(payment.value, percent.value, months.value);
		} 
		else {
			return;
		}		
	}
	if (select == 1) {
		var monthsCorrect = validateMonthsValues() 
		if (monthsCorrect) {
			resultValue = calculateMonths();
		}
		else {
			return;
		}		
	}
	if (select == 2) {
		var percentCorrect = validatePercentValues();
		if  (percentCorrect) {
			resultValue = calculatePercent();
		}
		else {
			return;
		}		
	}
	if (select == 3) {
		var monthlyPaymentCorrect = validateMonthlyPaymentValues();
		if (monthlyPaymentCorrect) {
			resultValue = calculateMonthlyPayment(price.value, months.value, percent.value);
		}
		else {
			return;
		}
	}
	result.value = resultValue;
}

var onButtonTableClick = function() { //todo использовать ключевое слово var только один раз, как например в функции-обработчике onCalculateButtonClick,
 	var months = document.getElementById("months").value;
 	var payment = document.getElementById("result").value;
 	var table = configureTable();
 	var date = new Date();
 	var year = date.getFullYear();
 	var month = date.getMonth();
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
	var table = document.createElement('table');//todo использовать ключевое слово var только один раз, как например в функции-обработчике onCalculateButtonClick,
 	table.id = 't1';
	table.width = 500;
	table.border = 1;
	table.createTHead();
	var header = table.createTHead();
	var row = header.insertRow(0);
    var cellNumber = row.insertCell(-1);
    var cellDate = row.insertCell(-1);
    var cellPayment = row.insertCell(-1);
    cellNumber.innerHTML = "<b>№</b>";
    cellDate.innerHTML = "<b>Дата</b>";
    cellPayment.innerHTML = "<b>Платеж</b>";
    return table;
} 

var validateMonthlyPaymentValues = function() {
	var price = document.getElementById("price"),
		months = document.getElementById("months"),
		percent = document.getElementById("percent");
	if (percent.value > 100 || percent.value < 0) {
		console.log("Введенное значение для процентов указано не верно. Значение процентов должно быть в пределах от 0 до 100");
		return false;
	}
	if (months.value > 360 || months.value < 6) {
		console.log("Введенное значение для срока кредита указано не верно. Срок кредита в пределах от 6 до 360 месяцев");
		return false;
	}
	if (price.value > 100000000 || price.value < 10000) {
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
		payment = document.getElementById("monthlyPayment");
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