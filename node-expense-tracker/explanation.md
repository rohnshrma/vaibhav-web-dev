# Expense Tracker: Full Explanation

This document explains the code and the concepts used in this project in one place, so the source files can stay clean and easy to read.

## 1. What This Project Is

This is a basic server-rendered expense tracker built with:

- `Node.js`
- `Express`
- `MongoDB`
- `Mongoose`
- `EJS`
- `dotenv`

The app lets a user:

1. open the home page
2. add an expense
3. view all expenses
4. see the total amount
5. update an existing expense
6. delete an expense

Even though the app is small, it teaches the full backend flow:

- request comes from browser
- Express receives it
- route decides what to do
- database is read or updated
- server sends HTML back

That makes this a very good beginner project for understanding how backend and frontend connect in a traditional Node.js app.

## 2. Project Structure

- `server.js`: starts the app, adds middleware, defines routes
- `config/db.js`: connects the app to MongoDB
- `models/expense.js`: defines the data structure using a Mongoose schema and model
- `views/home.ejs`: HTML template rendered by the server
- `views/edit.ejs`: HTML template rendered for editing one expense
- `public/style.css`: CSS file served as a static file
- `package.json`: scripts and dependencies

## 3. Big Picture Flow

Here is the full end-to-end flow of this app:

1. The user opens the site in the browser.
2. The browser sends an HTTP request to the server.
3. Express receives the request in `server.js`.
4. Middleware runs before the route handler.
5. The matching route handler executes.
6. If needed, the route talks to MongoDB using the `Expense` model.
7. Express sends a response:
   - either rendered HTML using EJS
   - or a redirect to another route
8. The browser displays the result.

This is the central idea you should remember:

- browser sends request
- server processes request
- database stores data
- template renders output
- browser shows result

## 4. What Happens When The App Starts

When you run:

```bash
npm start
```

or

```bash
npm run dev
```

Node.js runs `server.js`.

Inside `server.js`, the startup sequence is:

1. import required packages and files
2. create the Express app
3. load environment variables
4. connect to MongoDB
5. register middleware
6. register routes
7. start listening on a port

That means the server is prepared before the browser starts sending requests.

## 5. Understanding `server.js`

File: [server.js](/Users/rohan/Desktop/Rohan%20Desktop/Classes/vaibhav%20web%20dev%20sessions/node-expense-tracker/server.js:1)

### Imports

```js
import express from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import Expense from "./models/expense.js";
```

What each one does:

- `express`: gives us the web framework
- `config` from `dotenv`: loads `.env` variables into `process.env`
- `connectDB`: custom function for database connection
- `Expense`: Mongoose model used to query and save expenses

### Creating the app

```js
const app = express();
```

This creates the Express application object.

You can think of `app` as the main control center of the server.

Using `app`, we can:

- set middleware
- define routes
- configure settings
- start the server

### Loading environment variables

```js
config();
```

This reads values from a `.env` file.

Typical values are:

- `PORT`
- `MONGO_URI`

After loading them, we can use:

```js
process.env.PORT
process.env.MONGO_URI
```

This is useful because secret or environment-specific values should not be hardcoded directly into the project.

### Connecting the database

```js
connectDB();
```

This starts the MongoDB connection logic from `config/db.js`.

The app depends on the database for:

- loading expenses
- creating expenses
- updating expenses
- deleting expenses

So connecting early is important.

### Port setup

```js
const PORT = process.env.PORT || 3000;
```

This means:

- if `PORT` exists in `.env`, use that
- otherwise use `3000`

This is called a fallback value.

## 6. Middleware Concept

Middleware is a very important Express concept.

Middleware is code that runs during the request-response cycle before the final response is sent.

Think of middleware as a processing layer between:

- request coming in
- route sending response out

This project uses two main middleware functions and one app setting:

```js
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
```

### `express.static("public")`

This serves static files from the `public` folder.

Static files are files that can be sent directly without route logic, such as:

- CSS
- images
- client-side JavaScript

Example:

When the browser sees:

```html
<link rel="stylesheet" href="/style.css" />
```

it requests `/style.css`.

Express checks the `public` folder and sends:

```txt
public/style.css
```

Without this middleware, the CSS file would not load.

### `express.urlencoded({ extended: true })`

