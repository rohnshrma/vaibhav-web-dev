# `server.js` Step-By-Step Snippets

## Step 1: Import modules
```js
import http from "http";
import { cwd } from "process";
import fs from "fs";
```
- `http`: create server
- `fs`: read files
- `cwd()`: absolute path from project root

## Step 2: Create server
```js
const server = http.createServer((req, res) => {
  // route logic goes here
});
```
- Callback runs for every request.
- `req.url` tells requested route.

## Step 3: Home route (`/` and `/index.html`)
```js
if (req.url === "/" || req.url === "/index.html") {
  const filePath = `${cwd()}/pages/index.html`;
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "content-type": "text/plain" });
      res.end("Sorry, Something went wrong");
      return;
    }
    res.writeHead(200, { "content-type": "text/html" });
    res.end(data);
  });
  return;
}
```
- On success: sends `index.html`.
- On error: sends `500`.

## Step 4: API route (`/api`)
```js
if (req.url === "/api") {
  res.writeHead(200, { "content-type": "application/json" });
  res.write(JSON.stringify({ message: "API IS RUNNING", status: 200 }));
  res.end();
  return;
}
```
- Sends JSON response with status `200`.

## Step 5: About route (`/about`)
```js
if (req.url === "/about") {
  const filePath = `${cwd()}/pages/about.html`;
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "content-type": "text/plain" });
      res.end("Sorry, Something went wrong");
      return;
    }
    res.writeHead(200, { "content-type": "text/html" });
    res.end(data);
  });
  return;
}
```
- On success: sends `about.html`.
- On error: sends `500`.

## Step 6: Fallback 404 route
```js
res.writeHead(404, { "content-type": "text/html" });
res.end("<h1>Nahi Hai Wapas Jao</h1><a href='/'>Simon Go Back</a>");
```
- Runs when no route matched.

## Step 7: Start server
```js
server.listen(3000, () => {
  console.log("server running on port : 3000");
});
```
- Server starts on port `3000`.
- Terminal prints startup message.

## Step 8: Full flow (combined)
```js
import http from "http";
import { cwd } from "process";
import fs from "fs";

const server = http.createServer((req, res) => {
  if (req.url === "/" || req.url === "/index.html") {
    const filePath = `${cwd()}/pages/index.html`;
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "content-type": "text/plain" });
        res.end("Sorry, Something went wrong");
        return;
      }
      res.writeHead(200, { "content-type": "text/html" });
      res.end(data);
    });
    return;
  }

  if (req.url === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.write(JSON.stringify({ message: "API IS RUNNING", status: 200 }));
    res.end();
    return;
  }

  if (req.url === "/about") {
    const filePath = `${cwd()}/pages/about.html`;
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "content-type": "text/plain" });
        res.end("Sorry, Something went wrong");
        return;
      }
      res.writeHead(200, { "content-type": "text/html" });
      res.end(data);
    });
    return;
  }

  res.writeHead(404, { "content-type": "text/html" });
  res.end("<h1>Nahi Hai Wapas Jao</h1><a href='/'>Simon Go Back</a>");
});

server.listen(3000, () => {
  console.log("server running on port : 3000");
});
```
