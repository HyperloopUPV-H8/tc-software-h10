const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Enter a: ", (answerA) => {
    let a = parseInt(answerA, 10);
    rl.question("Enter b: ", (answerB) => {
        let b = parseInt(answerB, 10);
        rl.question("Enter operator: ", (answerOp) => {

            let result;
            switch (answerOp) {
                case '+':
                    result = a + b;
                    break;
                case '-':
                    result = a - b;
                    break;
                case '*':
                    result = a * b;
                    break;
                case '/':
                    result = a / b;
                    break;
                case '%':
                    result = a % b;
                    break;
                default:
                    result = "Wrong operator";
                    break;
            }
            console.log(result);
            rl.close();
        });
    });
});