This middleware parses form data.

When a user submits a normal HTML form, the browser sends values in URL-encoded format.

Example form fields:

```html
<input name="name" />
<input name="amount" />
```

After this middleware runs, Express gives you:

```js
req.body = {
  name: "...",
  amount: "..."
};
```

That is why the add route can use:

```js
req.body.name
req.body.amount
```

Without this middleware, `req.body` would be missing for form submissions.

### `app.set("view engine", "ejs")`

This tells Express which template engine to use when calling `res.render()`.

So when the route does:

```js
res.render("home", data);
```

Express knows it should:

1. open `views/home.ejs`
2. inject the data
3. convert the template into final HTML
4. send that HTML to the browser

## 7. Route Concept

Routes tell the server what to do for a given URL and HTTP method.

A route is made of:

- path
- method
- handler function

Examples of methods:

- `GET`
- `POST`
- `PUT`
- `DELETE`

In this project, we use:

- `GET /`
- `POST /add-expense`
- `GET /update/:id`
- `POST /update/:id`
- `POST /delete/:id`

### Why method matters

The same path can behave differently depending on method.

For example:

- `GET /users` could fetch users
- `POST /users` could create a user

In this app:

- `GET /` loads the page
- `POST /add-expense` creates new data
- `GET /update/:id` loads the edit page for one expense
- `POST /update/:id` updates existing data
- `POST /delete/:id` deletes data

## 8. Understanding `app.route(...)`

This app uses:

```js
app.route("/").get(...)
```

instead of:

```js
app.get("/", ...)
```

Both work.

`app.route("/path")` is useful when you want to group multiple methods for the same path.

Example:

```js
app.route("/user")
  .get(...)
  .post(...)
```

In this project only one method is used per path, but `app.route()` is still valid.

## 9. The Home Route: `GET /`

Code lives in [server.js](/Users/rohan/Desktop/Rohan%20Desktop/Classes/vaibhav%20web%20dev%20sessions/node-expense-tracker/server.js:13)

Purpose of this route:

- fetch all expenses from MongoDB
- calculate the total
- render the `home.ejs` page

Core logic:

```js
const expenses = await Expense.find({});
res.render("home", {
  expenses,
  total: calculateTotalExpenses(expenses),
});
```

### Step-by-step flow

1. User opens `/`
2. Browser sends `GET /`
3. Express matches the `/` route
4. Route queries MongoDB using `Expense.find({})`
5. Route calculates total from all expense amounts
6. Route renders `home.ejs`
7. Browser receives HTML and shows the list

### `Expense.find({})`

This means:

- use the `Expense` model
- find documents in the expenses collection
- `{}` means no filter
- so return all expenses

### `calculateTotalExpenses(expenses)`

This helper uses `reduce()`:

```js
expenses.reduce((total, expense) => total + expense.amount, 0);
```

How `reduce()` works here:

1. start total at `0`
2. take the first expense and add its amount
3. continue adding each next amount
4. return the final total

Example:

If expenses are:

```js
[
  { amount: 100 },
  { amount: 200 },
  { amount: 50 }
]
```

then the total becomes:

```txt
0 + 100 = 100
100 + 200 = 300
300 + 50 = 350
```

## 10. The Add Route: `POST /add-expense`

Code lives in [server.js](/Users/rohan/Desktop/Rohan%20Desktop/Classes/vaibhav%20web%20dev%20sessions/node-expense-tracker/server.js:24)

Purpose of this route:

- receive form data
- validate the data
- insert a new document into MongoDB
- redirect to the home page

Core logic:

```js
const name = req.body.name?.trim();
const amount = Number(req.body.amount);
```

### Step-by-step flow

1. User fills the form in `home.ejs`
2. User clicks submit
3. Browser sends `POST /add-expense`
4. `express.urlencoded()` middleware parses form data
5. Route reads `req.body`
6. Route validates values
7. Route creates a new expense in MongoDB
8. Route redirects to `/`
9. Browser requests `/` again
10. Updated expense list appears

### Why `trim()` is used on name

`trim()` removes extra spaces from the beginning and end.

Example:

```js
"  food  ".trim()
```

becomes:

```js
"food"
```

This keeps input cleaner.

### Why `Number(...)` is used

Form values usually arrive as strings.

