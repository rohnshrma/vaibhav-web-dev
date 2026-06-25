// AJAX using XMLHttpRequest
// AJAX = Asynchronous JavaScript And XML
// It allows us to request data from a server without refreshing the page

// Create a new XMLHttpRequest object
// This object is used to communicate with a server
let request = new XMLHttpRequest();

// Add an event listener to track request state changes
// "readystatechange" fires every time readyState changes (0 → 4)
request.addEventListener("readystatechange", () => {
  // Check if request is complete AND successful
  // readyState 4 = finished
  // status 200 = HTTP success
  if (request.readyState === 4 && request.status === 200) {
    // Convert server response (JSON string) into JS object
    // JSON.parse turns text into usable data
    console.log({
      data: JSON.parse(request.responseText),
      readyState: request.readyState,
      message: "SUCCESS",
    });

    // If request finished but failed (not 200 status)
  } else if (request.readyState === 4 && request.status !== 200) {
    // Show failure object
    console.log({
      data: null,
      readyState: request.readyState,
      message: "Failed",
    });
  }
});

// Prepare the HTTP request
// open(method, url)
// GET = request data from server
// Other methods: POST, PUT, PATCH, DELETE
request.open("GET", "https://jsonplaceholder.typicode.com/todos/1");

// Send the request to the server
request.send();

// readyState values (lifecycle of a request):

// 0 → UNSENT
// Request created but open() not called yet

// 1 → OPENED
// open() called, connection established

// 2 → HEADERS RECEIVED
// send() called, server responded with headers

// 3 → LOADING
// Data is downloading

// 4 → DONE
// Request complete (success or failure)
