# Server Flow

1. Node starts `server.js`.
2. Modules are loaded: `http`, `process.cwd`, and `fs`.
3. `http.createServer(...)` creates a server and registers one request handler callback.
4. `server.listen(3000, ...)` starts listening on port `3000`.
5. For every incoming request:
   - Node passes `req` (request object) and `res` (response object) to the callback.
6. Route matching happens in order:
   - `/` or `/index.html`:
     - Build file path for `pages/index.html`.
     - Read file with `fs.readFile`.
     - On error: return `500` with text message.
     - On success: return `200` with HTML file data.
   - `/api`:
     - Return `200` with `application/json`.
     - Send JSON payload: `{ message: "API IS RUNNING", status: 200 }`.
   - `/about`:
     - Build file path for `pages/about.html`.
     - Read file with `fs.readFile`.
     - On error: return `500`.
     - On success: return `200` with HTML file data.
   - Any other path:
     - Return `404` with a custom HTML page.
7. Response lifecycle:
   - `res.writeHead(...)` sets status and headers.
   - `res.write(...)` sends response body chunks (optional).
   - `res.end(...)` finishes the response.
