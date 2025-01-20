const calculate = document.getElementById("calculate");

calculate.addEventListener("click", () => {
    const firstNumber = document.getElementById("firstNumber").value;
    const secondNumber = document.getElementById("secondNumber").value;
    const operator = document.getElementById("operator").value;
    const result = document.getElementById("result");
    calculator(parseFloat(firstNumber), parseFloat(secondNumber), operator, result);
})

function calculator(a, b, operator, result) {
    let res;
    switch (operator) {
        case '+':
            res = a + b;
            break;
        case '-':
            res = a - b;
            break;
        case '*':
            res = a * b;
            break;
        case '/':
            res = a / b;
            break;
        case '%':
            res = a % b;
            break;
        default:
            res = "Wrong operator";
            break;
    }
    result.textContent = res;
}