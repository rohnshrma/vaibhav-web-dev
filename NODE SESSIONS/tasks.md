# Step-By-Step Explanation To Get The Output Of `server.js`

1. Start the server
   - Run `npm start` (or `node server.js`).
   - Node executes `server.js` and loads `http`, `fs`, and `cwd`.
   - `server.listen(3000, ...)` opens port `3000`.
   - Terminal output: `server running on port : 3000`.

2. Browser sends a request
   - Example: `http://localhost:3000/`.
   - The callback inside `http.createServer((req, res) => { ... })` runs for every request.
   - `req.url` decides which block of code will execute.

3. Output for home route (`/` or `/index.html`)
   - Code builds path: `${cwd()}/pages/index.html`.
   - `fs.readFile(...)` reads the file.
   - If file read fails: response is `500` with text `Sorry, Something went wrong`.
   - If file read succeeds: response is `200` with `text/html`, and browser shows `index.html`.

4. Output for API route (`/api`)
   - Server sets `content-type` to `application/json`.
   - Server sends:
     - `{ "message": "API IS RUNNING", "status": 200 }`
   - Browser/Postman output is JSON with status `200`.

5. Output for about route (`/about`)
   - Code builds path: `${cwd()}/pages/about.html`.
   - `fs.readFile(...)` reads the file.
   - On error: `500` + error text.
   - On success: `200` + `text/html`, and browser shows `about.html`.

6. Output for unknown routes (fallback)
   - Example: `http://localhost:3000/xyz`.
   - No route matches, so fallback block executes.
   - Server returns `404` with custom HTML:
     - `Nahi Hai Wapas Jao`
     - Link: `Simon Go Back` (goes to `/`).

7. Why `return` is used in each route block
   - After sending one response, `return` stops further route checks.
   - This prevents sending multiple responses for one request.

8. Final response rule
   - Every route ends with `res.end(...)`.
   - Without `res.end`, request hangs and browser keeps loading.
