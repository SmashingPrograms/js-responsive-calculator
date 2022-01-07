//going ahead and defining all my main selectors here
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
let calculatorDisplay = document.querySelector('.calculator-screen');

function pushNumber(num) {
  console.log(num.target.value)
  if (calculatorDisplay.value == 0) { //checks if 0 is displayed, if so, display the first value and replace 0
    calculatorDisplay.value = num.target.value;
  } else { //if not 0, add to the current number
    calculatorDisplay.value = calculatorDisplay.value + num.target.value;
  };
};

for (let i = 0; i < numberButtons.length; i++) { //add event listeners for all numbers based on the list of numbers detected earlier
  numberButtons[i].addEventListener('click', pushNumber);
};

let operator;
let num1 = 0; //num1 is always 0, so that someone could just press + after the 0 is already there, to add to 0, for example
let num2;
let result;

function pushOperator(op) {
  console.log(num1);
  console.log(op.target.value);
	operator = op.target.value; //finds the operator
  num1 = Number(calculatorDisplay.value); //sets num1 now, so that it doesn't set to the same number all the time within the next function
	calculatorDisplay.value = ""; //sets value to nothing, as a normal calculator would after operator is pressed
};
for (let i = 0; i < operatorButtons.length; i++) { //adds event listeners to all detected operator buttons
  operatorButtons[i].addEventListener('click', pushOperator);
};

function calculate() {
  if (operator === '+') { //only adding comments to one as these are all the same
    num2 = Number(calculatorDisplay.value); //num2 is defined here only so that num1 and num2 aren't mixed. Converted to a number because for some reason it starts as a string.
    let result = num1 + num2; //defines result here
    calculatorDisplay.value = result; //display result
  } else if (operator === '-') {
    num2 = Number(calculatorDisplay.value);
    let result = num1 - num2;
    calculatorDisplay.value = result;
  } else if (operator === '*') {
    num2 = Number(calculatorDisplay.value);
    let result = num1 * num2;
    calculatorDisplay.value = result;
  } else if (operator === '/') {
    num2 = Number(calculatorDisplay.value);
    let result = num1 / num2;
    calculatorDisplay.value = result;
  };
};
const equalButton = document.querySelector('.equal-sign');
equalButton.addEventListener("click", calculate); //add event listener for equals sign