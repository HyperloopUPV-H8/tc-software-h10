console.log("Hello from JS!");

// Buttons
const calculateSumButton = document.getElementById("calculate-button-sum");
const calculateRestButton = document.getElementById("calculate-button-rest");
const calculateMultButton = document.getElementById("calculate-button-mult");
const calculateDivButton = document.getElementById("calculate-button-div");

// Inputs
const inputX = document.querySelector(".calculator__input_x");
const inputY = document.querySelector(".calculator__input_y");
const inputResult = document.querySelector(".calculator__input_result");

// Math actions
const sum = (a, b) => {
  return a + b;
};

const substract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  return a / b;
};

function isNotNumeric(value) {
  return isNaN(value) || typeof value === "boolean";
}

// That's a common function for all math related event listeners
const calculateAction = (action) => {
  const x = parseInt(inputX.value); // First input value
  const y = parseInt(inputY.value); // Second input value

  // If X is non-numeric value show error and prevent action
  if (isNotNumeric(x)) {
    inputResult.value = "First input value is invalid";
    return;
  }

  // If Y is non-numeric value show error and prevent action
  if (isNotNumeric(y)) {
    inputResult.value = "Second input value is invalid";
    return;
  }

  const result = action(x, y);
  inputResult.value = result;
  console.log(`Result: ${result}`);
};

// Add a sum button click listener
calculateSumButton.addEventListener("click", () => calculateAction(sum));

// Add a rest button click listener
calculateRestButton.addEventListener("click", () => calculateAction(substract));

// Add a mult button click listener
calculateMultButton.addEventListener("click", () => calculateAction(multiply));

// Add a div button click listener
calculateDivButton.addEventListener("click", () => calculateAction(divide));
