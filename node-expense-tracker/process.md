# Expense Tracker Starter Kit Process

This starter kit gives students:

- the folder structure
- the static HTML layout
- the CSS design
- starter backend files using ES Modules

Students should implement all JavaScript logic and all EJS logic by themselves.

## 1. Project goal

Build an expense tracker app with:

- Node.js
- Express
- EJS
- MongoDB with Mongoose
- ES Modules

Each expense must contain:

- `name`
- `amount`

The final app should allow users to:

1. add an expense
2. view all expenses
3. delete an expense

## 2. Folder structure

```text
node-expense-tracker-starter-kit/
├── config/
│   └── db.js
├── models/
│   └── expense.js
├── public/
│   └── style.css
├── views/
│   └── home.ejs
├── process.md
├── package.json
└── server.js
```

## 3. What is already provided

- `public/style.css` contains a modern, simple, minimal design
- `views/home.ejs` contains static HTML for the form and expense list layout
- `server.js` is set up with Express and ES Module syntax
- `config/db.js` is prepared for MongoDB connection setup
- `models/expense.js` contains a schema starter

## 4. What students must build

Students must write:

- the database connection usage in `server.js`
- the schema fields inside `models/expense.js`
- the GET route for the home page
- the POST route to add an expense
- the POST route to delete an expense
- the EJS loop for showing expenses
- the total calculation
- the empty-state condition
- the delete action using the expense id

## 5. Important rule for this starter

The current `home.ejs` file is intentionally static.

That means:

- no dynamic EJS loop is written yet
- no condition is written yet
- no total logic is written yet

The current JavaScript files are also intentionally incomplete.

That means:

- students must import the model themselves
- students must create the routes themselves
- students must write the database logic themselves

## 6. ES Module syntax

This project uses ES Modules, not CommonJS.

Students should use:

```js
import express from "express";
import connectDB from "./config/db.js";
```

Students should not use:

```js
const express = require("express");
const connectDB = require("./config/db");
```

## 7. Deep implementation process

### Step 1: Install dependencies

Run:

```bash
npm install
```

### Step 2: Understand the role of each file

#### `server.js`

Students should complete:

- route creation
- model import
- database connection import
- rendering logic
- form handling logic
- delete handling logic

#### `config/db.js`

Students should:

1. understand how `mongoose.connect()` works
2. set the correct MongoDB URL
3. import and call the function from `server.js`

#### `models/expense.js`

Students should define the `Expense` schema fields for:

- `name`
- `amount`

They should decide validation rules such as:

- required fields
- trimmed text
- non-negative amount

#### `views/home.ejs`

Students should convert the static placeholder layout into a dynamic EJS page.

They need to:

1. receive data from `res.render()`
2. loop through the expenses
3. show each expense name
4. show each expense amount
5. create a delete form for each expense
6. show an empty state when there are no expenses
7. show the total expense amount

### Step 3: Build the database model

Inside `models/expense.js`, students should add fields to the schema.

They should think through:

- what type `name` should be
- what type `amount` should be
- what fields should be required
- what validations are useful

### Step 4: Connect the database

Inside `server.js`, students should:

1. import the database connection file
2. call the connection function
3. make sure the server connects before use

### Step 5: Create the home route

Students should write a GET route for `/`.

That route should eventually:

1. fetch expenses from MongoDB
2. calculate the total
3. pass data to `home.ejs`

### Step 6: Create the add-expense route

Students should write a POST route for submitting the form.

That route should:

1. read `name` from `req.body`
2. read `amount` from `req.body`
3. validate the values
4. save the expense
5. redirect back to the home page

### Step 7: Create the delete route

Students should write a POST route for deleting an expense.

That route should:

1. read the expense id from `req.params`
2. delete the matching record
3. redirect back to the home page

### Step 8: Replace static list markup with EJS

The current expense list in `home.ejs` is only sample HTML.

Students should replace it with:

- an EJS loop
- dynamic total output
- a conditional empty state
- dynamic delete forms

### Step 9: Test the full flow

Students should test:

1. page loads correctly
2. form submits correctly
3. expense is stored in database
4. expense list renders correctly
5. total updates correctly
6. delete works correctly

## 8. Learning outcome

After completing this project, students should understand:

- Express routes
- form handling with `req.body`
- EJS rendering
- MongoDB connection setup
- Mongoose schema design
- inserting documents
- fetching documents
- deleting documents
- using ES Modules in Node.js
