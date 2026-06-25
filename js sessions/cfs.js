// let age = 1;
// if (age >= 18) console.log("Eligible");

// age >= 18 && console.log("Eligible");

// if (age >= 18) console.log("Eligible");
// else console.log("Not Eligible");

// age >= 18 ? console.log("Eligible") : console.log("Not Eligible");

// if else ladder

// var today = parseInt(prompt("Enter today's day"));

// if (today == 0) console.log("Sunday");
// else if (today == 1) console.log("Monday");
// else if (today == 2) console.log("Tuesday");
// else if (today == 3) console.log("Wednesday");
// else if (today == 4) console.log("Thursday");
// else if (today == 5) console.log("Friday");
// else if (today == 6) console.log("Saturday");
// else console.log("Invalid day");

// nested condition

// let goodSalary = true;
// let goodCreditScore = true;

// if (goodCreditScore) {
//   if (goodSalary) {
//     console.log("Eligible for loan");
//   } else {
//     console.log("Not Eligible for loan, Due to insufficient Salary");
//   }
// } else {
//   console.log("Not Eligible for loan, Due to insufficient Credit Score");
// }

// check if a year is a leap year using nested statement

// let year = parseInt(prompt("enter a year :"));
// if (year % 4 === 0) {
//   if (year % 100 === 0) {
//     if (year % 400 === 0) {
//       console.log(`${year} is a leap year`);
//     } else {
//       console.log(`${year} is not a leap year`);
//     }
//   } else {
//     console.log(`${year} is a leap year`);
//   }
// } else {
//   console.log(`${year} is not a leap year`);
// }

// if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
//   console.log(`${year} is a leap year`);
// } else {
//   console.log(`${year} is not a leap year`);
// }

// var isYearLeap =
//   (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? true : false;

// console.log(isYearLeap);

// ================
// initialization
// condition
// update

// for (initialization ; condition ; update){
// code to be executed
// }

// for (var i = 1; i <= 10; i += 1) {
//   console.log(i);
// }

// for (var i = 10; i >= 1; i -= 1) {
//   console.log(i);
// }

// let name = "john doe is an alien";
// console.log(name[0]);
// console.log(name[1]);
// console.log(name[2]);
// console.log(name[3]);

// let vowels = 0;

// for (var i = 0; i < name.length; i += 1) {
//   if ("aeiouAEIOU".includes(name[i])) vowels += 1;
// }

// console.log(vowels);

// while (fixed)

// let vowels = 0;
// let i = 0; // initialization
// while (i < name.length) {
//   // condition
//   if ("aeiouAEIOU".includes(name[i])) vowels += 1;
//   i += 1; // update
// }

// console.log(vowels);

// let nums = [122, 2, 5, 7, 11, 13, 45, 34, 22];
// let primes = [];

// let i = 0;
// while (i < nums.length) {
//   let num = nums[i];
//   let isPrime = true;
//   if (num <= 1) {
//     isPrime = false;
//   } else {
//     for (let j = 2; j < num; j += 1) {
//       if (num % j === 0) {
//         isPrime = false;
//         break;
//       }
//     }
//   }

//   if (isPrime) primes.push(num);

//   i += 1;
// }

// console.log(primes);

// while loop (non fixed iteration)
// let myname = prompt("Enter your name").trim().toLowerCase();
// while (myname.length < 3) {
//   myname = prompt("Enter your name").trim().toLowerCase();
// }

// console.log(myname);

let secretNum = Math.floor(Math.random() * 100 + 1);

while (true) {
  let num = Number(prompt("enter a number"));
  if (num < secretNum) {
    console.log("your number is smaller");
  } else if (num > secretNum) {
    console.log("your number is bigger");
  } else {
    console.log("congratulations");
    break;
  }
}
