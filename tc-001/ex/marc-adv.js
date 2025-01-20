#!/usr/bin/env node

const readline = require("readline");
const math = require("mathjs");

const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
});

rl.question(
        "Enter a mathematical expression (e.g., 2/(1*3)): ",
        (expression) => {
                try {
                        // math.evaluate safely parses and evaluates the expression
                        const result = math.evaluate(expression);
                        console.log(`Result: ${result}`);
                } catch (err) {
                        console.error(
                                `Error evaluating expression: ${err.message}`,
                        );
                }
                rl.close();
        },
);
