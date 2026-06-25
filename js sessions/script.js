// output

// 1.console
// console.log("hello world");
// console.log(23 ** 23);

// 2.alert | window.alert
// alert("hello world");

// 3.document.write : XXXXX
// document.write("<h1>Hello world</h1>");

// input
// prompt("Enter your name :", "john doe");

// Note : the input collected using the prompt function is of type string by default

// variable
// an empty container used to store data, having a label on it known as "variable name" or "identifier"

// how to create a variable ?
// var , let or const keywords are used to create a varibale

// 1.declaration (box creation)
var age; // declaration
// 2.initialzation
age = 34; // initialization
// declaration and initialization
var myage = 34;
var age = 56;
let yourname = "john";
// let yourname = "hari";
const ourage = 34;

// ===== RULES
// 1. no space
// 2. a variable name cannot start with a number but can include or end with a number
// 3. a variable name cannot start, include or end with a special symbol , except "_"
// 4. DO Not Use Reserved keywords as variable name, but can be a part of your variable name

// ----- Suggestions
// 1. start your variable name with lowercase letter
// 2. in case of multiword variable name, like "helloworldmynameis"
// - helloWorldMyNameIs : camelCasing
// - hello_world_my_name_is : snake_casing

// DATA TYPES
// PRIMITIVE

// Number : 123 , 1.23
// Boolean | Bool : true | false
// string : " ", ' ', ` `
// Undefined : unintentional absence of a value
// null : intentional absence of a value

// var x = 23;
// var y = x; // storing a copy of value of x
// console.log(x, y);

// x = 100;

// console.log(x, y);

var marks = [23, 45, 2, 3];
var yourMarks = marks;

console.log(marks, yourMarks);
marks[1] = 100;

console.log(marks, yourMarks);
