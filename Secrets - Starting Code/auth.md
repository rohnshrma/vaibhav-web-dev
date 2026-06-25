# Authentication Guide

This file explains how authentication works in this project in simple language.

The goal is to help you understand:

- what each auth-related package does
- what each auth file does
- how registration works
- how login works
- how a user stays logged in
- how protected routes work
- what data is stored in the database
- what is missing or incomplete right now

## Big Picture

Authentication is the process of proving who a user is.

In this project, the auth system works like this:

1. A user registers with a username and password.
2. The password is hashed before saving to MongoDB.
3. The user logs in with the same username and password.
4. Passport checks whether the login details are correct.
5. If they are correct, Passport stores the user's id in the session.
6. On future requests, Passport reads that session and rebuilds `req.user`.
7. Protected routes use `req.isAuthenticated()` to decide whether the user can continue.

So the project is using **session-based authentication**, not JWT auth.

## Main Auth Packages

### `passport`

`passport` is the main authentication middleware.

It does not know by itself how to log users in. It needs a strategy.

In this project, Passport is used to:

- handle login with a local username/password strategy
- attach helper methods like `req.login()`, `req.logout()`, and `req.isAuthenticated()`
- store authenticated user information in the session
- restore the logged-in user on later requests

### `passport-local`

`passport-local` provides the **LocalStrategy**.

Local means the username and password are checked inside your own app and database.

It is different from OAuth logins like Google or GitHub.

In this project, the local strategy:

- receives `username` and `password`
- searches the database for the user
- compares the entered password with the hashed password in the database
- tells Passport whether login passed or failed

### `express-session`

`express-session` creates and manages sessions.

A session is server-side login state. After a successful login, Passport saves the user id in the session.

Usually the browser receives a session cookie, and on the next request that cookie is sent back. Then the server can identify the user.

In this project, `express-session` is important because Passport session auth depends on it.

### `bcryptjs`

`bcryptjs` is used for password hashing.

You should never save a raw password directly in the database.

Instead, during registration:

- the plain password is converted into a hashed password
- only the hashed version is stored

During login:

- the entered plain password is checked against the stored hash
- if they match, login succeeds

This project uses:

- `bcrypt.hash(password, 10)` while registering
- `bcrypt.compare(password, user.password)` while logging in

The `10` is the salt rounds value. Higher values are slower but more secure.

### `mongoose`

`mongoose` is used to define the user schema and talk to MongoDB.

It helps with:

- creating the `User` model
- finding users
- storing new users
- loading users again from their id

### `dotenv`

`dotenv` loads secret values from `.env` into `process.env`.

This project uses environment variables for things like:

- `MONGO_URI`
- `SESSION_SECRET`

Without `dotenv`, those values would not be available in `app.js` and `config/db.js`.

## Auth-Related Files

## `app.js`

File: [app.js](/Users/rohan/Desktop/Rohan Desktop/Classes/vaibhav web dev sessions/Secrets - Starting Code/app.js)

This is where the auth system gets wired into Express.

Important parts:

### `config()`

This loads values from `.env`.

### `connectDB()`

This connects the app to MongoDB before the app starts handling user data.

### `app.use(express.urlencoded({ extended: true }))`

This lets Express read form data sent from the login and register forms.

Without this, `req.body.username` and `req.body.password` would be `undefined`.

### Session middleware

```js
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
```

This creates session support.

What each option means:

- `secret`: used to sign the session cookie
- `resave: false`: do not save the session again if nothing changed
- `saveUninitialized: false`: do not create empty sessions for visitors who have not logged in

This middleware must come before `passport.session()`.

### `app.use(passport.initialize())`

This starts Passport for every request.

### `app.use(passport.session())`

This tells Passport to use session-based authentication.

It reads the session, gets the stored user id, and rebuilds the logged-in user.

### `app.use(authRoutes)`

This loads the route file that contains registration, login, and protected routes.

## `auth/auth.js`

File: [auth/auth.js](/Users/rohan/Desktop/Rohan Desktop/Classes/vaibhav web dev sessions/Secrets - Starting Code/auth/auth.js)

This file contains the Passport configuration.

You can think of it as the brain of the login process.

### Local strategy

```js
passport.use(
  new LocalStrategy(async (username, password, cb) => {
```

When a user submits the login form, Passport runs this function.

It receives:

- `username`: the value from the form field named `username`
- `password`: the value from the form field named `password`
- `cb`: callback used to tell Passport the result

### Step 1: Find user by username

```js
const user = await User.findOne({ username: username });
```

Passport checks whether a user exists with that username.

If no user is found:

```js
return cb(null, false, { messsage: "User not found" });
```

Meaning:

- `null`: no system error happened
- `false`: authentication failed
- third object: extra message info

There is a small typo in the code: `messsage` has three `s` letters. It does not break login, but the message key is misspelled.

### Step 2: Compare password

```js
const match = await bcrypt.compare(password, user.password);
```

Here:

