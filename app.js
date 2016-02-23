window.onload = function() {	
	var button = document.getElementById('calculateButton');
	button.onclick = onCalculateButtonClick; 
	var option = document.getElementById('newselect');
	option.onchange = onNoneOption;
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