// arithmetic , comparison , assignment and logical operators

// arithmetic oeprators
console.log("arithmetic operators");

// + , - , * , / , % , **

// let i = 100;

// console.log(i + 12); // sum
// console.log(i - 10); // difference
// console.log(i * 10); // product
// console.log(i / 10); // quotient
// console.log(i % 2); // remainder
// console.log(i ** 2); // power | exponential

// assignment operators
console.log("Assignment Operators");

// = , += , -= , *= , /= , %= , **=

let x = 100; // regular assignment
console.log("x =", x);

x += 10; // add and assign
console.log("x =", x);

x -= 10; // subtract and assign
console.log("x =", x);

x *= 2; // multiply and assign
console.log("x =", x);

x /= 2; // divide(quotient) and assign
console.log("x =", x);

x %= 2; // divide(remainder) and assign
console.log("x =", x);

// comparison operators
console.log("comparison operators");
// == : equals to (compares values), === : strict equals to (compares value and type)
// != : not equals to (compares values) , !== strict not equals to (compares value and type)
// > : greater than, < : lesser than
// >= : greater than or equals to, <= : lesser than or equals to

// equals  to
console.log("equals  to");
console.log(12 == 12); // true
console.log(12 == 2); // false
console.log(12 == "12"); // true

// STRICT equals  to
console.log("STRICT equals  to");
console.log(12 === 12); // true
console.log(12 === 2); // false
console.log(12 === "12"); // FALSE

// not equals  to
console.log("not equals  to");
console.log(12 != 12); // False
console.log(12 != 2); // true
console.log(12 != "12"); // FALSE

// Strict not equals  to
console.log("Strict not equals  to");
console.log(12 !== 12); // False
console.log(12 !== 2); // true
console.log(12 !== "12"); // true

// logical operators
let a = 12;
let b = 7;
console.log("logical operators");

// and : && : expects all the conditions to be true
console.log("AND &&");
console.log(a > b && b < a); // t && t = t
console.log(a > b && b > a); // t && f = f
console.log(a < b && b > a); // f && f = f

// or : || : expects at least one of the conditions to be true
console.log("OR ||");
console.log(a > b || b < a); // t || t = t
console.log(a > b || b > a); // t || f = t
console.log(a < b || b > a); // f || f = f

// not : ! : reverse boolean value
console.log("NOT !");

console.log(!12 > 10);
console.log(!false);

// CONTROL FLOW STATMENT
// if , else if and else

console.log("CONTROL FLOW STATMENT\nif , else if and else");

// if statment : the code inside of the if block runs only if the condition is true
console.log("******** IF ********");

a = 4;

// if (condition) {
//     // code to be executed
// }

if (a > 12) console.log("Greater");

// else: the code inside of the else block runs only if all the Conditions above our false
if (a > 12) console.log("Greater");
else console.log("lesser or equals");

// else if : the code inside of an else block runs if the given condition is true
// comes after if block

let age = 3;

if (age >= 60) console.log("Not Fit");
else if (age >= 18) console.log("Eligible");
else console.log("Not Eligible");

// nested condition
console.log("******* nested condition *******");

let isGoodCreditScore = false;
let isGoodSalary = false;

if (isGoodCreditScore) {
  if (isGoodSalary) {
    console.log("Loan Available @ 2 % ");
  } else {
    console.log("Loan Available @ 5 % ");
  }
} else {
  console.log("Not Eligible for Loan");
}

let year = 2021;

if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
  console.log("Leap");
else console.log("Not Leap");

(year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  ? console.log("Leap")
  : console.log("Not Leap");

//   =========== for loop
console.log("=========== for loop : Fixed iteration ==========");

// initialization
// condition (loop runs till the condition results in true outcome)
// update (increment / decrement)

// print the name "john" 10 times

// for (let i = 1; i <= 10; i += 1) {
//   console.log("john");
// }

// print numbers from 1-100

// for (let i = 1; i <= 100; i += 1) {
//   console.log(i);
// }

// print numbers from 100-1

// for (let i = 100; i >= 1; i -= 1) {
//   console.log(i);
// }

// using loop to access items / characters of array / string
// first item / character is on the 0th position
// last item / character is on the str/arr.length  -  1 = th position

// for (i < 0; i <= 100; i++) {
//   if (i % 3 == 0 && i % 5 == 0) {
//     console.log(i).replace(" ", "FizzBuzz");
//   } else if (i % 3 == 0) {
//     console.log(i).replace(" ", "Fizz");
//   } else if (i % 5 == 0) {
//     console.log(i).replace(" ", "Buzz");
//   } else {
//     console.log(i);
//   }
// }

// ================ while loop : fixed  iteration

// initialization
// while (condition){
// code to be executed
// update
// }

// i < 0;
// while (i <= 100) {
//   if (i % 3 == 0 && i % 5 == 0) {
//     console.log(i).replace(" ", "FizzBuzz");
//   } else if (i % 3 == 0) {
//     console.log(i).replace(" ", "Fizz");
//   } else if (i % 5 == 0) {
//     console.log(i).replace(" ", "Buzz");
//   } else {
//     console.log(i);
//   }
//   i++;
// }

// let sentence = "hello, my name is vaibhav joshi".split(" ");
// let sentLength = 0;

// let i = 0;

// while (i < sentence.length) {
//   sentLength += 1;
//   i += 1;
// }

// console.log(sentLength);

// let sentence = "hello , my name is vaibhav joshi";
// let result = 0;
// let arr = sentence.split(" ");

// i = 0;
// while (i < arr.length) {
//   console.log(arr[i]);
//   if (arr[i].length > 3) {
//     result += 1;
//   }
//   i += 1;
// }

// console.log(result);

// let secret = "hello";

// let sentence = "hello world my name is john doe".split(" ");

// let isCorrect = false;
// for (let i = 0; i < sentence.length; i++) {
//   if (sentence[i] === secret) isCorrect = true;
// }

// console.log(isCorrect);

// let secretword = "hello";

// while (true) {
//   let word = prompt("enter word : ");

//   if (word !== secretword) {
//     alert("incorrect");
//     continue;
//   }

//   alert(`Correct word is ${secretword}`);
//   break;
// }

// let sentence = "my name is hello vaibhav joshi";

// console.log(sentence.includes(secretword));

// let arr = sentence.split(" ");
// let info = {
//   found: false,
//   position: 0,
// };

// let i = 0;

// while (i < arr.length) {
//   if (secretword === arr[i]) {
//     info.found = true;
//     info.position = i;
//   }
//   i++;
// }
// console.log(`i found the secret word on the ${info.position} index`);

const car = {
  model: "i10",
  brand: "hyundai",
  year: 2020,
};

console.log(car["model"]);
console.log(car.model);

car["model"] = "i20 asta";

console.log(car["model"]);

car["color"] = "grey";

console.log(car);

for (let key in car) {
  console.log(car[key]);
}

let marks = [23, 1, 1, 2, 3, 3, 42, 3, 423];

for (let mark of marks) {
  console.log(mark);
}
for (let char of "hello world") {
  console.log(char);
}
