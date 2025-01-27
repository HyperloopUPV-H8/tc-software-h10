// Grab DOM elements
const displayEl = document.getElementById("display");
const expressionInput = document.getElementById("expression");
const calculateBtn = document.getElementById("calculateBtn");

// Event listener for the calculate button
calculateBtn.addEventListener("click", () => {
    const userExpression = expressionInput.value.trim();

    // Edge case: empty expression
    if (!userExpression) {
        displayEl.textContent = "No expression given!";
        displayEl.classList.add("error");
        return;
    }

    try {
        // Use math.evaluate() from Math.js to parse and compute the expression
        const result = math.evaluate(userExpression);
        displayEl.textContent = result;
        displayEl.classList.remove("error");
    } catch (err) {
        // If math.js can't parse the input or there's another error
        displayEl.textContent = "Error";
        displayEl.classList.add("error");
        console.error(err);
    }
});
