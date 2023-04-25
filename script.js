const buttons = document.querySelectorAll("button");
const result = document.getElementById("result");

let num1 = "";
let num2 = "";
let operator = "";
let shouldReset = false;

function reset() {
  num1 = "";
  num2 = "";
  operator = "";
  shouldReset = false;
  result.value = "0";
}

function handleButtonClick(event) {
  const buttonValue = event.target.innerText;

  if (buttonValue >= "0" && buttonValue <= "9") {
    if (shouldReset) {
      reset();
    }
    if (!operator) {
      num1 += buttonValue;
      result.value = num1;
    } else {
      num2 += buttonValue;
      result.value = num2;
    }
  } else if (buttonValue === ".") {
    if (shouldReset) {
      reset();
    }
    if (!operator && !num1.includes(".")) {
      num1 += ".";
      result.value = num1;
    } else if (operator && !num2.includes(".")) {
      num2 += ".";
      result.value = num2;
    }
  } else if (buttonValue === "C") {
    reset();
  } else if (buttonValue === "+/-") {
    if (operator) {
      num2 = String(Number(num2) * -1);
      result.value = num2;
    } else {
      num1 = String(Number(num1) * -1);
      result.value = num1;
    }
  } else if (buttonValue === "%" && num1 !== "") {
    num1 = String(Number(num1) / 100);
    result.value = num1;
  } else if (buttonValue === "+" || buttonValue === "-" || buttonValue === "x" || buttonValue === "÷") {
    if (num1 !== "" && num2 !== "" && operator !== "") {
      calculate();
    }
    operator = buttonValue;
    shouldReset = false;
  } else if (buttonValue === "=" && num1 !== "" && num2 !== "" && operator !== "") {
    calculate();
    shouldReset = true;
  }
}

function calculate() {
  let resultValue;
  const num1Value = Number(num1);
  const num2Value = Number(num2);

  switch (operator) {
    case "+":
      resultValue = num1Value + num2Value;
      break;
    case "-":
      resultValue = num1Value - num2Value;
      break;
    case "x":
      resultValue = num1Value * num2Value;
      break;
    case "÷":
      resultValue = num1Value / num2Value;
      break;
  }

  num1 = String(resultValue);
  num2 = "";
  operator = "";
  result.value = num1;
}

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});
