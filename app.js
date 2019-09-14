class Calculator {
  constructor(rollInputTextElement, rollResultTextElement) {
    this.rollInputTextElement = rollInputTextElement;
    this.rollResultTextElement = rollResultTextElement;
    this.clearAll();
  }

  clearAll() {
    this.rollInput = "";
    this.rollResult = "";
    this.operation = undefined;
  }

  clearResult() {
    this.rollResult = "";
    this.operation = undefined;
  }

  clearInput() {
    this.rollInput = "";
    this.operation = undefined;
  }

  delete() {
    this.rollInput = this.rollInput.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (this.rollInput[this.rollInput.length - 1] == "=") {
      this.clearInput();
    }
    if (number === "d" && this.rollInput[this.rollInput.length - 1] == "d")
      return;
    this.rollInput = this.rollInput.toString() + number.toString();
  }

  addOperation(operation) {
    if (this.rollInput === "") return;
    /* if (this.rollInput !== "") {
      this.compute();
    } */
    this.operation = operation;
    /*  this.rollInput = this.rollResult;*/
    this.rollInput = `${this.rollInput} ${this.operation} `;
  }

  d20Single() {
    this.rollResult = rollDice(20);
    this.rollInput = "1d20 =";
  }

  compute() {
    if (this.rollInput[this.rollInput.length - 1] == "=") {
      return;
    }
    let computation = 0;
    let formattedString = formatString(this.rollInput);
    for (let i = 0; i < formattedString.length; i++) {
      let arr = formattedString[i].split("d");
      formattedString[i] = arr;
    }
    this.clearResult();
    this.rollInput = `${this.rollInput} =`;
    this.rollResult = `${calcTotal(formattedString)}`;

    /*  let computation;
    const prev = parseFloat(this.rollInput);
    const current = parseFloat(this.rollResult);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.operation = undefined;
    this.rollInput = ""; */
  }

  /*  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  } */
  updateInput() {
    this.rollInputTextElement.innerText = this.rollInput;
  }

  updateResult() {
    this.rollResultTextElement.innerText = this.rollResult;
  }

  updateHistory() {
    let rollDiv = document.createElement("div");
    console.log(rollDiv);
    let historyInput = document.createTextNode(`${this.rollInput}`);
    let historyResult = document.createTextNode(`${this.rollResult}`);
    let container = historyDiv;
    rollDiv.appendChild(historyInput);
    rollDiv.appendChild(historyResult);
    container.insertBefore(rollDiv, container.childNodes[1]);
  }
}
let counter = 0;
const numberButtons = document.querySelectorAll("[data-number]");
const d20Button = document.querySelector("[data-d20]");
const operationButtons = document.querySelectorAll("[data-operation]");
const rollButton = document.querySelector("[data-roll]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const rollInputTextElement = document.querySelector("[data-roll-input]");
const rollResultTextElement = document.querySelector("[data-roll-result]");
const historyDiv = document.querySelector("[data-history]");

const calculator = new Calculator(rollInputTextElement, rollResultTextElement);

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateInput();
  });
});

operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.addOperation(button.innerText);
    calculator.updateInput();
  });
});

rollButton.addEventListener("click", button => {
  calculator.compute();
  calculator.updateResult();
  calculator.updateHistory();
  calculator.updateInput();
});

allClearButton.addEventListener("click", button => {
  calculator.clearAll();
  calculator.updateInput();
  calculator.updateResult();
});

deleteButton.addEventListener("click", button => {
  calculator.delete();
  calculator.updateInput();
});

d20Button.addEventListener("click", button => {
  calculator.d20Single();
  calculator.updateInput();
  calculator.updateResult();
  calculator.updateHistory();
});

function formatString(string) {
  let newString = string.replace(/\s/g, "");
  newString = newString.split("+");
  return newString;
}

function calcTotal(arr) {
  let total = 0;
  let counter = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i][0]; j++) {
      let result = rollDice(arr[i][1]);
      counter++;
      total += result;
      console.log(`Roll ${counter}: ${result}`);
    }
  }
  return total;
}

function rollDice(num) {
  return Math.floor(Math.random() * num + 1);
}
