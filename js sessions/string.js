// sequence of characters ( alphabeta, numbers , special symbols and whitespace) enclosed in single(''), double quotes("") or backticks (``)

// how to check data type of a value / variable
// var x = 23;
// console.log(typeof x);
// console.log(typeof "hello world");

// NOTE: value taken using prompt is of type String by default, but can be converted into supported data type

// var age = Number(prompt("Enter your age : "));
// console.log(age, typeof age);

let txt = "hello world my name is john doe";
console.log(txt);

// d = 34; // XXXXX : adds to window object
// console.log(d);

// console.log(txt.length);

// indexing [index]

// h e l l o
// 0 1 2 3 4 : positive indexing
//-5-4-3-2-1 : negative indexing

// first character is always on the 0th position
// last character is always on the str.length - 1 : th position
//

// console.log(txt[0]);
// console.log(txt[-1]);

// concatenation : adding two or more string together
// var fName = prompt("Enter your first name : ");
// var lName = prompt("Enter your last name : ");
// var age = parseInt(prompt("Enter your age : "));

// console.log(
//   "hello world my name is " +
//     fName +
//     " " +
//     lName +
//     " and i am " +
//     age +
//     " years old."
// );

// console.log(34 + 34);
// console.log(34 + "34");
// console.log(34 + +"34");

// template literal

// console.log(
//   `hello world my name is ${fName} ${lName} and i am ${age > 3} years old.`
// );
// console.log(
//   "hello world my name is",
//   fName,
//   lName,
//   "and i am",
//   age > 3,
//   " years old."
// );

// methods

// return character on the specified index
// console.log(txt.charAt(1));
// console.log(txt.charAt(-1));

// return character on the specified index
// console.log(txt.at(1));
// console.log(txt.at(-1));

// console.log(txt.concat(" and i am an indian."));

// support + and  -
// console.log(txt.slice(0, 6)); // start (inclusive) , stop (exclusive)
// console.log(txt.slice(-5, -1)); // start (inclusive) , stop (exclusive)

// support +
// console.log(txt.substring(0, 6)); // start (inclusive) , stop (exclusive)
// console.log(txt.substring(-5, -1)); // start (inclusive) , stop (exclusive)

// console.log(txt.includes("a")); // substring
// console.log(txt.includes("a", 5)); // substring , start position
// console.log(txt.includes("z")); // substring

// console.log(txt.length);
// console.log(txt.padEnd(40)); // new length (more than the actual length)
// console.log(txt.padEnd(40, "*")); // new length (more than the actual length), fill string
// console.log(txt.padEnd(40, "abc")); // new length (more than the actual length), fill string
// console.log(txt.padStart(40)); // new length (more than the actual length)
// console.log(txt.padStart(40, "*")); // new length (more than the actual length), fill string
// console.log(txt.padStart(40, "abc")); // new length (more than the actual length), fill string
// console.log(txt.padStart(40, "abc").padEnd(51, "xyz")); // new length (more than the actual length), fill string

// return index of the first occurance of the specified string , else false
// console.log(txt.indexOf("a"));
// console.log(txt.indexOf("a", 17));

// console.log(txt.replace("o", "x"));
// console.log(txt.replace(/o/g, "x"));
// console.log(txt.replaceAll("o", "x"));

// console.log(txt.repeat(3));

// console.log("          hello world           ".trim());
// console.log("          hello world           ".trimStart());
// console.log("          hello world           ".trimEnd());
// console.log("          hello world           ".replaceAll(" ", ""));

// console.log(txt.toLowerCase());
// console.log(txt.toUpperCase());

// return an array
console.log(txt.split());
console.log(txt.split(""));
console.log(txt.split(" "));
console.log(txt.split("a"));
