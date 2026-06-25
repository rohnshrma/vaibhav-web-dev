// ================================
// API CALL USING fetch()
// ================================

// We store the API link inside a variable
// A variable is a container that stores data
// Here the data is a URL (web address)

let url = "https://v.jokeapi.dev/joke/Any";

// fetch() is a built-in JavaScript function
// It is used to request data from the internet (API / server)
// It returns a PROMISE

// 👉 PROMISE = something that will finish in the future
// It can be:
// 1. success (resolved)
// 2. failure (rejected)

fetch(url)
  // .then() runs when the promise is successful
  // The server sends a RESPONSE
  // response = raw data from the server
  // We convert it into JSON format

  .then((response) => response.json())

  // response.json() is ALSO asynchronous
  // It returns another promise
  // So we use another .then()

  // data = actual usable data (JavaScript object)
  // Now we can read or display it

  .then((data) => console.log(data))

  // console.log() prints the data in browser console
  // You can open console using:
  // Right click → Inspect → Console tab

  // .catch() runs if something goes wrong
  // For example:
  // ❌ no internet
  // ❌ wrong URL
  // ❌ server error

  .catch((err) => console.log(err));

// ================================
// SUMMARY
// ================================

// 1. fetch(url) → ask server for data
// 2. .then(response) → convert response to JSON
// 3. .then(data) → use the data
// 4. .catch(error) → handle errors