So even if the user types `250`, the server often receives:

```js
"250"
```

Using:

```js
Number(req.body.amount)
```

converts that string into a real number:

```js
250
```

This is important because calculations should use numbers, not strings.

### Validation in this route

This check is used:

```js
if (!name || Number.isNaN(amount) || amount <= 0)
```

What it prevents:

- empty name
- invalid numeric input
- zero or negative values

This is application-level validation.

The schema also adds validation rules, so the project has protection in two places.

### `Expense.create(...)`

This inserts a new document.

It also checks schema rules before saving.

If successful, MongoDB stores something like:

```js
{
  _id: "...",
  name: "groceries",
  amount: 250
}
```

## 11. The Update Routes: `GET /update/:id` and `POST /update/:id`

Code lives in [server.js](/Users/rohan/Desktop/Rohan%20Desktop/Classes/vaibhav%20web%20dev%20sessions/node-expense-tracker/server.js:61) and [edit.ejs](/Users/rohan/Desktop/Rohan%20Desktop/Classes/vaibhav%20web%20dev%20sessions/node-expense-tracker/views/edit.ejs:1)

Purpose of these routes:

- open an edit page for one specific expense
- load the old values into the form
- allow the user to change those values
- validate the submitted update
- save the new values in MongoDB
- redirect back to the home page

This feature uses two routes because editing has two different jobs:

- `GET /update/:id` shows the edit form
- `POST /update/:id` processes the submitted form

### Part A: Why the edit link starts in `home.ejs`

Inside `home.ejs`, each expense has an edit button:

```ejs
<a href="/update/<%= expenseObj._id %>">
  <button class="update-btn" type="submit">Edit</button>
</a>
```

What this does:

- `<%= expenseObj._id %>` prints the current expense id into the URL
- EJS builds a unique URL for every expense
- if one expense id is `abc123`, the browser receives `/update/abc123`
- clicking that link sends a `GET` request, because links naturally open pages with `GET`

So the home page is not updating data directly.
It is only taking the user to the correct edit page for the selected expense.

### Part B: `GET /update/:id`

Core logic:

```js
const { id } = req.params;

const expense = await Expense.findById(id);
if (!expense) {
  console.log("Expense not found");
  return res.redirect("/");
}

res.render("edit", {
  expense,
});
```

Step-by-step flow:

1. User clicks the edit button on the home page
2. Browser sends `GET /update/<expense-id>`
3. Express matches the route `GET /update/:id`
4. Express puts the dynamic URL value inside `req.params.id`
5. Route calls `Expense.findById(id)` to fetch exactly one expense
6. If no document exists, the route redirects to `/`
7. If the document exists, the route renders `edit.ejs`
8. `expense` is passed into the EJS template
9. Browser receives a form already filled with the current data

### Why `findById(id)` is used here

The edit page should show one existing expense, not the whole list.

So this is the correct question for the database:

- "give me the expense whose `_id` matches this URL id"

That is exactly what `findById(id)` means.

### Part C: How `edit.ejs` works

File: [edit.ejs](/Users/rohan/Desktop/Rohan%20Desktop/Classes/vaibhav%20web%20dev%20sessions/node-expense-tracker/views/edit.ejs:1)

The server renders this file using:

```js
res.render("edit", { expense });
```

That means the variable `expense` becomes available inside the template.

Annotated version:

```ejs
<form
  class="expense-form"
  action="/update/<%= expense._id %>"  <%# Sends the edited data back to the same expense id %>
  method="POST"                        <%# Uses POST because this submission changes data in the database %>
>
  <div class="field">
    <label for="name">Expense Name</label>
    <input
      type="text"
      id="name"
      name="name"                      <%# This key becomes req.body.name on the server %>
      placeholder="Groceries"
      value="<%= expense.name %>"      <%# Prefills the input with the current saved name %>
    />
  </div>

  <div class="field">
    <label for="amount">Amount</label>
    <input
      type="number"
      id="amount"
      name="amount"                    <%# This key becomes req.body.amount on the server %>
      placeholder="250"
      min="0"
      step="0.01"
      value="<%= expense.amount %>"    <%# Prefills the input with the current saved amount %>
    />
  </div>

  <button class="primary-btn" type="submit">Update Expense</button>
</form>
```

