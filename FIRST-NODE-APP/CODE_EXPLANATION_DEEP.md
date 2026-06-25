# `server.js` Setup + Full Line-by-Line Explanation

This guide covers `server.js`, and now also includes the new contact form submission flow.

---

## 1) Project Setup Steps (from scratch)

### Step 1: Create `server.js`

Create a new file in project root:

```bash
touch server.js
```

Windows Command Prompt:

```bat
type nul > server.js
```

---

### Step 2: Initialize npm

```bash
npm init -y
```

What this does:
- Creates `package.json` with default values.
- Enables dependency and script management.

---

### Step 3: Change project to ES Module mode

In `package.json`, add:

```json
{
  "type": "module"
}
```

Why:
- Allows `import ... from ...` syntax in Node.js.
- Without this, Node expects CommonJS (`require`) by default.

---

### Step 4: Add scripts (`dev` and `start`)

In `package.json`, under `scripts`:

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

Why:
- `npm run dev` starts with auto-reload (nodemon).
- `npm start` runs normal production-style Node process.

---

### Step 5: Install dependencies

Requested core installs:

```bash
npm install express
npm install --save-dev nodemon
```

For your current code (because `server.js` uses `morgan` too), also install:

```bash
npm install morgan
```

---

### Step 6: Run server

Development:

```bash
npm run dev
```

Normal run:

```bash
npm start
```

---

## 2) Current `server.js` (full)

```js
import express from "express";
import morgan from "morgan";
import { cwd } from "node:process";
const app = express();

const PORT = 3000;

const profiles = [];

//
app.use(morgan("dev"));

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

//routes

// home (root)

app.route("/").get((req, res) => {
  res.sendFile(`${cwd()}/pages/index.html`);
});

// about
app.route("/about").get((req, res) => {
  res.sendFile(`${cwd()}/pages/about.html`);
});

// contact
app
  .route("/contact")
  .get((req, res) => {
    res.sendFile(`${cwd()}/pages/contact.html`);
  })
  .post((req, res) => {
    profiles.push(req.body);
    res.sendFile(`${cwd()}/pages/success.html`);
  });

app.use((req, res) => {
  res.status(404).sendFile(`${cwd()}/pages/404.html`);
});

app.listen(PORT, () => console.log("Server started on port : ", PORT));
```

---

## 3) Line-by-Line Explanation (updated for the new contact flow)

### Line 1

```js
import express from "express";
```

- Imports Express framework.
- Express handles routing, middleware, and response APIs.

### Line 2

```js
import morgan from "morgan";
```

- Imports Morgan logger middleware.
- Logs incoming HTTP requests in terminal.

### Line 3

```js
import { cwd } from "node:process";
```

- Imports `cwd()` from Node process module.
- `cwd()` returns current working directory.
- Used to build absolute paths for `sendFile`.

### Line 4

```js
const app = express();
```

- Creates Express application instance.
- `app` is the main object where middleware/routes are registered.

### Line 5

```js

```

- Blank line for readability.

### Line 6

```js
const PORT = 3000;
```

- Defines server port number.
- App will listen on `http://localhost:3000`.

### Line 7

```js

```

- Blank line for readability.

### Line 8

```js
const profiles = [];
```

- Creates an in-memory array to store submitted contact/profile form data.
- This data is temporary and resets whenever the server restarts.

### Line 9

```js

```

- Blank line for readability.

### Line 10

```js
//
```

- Comment line only.
- No runtime behavior.

### Line 11

```js
app.use(morgan("dev"));
```

- Registers Morgan middleware globally.
- `"dev"` format prints compact request logs (method, URL, status, time).
- `app.use(...)` means run for every request.

### Line 12

```js

```

- Blank line.

### Line 13

```js
app.use(express.static("public"));
```

- Serves static files from `public/` directory.
- Example: `/styles.css` maps to `public/styles.css`.
- Important for CSS/images/js assets.

### Line 14

```js

```

- Blank line.

### Line 15

```js
app.use(express.urlencoded({ extended: true }));
```

- Parses HTML form data sent with `application/x-www-form-urlencoded`.
- Makes submitted values available on `req.body`.
- Needed because the contact form submits with `method="post"`.

### Line 16

```js

```

- Blank line.

### Line 17

```js
//routes
```

- Comment label for route section.

### Line 18

```js

```

- Blank line.

### Line 19

```js
// home (root)
```

- Comment indicating next route is root path.

### Line 20

```js

```

- Blank line.

### Line 21

```js
app.route("/").get((req, res) => {
```

- Starts GET route for `/`.
- `req` = incoming request object.
- `res` = outgoing response object.
- `app.route("/").get(...)` defines handler for HTTP GET on root.

### Line 22

```js
  res.sendFile(`${cwd()}/pages/index.html`);
```

