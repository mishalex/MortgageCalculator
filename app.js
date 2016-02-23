window.onload = function() {
	var button = document.getElementById('calculateButton');
	button.onclick = onCalculateButtonClick; 
	var option = document.getElementById('newselect');
	option.onchange = onNoneOption;
	var buttonTable = document.getElementById('buttonTable');
	buttonTable.onclick = onButtonTableClick; 
}

var onNoneOption = function() {
	var sum = document.getElementById("opt1");
	var months = document.getElementById("opt2");
	var payment = document.getElementById("opt3");
	var percent = document.getElementById("opt4");
	var select = document.getElementById("newselect");
	if (select.selectedIndex == 0) {
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

var calculateMonths = function() {
	var payment = ((percent / 12 / 100) * (Math.pow((1 + percent / 12 / 100), months)) / (Math.pow((1 + percent / 12 / 100), months) - 1)) * price;
	return months; 
}

var calculatePercent = function() {
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
	if (select == 0) {
		resultValue = calculateSum(payment.value, percent.value, months.value);
	}
	if (select == 1) {
		resultValue = calculateMonths();
	}
	if (select == 2) {
		resultValue = calculatePercent();
	}
	if (select == 3) {
		resultValue = calculateMonthlyPayment(price.value, months.value, percent.value);
	}
	result.value = resultValue;
}

var onButtonTableClick = function() {
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
	var table = document.createElement('table');
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

