# Student Step-By-Step Guide

This file is for students who want to build this blog app from the beginning in the correct order.

The idea is simple:

- do not build everything at once
- build one small piece at a time
- test each piece before moving forward

This is one of the best ways for beginners to avoid confusion.

## 1. Create The Project Folder

First create a project folder.

Example:

```txt
BLOG-APP-V1
```

This folder will contain all your files.

## 2. Open The Folder In VS Code

Open the project inside your code editor.

This helps you:

- create files easily
- manage folders properly
- run the terminal in the same project

## 3. Initialize Node Project

Open terminal and run:

```bash
npm init -y
```

This creates `package.json`.

Why is this needed?

Because `package.json` stores:

- project name
- dependencies
- scripts
- project settings

## 4. Install Required Packages

Now install the main packages:

```bash
npm install express ejs mongoose dotenv
```

What each package does:

- `express`
  creates the server and routes

- `ejs`
  creates dynamic HTML pages

- `mongoose`
  connects MongoDB and manages schemas

- `dotenv`
  loads environment variables from `.env`

## 5. Update `package.json` For ES Modules

Open `package.json` and add:

```json
"type": "module"
```

Why?

Because your code uses:

```js
import something from "...";
```

Without `"type": "module"`, Node may throw import errors.

## 6. Create Main Project Structure

Now create these folders:

```txt
config
model
views
public
public/css
notes
```

Why this structure?

- `config`
  configuration files like database connection

- `model`
  Mongoose schema and model files

- `views`
  EJS pages

- `public`
  static files

- `public/css`
  CSS files

- `notes`
  study material and explanations

## 7. Create `server.js`

Now create the main backend file:

```txt
server.js
```

This will be the starting point of the application.

Inside `server.js`, first set up:

- Express
- dotenv
- database connection import
- model import

Basic starter code:

```js
import express from "express";
import { config } from "dotenv";

const app = express();
const PORT = process.env.PORT || 3000;

config();
```

At this stage, keep it simple.

## 8. Create `.env`

Now create:

```txt
.env
```

Inside it, add your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

Why use `.env`?

- keeps secrets outside code
- easier to change later
- good project habit

## 9. Create `config/db.js`

Now create the database connection file:

```txt
config/db.js
```

Inside it:

- import mongoose
- create `connectDB()` function
- connect using `process.env.MONGO_URI`
- export the function

This keeps DB logic separate from route logic.

## 10. Connect Database In `server.js`

Now go back to `server.js` and:

- import `connectDB`
- call `connectDB()`

This should happen before your routes are used.

## 11. Add Middleware In `server.js`

Now add the important middleware:

### Static middleware

```js
app.use(express.static("public"));
```

This makes CSS work.

### Form middleware

```js
app.use(express.urlencoded({ extended: true }));
```

This makes form data available in `req.body`.

### EJS setup

```js
app.set("view engine", "ejs");
```

This tells Express to render EJS files.

## 12. Create `model/blog.js`

Now create the Mongoose model:

```txt
model/blog.js
```

Inside it define:

- `title`
- `description`
- `category`
- timestamps

Important beginner idea:

The schema is like a set of rules for your blog data.

It decides:

- what fields are required
- what type each field should be
- allowed category values

## 13. Create First Route In `server.js`

Start small.

Create home route first:

```js
app.route("/").get((req, res) => res.render("Home"));
```

This is a smart first step because it lets you test:

- Express is working
- EJS is working
- the server is running correctly

## 14. Create `views/Home.ejs`

Now create your first page:

```txt
views/Home.ejs
```

Add basic HTML first.

Then improve it gradually.

This page can contain:

- heading
- navbar
- welcome text
- buttons to compose and blog pages

## 15. Create `public/css/base.css`

Now create shared styles:

```txt
public/css/base.css
```

This file should contain styles used by many pages, such as:

- body
- buttons
- cards
- navbar
- colors

Why make a base CSS file?

Because shared styling should not be repeated in every page stylesheet.

## 16. Create `views/Compose.ejs`

Now create the blog creation page.

This page should contain a form with:

- title
- description
- category

Important:

