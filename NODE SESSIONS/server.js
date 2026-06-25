// Import Node's built-in HTTP module to create an HTTP server.
import http from "http";

// Import cwd() to get the current working directory at runtime.
import { cwd } from "process";

// Import Node's file system module to read HTML files from disk.
import fs from "fs";

// Create an HTTP server.
// The callback runs for every incoming request (request-response cycle).
const server = http.createServer((req, res) => {
  // Route 1: Home page.
  // If URL is "/" or "/index.html", serve pages/index.html.
  if (req.url === "/" || req.url === "/index.html") {
    // Build an absolute path to the file using current working directory.
    const filePath = `${cwd()}/pages/index.html`;

    // Read the file asynchronously (non-blocking I/O).
    fs.readFile(filePath, (err, data) => {
      // If read fails, return a 500 Internal Server Error.
      if (err) {
        res.writeHead(500, { "content-type": "text/plain" });
        res.end("Sorry, Something went wrong");
        return;
      }

      // If read succeeds, return 200 OK with HTML content.
      res.writeHead(200, { "content-type": "text/html" });
      res.end(data);
    });

    // End this route branch early so other branches are skipped.
    return;
  }

  // Route 2: API endpoint.
  // Sends JSON text instead of an HTML page.
  if (req.url === "/api") {
    // Set proper JSON content type for API responses.
    res.writeHead(200, { "content-type": "application/json" });

    // Convert a JavaScript object into JSON string.
    res.write(JSON.stringify({ message: "API IS RUNNING", status: 200 }));

    // End the response stream.
    res.end();
    return;
  }

  // Route 3: About page.
  // If URL is "/about", serve pages/about.html.
  if (req.url === "/about") {
    // Build absolute path to about page file.
    const filePath = `${cwd()}/pages/about.html`;

    // Read about.html asynchronously.
    fs.readFile(filePath, (err, data) => {
      // Handle file-read failure.
      if (err) {
        res.writeHead(500, { "content-type": "text/plain" });
        res.end("Sorry, Something went wrong");
        return;
      }

      // Send about page as HTML when file is available.
      res.writeHead(200, { "content-type": "text/html" });
      res.end(data);
    });
    return;
  }

  // Fallback route: any unknown URL reaches here.
  // Return 404 Not Found with a small HTML message page.
  res.writeHead(404, { "content-type": "text/html" });
  res.end(`
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }
      body {
        padding: 4rem;
        text-align: center;
        font-family: cursive;
      }
    </style>
  </head>
  <body>
    <h1>Nahi Hai Wapas Jao</h1>
    <a href="/">Simon Go Back</a>
  </body>
</html>

      `);
});

// Start listening on TCP port 3000.
// Callback runs once when server starts successfully.
server.listen(3000, () => {
  console.log("server running on port : 3000");
});
