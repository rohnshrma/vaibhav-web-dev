// =======================================
// STEP 1 — STORE API URL
// =======================================

// Variable that stores the joke API address
// API = server that sends us data

let url = "https://v2.jokeapi.dev/joke/Any";

// =======================================
// STEP 2 — FUNCTION THAT RETURNS A PROMISE
// =======================================

// lekeAa() means "bring the data"
// This function fetches data from the server

function lekeAa(url) {
  // We return a Promise
  // Promise = a future result (success or failure)

  return new Promise((resolve, reject) => {
    // XMLHttpRequest is used to talk to the server
    // It sends a request and receives a response

    let request = new XMLHttpRequest();

    // This event runs every time request state changes
    request.addEventListener("readystatechange", () => {
      // readyState === 4 → request finished
      // status === 200 → success

      if (request.readyState === 4 && request.status === 200) {
        // JSON.parse converts text → JavaScript object

        resolve({
          data: JSON.parse(request.responseText),
          readyState: request.readyState,
          message: "SUCCESS",
        });
      }

      // If request finished but failed
      else if (request.readyState === 4 && request.status !== 200) {
        reject({
          data: null,
          readyState: request.readyState,
          message: "Failed",
        });
      }
    });

    // Open connection to server
    // "GET" means we want to receive data

    request.open("GET", url);

    // Send the request
    request.send();
  });
}

// =======================================
// STEP 3 — ASYNC FUNCTION
// =======================================

// async function allows us to use "await"
// await pauses the function until promise finishes

async function handleRequest(url) {
  try {
    // await waits for lekeAa(url) to finish
    // data = resolved promise result

    let data = await lekeAa(url);

    // API gives 2 joke types:
    // "single" or "twopart"

    // Ternary operator checks joke type

    data.data.type === "twopart"
      ? console.log(
          `Setup : ${data.data.setup}\n\nDelivery : ${data.data.delivery}`
        )
      : console.log(data.data.joke);
  } catch (err) {
    // catch handles errors (same as .catch())
    console.log(err);
  }
}

// =======================================
// STEP 4 — CALL FUNCTION MULTIPLE TIMES
// =======================================

// Each call fetches a NEW random joke
// All run independently

handleRequest(url);
handleRequest(url);
handleRequest(url);
handleRequest(url);
handleRequest(url);
handleRequest(url);

// ===========

// Promise = future result
// resolve = success
// reject = failure
// async = allows await
// await = wait for promise
// try/catch = handle errors
// XMLHttpRequest = talk to server
// JSON.parse = text → object
