const readline = require("readline");

// Basic variables
const majorityAge = 18;
const minMajorityYear = 2024 - majorityAge; // 2006

function checkAge(birthYear) {
  if (birthYear <= minMajorityYear) {
    console.log("You are an adult!");
  } else {
    const yearsToMajority = birthYear - minMajorityYear ;
    console.log(`You are not an adult! You have ${yearsToMajority} years left until majority!`
    );
  }
}

// Create an interface for reading input from the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt the user for birth year
rl.question("Enter your birth year: ", (answer) => {
  const birthYear = parseInt(answer, 10);
  checkAge(birthYear);
  rl.close();
});
