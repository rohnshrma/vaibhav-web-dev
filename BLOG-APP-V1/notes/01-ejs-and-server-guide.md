# EJS And Server Guide

This note explains the EJS files and `server.js` in a very beginner-friendly way. The goal is to help you understand what each file does, how Express uses it, and how the whole blog app starts to feel like a real project.

## 1. What Is Happening In This Project?

This is an Express + EJS + MongoDB blog app.

The main parts are:

- `server.js`
  This is the brain of the app. It starts the server, sets up middleware, connects routes, and decides which page should be shown.

- `views/*.ejs`
  These are the UI pages. EJS files look like normal HTML, but they can also run JavaScript inside them using `<% %>` syntax.

- `config/db.js`
  This connects your app to MongoDB.

- `model/blog.js`
  This defines how a blog document should look in MongoDB.

## 2. Understanding `server.js`

File: `server.js`

This file does 5 important jobs:

1. Imports packages and files
2. Creates the Express app
3. Connects to the database
4. Sets up middleware
5. Creates routes

### Imports

```js
import express from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import Blog from "./model/blog.js";
```

What each line means:

- `express`
  Used to create the web server.

- `dotenv`
  Loads values from `.env` into `process.env`.

- `connectDB`
  A custom function that connects MongoDB.

- `Blog`
  The Mongoose model used to create and fetch blog data.

### App creation

```js
const app = express();
const PORT = process.env.PORT || 3000;
config();
connectDB();
```

Meaning:

- `app` becomes your Express application.
- `PORT` is where your server runs.
- `config()` loads `.env`.
- `connectDB()` tries to connect to MongoDB when the project starts.

### Middleware

```js
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
```

These lines are very important.

- `express.static("public")`
  Makes CSS, images, and frontend files available directly.
  Example:
  If you have `public/css/base.css`, then in EJS you can link it as `/css/base.css`.

- `express.urlencoded({ extended: true })`
  Lets Express read form data from POST requests.
  Without this, `req.body` would not work for your compose form.

- `app.set("view engine", "ejs")`
  Tells Express that your templates are EJS files.
  So when you write `res.render("Home")`, Express looks for `views/Home.ejs`.

## 3. Route By Route Explanation

### Home route

```js
app.route("/").get((req, res) => res.render("Home"));
```

When the user opens `/`, Express renders `views/Home.ejs`.

This is your landing page.

### Compose route

```js
app
  .route("/compose")
  .get((req, res) => res.render("Compose"))
  .post(async (req, res) => {
```

This route handles two actions:

- `GET /compose`
  Show the compose form

- `POST /compose`
  Receive form data and save a blog

#### Validation logic

```js
const { title, description, category } = req.body;
```

This takes form data from the request body.

```js
if (!title || !description || !category) {
  return res.redirect("/compose");
}
```

This checks if any required field is missing.

```js
if (title.length < 20 || description.length < 100) {
  return res.redirect("/compose");
}
```

This matches your schema rules.

Meaning:

- title must be at least 20 characters
- description must be at least 100 characters

#### Saving the blog

```js
const blog = await Blog.create({
  title: title,
  description: description,
  category: category,
});
```

This creates a new blog document in MongoDB.

Then:

```js
res.redirect("/blog");
```

After saving, the user is sent to the blog listing page.

### Blog listing route

```js
app.route("/blog").get(async (req, res) => {
```

This route gets all blogs from MongoDB.

```js
const blogs = await Blog.find({});
```

This means:

- go to the `blogs` collection
- return every document

Then:

```js
res.render("blog", {
  blogs,
});
```

This sends the `blogs` array into the EJS file.

Inside EJS, this data becomes available as `blogs`.

### Blog details route

```js
app.route("/blog-details/:id").get(async (req, res) => {
```

This route is dynamic.

`:id` means the route accepts a specific blog id.

Example:

```txt
/blog-details/67f12ab3cd...
```

#### Finding one blog

```js
const blogId = req.params.id;
const blog = await Blog.findById({ _id: blogId });
```

This takes the id from the URL and fetches the matching blog.

#### If blog does not exist

```js
if (!blog) {
  return res.status(404).render("Post", {
    blog: null,
  });
}
```

Now your route does something better than redirecting:

