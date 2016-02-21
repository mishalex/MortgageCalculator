window.onload = function() {	
	var button = document.getElementById('calculateButton');
	button.onclick = onCalculateButtonClick;
}

var onCalculateButtonClick = function() {
	var price = document.getElementById("price"),
		months = document.getElementById("months"),
		percent = document.getElementById("percent"),
		monthlyPaymentElement = document.getElementById('result');
	var result = caclulateMonthlyPayment(price.value, months.value, percent.value);
	document.getElementById('result').value = result;
}

var caclulateMonthlyPayment = function(price, months, percent) {
	var monthlyPayment = ((percent / 12 / 100) * (Math.pow((1 + percent / 12 / 100), months)) / (Math.pow((1 + percent / 12 / 100), months) - 1)) * price;
	return monthlyPayment;
}

var new1 = function(par1) {
	return 101;
}