const input = document.getElementById("input");
const submit = document.getElementById("submit");
const plusButtons = document.querySelectorAll(".plusButton");
const minusButtons = document.querySelectorAll(".minusButton");
const diceButtons = document.querySelectorAll(".diceButton");
const result = document.querySelector(".result");
const clear = document.getElementById("clear");
const log = document.getElementById("log");
var counter = 1;

let diceObj = {
  20: {
    qty: 0,
    value: 20
  },
  12: {
    qty: 0,
    value: 12
  },
  10: {
    qty: 0,
    value: 10
  },
  8: {
    qty: 0,
    value: 8
  },
  6: {
    qty: 0,
    value: 6
  },
  4: {
    qty: 0,
    value: 4
  }
};

plusButtons.forEach(button => button.addEventListener("click", plusOne));
minusButtons.forEach(button => button.addEventListener("click", minusOne));
diceButtons.forEach(button => button.addEventListener("click", rollSingle));

/* Resets the input box */
clear.addEventListener("click", () => {
  input.value = "";
  diceObj = {
    20: {
      qty: 0,
      value: 20
    },
    12: {
      qty: 0,
      value: 12
    },
    10: {
      qty: 0,
      value: 10
    },
    8: {
      qty: 0,
      value: 8
    },
    6: {
      qty: 0,
      value: 6
    },
    4: {
      qty: 0,
      value: 4
    }
  };
});

function rollSingle() {
  result.innerHTML = rollDice(this.value);
}

function plusOne() {
  diceObj[this.value].qty += 1;
  let text = "";
  let diceArray = [20, 12, 10, 8, 6, 4];
  let textArray = [
    `${diceObj[20].qty}d20`,
    `${diceObj[12].qty}d12`,
    `${diceObj[10].qty}d10`,
    `${diceObj[8].qty}d8`,
    `${diceObj[6].qty}d6`,
    `${diceObj[4].qty}d4`
  ];

  for (let i = 0; i < textArray.length; i++) {
    if (text == "" && diceObj[diceArray[i]].qty != 0) {
      if (diceObj[diceArray[i]].qty != 0) {
        text += `${textArray[i]}`;
      }
    } else if (diceObj[diceArray[i]].qty != 0) {
      text += ` + ${textArray[i]}`;
    }
  }
  input.value = text;
}

function minusOne() {
  console.log("working");
  diceObj[this.value].qty -= 1;
  let text = "";
  let diceArray = [20, 12, 10, 8, 6, 4];
  let textArray = [
    `${diceObj[20].qty}d20`,
    `${diceObj[12].qty}d12`,
    `${diceObj[10].qty}d10`,
    `${diceObj[8].qty}d8`,
    `${diceObj[6].qty}d6`,
    `${diceObj[4].qty}d4`
  ];

  for (let i = 0; i < textArray.length; i++) {
    if (diceObj[diceArray[i]].qty < 0) {
      diceObj[diceArray[i]].qty = 0;
    } else if (text == "" && diceObj[diceArray[i]].qty != 0) {
      if (diceObj[diceArray[i]].qty != 0) {
        text += `${textArray[i]}`;
      }
    } else if (diceObj[diceArray[i]].qty != 0) {
      text += ` + ${textArray[i]}`;
    }
  }
  input.value = text;
}

/*Rolls dice based on input value when submit is clicked*/
submit.addEventListener("click", text2Roll);

function text2Roll() {
  inputValue = input.value;
  value = input.value;

  value = removeSpaces(value);
  value = removePlus(value);
  for (let i = 0; i < value.length; i++) {
    let arr = value[i].split("d");
    value[i] = arr;
  }
  rollResult = calcTotal(value);

  result.innerHTML = rollResult;
  console.log(result);
  roll2Log(rollResult, inputValue);
}

function rollDice(num) {
  return Math.floor(Math.random() * num + 1);
}

function removeSpaces(string) {
  return string.replace(/\s/g, "");
}

function removePlus(string) {
  return string.split("+");
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

function roll2Log(result, inputString) {
  console.log("roll2Log");
  console.log(result);
  console.log(inputString);

  let paragraph = document.createElement("p");
  let text = document.createTextNode(`${counter}. ${inputString} = ${result} `);
  paragraph.appendChild(text);
  let span = document.createElement("span");
  var spanText = document.createElement("input");
  span.appendChild(spanText);
  paragraph.appendChild(span);
  console.log(paragraph);

  paragraph.classList.add("tooltip");
  span.classList.add("tooltiptext");
  spanText.placeholder = "Add notes here";
  log.insertBefore(paragraph, log.childNodes[0]);
  counter++;
}
