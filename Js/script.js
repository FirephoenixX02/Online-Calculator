class Calculator {
  constructor(previousOperantTextElement, currentOperantTextElement) {
    this.previousOperantTextElement = previousOperantTextElement;
    this.currentOperantTextElement = currentOperantTextElement;
    this.clear;
  }

  clear() {
    this.previousOperantTextElement = "";
    this.currentOperantTextElement = "";
    this.operation = undefined;
  }

  delete() {}

  appendNumber(number) {
    if (number === "." && this.currentOperant.includes(".")) return;
    this.currentOperant = this.currentOperant + number;
  }

  chooseOperation(operation) {
    if (this.currentOperant === "") return;
    if (this.currentOperant !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperant = this.currentOperant;
    this.currentOperant = "";
  }

  compute() {}

  updateDisplay() {
    this.currentOperantTextElement.innerText = this.currentOperant;
    this.previousOperantTextElement.innerText = this.previousOperant;
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
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
