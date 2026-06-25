// console.log("hello world");

const fs = require("fs");
const add = require("./math");
const { ChildProcess } = require("child_process");

// fs.writeFile("test.txt", "ha bhai kaisa h ?", (err) => {
//   if (err) throw err;
//   console.log("file created");
// });

// non-blocking code (asynchronous)
// fs.readFile("./test.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// console.log("hum first");
// console.log(add(4, 4));

// blocking code (synchronous)
// const data = fs.readFileSync("test.txt", "utf8");
// console.log(data);

// console.log("this runs after file read");

// setTimeout(() => {
//   console.log("Call coming");
// }, 2000);

setInterval(() => {
  console.log(new Date().toLocaleTimeString());
}, 1000);