### Logic behind the EJS values

#### `action="/update/<%= expense._id %>"`

This is very important.

The form submission must tell the server which expense should be updated.

So EJS inserts the current document id directly into the form action.

Example:

```txt
/update/67f123abc
```

When the user submits the form, Express can read that id from `req.params.id`.

#### `value="<%= expense.name %>"`

This prints the current name into the text input.

Without this line:

- the form would appear empty
- the user would not see the old value
- editing would feel like creating a new expense instead of modifying an old one

This is called pre-filling the form.

#### `value="<%= expense.amount %>"`

This does the same thing for the amount field.

So the user sees the old numeric value before changing it.

### Part D: `POST /update/:id`

Core logic:

```js
const { id } = req.params;
const name = req.body.name?.trim();
const amount = Number(req.body.amount);

if (!name || Number.isNaN(amount) || amount <= 0) {
  console.log("Name and amount are invalid");
  return res.redirect("/");
}

const expense = await Expense.findById(id);
if (!expense) {
  console.log("Expense not found");
  return res.redirect("/");
}

expense.name = name;
expense.amount = amount;

await expense.save();
```

Step-by-step flow:

1. User changes the prefilled values in `edit.ejs`
2. User clicks `Update Expense`
3. Browser sends `POST /update/<expense-id>`
4. `express.urlencoded()` converts form fields into `req.body`
5. Route reads the id from `req.params.id`
6. Route reads the edited values from `req.body.name` and `req.body.amount`
7. Route trims the name and converts amount into a number
8. Route validates the incoming values
9. Route checks whether the target expense still exists
10. Route updates the document fields in memory
11. `await expense.save()` writes the new values into MongoDB
12. Route redirects to `/`
13. Browser requests the home page again
14. User sees the updated expense in the list

### Why the route updates the document in two steps

The code does this:

```js
expense.name = name;
expense.amount = amount;

await expense.save();
```

This approach is useful for learning because it clearly shows:

- first we fetch the document
- then we change its fields
- then we save the document

Conceptually, it feels similar to editing an object in JavaScript and then persisting it.

### Why validation happens again in the update route

Even though the expense already exists in the database, the new submitted values could still be bad.

For example, the user could try to send:

- an empty name
- a non-numeric amount
- a zero or negative amount

So update routes need validation too, not only create routes.

### Complete update cycle in one line

Home page edit link -> `GET /update/:id` -> `edit.ejs` prefilled form -> `POST /update/:id` -> database save -> redirect to `/`

## 12. The Delete Route: `POST /delete/:id`

Code lives in [server.js](/Users/rohan/Desktop/Rohan%20Desktop/Classes/vaibhav%20web%20dev%20sessions/node-expense-tracker/server.js:41)

Purpose of this route:

- get an expense id from the URL
- verify the expense exists
- delete it
- redirect back to the home page

### What `:id` means

In Express, a colon in the route path creates a route parameter.

Example route:

```js
"/delete/:id"
```

If browser requests:

```txt
/delete/abc123
```

then Express gives:

```js
req.params.id === "abc123"
```

### Step-by-step flow

1. User clicks delete for one expense
2. Browser submits a form to `/delete/<expense-id>`
3. Express matches `POST /delete/:id`
4. Route reads `req.params.id`
5. Route checks whether the document exists
6. Route deletes it
7. Route redirects to `/`
8. Browser reloads the updated list

### Why check `findById()` before delete

This route first does:

```js
const expense = await Expense.findById(id);
```

Then if the expense exists, it does:

```js
await Expense.findByIdAndDelete(id);
```

This extra check is not strictly required, but it makes the logic clearer:

- first confirm the document exists
- then delete it

It also gives a place to handle the "not found" case cleanly.

## 13. `req` and `res`

Every Express route handler gets two important objects:

- `req`
- `res`

### `req`

`req` means request.

It contains incoming data from the browser.

Common parts:

- `req.body`: data sent from forms or JSON
- `req.params`: dynamic values from the URL path
- `req.query`: query string values

Examples from this project:

```js
req.body.name
req.body.amount
req.params.id
```

### `res`

`res` means response.

It is how the server sends something back.

Common methods:

- `res.render()`
- `res.redirect()`
- `res.send()`
- `res.json()`

