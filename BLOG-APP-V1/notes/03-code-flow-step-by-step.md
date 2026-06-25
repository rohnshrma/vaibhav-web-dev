# Code Flow Step By Step

This note explains the full code flow of your blog app in a step-by-step way for beginners. The focus here is not just what each file does, but how a request moves through the application from start to finish.

Think of this as the life journey of a request.

## 1. Big Picture Flow

Your project follows this general flow:

1. App starts
2. Database connects
3. Browser sends a request
4. Express route receives it
5. Route may read form data or database data
6. Route renders an EJS page
7. Browser displays HTML and CSS

This is the core pattern behind many full-stack applications.

## 2. Step 1: Starting The Project

When you run the project, Node.js starts reading `server.js`.

The file executes from top to bottom.

So this happens first:

### 2.1 Imports are loaded

Node loads:

- Express
- dotenv
- database connector
- blog model

This gives your app all the tools it needs.

### 2.2 App is created

```js
const app = express();
```

Now you have an Express app in memory.

### 2.3 Environment variables are loaded

```js
config();
```

Now values from `.env` become available through `process.env`.

### 2.4 Database connection begins

```js
connectDB();
```

Now `config/db.js` runs.

Inside that file:

- Mongoose tries to connect to MongoDB
- if successful, you see a success log
- if unsuccessful, the app stops

This is step one of trust.

Before handling blogs, the app must know the database is available.

## 3. Step 2: Middleware Is Set Up

After connection setup, middleware is registered.

### 3.1 Static middleware

```js
app.use(express.static("public"));
```

This means the browser can request CSS files directly.

Why this matters:

Your EJS files link styles like:

```html
<link rel="stylesheet" href="/css/base.css" />
```

Express knows this should come from `public/css/base.css`.

### 3.2 Form body middleware

```js
app.use(express.urlencoded({ extended: true }));
```

This lets Express decode form data.

Without this, the compose form cannot send usable data to the server.

### 3.3 View engine middleware

```js
app.set("view engine", "ejs");
```

This tells Express:

"When I say `res.render("Home")`, use EJS templates."

## 4. Step 3: Routes Are Registered

Now Express learns what to do for each URL.

This does not run the routes yet.

It only prepares them.

Example:

```js
app.route("/").get(...)
```

This means:

If a request comes to `/`, use this function.

## 5. Step 4: Server Starts Listening

At the bottom:

```js
app.listen(PORT, () => console.log("Server started on port :", PORT));
```

Now the server is officially waiting for requests.

You can think of this like:

"The restaurant is open now. Customers can come in."

## 6. Flow For Homepage

Let us trace what happens when a user opens `/`.

### Step-by-step

1. Browser sends GET request to `/`
2. Express checks routes
3. It finds the home route
4. Route runs `res.render("Home")`
5. Express loads `views/Home.ejs`
6. HTML is generated
7. Browser receives the page
8. Browser asks for linked CSS files
9. Express serves them from `public`

Important note:

This page is static right now.

That means no database query is needed.

## 7. Flow For Compose Page

Now let us trace `GET /compose`.

### Step-by-step

1. Browser sends GET request to `/compose`
2. Express finds the compose GET route
3. Route renders `Compose.ejs`
4. Browser shows the form

At this point, the user sees:

- title field
- description field
- category dropdown

No blog is saved yet.

## 8. Flow For Form Submission

This is one of the most important flows for beginners.

When the user fills the form and clicks submit:

### Step-by-step

1. Browser sends POST request to `/compose`
2. Express receives the form request
3. `express.urlencoded()` parses the form body
4. Route reads `req.body`
5. Validation runs
6. If valid, blog is saved to MongoDB
7. User is redirected to `/blog`

### Breaking it down deeper

#### Request body

Because your input fields have names like:

- `name="title"`
- `name="description"`
- `name="category"`

the backend receives:

```js
req.body.title
req.body.description
req.body.category
```

#### Validation

First, the code checks for missing values.

Then it checks length:

- title at least 20 characters
- description at least 100 characters

This is good because it prevents weak or incomplete content.

#### Database save

Then:

```js
await Blog.create(...)
```

