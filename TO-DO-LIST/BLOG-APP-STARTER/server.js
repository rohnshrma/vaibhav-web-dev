import express from "express";
import { v4 as uuidv4 } from "uuid";

// Create the Express application object.
// We use this object to configure middleware, routes, and the server.
const app = express();

// The port is the "door number" where our server listens for requests.
const PORT = 3000;

// In-memory storage:
// This array acts like a temporary database.
// Important: all posts disappear when the server restarts.
let posts = [];

// Middleware runs before route handlers.
// `express.static("public")` lets the browser load files like CSS from `/public`.
app.use(express.static("public"));

// This reads form data sent from HTML forms and puts it inside `req.body`.
// `extended: true` allows Express to parse more complex form data structures too.
app.use(express.urlencoded({ extended: true }));

// Tell Express that our view files use the EJS template engine.
app.set("view engine", "ejs");

// GET / -> render the home page and send data to the EJS view.
// `req` means request data coming from the browser.
// `res` means response data we send back to the browser.
app.get("/", (req, res) => {
  res.render("index", {
    // Shorthand for: posts: posts
    // This sends the current posts array into `views/index.ejs`.
    posts,
  });
});

// POST /posts -> read form data, validate it, then add a new post.
// This route runs when the form in `index.ejs` is submitted.
app.post("/posts", (req, res) => {
  // `trim()` removes extra spaces from the beginning and end.
  // Optional chaining `?.` prevents errors if a field is missing.
  const title = req.body.title?.trim();
  const content = req.body.content?.trim();

  // Basic validation:
  // if either field is empty, send the user back to the home page.
  if (!title || !content) {
    return res.redirect("/");
  }

  // Create one post object.
  // `uuidv4()` generates a unique id so each post can be deleted safely.
  const newPost = {
    id: uuidv4(),
    title,
    content,
  };

  // Add the newest post to the beginning of the array,
  // so it appears at the top of the page.
  posts.unshift(newPost);

  // Redirect instead of rendering directly.
  // This follows the common "POST -> Redirect -> GET" pattern.
  res.redirect("/");
});

// POST /posts/:id/delete -> remove the selected post.
// `:id` is a route parameter, so Express stores it in `req.params.id`.
app.post("/posts/:id/delete", (req, res) => {
  const { id } = req.params;

  // Keep every post whose id does NOT match the selected one.
  // In other words, remove the post with the matching id.
  posts = posts.filter((postObj) => postObj.id !== id);
  res.redirect("/");
});

// Start the server so it can begin listening for browser requests.
app.listen(PORT, () => console.log("Server started on port :", PORT));