- `password` is what the user typed during login
- `user.password` is the hashed password stored in MongoDB

If the passwords do not match:

```js
return cb(null, false, { message: "Password is incorrect" });
```

### Step 3: Success

If the password matches:

```js
return cb(null, user, { message: "Correct username and password" });
```

Now Passport knows the user is valid.

### `serializeUser`

```js
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});
```

After login succeeds, Passport decides what should be stored in the session.

This project stores only `user.id`.

That is good, because storing the whole user object in the session would be unnecessary.

### `deserializeUser`

```js
passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id);
  cb(null, user);
});
```

On the next request:

1. Passport reads the user id from the session.
2. It finds the user in MongoDB.
3. It attaches the user object to `req.user`.

That is why protected routes can know who is logged in.

## `routes/authRoutes.js`

File: [routes/authRoutes.js](/Users/rohan/Desktop/Rohan Desktop/Classes/vaibhav web dev sessions/Secrets - Starting Code/routes/authRoutes.js)

This file defines the auth-related routes.

### `isLoggedIn` middleware

```js
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
```

This protects routes.

`req.isAuthenticated()` is added by Passport.

If the user is logged in:

- `next()` runs
- the request continues to the real route handler

If the user is not logged in:

- they are redirected to `/login`

This is how `/secrets` is protected in this project.

### Home route

```js
router.route("/").get((req, res) => {
  res.render("home");
});
```

This just shows the home page.

### Register route

#### GET `/register`

Shows the register page.

#### POST `/register`

This is the registration flow:

1. Read `username` and `password` from the form.
2. Check whether the username already exists.
3. If it already exists, redirect to `/login`.
4. If not, hash the password.
5. Save the new user in MongoDB.
6. Redirect to `/login`.

Important part:

```js
await User.create({
  username,
  password: await bcrypt.hash(password, 10),
});
```

This is where the password gets hashed before saving.

Notice that registration does **not** automatically log the user in. After registering, the user is sent to the login page and must log in manually.

### Login route

#### GET `/login`

Shows the login page.

#### POST `/login`

```js
passport.authenticate("local", {
  successRedirect: "/secrets",
  failureRedirect: "/login",
})
```

This line hands control to Passport.

What happens behind the scenes:

1. Passport uses the `local` strategy from `auth/auth.js`.
2. It reads `username` and `password` from the submitted form.
3. It checks the database user.
4. It compares the password.
5. If valid, it logs the user in and creates session state.
6. If invalid, it redirects back to `/login`.

### Protected secrets route

```js
router.route("/secrets").get(isLoggedIn, (req, res) => {
  res.render("secrets");
});
```

This route is only available to logged-in users.

Because `isLoggedIn` runs first, unauthenticated users are pushed to `/login`.

## `models/user.js`

File: [models/user.js](/Users/rohan/Desktop/Rohan Desktop/Classes/vaibhav web dev sessions/Secrets - Starting Code/models/user.js)

This file defines the shape of a user document in MongoDB.

Fields:

### `username`

- `type: String`
- `required: true`
- `unique: true`
- `minlength: 8`
- `lowercase: true`
- `trim: true`

Meaning:

- every user must have a username
- no two users can share the same username
- values shorter than 8 characters are rejected by Mongoose validation
- the username is converted to lowercase before saving
- extra spaces at the beginning or end are removed

In the form, this field is being used like an email input.

### `password`

- `type: String`
- `required: true`
- `minlength: 8`
- `trim: true`

Important note:

This field stores the **hashed** password, not the raw password.

Even though the schema calls it `password`, after registration the saved value is a bcrypt hash.

## `views/login.ejs` and `views/register.ejs`

Files:

- [views/login.ejs](/Users/rohan/Desktop/Rohan Desktop/Classes/vaibhav web dev sessions/Secrets - Starting Code/views/login.ejs)
- [views/register.ejs](/Users/rohan/Desktop/Rohan Desktop/Classes/vaibhav web dev sessions/Secrets - Starting Code/views/register.ejs)

These files provide the HTML forms.

The most important detail is the `name` attributes:

### Register form

```html
<input type="email" class="form-control" name="username">
<input type="password" class="form-control" name="password">
```

### Login form

```html
<input type="email" class="form-control" name="username">
<input type="password" class="form-control" name="password">
```

Why this matters:

- Express reads these values into `req.body`
- Passport LocalStrategy expects a field named `username` by default
- Passport LocalStrategy expects a field named `password` by default

So the form field names and Passport defaults are already matching correctly.

## `config/db.js`

File: [config/db.js](/Users/rohan/Desktop/Rohan Desktop/Classes/vaibhav web dev sessions/Secrets - Starting Code/config/db.js)

This file connects Mongoose to MongoDB.

Without a database connection:

- registration cannot save users
- login cannot find users
- deserialization cannot rebuild `req.user`

## Full Auth Flow

Here is the complete auth flow in order.

### 1. App starts

- `.env` values are loaded
- MongoDB connection is created
- session middleware is enabled
- Passport is initialized
- Passport session support is enabled

