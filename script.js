class Calculator {
	constructor(previousOprandElement, currentOprandElement) {
		this.previousOprandElement = previousOprandElement;
		this.currentOprandElement = currentOprandElement;
		this.clear();
	}

	clear() {
		this.previousOprand = "";
		this.currentOprand = "";
		this.operation = undefined;
	}

	backSpace() {
		this.currentOprand = this.currentOprand.toString().slice(0, -1);
	}

	appendNumber(number) {
		if (number === "." && this.currentOprand.includes(".")) {
			return;
		}
		this.currentOprand = this.currentOprand.toString() + number.toString();
	}

	appendOperator(operator) {
		if (this.currentOprand === "") {
			return;
		}

		if (this.previousOprand !== "") {
			this.calculate();
		}
		this.operator = operator;
		this.previousOprand = this.currentOprand;
		this.currentOprand = "";
	}

	calculate() {

		let current = parseFloat(this.currentOprand);
		let previous = parseFloat(this.previousOprand);

		if (isNaN(current) || isNaN(previous)) {
			return;
		}

		let result;

		switch(this.operator) {
			case '+':
				result = current + previous;
				break;
			case '−':
				result = previous - current;
				break;
			case 'x':
				result = current * previous;
				break;
			case '÷':
				result = previous / current;
				break;
			case '%':
				result = previous % current;
				break;
			default:
				return;
		}

		//this.lastEnteredValue = this.currentOprand;
		this.currentOprand = result;
		//this.operator = undefined;
	}

	formattedString(number) {
		//043.4343
		const numberArray = number.toString().split(".");
		let intDigits = parseFloat(numberArray[0]);
		let decDigits = numberArray[1];
		let stringToDisplay;
		if (isNaN(intDigits)) {
			stringToDisplay = "";
		} else {
			stringToDisplay = intDigits.toLocaleString("en", {
				maximumFractionDigits: 0
			});
		}

		if (decDigits == null) {
			return stringToDisplay;
		} else {
			return `${stringToDisplay}.${decDigits}`;
		}
	}

	updateDisplay() {
		this.currentOprandElement.innerText = this.formattedString(this.currentOprand);
		if (this.operator) {
			this.previousOprandElement.innerText = `${this.formattedString(this.previousOprand)} ${this.operator}`;
		} else {

		}
	}
}

const previousOprandElement = document.querySelector("[data-previous]");
const currentOprandElement = document.querySelector("[data-current]");
const clearScreenButton = document.querySelector("[data-clear-all]");
const deleteButton = document.querySelector("[data-delete]");
const equalButton = document.querySelector("[data-equal]");
const operationButtons = document.querySelectorAll("[data-operation]");
const numberButtons = document.querySelectorAll("[data-number]");

const calculator = new Calculator(previousOprandElement, currentOprandElement);

deleteButton.addEventListener('click', () => {
	calculator.backSpace();
	calculator.updateDisplay();
});

clearScreenButton.addEventListener('click', () => {
	calculator.clear();
	calculator.updateDisplay();
});

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendOperator(button.innerText);
		calculator.updateDisplay();
	});
});

equalButton.addEventListener('click', () => {
	calculator.calculate();
	calculator.updateDisplay();
})
