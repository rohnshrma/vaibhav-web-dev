// function are reusable block of code, running the code once when called by name

// function declaration

// => Creating a function

// function funcName(parameters) {
// block of code
// }

// => Calling a function

// funcName(arguments);

// function calcBmi(weight, height) {
//   let bmi = weight / height ** 2;
//   if (bmi < 18.5) console.log(`Underweight as your bmi is ${bmi}`);
//   else if (bmi >= 18.5 && bmi <= 24.9)
//     console.log(`Normal weight as your bmi is ${bmi}`);
//   else if (bmi >= 25 && bmi <= 29.9)
//     console.log(`Overweight as your bmi is ${bmi}`);
//   else console.log(`Obese as your bmi is ${bmi}`);
// }

// calcBmi(100, 1.8);
// calcBmi(100, 1.85);

// return :
// 1. terminate function
// 2. return value out of function

// function calcBmi(weight, height) {
//   let bmi = weight / height ** 2;
//   if (bmi < 18.5) return `Underweight as your bmi is ${bmi}`;
//   else if (bmi >= 18.5 && bmi <= 24.9)
//     return `Normal weight as your bmi is ${bmi}`;
//   else if (bmi >= 25 && bmi <= 29.9) return `Overweight as your bmi is ${bmi}`;
//   else return `Obese as your bmi is ${bmi}`;
// }

// console.log(calcBmi(100, 1.8));
// let myBmi = calcBmi(100, 1.8);

// console.log(myBmi);

// =============== function expression
// anonymous

// function () {
// code to be executed
// };

// 1. assign it as a value to a variable
// let mess = function () {
//   console.log("hello world");
// };

// mess();

// 2. assign it as a value to an object key

let car = {
  model: "figo",
  brand: "ford",
  colors: ["Red", "Grey"],
  info: function () {
    console.log("this car is ford figo");
  },
};

car.info();

// 3. use it as a callback

// callback

// when a function is passed into another function as an argument, the passed function is called a callback function

// let calcAge = function (yob) {
//   return new Date().getFullYear() - yob;
// };

// function lifeSpan(averageAge, yob, cb) {
//   let yearsLeft = averageAge - cb(yob);
//   console.log(`Years Left : ${yearsLeft}`);
// }

// lifeSpan(90, 1996, function (yob) {
//   return new Date().getFullYear() - yob;
// });