### 2. User opens `/register`

- Express renders `views/register.ejs`
- the user fills in email and password

### 3. User submits register form

- browser sends `POST /register`
- Express reads form data into `req.body`
- route checks if user already exists
- if not, password is hashed with bcrypt
- user is saved in MongoDB
- user is redirected to `/login`

### 4. User opens `/login`

- Express renders `views/login.ejs`

### 5. User submits login form

- browser sends `POST /login`
- Passport `local` strategy runs
- app finds the user in MongoDB
- bcrypt compares the entered password to the stored hash

If login fails:

- user is redirected to `/login`

If login succeeds:

- Passport calls `serializeUser`
- user id is stored in the session
- user is redirected to `/secrets`

### 6. User visits `/secrets`

- `isLoggedIn` middleware runs
- `req.isAuthenticated()` checks whether the request has a valid logged-in session

If true:

- request continues
- `secrets.ejs` is rendered

If false:

- user is redirected to `/login`

### 7. User makes future requests

On later requests:

- browser sends session cookie
- session middleware reads the session
- Passport reads stored user id
- `deserializeUser` loads the user from MongoDB
- Passport sets `req.user`
- route handlers can now know who the logged-in user is

## Beginner Notes on Important Objects

### `req.body`

Contains form data sent by the browser.

Example after form submission:

```js
req.body = {
  username: "you@example.com",
  password: "mypassword123"
};
```

### `req.user`

When a logged-in session exists, Passport attaches the current user to `req.user`.

That user comes from `deserializeUser`.

### `req.isAuthenticated()`

Returns:

- `true` if the user is logged in
- `false` if the user is not logged in

### Session

A session is the stored login state between requests.

Without sessions, the server would forget the user after each request.

## What Is Good in This Setup

- passwords are hashed, not stored in plain text
- duplicate usernames are checked before creating a new user
- protected route middleware exists
- Passport session support is configured correctly in the right order
- only the user id is serialized into the session

## What Is Missing or Incomplete Right Now

This part is important, especially for learning.

### 1. No logout route is defined

In `views/secrets.ejs`, there is a logout button that points to `/logout`:

```html
<a class="btn btn-light btn-lg" href="/logout" role="button">Log Out</a>
```

But in `routes/authRoutes.js`, there is no `/logout` route yet.

That means the logout link currently has no matching route in the code shown here.

### 2. No error messages are shown to the user

If login fails, the user is just redirected back to `/login`.

If registration fails, the user is redirected back to `/register`.

So users do not currently see a friendly message like:

- user already exists
- invalid password
- user not found

### 3. Minimal validation in route handlers

The schema has validation, but the route handlers do not explicitly check:

- empty username
- empty password
- invalid email format beyond the browser input type
- short password before hashing

### 4. Session options are basic

For learning this is fine, but in production apps you usually also configure cookie options like:

- `httpOnly`
- `secure`
- `sameSite`
- session expiration settings

### 5. Error handling in strategy could be stronger

`deserializeUser` does not currently use a `try/catch`.

If database lookup fails there, the error handling could be cleaner.

### 6. No login-required middleware reuse beyond `/secrets`

Right now only `/secrets` is protected with `isLoggedIn`.

If more private routes are added, they should also use this middleware.

## Why `req.isAuthenticated()` Works

This is one of the most common beginner questions.

`req.isAuthenticated()` works because of this chain:

1. `express-session` creates session handling.
2. `passport.initialize()` starts Passport.
3. `passport.session()` connects Passport with session data.
4. `serializeUser` stores the user id after login.
5. `deserializeUser` rebuilds the user on later requests.
6. Passport then knows whether a valid user session exists.

That is why this middleware works:

```js
if (req.isAuthenticated()) {
  return next();
}
res.redirect("/login");
```

## Simple Mental Model

If you want one easy way to remember everything, use this:

- `register`: create a user and hash the password
- `login`: check the password and create a session
- `serializeUser`: save user id into the session
- `deserializeUser`: turn stored id back into a real user
- `req.isAuthenticated()`: check whether the user is currently logged in
- `isLoggedIn`: protect private pages

## One Small Example

Imagine a user registers with:

- username: `student@example.com`
- password: `secret123`

What gets saved in MongoDB is not:

```js
password: "secret123"
```

It becomes something like:

```js
password: "$2b$10$..."
```

Later during login:

- user types `secret123`
- bcrypt compares it to the stored hash
- if it matches, Passport logs the user in

## Final Summary

This project uses:

- Express for routing
- MongoDB and Mongoose for user storage
- bcrypt for password hashing
- Passport with `passport-local` for login checking
- `express-session` for keeping the user logged in across requests

The auth flow is:

1. register user
2. hash password
3. save user
4. login with Passport local strategy
5. store user id in session
6. rebuild user on later requests
7. protect routes using `req.isAuthenticated()`

If you understand those seven steps, you understand the main authentication system used in this project.