```html
<form action="/compose" method="post">
```

This connects the form to the backend.

## 17. Create Compose Route In `server.js`

Now create:

- `GET /compose`
- `POST /compose`

### GET route

Shows the form page.

### POST route

Reads submitted data and saves it to MongoDB.

Inside POST route:

1. get `title`, `description`, `category`
2. validate fields
3. validate length
4. use `Blog.create(...)`
5. redirect to `/blog`

## 18. Create `views/Blog.ejs`

Now build the page that shows all blogs.

This page should:

- receive an array called `blogs`
- loop through each blog
- show title, description preview, category, and link

At this stage, it is okay to begin with plain HTML and add EJS loop later.

## 19. Create Blog Listing Route

In `server.js`, create:

```js
app.route("/blog").get(async (req, res) => {
  const blogs = await Blog.find({});
  res.render("Blog", { blogs });
});
```

This gets all blogs and sends them to EJS.

## 20. Add Logic Inside `Blog.ejs`

Now improve the listing page by adding:

- loop over blogs
- show message if no blogs exist
- read time function
- 50-word description preview

This is a great beginner exercise because it teaches:

- loops
- helper functions
- conditional rendering

## 21. Create `views/Post.ejs`

Now create the single blog detail page.

This page should show:

- title
- category
- full description
- created date
- updated date
- read time

This page is for one single blog, not a list.

## 22. Create Blog Details Route

In `server.js`, create:

```js
app.route("/blog-details/:id").get(async (req, res) => {
```

This route should:

1. get id from `req.params.id`
2. find matching blog
3. if found, render `Post.ejs`
4. if not found, render placeholder state

This teaches students about dynamic routing.

## 23. Add Placeholder State In `Post.ejs`

This is a very useful improvement.

Instead of crashing or showing blank data:

- check if `blog` exists
- if yes, show details
- if no, show a friendly "blog not found" page

This is called graceful fallback UI.

## 24. Create Page-Specific CSS Files

Now create styling files for each page:

```txt
public/css/home.css
public/css/compose.css
public/css/blog.css
public/css/post.css
```

Why separate them?

Because each page has different layout needs.

This makes your project more organized.

## 25. Test The App Step By Step

Do not wait until the end to test.

Test after every major step.

Example testing order:

1. home page opens
2. compose page opens
3. form submits
4. data saves in DB
5. blog list shows all blogs
6. read more link works
7. post page shows details
8. invalid post link shows placeholder

This habit saves a lot of debugging time.

## 26. Improve Error Handling

Once the app works, improve safety:

- wrap async routes in `try/catch`
- log errors clearly
- show fallback pages instead of crashing

This is what makes a project feel reliable.

## 27. Add Notes For Learning

A very smart final step is to create a `notes` folder.

Inside it, write what you learned.

This improves:

- revision
- interview explanation
- concept clarity

Students who document their own code usually learn faster.

## 28. Final Correct Build Order

If you want the shortest complete order, follow this:

1. create project folder
2. open in VS Code
3. run `npm init -y`
4. install dependencies
5. add `"type": "module"`
6. create folder structure
7. create `server.js`
8. create `.env`
9. create `config/db.js`
10. connect DB in `server.js`
11. add middleware
12. create `model/blog.js`
13. create `Home.ejs`
14. create home route
15. create `Compose.ejs`
16. create compose GET/POST routes
17. create `Blog.ejs`
18. create blog list route
19. add EJS loop and blog preview logic
20. create `Post.ejs`
21. create blog detail route
22. add placeholder state
23. add CSS files
24. test everything
25. improve error handling
26. write notes

## 29. How Students Should Practice This

Best practice method:

### Round 1

Copy the project and make it work.

### Round 2

Rebuild it from scratch without looking too much.

### Round 3

Add one new feature by yourself.

Examples:

- delete blog
- edit blog
- search by category
- sort latest first

This is where real learning becomes strong.

## 30. Final Advice For Beginners

Do not try to memorize everything.

Instead understand:

- what the server does
- what the route does
- what the model does
- what the EJS page does
- what data is moving between them

If you understand the flow, you can rebuild the project anytime.
