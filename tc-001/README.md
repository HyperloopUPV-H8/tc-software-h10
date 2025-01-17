# 001 - Intro to programming
Programming languages live all around; they can be used in any field, and they are defined as "languages for communicating instructions to a machine" [^1].

## What is programming?

Programming is telling a computer what to do through instructions it can understand. Talking to computers in ones and zeroes is highly inefficient, so programming languages were born, replacing large structures with simpler terms and more complex and effective constructions.

### Lingo

- Syntax: rules of writing code
- Variables: data points of different types
- Functions: group of instructions
- Abstraction: generalisation of concrete details into objects and systems

### Low- and high-level programming

A low-level language provides little or no abstraction from the processor's instruction set architecture [^2] and so needs no compiler or interpreter to be executed. Conversely, a high-level language offers high abstraction over this instruction set at the cost of computing power and execution speed.

##  Hands-on demo

This simple Python snippet shows in a highly abstract way all the basic aspects of any program written in any programming language.

```python
majority_age = 18 # Variable with a simple assigned value
min_majority_year = 2024-18 # Dynamically assigned value

birth_year = input("Enter your birth year: ") # User inputted variable

def check_age(birth_year): # Function
	# Conditional
	if birth_year >= min_majority_age:
		print("You are an adult!")
	else:
		years_to_majority = birth_year - min_majority_year
		print(f"You are not an adult! You have {years_to_majority} years left until majority!")
```

Python is a very abstracted language, and so it automatically does many things for the programmer, like assigning variable types and even letting the variables change type dynamically; this comes at the cost of needing an interpreter [^3], making it slower to run than other languages but not needing to be compiled [^4] like other faster languages like C, let's see the same script if we decided to write it in C:

```C
#include <stdio.h>

int main() {
    int majority_age = 18;               // Simple assigned value
    int min_majority_year = 2024 - 18;   // Dynamically assigned value
    int birth_year;

    printf("Enter your birth year: ");
    scanf("%d", &birth_year);

    // Conditional
    if (birth_year <= min_majority_year) {
        printf("You are an adult!\n");
    } else {
        int years_to_majority = birth_year - min_majority_year ;
        printf("You are not an adult! You have %d years left until majority!\n", years_to_majority);
    }

    return 0;
}
```

C is a compiled programming language, still high-level. For a glimpse at low-level, which we won't cover in this course, let's take a look at this Assembly script for an ARM AArch-64 processor like the one in a Raspberry Pi 5.

```armasm
	.section	__TEXT,__text,regular,pure_instructions
	.build_version macos, 15, 0	sdk_version 15, 2
	.globl	_main                           ; -- Begin function main
	.p2align	2
_main:                                  ; @main
	.cfi_startproc
; %bb.0:
	sub	sp, sp, #48
	stp	x29, x30, [sp, #32]             ; 16-byte Folded Spill
	add	x29, sp, #32
	.cfi_def_cfa w29, 16
	.cfi_offset w30, -8
	.cfi_offset w29, -16
	stur	wzr, [x29, #-4]
	mov	w8, #18                         ; =0x12
	stur	w8, [x29, #-8]
	mov	w8, #2006                       ; =0x7d6
	stur	w8, [x29, #-12]
	adrp	x0, l_.str@PAGE
	add	x0, x0, l_.str@PAGEOFF
	bl	_printf
	mov	x9, sp
	add	x8, sp, #16
	str	x8, [x9]
	adrp	x0, l_.str.1@PAGE
	add	x0, x0, l_.str.1@PAGEOFF
	bl	_scanf
	ldr	w8, [sp, #16]
	ldur	w9, [x29, #-12]
	subs	w8, w8, w9
	cset	w8, gt
	tbnz	w8, #0, LBB0_2
	b	LBB0_1
LBB0_1:
	adrp	x0, l_.str.2@PAGE
	add	x0, x0, l_.str.2@PAGEOFF
	bl	_printf
	b	LBB0_3
LBB0_2:
	ldr	w8, [sp, #16]
	ldur	w9, [x29, #-12]
	subs	w8, w8, w9
	str	w8, [sp, #12]
	ldr	w9, [sp, #12]
                                        ; implicit-def: $x8
	mov	x8, x9
	mov	x9, sp
	str	x8, [x9]
	adrp	x0, l_.str.3@PAGE
	add	x0, x0, l_.str.3@PAGEOFF
	bl	_printf
	b	LBB0_3
LBB0_3:
	mov	w0, #0                          ; =0x0
	ldp	x29, x30, [sp, #32]             ; 16-byte Folded Reload
	add	sp, sp, #48
	ret
	.cfi_endproc
                                        ; -- End function
	.section	__TEXT,__cstring,cstring_literals
l_.str:                                 ; @.str
	.asciz	"Enter your birth year: "

l_.str.1:                               ; @.str.1
	.asciz	"%d"

l_.str.2:                               ; @.str.2
	.asciz	"You are an adult!\n"

l_.str.3:                               ; @.str.3
	.asciz	"You are not an adult! You have %d years left until majority!\n"

.subsections_via_symbols
```

The value of a high-level language is clear: productivity and agility.

## JavaScript

In this course we will be using JavaScript, the program we did earlier looks like this written in it:

```js
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
```

### Basic structures of a program

```js
// 1. Variables
let count = 3;           // Can be reassigned
const greeting = "Hello"; // Cannot be reassigned

// 2. Conditionals
if (count > 5) {
  console.log("Count is greater than 5");
} else {
  console.log("Count is 5 or less");
}

// 3. Loops
for (let i = 0; i < count; i++) {
  console.log(`For loop iteration: ${i}`);
}

// 4. Functions
function multiply(a, b) {
  return a * b;
}
console.log("3 * 4 =", multiply(3, 4));

// 5. Basic Data Structures
const numbersArray = [1, 2, 3];
const personObject = { name: "Alice", age: 25 };

console.log("Array:", numbersArray);
console.log("Object:", personObject);
```

## Exercise time

> Install IDE before next steps, I suggest [Microsoft Visual Studio Code](https://code.visualstudio.com/download)

### Exercise of the day

Write a simple program with various calculation functions, such as a simple calculator.

### Exercise of the week

Extend the calculator to recognize a simple input like the ones we use daily.

Ex.: "1 + 1 + 1", "2 \* 3", "2 / 4"
Extra: "(1 + 2) \* 3"

Make use of the [JS docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and tutorials for the exercises!

[^1]: Wikipedia, [Programming language](https://en.wikipedia.org/wiki/Programming_language)
[^2]: Abstract model that defines how software controls the CPU in a computer or family of computers - Wikipedia, [Instruction set architecture](https://en.wikipedia.org/wiki/Instruction_set_architecture)
[^3]: A computer program that directly executes instructions written in a programming or scripting language - Wikipedia, [Interpreter (computing)](https://en.wikipedia.org/wiki/Interpreter_(computing))
[^4]: Translating into machine code, instructions for the CPU