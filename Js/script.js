class Calculator {
  constructor(previousOperantTextElement, currentOperantTextElement) {
    this.previousOperantTextElement = previousOperantTextElement;
    this.currentOperantTextElement = currentOperantTextElement;
    this.clear;
  }

  clear() {
    this.previousOperantTextElement = "";
    this.currentOperantTextElement = "";
    this.operation = "undefined";
  }

  delete() {
    this.currentOperant = this.currentOperant.slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperant.includes(".")) return;
    this.currentOperant = this.currentOperant + number;
  }

  //FIXME: Word undefined before Operant

  chooseOperation(operation) {
    if (this.currentOperant === "") return;
    if (this.currentOperant !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperant = this.currentOperant;
    this.currentOperant = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperant);
    const current = parseFloat(this.currentOperant);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperant = computation;
    this.operation = undefined;
    this.previousOperant = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    const floatNumber = parseFloat(number);
    if (isNaN(floatNumber)) return "";
    return floatNumber.toLocaleString("en");
  }

  updateDisplay() {
    this.currentOperantTextElement.innerText = this.currentOperant;
    if (this.operation != null) {
      this.previousOperantTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperant
      )} ${this.operation}`;
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperantTextElement = document.querySelector(
  "[data-previous-operant]"
);
const currentOperantTextElement = document.querySelector(
  "[data-current-operant]"
);

const calculator = new Calculator(
  previousOperantTextElement,
  currentOperantTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

//FIXME: Equals button does nothing.

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

//FIXME: AllClear Button(AC) only stops Input not removes the Numbers

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