This project mainly uses:

- `res.render("home", data)`
- `res.redirect("/")`

## 14. `res.render()` vs `res.redirect()`

This distinction is very important.

### `res.render()`

`res.render()` means:

- build HTML on the server
- send that HTML directly as the response

This is used in:

- `GET /`
- `GET /update/:id`

because the goal is to show the page.

### `res.redirect()`

`res.redirect()` means:

- tell the browser to go to another URL
- browser then sends a brand new request

This is used after:

- adding an expense
- updating an expense
- deleting an expense

Why?

Because after changing data, the app wants the browser to reload the latest list from `/`.

This is a common server-rendered pattern:

- POST changes data
- redirect to GET page

That pattern is often called Post/Redirect/Get.

## 15. Async/Await Deep Explanation

This is one of the key concepts in the whole project.

### Why asynchronous code exists

Some work takes time:

- database connection
- database queries
- reading files
- network requests

If JavaScript waited in a blocking way for every slow task, the server would freeze.

Instead, Node.js uses asynchronous operations.

### Promise

A promise is a JavaScript object that represents a future result.

A promise can be:

- pending
- fulfilled
- rejected

Database methods like:

- `mongoose.connect()`
- `Expense.find()`
- `Expense.create()`
- `Expense.findById()`
- `expense.save()`
- `Expense.findByIdAndDelete()`

return promises.

### `async`

When you write:

```js
async (req, res) => {}
```

you are telling JavaScript:

- this function contains asynchronous work
- inside this function, `await` is allowed

### `await`

When you write:

```js
const expenses = await Expense.find({});
```

JavaScript does this:

1. start the database query
2. pause this function until the result is ready
3. continue with the returned data

Important:

`await` does not freeze the whole server.
It only pauses the current async function.

That makes async code easier to read than `.then()` chains.

### Without `await`

If you tried:

```js
const expenses = Expense.find({});
```

then `expenses` would be a promise, not the final data.

So rendering would not work as expected.

## 16. `try/catch` and Error Handling

Each async route is wrapped in `try/catch`.

Example idea:

```js
try {
  const data = await somethingAsync();
} catch (err) {
  // handle error
}
```

Why this matters:

- database queries can fail
- invalid ids can cause errors
- connection problems can happen

Without error handling, the app could crash or hang unexpectedly.

In this project:

- errors are logged
- user is redirected back to `/`

That keeps the app simple while still preventing unhandled failures.

## 17. Database Connection: `config/db.js`

File: [config/db.js](/Users/rohan/Desktop/Rohan%20Desktop/Classes/vaibhav%20web%20dev%20sessions/node-expense-tracker/config/db.js:1)

Core logic:

```js
const conn = await mongoose.connect(process.env.MONGO_URI);
```

What this means:

1. read the MongoDB connection string from environment variables
2. ask Mongoose to connect
3. wait for connection to succeed
4. if it fails, jump to `catch`

### Why this file is separate

Keeping database code in a separate file is good practice because:

- `server.js` stays cleaner
- code is easier to maintain
- responsibility is separated

This is called separation of concerns.

### Why `process.exit(1)` is used

If MongoDB connection fails, the app exits:

```js
process.exit(1);
```

Why?

Because this app cannot function correctly without the database.

`1` means failure.

So instead of staying alive in a broken state, the process stops.

## 18. Mongoose Deep Explanation

Mongoose is a library that helps Node.js applications work with MongoDB in a more structured way.

MongoDB itself stores flexible JSON-like documents.

Mongoose adds:

- schemas
- models
- validation
- helper methods

### What is a schema

A schema defines the shape and rules of your documents.

In this project:

File: [expense.js](/Users/rohan/Desktop/Rohan%20Desktop/Classes/vaibhav%20web%20dev%20sessions/node-expense-tracker/models/expense.js:3)

```js
const expenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
});
```

### Understanding each schema rule

#### `name`

- `type: String`
  - the field should be text
- `required: true`
  - the field must exist
- `unique: true`
  - duplicate names should not be stored
- `lowercase: true`
  - convert to lowercase before saving
- `trim: true`
  - remove extra spaces around the text

#### `amount`

- `type: Number`
  - the value should be numeric
- `required: true`
  - every expense must have an amount
- `min: 0`
  - amount cannot be below 0

