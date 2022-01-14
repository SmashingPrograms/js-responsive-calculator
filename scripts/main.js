// BUGS \\
// 0 at the beginning DOES NOT WORK, make it work! :(
// Feature: if divide by 0, show "E" and allow no buttons to be pressed for 3 seconds
// What if 6 + 2 = 8 -> user then enters 4???

// 1 + 1 + 3

/// VARIABLES \\\
var calculation = [];
let operator;
var numberDisplayed = 0; //numberDisplayed is 0 by default, so that someone could just press + after the 0 is already there, to add to 0, for example
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

const operators = {
  "+": function (num1, num2) {
         return num1 + num2;
       },
  "-": function (num1, num2) {
         return num1 - num2;
       },
  "*": function (num1, num2) {
         return num1 * num2;
       },
  "/": function (num1, num2) {
         return num1 / num2;
       },
  "%": function (num1, num2) {
         return num1 % num2;
       },
};

// console.log(operators["%"](1, 3)); // to show what it does :)




// BUTTON FUNCTIONALITY \\

//check to see if calculation is equal to 3
function checkCalculation() {
  // console.log(`Calculation length is: ${calculation.length}`);
  if (calculation.length === 3) {
    console.log(`${calculation.length} yeppers ARON RA`)
    calculate();
  } else if (calculation.length > 3) {
    console.log("ERROR!!!!!! IT'S HIGHER THAN 3 IN THE ARRAY!!!!!");
  }
};

function pushNumber(num) {
  // console.log(num)
  // console.log("Num target value is " + num.target.value)
  // console.log("Calculator display value is " + typeof(calculatorDisplay.value))
  if (calculatorDisplay.value === "0") { //checks if 0 is displayed, if so, display the first value and replace 0. TRIPLE EQUALS in case undefined or NaN were to ever come up to evaluate as falsy therefore equivalent.
    calculatorDisplay.value = num.target.value;
  } else { //if not 0, add to the current number
    calculatorDisplay.value = calculatorDisplay.value + num.target.value;
  };
};

function pushNonNumber(operator) { //THIS FUNCTION was made so that multiple operator functions could be made the same way
  numberDisplayed = Number(calculatorDisplay.value); //sets numberDisplayed now, so that it doesn't set to the same number all the time within the next function
  // console.log(calculation)
  if (result !== numberDisplayed && numberDisplayed !== 0) {
    calculation.push(numberDisplayed) // [1]
    checkCalculation()
  };
  // console.log(calculation)
  calculation.push(operator) // [1, '+']
  console.log(calculation);
  calculatorDisplay.value = ""; //sets value to nothing, as a normal calculator would after operator is pressed
  // console.log("got past here.")
  checkCalculation();
}

function pushOperator(op) {
	const operator = op.target.value; //finds the operator
  pushNonNumber(operator);
};

function pushPercent(p) {
  const operator = "%"; // for some reason operator.target.value returns p
  pushNonNumber(operator);
};

function pushEquals() {
  if (calculation.length === 2) {
    // console.log(calculation)
    numberDisplayed = Number(calculatorDisplay.value);
    calculation.push(numberDisplayed);
    // console.log("NOW THIS IS WHEN EQUALS WAS PUSHED: " + calculation)
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
  let num1 = Number(calculation[0]);
  const operatorEntered = calculation[1];
  let num2 = Number(calculation[2]);
  result = operators[operatorEntered](num1, num2);
  calculatorDisplay.value = result;
  calculation = [result];
  console.log("I got to the end!")
};








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