#!/usr/bin/env node

const readline = require("readline");

/**
 * 1. Tokenizer: Convert the string into tokens (numbers, operators, parentheses).
 */
function tokenize(expression) {
        const tokens = [];
        let numberBuffer = [];

        const pushNumberBuffer = () => {
                if (numberBuffer.length > 0) {
                        tokens.push(numberBuffer.join(""));
                        numberBuffer = [];
                }
        };

        for (let i = 0; i < expression.length; i++) {
                const char = expression[i];

                // If the character is a digit or a decimal point, build up the number
                if (/\d|\./.test(char)) {
                        numberBuffer.push(char);

                        // If we encounter whitespace, push the current number if any
                } else if (/\s/.test(char)) {
                        pushNumberBuffer();

                        // If it's an operator or parenthesis, push the buffered number first and then the operator
                } else if (/[+\-*/()]/.test(char)) {
                        pushNumberBuffer();
                        tokens.push(char);
                } else {
                        throw new Error(
                                `Invalid character encountered: "${char}"`,
                        );
                }
        }

        // After the loop, if there's still a number in the buffer, push it
        pushNumberBuffer();

        return tokens;
}

/**
 * 2. Shunting Yard Algorithm: Convert infix tokens (e.g., ["2", "/", "(", "1", "*", "3", ")"])
 *    into Reverse Polish Notation (RPN) (e.g., ["2", "1", "3", "*", "/"]).
 */
function toRPN(tokens) {
        const outputQueue = [];
        const operatorStack = [];

        // Define operator precedence
        const precedence = {
                "+": 1,
                "-": 1,
                "*": 2,
                "/": 2,
        };

        // Define left-associative operators
        const leftAssociative = {
                "+": true,
                "-": true,
                "*": true,
                "/": true,
        };

        for (let i = 0; i < tokens.length; i++) {
                const token = tokens[i];

                // If it's a number, send it to the output queue
                if (!isNaN(token)) {
                        outputQueue.push(token);

                        // If it's an operator, pop from operatorStack to outputQueue where needed
                } else if (token in precedence) {
                        while (
                                operatorStack.length > 0 &&
                                operatorStack[operatorStack.length - 1] !==
                                        "(" &&
                                (precedence[
                                        operatorStack[operatorStack.length - 1]
                                ] > precedence[token] ||
                                        (precedence[
                                                operatorStack[
                                                        operatorStack.length - 1
                                                ]
                                        ] === precedence[token] &&
                                                leftAssociative[token]))
                        ) {
                                outputQueue.push(operatorStack.pop());
                        }
                        operatorStack.push(token);

                        // If it's an '(', push to stack
                } else if (token === "(") {
                        operatorStack.push(token);

                        // If it's a ')', pop until '('
                } else if (token === ")") {
                        while (
                                operatorStack.length > 0 &&
                                operatorStack[operatorStack.length - 1] !== "("
                        ) {
                                outputQueue.push(operatorStack.pop());
                        }
                        if (operatorStack.length === 0) {
                                throw new Error("Mismatched parentheses");
                        }
                        operatorStack.pop(); // Remove '('
                } else {
                        throw new Error(`Unknown token: "${token}"`);
                }
        }

        // Pop any remaining operators to the output queue
        while (operatorStack.length > 0) {
                const op = operatorStack.pop();
                if (op === "(" || op === ")") {
                        throw new Error("Mismatched parentheses");
                }
                outputQueue.push(op);
        }

        return outputQueue;
}

/**
 * 3. Evaluate RPN: Evaluate the resulting Reverse Polish Notation expression.
 */
function evaluateRPN(rpnTokens) {
        const stack = [];

        for (let i = 0; i < rpnTokens.length; i++) {
                const token = rpnTokens[i];

                // If it's a number, push to stack
                if (!isNaN(token)) {
                        stack.push(parseFloat(token));

                        // Otherwise, it's an operator: pop 2 numbers and apply the operator
                } else {
                        if (stack.length < 2) {
                                throw new Error("Invalid expression");
                        }
                        const b = stack.pop();
                        const a = stack.pop();
                        switch (token) {
                                case "+":
                                        stack.push(a + b);
                                        break;
                                case "-":
                                        stack.push(a - b);
                                        break;
                                case "*":
                                        stack.push(a * b);
                                        break;
                                case "/":
                                        stack.push(a / b);
                                        break;
                                default:
                                        throw new Error(
                                                `Unknown operator: "${token}"`,
                                        );
                        }
                }
        }

        // If everything worked out, we should be left with exactly one number
        if (stack.length !== 1) {
                throw new Error("Invalid expression evaluation");
        }

        return stack[0];
}

/**
 * 4. High-level function to combine all steps:
 */
function calculateExpression(expr) {
        const tokens = tokenize(expr);
        const rpn = toRPN(tokens);
        return evaluateRPN(rpn);
}

// ======== Command-line interface using readline ========
const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
});

rl.question("Enter a mathematical expression (e.g., 2/(1*3)): ", (input) => {
        try {
                const result = calculateExpression(input);
                console.log(`Result: ${result}`);
        } catch (error) {
                console.error(`Error: ${error.message}`);
        }
        rl.close();
});