### Why `amount` should be `Number`

This is an important design point.

If `amount` is stored as a string:

- math becomes harder
- you need manual conversion all the time
- comparisons can behave incorrectly

Example:

```js
"10" + "20" // "1020"
```

But:

```js
10 + 20 // 30
```

Since this app calculates totals, `Number` is the correct type.

### What is a model

A model is created from a schema:

```js
const Expense = mongoose.model("expense", expenseSchema);
```

The model is the actual tool used to interact with the database.

With the model, we can do:

- `Expense.find({})`
- `Expense.create({...})`
- `Expense.findById(id)`
- update a fetched document and call `.save()`
- `Expense.findByIdAndDelete(id)`

Simple memory trick:

- schema = rules
- model = operations

## 19. EJS Deep Explanation

Files:

- [home.ejs](/Users/rohan/Desktop/Rohan%20Desktop/Classes/vaibhav%20web%20dev%20sessions/node-expense-tracker/views/home.ejs:1)
- [edit.ejs](/Users/rohan/Desktop/Rohan%20Desktop/Classes/vaibhav%20web%20dev%20sessions/node-expense-tracker/views/edit.ejs:1)

EJS stands for Embedded JavaScript.

It lets us write HTML templates that include JavaScript and dynamic values.

This is server-side rendering, which means:

- data is fetched on the server
- HTML is built on the server
- final HTML is sent to the browser

### Why EJS is useful here

The home page needs dynamic data:

- list of expenses
- total expense amount

The edit page also needs dynamic data:

- the exact expense being edited
- the existing name
- the existing amount

Instead of hardcoding HTML, EJS lets the server inject real data.

### EJS syntax used in this project

#### `<%= value %>`

Prints a value into HTML.

Examples:

```ejs
<%= total %>
<%= expenseObj.name %>
<%= expenseObj.amount %>
```

#### `<% code %>`

Runs JavaScript without directly printing it.

Example:

```ejs
<% if (expenses.length > 0) { %>
```

This controls which HTML block should appear.

### How the page is built

When `GET /` runs:

```js
res.render("home", { expenses, total });
```

EJS receives those values and uses them in the template.

That means:

- `expenses` becomes available in `home.ejs`
- `total` becomes available in `home.ejs`

When `GET /update/:id` runs:

```js
res.render("edit", { expense });
```

That means:

- `expense` becomes available in `edit.ejs`

### Looping through expenses

This code:

```ejs
<% expenses.forEach(expenseObj => { %>
```

means:

- take each item from the array
- repeat the HTML block once for each expense

If there are three expenses, the list item block is rendered three times.

### Conditional rendering

This part:

```ejs
<% if(expenses.length > 0){ %>
```

means:

- if there are expenses, show the list
- otherwise show the empty state message

That is dynamic rendering based on data.

### How `edit.ejs` uses EJS

The edit page uses EJS a little differently from the home page.

Instead of looping through many expenses, it focuses on one expense object.

Examples:

```ejs
action="/update/<%= expense._id %>"
value="<%= expense.name %>"
value="<%= expense.amount %>"
```

These lines let the server:

- generate the correct update URL for that one expense
- prefill the form with the existing saved values
- make editing feel like modifying current data instead of creating new data

## 20. Understanding the Form Flow

The add expense form is inside `home.ejs`.

Relevant concept:

```html
<form action="/add-expense" method="POST">
```

This means:

- send data to `/add-expense`
- use HTTP POST

Inside the form:

```html
<input name="name" />
<input name="amount" />
```

These `name` values are very important.

They become the keys inside `req.body`.

So:

- `name="name"` becomes `req.body.name`
- `name="amount"` becomes `req.body.amount`

That is how browser form data reaches the server.

The update form in `edit.ejs` follows the same principle:

```html
<form action="/update/<id>" method="POST">
```

and:

```html
<input name="name" value="old name" />
<input name="amount" value="old amount" />
```

So the browser sends:

- the target expense id through the URL
- the edited field values through the form body

## 21. Understanding the Delete Flow

The delete button is inside a form:

```html
<form action="/delete/<%= expenseObj._id %>" method="POST">
```

If one expense has `_id = 123`, the final rendered HTML becomes:

```html
<form action="/delete/123" method="POST">
```

