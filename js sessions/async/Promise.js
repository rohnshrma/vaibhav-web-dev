// =======================================
// STORE API URL
// =======================================

// A variable stores data
// Here we store a URL (web address)
// This API gives random jokes

let url = "https://v2.jokeapi.dev/joke/Any";

// =======================================
// PROMISE EXAMPLE — AGE CHECKER
// =======================================

// Function = reusable block of code
// checkAge() accepts an age as input

function checkAge(age) {
  // We return a Promise
  // Promise = a future result (success or failure)

  return new Promise((resolve, reject) => {
    // setTimeout delays execution
    // 5000 milliseconds = 5 seconds

    setTimeout(() => {
      // Ternary operator (short if-else)
      // condition ? if true : if false

      age >= 18
        ? resolve("Eligible") // success case
        : reject("Not Eligible"); // failure case
    }, 5000); // delay time
  });
}

// =======================================
// CALLING THE PROMISE MULTIPLE TIMES
// =======================================

// .then() runs when promise succeeds
// .catch() runs when promise fails

checkAge(23)
  .then((data) => console.log(data)) // prints "Eligible"
  .catch((err) => console.log(err));

checkAge(24)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

checkAge(25)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

checkAge(27)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

checkAge(28)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

checkAge(29)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// All promises run at the same time
// After 5 seconds → results appear together

// =======================================
// CUSTOM API FETCH FUNCTION
// =======================================

// lekeAa() means "bring the data"
// This function fetches data from the API

function lekeAa(url) {
  // Return a Promise again
  return new Promise((resolve, reject) => {
    // XMLHttpRequest is an old way to request server data
    // It talks to the server

    let request = new XMLHttpRequest();

    // Event listener watches request progress
    // It runs whenever state changes

    request.addEventListener("readystatechange", () => {
      // readyState 4 = request finished
      // status 200 = success

      if (request.readyState === 4 && request.status === 200) {
        // JSON.parse converts text → JavaScript object

        resolve({
          data: JSON.parse(request.responseText),
          readyState: request.readyState,
          message: "SUCCESS",
        });
      }

      // If finished but failed
      else if (request.readyState === 4 && request.status !== 200) {
        reject({
          data: null,
          readyState: request.readyState,
          message: "Failed",
        });
      }
    });

    // Open connection
    // "GET" means we want to receive data

    request.open("GET", url);

    // Send request to server
    request.send();
  });
}

// =======================================
// CALL API MULTIPLE TIMES
// =======================================

// Each call fetches a NEW random joke

lekeAa(url)
  .then((data) => {
    // API gives 2 joke types:
    // "single" OR "twopart"

    // If twopart → print setup + delivery
    // Else → print single joke

    data.data.type === "twopart"
      ? console.log(
          `Setup : ${data.data.setup}\n\nDelivery : ${data.data.delivery}`
        )
      : console.log(data.data.joke);
  })
  .catch((err) => console.error(err.message));

// Repeated calls = new jokes each time

lekeAa(url)
  .then((data) => {
    data.data.type === "twopart"
      ? console.log(
          `Setup : ${data.data.setup}\n\nDelivery : ${data.data.delivery}`
        )
      : console.log(data.data.joke);
  })
  .catch((err) => console.error(err.message));

lekeAa(url)
  .then((data) => {
    data.data.type === "twopart"
      ? console.log(
          `Setup : ${data.data.setup}\n\nDelivery : ${data.data.delivery}`
        )
      : console.log(data.data.joke);
  })
  .catch((err) => console.error(err.message));