This sends the blog data into MongoDB.

Mongoose uses your schema rules from `model/blog.js`.

That means the schema is like a filter and structure checker.

## 9. Flow For Blog List Page

After a successful create, the user is redirected to `/blog`.

Now let us see what happens.

### Step-by-step

1. Browser sends GET request to `/blog`
2. Express finds the route
3. Route runs `Blog.find({})`
4. MongoDB returns all blogs
5. Route sends them into `Blog.ejs`
6. EJS loops through the array
7. Browser shows blog cards

### What `Blog.ejs` does

Inside the file:

- checks if `blogs` is a valid array
- creates helper functions
- loops over each blog
- shows category, title, preview text, read time

### Why truncation matters

The description is cut to 50 words.

This is useful because:

- full content would make cards too tall
- shorter previews are easier to scan
- detail page remains more meaningful

### Why read time matters

Read time is estimated from description length.

This improves the UI because readers quickly understand the size of the content.

## 10. Flow For Single Blog Detail Page

When the user clicks "Read more", the link goes to:

```txt
/blog-details/:id
```

Example:

```txt
/blog-details/67fe123abc...
```

### Step-by-step

1. Browser sends GET request with blog id
2. Express reads `req.params.id`
3. Route runs `Blog.findById(...)`
4. MongoDB checks if that blog exists
5. If found, route renders `Post.ejs` with blog data
6. If not found, route renders placeholder state

### Inside `Post.ejs`

If `blog` exists:

- category is shown
- title is shown
- full description is shown
- read time is calculated
- `createdAt` and `updatedAt` are formatted

If `blog` does not exist:

- user sees a clean message
- user can go back to blog list
- user can go to compose page

This is a strong beginner pattern because it teaches graceful failure handling.

## 11. How Data Travels Through The App

This is the most important conceptual part.

### For creating data

Flow:

`Compose.ejs form -> POST /compose -> req.body -> Blog.create() -> MongoDB`

### For showing all data

Flow:

`MongoDB -> Blog.find({}) -> res.render("Blog", { blogs }) -> Blog.ejs`

### For showing one item

Flow:

`URL id -> req.params.id -> Blog.findById() -> res.render("Post", { blog }) -> Post.ejs`

This is the beginner full-stack loop:

- input
- processing
- storage
- retrieval
- rendering

## 12. If You Want To Build This Project From Scratch Again

Here is a clear beginner order.

### Step 1

Create the project folder and install dependencies:

- express
- ejs
- mongoose
- dotenv

### Step 2

Create `server.js`

Set up:

- Express app
- static middleware
- form middleware
- view engine

### Step 3

Create `config/db.js`

Write a MongoDB connection function.

### Step 4

Create `model/blog.js`

Define:

- title
- description
- category
- timestamps

### Step 5

Create the `views` folder

Add:

- `Home.ejs`
- `Compose.ejs`
- `Blog.ejs`
- `Post.ejs`

### Step 6

Create the `public/css` folder

Add styles for each page.

### Step 7

Create home route

This confirms the server and EJS rendering work.

### Step 8

Create compose GET route

Now the form page can open.

### Step 9

Create compose POST route

Now blogs can be submitted.

### Step 10

Create blog list route

Now saved blogs can be displayed.

### Step 11

Create blog detail route

Now one blog can be viewed fully.

### Step 12

Add error handling and placeholder states

This makes the app feel more complete.

## 13. How To Think Like A Beginner Developer

When code feels confusing, do not try to understand everything at once.

Instead ask:

1. What request came in?
2. Which route handled it?
3. Did the route talk to the database?
4. Which EJS file got rendered?
5. What data was passed into that EJS file?

If you answer these five questions, most Express + EJS bugs become much easier to debug.

## 14. Final Beginner Summary

Your app flow is:

1. start server
2. connect DB
3. show pages
4. submit form
5. save blog
6. fetch blogs
7. render blogs
8. show details

That is the real practical foundation of backend + templating + database development.

Once you are comfortable with this flow, you are ready to move toward:

- update route
- delete route
- flash messages
- authentication
- MVC folder structure

This project is already a strong base for learning those next steps.
