// BUGS \\
// 1 + 2 + 3 = 5. WRONG! That ain't gud.
// Feature: if divide by 0, show "E" and allow no buttons to be pressed for 3 seconds
// What if 6 + 2 = 8 -> user then enters 4???


/// VARIABLES \\\
var calculation = [];
let operator;
let numberDisplayed = 0; //numberDisplayed is 0 by default, so that someone could just press + after the 0 is already there, to add to 0, for example
let num2;
var result; // result needs to be GLOBAL so that it can be set to 0 when needed anywhere in the program

//going ahead and defining all my main selectors here
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const calculatorDisplay = document.querySelector('.calculator-screen');
const equalButton = document.querySelector('.equal-sign');
const percentButton = document.querySelector('.percent');
const clearButton = document.querySelector('.clear');





/// FUNCTION DEFINITIONS \\\

// MATH FUNCTIONS \\

function add(num1, num2) {
  return num1 + num2;
};

function subtract(num1, num2) {
  return num1 - num2;
};

function multiply(num1, num2) {
  return num1 * num2;
};

function divide(num1, num2) {
  return num1 / num2;
};

function modulo(num1, num2) {
  return num1 % num2;
};

function exponent(num1, num2) {
  return num1 ** num2;
}

// BUTTON FUNCTIONALITY \\

//check to see if calculation is equal to 3
function checkCalculation() {
  console.log(`Calculation length is: ${calculation.length}`);
  if (calculation.length === 3) {
    calculate();
  };
};

function pushNumber(num) {
  console.log(num)
  console.log("Num target value is " + num.target.value)
  console.log("Calculator display value is " + typeof(calculatorDisplay.value))
  if (calculatorDisplay.value === "0") { //checks if 0 is displayed, if so, display the first value and replace 0. TRIPLE EQUALS in case undefined or NaN were to ever come up to evaluate as falsy therefore equivalent.
    calculatorDisplay.value = num.target.value;
  } else { //if not 0, add to the current number
    calculatorDisplay.value = calculatorDisplay.value + num.target.value;
  };
};

function pushOperator(op) {
  console.log(numberDisplayed);
  console.log(op.target.value);
	const operator = op.target.value; //finds the operator
  numberDisplayed = Number(calculatorDisplay.value); //sets numberDisplayed now, so that it doesn't set to the same number all the time within the next function
  console.log(calculation)
  calculation.push(numberDisplayed)
  console.log(calculation)
  calculation.push(operator)
  console.log(calculation)
	calculatorDisplay.value = ""; //sets value to nothing, as a normal calculator would after operator is pressed
  console.log("got past here.")
  checkCalculation()
};

function pushPercent(p) {
  const operator = "%"; // for some reason operator.target.value returns the string "percent" rather than "%"
  numberDisplayed = Number(calculatorDisplay.value);
  console.log(calculation)
  calculation.push(numberDisplayed);
  console.log(calculation)
  calculation.push(operator);
  console.log(calculation)
  console.log(operator)
  console.log(calculation);
  calculatorDisplay.value = "";
  checkCalculation();
};

function pushEquals() {
  if (calculation.length === 2) {
    console.log(calculation)
    numberDisplayed = Number(calculatorDisplay.value);
    calculation.push(numberDisplayed);
    console.log("NOW THIS IS WHEN EQUALS WAS PUSHED: " + calculation)
    checkCalculation();
  };
}

function pushClear() {
  calculation = [];
  result = 0;
  calculatorDisplay.value = "0";
}

function calculate() {
  console.log("I actually got here, yaknow")
  var num1 = Number(calculation[0]);
  const operatorEntered = calculation[1];
  var num2 = Number(calculation[2]);
  const operatorFunctions = {
    "+": add(num1, num2),
    "-": subtract(num1, num2),
    "*": multiply(num1, num2),
    "/": divide(num1, num2),
    "%": modulo(num1, num2)
  };
  // console.log(`This is multiplication: ${operators["*"]}`)
  // console.log(operators.length)
  const operators = Object.keys(operatorFunctions);
  for (let i = 0; i < operators.length; i++) {
    let currentOperator = operators[i];
    console.log(`yep i got here. Calculation: ${calculation} Operators: ${operators} Operator iteration number: ${i} Operator being tested: ${currentOperator} Actual operator: ${operatorEntered}`)
    if (operatorEntered === currentOperator) {
      console.log(`What ya lookin foh is ${operators[i]}`)
      result = operatorFunctions[currentOperator];
      break;
    };
  };
  calculatorDisplay.value = result;
  calculation = [];
};

  // if (operator === '+') { //only adding comments to one as these are all the same
  //   num2 = Number(calculatorDisplay.value); //num2 is defined here only so that numberDisplayed and num2 aren't mixed. Converted to a number because for some reason it starts as a string.
  //   let result = numberDisplayed + num2; //defines result here
  //   calculatorDisplay.value = result; //display result
  // } else if (operator === '-') {
  //   num2 = Number(calculatorDisplay.value);
  //   let result = numberDisplayed - num2;
  //   calculatorDisplay.value = result;
  // } else if (operator === '*') {
  //   num2 = Number(calculatorDisplay.value);
  //   let result = numberDisplayed * num2;
  //   calculatorDisplay.value = result;
  // } else if (operator === '/') {
  //   num2 = Number(calculatorDisplay.value);
  //   let result = numberDisplayed / num2;
  //   calculatorDisplay.value = result;
  // };








/// EVENT LISTENERS \\\

for (let i = 0; i < numberButtons.length; i++) { //add event listeners for all numbers based on the list of numbers detected earlier
  numberButtons[i].addEventListener('click', pushNumber); //whatever the first param is automatically becomes numberButtons. numberButtons[i] is passed INTO the parameter of pushNumber
};

for (let i = 0; i < operatorButtons.length; i++) { //adds event listeners to all detected operator buttons
  operatorButtons[i].addEventListener('click', pushOperator);
};

equalButton.addEventListener('click', pushEquals);
percentButton.addEventListener('click', pushPercent);
clearButton.addEventListener('click', pushClear);