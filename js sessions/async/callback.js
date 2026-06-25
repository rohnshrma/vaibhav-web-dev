// Function declaration
// sendRequest is a reusable function to make an HTTP request
// It accepts:
// 1. url → API endpoint to send request to
// 2. handler → callback function to handle success or error
function sendRequest(url, handler) {
  // Create a new XMLHttpRequest object
  // This object allows us to send HTTP requests in the browser
  let request = new XMLHttpRequest();

  // Add an event listener to track changes in request state
  // readystatechange runs every time the request state changes
  request.addEventListener("readystatechange", () => {
    // readyState === 4 means request is completed
    // status === 200 means request succeeded
    if (request.readyState === 4 && request.status === 200) {
      // Call the handler callback with success data
      // First argument = success object
      // Second argument = null (no error)
      handler(
        {
          // Convert JSON string into JavaScript object
          data: JSON.parse(request.responseText),

          // Send readyState for debugging/learning
          readyState: request.readyState,

          // Custom success message
          message: "SUCCESS",
        },
        null
      );

      // If request finished but status is not 200 → error case
    } else if (request.readyState === 4 && request.status !== 200) {
      // Call handler with error object
      // First argument = null (no success data)
      // Second argument = error info
      handler(null, {
        data: null,
        readyState: request.readyState,
        message: "Failed",
      });
    }
  });

  // Define request method and URL
  // "GET" means we are fetching data
  // Other methods: POST, PUT, PATCH, DELETE
  request.open("GET", url);

  // Send the request to the server
  request.send();
}

// Example single request (commented out)
// Demonstrates basic callback usage
// sendRequest("https://jsonplaceholder.typicode.com/todos/4", (data, err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// ---------------- CALLBACK HELL EXAMPLE ----------------

// Callback hell = deeply nested callbacks
// Happens when async operations depend on previous results
// Code becomes hard to read & maintain

sendRequest("https://jsonplaceholder.typicode.com/todos/1", (data, err) => {
  // Error handling for first request
  if (err) {
    console.log(err);
  } else {
    console.log(data);

    // Second request starts AFTER first finishes
    sendRequest("https://jsonplaceholder.typicode.com/todos/2", (data, err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);

        // Third request depends on second
        sendRequest(
          "https://jsonplaceholder.typicode.com/todos/3",
          (data, err) => {
            if (err) {
              console.log(err);
            } else {
              console.log(data);

              // Fourth request depends on third
              sendRequest(
                "https://jsonplaceholder.typicode.com/todos/4",
                (data, err) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(data);
                  }
                }
              );
            }
          }
        );
      }
    });
  }
});
