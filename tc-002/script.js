console.log("Hello from JS!");

// Grab the button from the DOM
const calculateButton = document.getElementById("calculate-button");

// Inputs
const inputX = document.querySelector(".input__x");
const inputY = document.querySelector(".input__y");

// Add a click listener
calculateButton.addEventListener("click", function () {
  const result = parseInt(inputX.value) + parseInt(inputY.value);
  console.log(`Result: ${result}`);
});
