---
layout: page
displayTitle: Intro to JavaScript
description: A quick introduction to the basics of JavaScript.
hidden: true
---

# The Basics

## Variables

All variables do is store a value. If they are used elsewhere in the code, the value will be used.

Here's a little example of how to create and use variables in Python:

```js
let first = 11;
let second = 22;
let total = first + second;

// Prints out "33"
console.log(total);

word1 = "first";
word2 = "second";
combined = word1 + word2;

// Prints out "firstsecond"
console.log(combined);
```

Stuff you can store in variables:

- Numbers
- Strings
- Lists
- Booleans (`true`/`false`)
- Objects

## Control Flow

"Control Flow" is the core of how we actually get the program to do the stuff we want. The most important things here are going to be the `if` statement and the `while` loop.

### If Statement

```python
let num = 5
if (num < 10) {
    console.log("it's less than 10");
} else {
    console.log("it's greater than or equal to 10");
}
```

If statements can take anything that resolves to `true` or `false`. So you can use comparisons (`==`, `!=`, `>`, `<`, `>=`, `<=`, `%`). Along with comparisons, it's really common to have function calls in if statements, but we'll look at that later.

### While Loop

The while loop will take a set of instructions and perform them over and over until we tell it to stop. The simplest example is printing the numbers from 1-10:

```js
let num = 1;

while (num <= 10) {
    console.log(num);
    num = num + 1;
    // num += 1;
    // num++;
}
```

## Functions

The last critical part of programming is the function. Functions let you group instructions together so they can be reused. You can pass information to a function as well as return information to where a function was called from.

A little vocabulary here:

- **Parameter**: A variable that is defined by a function.
- **Argument**: Some data that is sent into a function.
- **Return Value**: Some data that the function sends back to where it was called.
- **To call a function**: The act of actually running the lines of code in the function.

Here's a quick description of these words:

```js
let first = 3;
let second = 5;

// This is where we call the `Multiply` function.
// `first` and `second` are arguments here.
let product = multiply(first, second);

// This will print "15" because the `multipy` function "returned" that value, which we stored in the `product` variable.
console.log(product);

// This is where we create the function.
// `a` and `b` are parameters here (because they will act as variables inside the function).
function multiply(a, b) {
    let result = a * b;

    // This is where we specify what information should be available to the calling code. 
    return result;
}
```

## Combining It All

Pretty boring, but let's print all the squares from 1 to 10.

```js
let num = 1;

while (num <= 10) {
    let product = multiply(num, num);
    console.log(product);
    num += 1;
}

function multiply(a, b) {
    let result = a * b;

    // This is where we specify what information should be available to the calling code. 
    return result;
}
```

**Important Note:** Look at the order of everything in the code. The `multiply` function comes after we use it. When we create functions like this, they'll be usable anywhere in the code (before or after). Most other things like variables must be created before they can be used. We can talk about this more later though.