- it shows a 404 status
- it still renders the post page
- the page itself can show a clean placeholder

#### If blog exists

```js
res.render("Post", {
  blog,
});
```

This sends one single blog object into `Post.ejs`.

## 4. Understanding EJS Basics

EJS lets you mix HTML and JavaScript.

There are 3 common forms:

### Plain JavaScript

```ejs
<% const x = 10; %>
```

This runs JavaScript but does not print anything on the page.

### Print a value

```ejs
<%= blog.title %>
```

This prints the title on the page.

### Condition or loop

```ejs
<% if (blog) { %>
  <h1><%= blog.title %></h1>
<% } %>
```

This is how dynamic UI is created.

## 5. `Home.ejs`

File: `views/Home.ejs`

Purpose:

- show a nice landing page
- introduce the blog app
- give navigation to other pages

Important parts:

- top navigation
- hero section
- featured categories
- highlight cards

This page is currently static.

That means:

- it does not depend on database data
- it always shows the same content

This is good for a homepage because static pages are easier to build first.

## 6. `Compose.ejs`

File: `views/Compose.ejs`

Purpose:

- show a form to create a new blog

Main form fields:

- title
- description
- category

Important part:

```ejs
<form action="/compose" method="post" class="compose-form">
```

This means:

- when the form is submitted
- send the data to `/compose`
- use a POST request

Because your server has:

```js
app.route("/compose").post(...)
```

the backend catches that form submission.

### Category dropdown

The category field is a `<select>`.

This is smart because:

- it reduces typing mistakes
- it keeps categories consistent
- it matches your schema enum values

## 7. `Blog.ejs`

File: `views/Blog.ejs`

Purpose:

- show all blogs
- preview each blog in a card
- link to a full blog detail page

### Defensive blog list

```ejs
const blogList = Array.isArray(blogs) ? blogs : [];
```

This is a safety check.

It means:

- if `blogs` is a real array, use it
- otherwise use an empty array

This prevents EJS from crashing if no data is sent.

### Read time logic

```ejs
const getReadTime = (text = "") => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};
```

This estimates reading time.

Logic:

- split text into words
- count words
- divide by 200 words per minute
- round up
- minimum is 1 minute

### Description truncation

```ejs
const truncateWords = (text = "", limit = 50) => {
```

This shows only the first 50 words.

Why this is useful:

- blog cards stay neat
- page height stays balanced
- readers get a short preview, not the full content

### Loop through blogs

```ejs
<% blogList.forEach((blogObj) => { %>
```

This repeats the card HTML once for every blog.

Each card prints:

- category
- title
- short description
- read time
- read more link

## 8. `Post.ejs`

File: `views/Post.ejs`

Purpose:

- show full details of one single blog

### Helper functions

#### Read time

The same read time helper is used here too.

#### Date formatting

```ejs
const formatDate = (dateValue) => {
  const parsedDate = new Date(dateValue);
  return parsedDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
```

This converts MongoDB timestamps into a clean readable format.

Example:

```txt
2026-03-28T10:20:00.000Z
```

becomes something like:

```txt
March 28, 2026
```

### Blog existence check

```ejs
<% if (blog) { %>
```

If the blog exists:

- show category
- show title
- show description
- show timestamps

If the blog does not exist:

- show a placeholder page
- give user a path back to blogs

This is a better user experience than crashing.

## 9. How `server.js` And EJS Work Together

This is the most important idea for beginners.

The backend and frontend are talking to each other.

Example:

```js
res.render("Post", { blog });
```

This means:

- render `views/Post.ejs`
- send a variable called `blog`

Then inside EJS:

```ejs
<%= blog.title %>
```

This prints the exact value received from the server.

So:

- Express sends data
- EJS displays data

That is the full idea.

## 10. Beginner Summary

If you remember only a few things, remember these:

1. `server.js` controls routes and sends data to templates.
2. EJS files are HTML pages that can print JavaScript values.
3. `res.render("PageName", { data })` is the bridge between backend and frontend.
4. `Compose.ejs` sends form data to the backend.
5. `Blog.ejs` loops through all blog posts.
6. `Post.ejs` shows one blog in full detail.

Once you understand these ideas clearly, CRUD applications become much easier to build.