When the user clicks delete:

1. browser sends `POST /delete/123`
2. Express matches `"/delete/:id"`
3. `req.params.id` becomes `"123"`
4. route deletes the matching document

This shows how server-side templates can generate dynamic URLs.

## 22. Request-Response Cycle in Real Examples

### Example A: Loading the home page

1. Browser sends `GET /`
2. Express receives request
3. matching route is found
4. route fetches expenses with `Expense.find({})`
5. route calculates total
6. route renders `home.ejs`
7. HTML is sent back
8. browser also requests `/style.css`
9. static middleware serves `public/style.css`
10. page is displayed

### Example B: Adding an expense

1. user fills form
2. browser sends `POST /add-expense`
3. Express parses form into `req.body`
4. route validates data
5. route saves to MongoDB
6. route redirects to `/`
7. browser sends new `GET /`
8. page reloads with new expense

### Example C: Deleting an expense

1. user clicks delete
2. browser sends `POST /delete/:id`
3. route reads `req.params.id`
4. route finds expense
5. route deletes expense
6. route redirects to `/`
7. browser sends new `GET /`
8. page reloads without that expense

### Example D: Updating an expense

1. user clicks the edit link on the home page
2. browser sends `GET /update/:id`
3. route reads `req.params.id`
4. route fetches one expense from MongoDB
5. route renders `edit.ejs` with that expense
6. user changes the prefilled form values
7. browser sends `POST /update/:id`
8. route validates edited values
9. route updates the document and saves it
10. route redirects to `/`
11. browser sends new `GET /`
12. page reloads with the edited expense

## 23. Why This App Is Called Server-Rendered

In modern apps, sometimes the browser fetches JSON and builds the UI itself.

This app works differently.

Here:

- server gets data
- server builds HTML
- browser receives already-built HTML

That is called server-side rendering.

Benefits:

- simple mental model
- easy beginner flow
- no separate frontend API code needed

## 24. Core Concepts Summary

### Node.js

Runs JavaScript on the server.

### Express

Framework for:

- routing
- middleware
- responses

### Middleware

Code that runs during the request-response cycle before the final handler finishes the response.

### Route

A rule for a URL + HTTP method combination.

### HTTP GET

Usually used to fetch or display data.

### HTTP POST

Usually used to submit or change data.

### MongoDB

Database that stores documents.

### Mongoose

Library that adds schema rules and model-based operations on top of MongoDB.

### Schema

Defines document structure and validation rules.

### Model

Used to query and update the database.

### EJS

Template engine for rendering dynamic HTML on the server.

### `req.body`

Submitted form data.

### `req.params`

Dynamic values from the route path.

### `res.render()`

Build and send HTML.

### `res.redirect()`

Tell the browser to make a new request to another route.

### `async/await`

Cleaner syntax for working with promises and asynchronous operations.

## 25. Code Reading Order Recommendation

If you want to understand this project in the best order, read it like this:

1. [server.js](/Users/rohan/Desktop/Rohan%20Desktop/Classes/vaibhav%20web%20dev%20sessions/node-expense-tracker/server.js:1)
2. [config/db.js](/Users/rohan/Desktop/Rohan%20Desktop/Classes/vaibhav%20web%20dev%20sessions/node-expense-tracker/config/db.js:1)
3. [models/expense.js](/Users/rohan/Desktop/Rohan%20Desktop/Classes/vaibhav%20web%20dev%20sessions/node-expense-tracker/models/expense.js:1)
4. [home.ejs](/Users/rohan/Desktop/Rohan%20Desktop/Classes/vaibhav%20web%20dev%20sessions/node-expense-tracker/views/home.ejs:1)
5. [public/style.css](/Users/rohan/Desktop/Rohan%20Desktop/Classes/vaibhav%20web%20dev%20sessions/node-expense-tracker/public/style.css:1)

That order helps because:

- first you see server flow
- then DB connection
- then data structure
- then UI template
- then styling

## 26. Final Mental Model

Keep this one mental model in mind:

- Express receives requests
- middleware prepares data
- routes run business logic
- Mongoose talks to MongoDB
- EJS renders HTML
- browser displays result
- redirects trigger a fresh request after data changes

If you understand that chain clearly, you understand the core flow of this whole project.