- Sends `pages/index.html` to browser.
- Uses absolute path with `cwd()` to avoid path resolution issues.

### Line 23

```js
});
```

- Ends root route callback and route definition.

### Line 24

```js

```

- Blank line.

### Line 25

```js
// about
```

- Comment indicating next route is for the About page.

### Line 26

```js
app.route("/about").get((req, res) => {
```

- Starts GET route for `/about`.

### Line 27

```js
  res.sendFile(`${cwd()}/pages/about.html`);
```

- Sends `pages/about.html`.

### Line 28

```js
});
```

- Ends `/about` route block.

### Line 29

```js

```

- Blank line.

### Line 30

```js
// contact
```

- Comment indicating the next route handles the contact page and submissions.

### Line 31

```js
app
```

- Starts a chained route definition.
- This lets you attach multiple handlers (`GET`, `POST`) to the same path.

### Line 32

```js
  .route("/contact")
```

- Selects the `/contact` route path once.
- The following `.get(...)` and `.post(...)` handlers both belong to this same path.

### Line 33

```js
  .get((req, res) => {
```

- Starts the GET handler for `/contact`.
- This is what shows the form page in the browser.

### Line 34

```js
    res.sendFile(`${cwd()}/pages/contact.html`);
```

- Sends `pages/contact.html`.
- That file contains the profile submission form.

### Line 35

```js
  })
```

- Ends the GET handler.
- Keeps the chain open so a POST handler can be added next.

### Line 36

```js
  .post((req, res) => {
```

- Starts the POST handler for `/contact`.
- This runs when the form is submitted from `contact.html`.

### Line 37

```js
    profiles.push(req.body);
```

- Adds the submitted form data object to the `profiles` array.
- `req.body` contains the parsed form fields because of `express.urlencoded(...)`.

### Line 38

```js
    res.sendFile(`${cwd()}/pages/success.html`);
```

- Sends the new success page after the form is submitted.
- This replaces the earlier inline HTML response.

### Line 39

```js
  });
```

- Ends the POST handler and completes the `/contact` route chain.

### Line 40

```js

```

- Blank line.

### Line 41

```js
app.use((req, res) => {
```

- Catch-all middleware for unmatched routes.
- Because it is placed after known routes, it runs only when no route matched.

### Line 42

```js
  res.status(404).sendFile(`${cwd()}/pages/404.html`);
```

- Sets HTTP status to `404`.
- Sends custom 404 page (`pages/404.html`).

### Line 43

```js
});
```

- Ends catch-all middleware block.

### Line 44

```js

```

- Blank line.

### Line 45

```js
app.listen(PORT, () => console.log("Server started on port : ", PORT));
```

- Starts HTTP server on `PORT`.
- Callback runs once server is listening.
- Logs startup message in terminal.

---

## 4) New Contact Route Flow

The `/contact` route now supports both showing the form and processing the form:

### `GET /contact`

- Sends `pages/contact.html`.
- This displays the profile submission form to the user.

### `POST /contact`

- Receives the submitted form fields.
- Stores them in `profiles`.
- Sends `pages/success.html`.

This is possible because the form in `contact.html` uses:

```html
<form action="/contact" method="post">
```

So the browser sends the form data to the same `/contact` path, but using a `POST` request instead of `GET`.

---

## 5) Success Page Explanation

After a successful form submission, this line runs:

```js
res.sendFile(`${cwd()}/pages/success.html`);
```

That sends the new `success.html` page to the browser.

Why this is better than `res.send("<div>...</div>")`:
- The HTML stays in its own page file.
- The success page can reuse the same styling and navbar.
- It is easier to maintain and edit later.

The success page contains:
- a centered card
- a success message saying the profile was added
- a button linking back to the homepage

---

## 6) Example Submitted Data

When the user submits the form, `req.body` can look like this:

```js
{
  owner: "Alex Johnson",
  email: "alex@email.com",
  dog_name: "Milo",
  breed: "Golden Retriever",
  age: "3",
  type: "Featured Pet",
  city: "New York",
  bio: "Friendly and energetic."
}
```

That full object is what gets pushed into:

```js
profiles
```

---

## 7) Execution Order (important concept)

For any request, Express processes top-to-bottom:

1. `morgan("dev")` logs request.
2. `express.static("public")` tries to serve static file.
3. `express.urlencoded({ extended: true })` parses form bodies for POST requests.
4. Named routes (`/`, `/about`, `/contact`) are checked.
5. If no route matches, catch-all returns `404` page.

This order is why the 404 handler must stay near the end.

---

## 8) Important Limitation

This line:

```js
const profiles = [];
```

means the submitted profiles are stored only in server memory.

So:
- data is not permanent
- restarting the server clears all submissions
- a database or file storage would be needed for real persistence
