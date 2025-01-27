// DOM Elements
const counterValueEl = document.getElementById("counterValue");
const incrementBtn = document.getElementById("incrementBtn");
const resetBtn = document.getElementById("resetBtn");

// Basic state
let counter = 0;

// Functions to handle state and update DOM
function updateCounterValue() {
        counterValueEl.innerText = `Counter: ${counter}`;
}

function incrementCounter() {
        counter++;
        updateCounterValue();
}

function resetCounter() {
        counter = 0;
        updateCounterValue();
}

// Event Listeners
incrementBtn.addEventListener("click", incrementCounter);
resetBtn.addEventListener("click", resetCounter);
