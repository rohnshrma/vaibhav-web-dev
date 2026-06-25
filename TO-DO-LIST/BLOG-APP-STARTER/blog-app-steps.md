# Test: Simple Blog App

## Overview

Your task is to complete a simple blog app using Express, EJS, HTML, and CSS.

This test is based on the same learning level as the to-do list app, but here you will build a small blog-style app.

The app must support these three actions:

1. `GET` all posts on the home page
2. `POST` a new blog post
3. `POST` or `DELETE` a post removal flow

For this test, data should be stored in memory only.

That means:

- do not use MongoDB
- do not use a file database
- do not use local storage
- store posts in an array inside `server.js`

## Files Given

You have been given these starter files:

- `server.js`
- `views/index.ejs`
- `public/style.css`

Notes:

- `server.js` is intentionally blank
- the CSS is already provided
- the EJS structure is provided
- students must complete the backend logic
- students must complete the missing EJS data rendering and control flow

## Goal

Build an app where a user can:

1. open the page
2. view all existing posts
3. add a new post using a form
4. delete an existing post

## Suggested Final Behavior

When the app is complete:

- opening `/` should show the form and all current posts
- submitting the form should create a new post
- the newest posts can be shown first
- deleting a post should remove it from the in-memory array
- if there are no posts, the page should show an empty-state message

## Folder Structure

```text
BLOG-APP-STARTER/
  server.js
  blog-app-steps.md
  public/
    style.css
  views/
    index.ejs
  reference/
    blog-layout.html
```

## End-to-End Steps

## Step 1: Import and Configure Express

Inside `server.js`:

- import `express`
- create the Express app
- create a port variable
- use `express.static("public")`
- use `express.urlencoded({ extended: true })`
- set the view engine to `ejs`

At the end, start the server using `app.listen(...)`.

## Step 2: Create the In-Memory Data

Create an array to store posts.

Example shape:

```js
const posts = [];
```

Each post should be an object with values like:

```js
{
  id: 1,
  title: "My first post",
  content: "This is my first blog post."
}
```

Also create a variable to help generate unique ids.

## Step 3: Build the `GET /` Route

Create a route for:

```text
GET /
```

This route should:

- render `index.ejs`
- send the `posts` array to the view

This is the route that displays all posts on the page.

## Step 4: Build the Add Route

Create a route for:

```text
POST /posts
```

This route should:

- read `req.body.title`
- read `req.body.content`
- trim both values
- check that both values are not empty
- create a new post object
- add that object into the `posts` array
- redirect back to `/`

This route is the create or add step of the app.

## Step 5: Build the Delete Route

Create a delete flow for removing a post.

You may do this in either of these ways:

1. Preferred beginner-friendly option:
   Use a route like `POST /posts/:id/delete`

2. If you already know method override:
   Use a true `DELETE /posts/:id` route

For the beginner-friendly version, the route should:

- read `req.params.id`
- convert it to a number if needed
- remove the matching post from the `posts` array
- redirect back to `/`

This completes the delete feature.

## Step 6: Complete `views/index.ejs`

The EJS file is already provided as a scaffold.

Students must complete the missing logic.

The page should include:

- a heading
- a short description
- a form with `title` and `content`
- a submit button
- a section that displays all posts
- a delete button for each post
- an empty-state message when no posts exist

## Step 7: Add EJS Control Flow

Inside `views/index.ejs`, students should:

- check whether `posts.length === 0`
- show the empty-state message if the array is empty
- otherwise loop through all posts
- print each post title safely
- print each post content safely
- create a delete form or delete button for each post

Important:

- the EJS file should not stay as plain static content
- students must connect the view to the data sent from the route

## Step 8: Connect Delete Buttons

For each rendered post, add a form button for deleting that specific post.

If using the beginner-friendly route, each card can have a form like:

- action should target the delete route for that post id
- method should be `post`

Example idea:

```text
/posts/:id/delete
```

Students should replace `:id` with the real post id using EJS.

## Step 9: Run and Test the App

Run:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Then test the app in this order:

1. Open the page and confirm it loads
2. Confirm the empty-state message appears first
3. Add one post and confirm it shows on the page
4. Add another post and confirm both posts show
5. Delete one post and confirm it disappears
6. Delete the final post and confirm the empty-state appears again

## What Must Work Before Submission

Before submitting, make sure the app can do all of the following:

- serve the page correctly
- render the CSS correctly
- read form data correctly
- add a new post correctly
- show all current posts correctly
- delete a selected post correctly
- redirect correctly after add and delete actions

## Expected Concepts Being Tested

This test checks whether the student understands:

- Express app setup
- middleware
- route creation
- `GET` requests
- `POST` requests
- route params
- form handling
- array operations
- EJS rendering
- basic delete flow
- the Post/Redirect/Get pattern

## Submission Note

You are expected to finish the project using the provided starter files.

The HTML structure and CSS are already available.

You must complete:

- the logic inside `server.js`
- the missing dynamic rendering in `views/index.ejs`

## Optional Extension

If finished early, students may also:

- add a created date
- add post numbering
- add validation messages
- add an edit feature
