# Auth Difference: Before vs After

This file explains what changed in the project after adding:

- `bcryptjs`
- `passport`
- `passport-local`
- `express-session`

The goal is to help a beginner understand:

- how authentication may have worked before
- how it works now
- why the new version is better

## Simple Idea

Before these packages, a beginner app usually has a very basic login flow:

1. save username and password directly
2. check login by comparing plain text values
3. manually decide whether the user is logged in

After adding these packages, the app becomes more realistic and more secure:

1. passwords are hashed with `bcryptjs`
2. login is handled by Passport
3. the local username/password strategy is handled by `passport-local`
4. login state is remembered with `express-session`

## Before: Basic Authentication

In a very simple version of this app, registration and login might look like this:

### Registration before

- user fills out register form
- app saves `username` and `password` directly in MongoDB

That means the password might be stored exactly as the user typed it.

Example idea:

```js
await User.create({
  username: req.body.username,
  password: req.body.password,
});
```

### Login before

- user fills out login form
- app finds the user by username
- app compares plain password with plain password

Example idea:

```js
const user = await User.findOne({ username: req.body.username });

if (user && user.password === req.body.password) {
  res.redirect("/secrets");
} else {
  res.redirect("/login");
}
```

### Problems with the "before" version

- passwords are not protected
- if the database is leaked, real passwords are exposed
- login state is hard to manage
- protected routes are harder to build properly
- the code becomes messy as auth grows

## After: Current Authentication System

In the current project, authentication is stronger and better organized.

Files involved now:

- [app.js](/Users/rohan/Desktop/Rohan Desktop/Classes/vaibhav web dev sessions/Secrets - Starting Code/app.js)
- [routes/authRoutes.js](/Users/rohan/Desktop/Rohan Desktop/Classes/vaibhav web dev sessions/Secrets - Starting Code/routes/authRoutes.js)
- [auth/auth.js](/Users/rohan/Desktop/Rohan Desktop/Classes/vaibhav web dev sessions/Secrets - Starting Code/auth/auth.js)
- [models/user.js](/Users/rohan/Desktop/Rohan Desktop/Classes/vaibhav web dev sessions/Secrets - Starting Code/models/user.js)

## What `bcryptjs` Changed

`bcryptjs` changed how passwords are stored and checked.

### Before `bcryptjs`

- password was plain text
- app could compare directly with `===`

Example:

```js
if (user.password === req.body.password)
```

### After `bcryptjs`

During registration:

- the password is hashed before saving

Current code in [routes/authRoutes.js](/Users/rohan/Desktop/Rohan Desktop/Classes/vaibhav web dev sessions/Secrets - Starting Code/routes/authRoutes.js):

```js
await User.create({
  username,
  password: await bcrypt.hash(password, 10),
});
```

During login:

- the typed password is compared to the hashed password

Current code in [auth/auth.js](/Users/rohan/Desktop/Rohan Desktop/Classes/vaibhav web dev sessions/Secrets - Starting Code/auth/auth.js):

```js
const match = await bcrypt.compare(password, user.password);
```

### Why this is better

- the real password is not stored in MongoDB
- even if someone sees the database, the password is harder to recover
- this is the standard way to handle passwords

## What `passport` Changed

`passport` changed how login is handled overall.

### Before `passport`

You would usually write login logic manually inside the route.

Example idea:

```js
router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.redirect("/login");
  }

  if (user.password === req.body.password) {
    return res.redirect("/secrets");
  }

  res.redirect("/login");
});
```

### After `passport`

Now the login route is much cleaner.

Current code in [routes/authRoutes.js](/Users/rohan/Desktop/Rohan Desktop/Classes/vaibhav web dev sessions/Secrets - Starting Code/routes/authRoutes.js):

```js
router
  .route("/login")
  .get((req, res) => res.render("login"))
  .post(
    passport.authenticate("local", {
      successRedirect: "/secrets",
      failureRedirect: "/login",
    })
  );
```

Passport now:

- handles the login attempt
- calls the strategy
- decides whether auth passed or failed
- helps create `req.user`
- gives helper methods like `req.isAuthenticated()` and `req.logOut()`

### Why this is better

- less manual auth code in routes
- cleaner route files
- easier to protect routes
- easier to scale later

## What `passport-local` Changed

`passport-local` gives Passport a strategy for username/password login.

### Before `passport-local`

The route itself had to decide:

- how to find the user
- how to compare the password
- what to do on success or failure

### After `passport-local`

That logic is moved into [auth/auth.js](/Users/rohan/Desktop/Rohan Desktop/Classes/vaibhav web dev sessions/Secrets - Starting Code/auth/auth.js).

Current code:

```js
passport.use(
  new LocalStrategy(async (username, password, cb) => {
    const user = await User.findOne({ username: username });
    if (!user) {
      return cb(null, false, { messsage: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return cb(null, false, { message: "Password is incorrect" });
    }

    return cb(null, user, { message: "Correct username and password" });
  })
);
```

This strategy now becomes the main place where username/password login is checked.

### Why this is better

- auth logic is separated from route logic
- easier to read
- easier to debug
- follows the normal Passport structure used in many apps

## What `express-session` Changed

`express-session` changed how the app remembers a logged-in user.

### Before `express-session`

Without sessions, login would only work for one request unless you built your own system.

Problems:

- user logs in
- app redirects
- next request may not know who the user is
- protected pages become difficult to manage

### After `express-session`

Current code in [app.js](/Users/rohan/Desktop/Rohan Desktop/Classes/vaibhav web dev sessions/Secrets - Starting Code/app.js):

```js
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
```

Now the server can remember the user between requests.

Passport uses the session like this:

1. login succeeds
2. Passport stores the user's id in the session
3. future requests read that session
4. Passport rebuilds `req.user`

This is why protected routes can work.

## How `serializeUser` and `deserializeUser` help

Current code in [auth/auth.js](/Users/rohan/Desktop/Rohan Desktop/Classes/vaibhav web dev sessions/Secrets - Starting Code/auth/auth.js):

```js
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id);
  cb(null, user);
});
```

Meaning:

- `serializeUser` saves the user id into the session
- `deserializeUser` turns that id back into a full user object

So after login, Passport can place the current user on:

```js
req.user
```

## How Protected Routes Changed

Before, a beginner app may just redirect after login and not truly protect pages.

Now this project uses:

```js
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
```

This is possible because Passport and sessions now work together.

Current protected route:

```js
router.route("/secrets").get(isLoggedIn, (req, res) => {
  res.render("secrets");
});
```

### Why this is better

- users must log in before seeing protected pages
- route protection is reusable
- the code is cleaner than checking login manually everywhere

## Before vs After Summary

### Before

- password may be stored as plain text
- login logic is written manually in routes
- app may not remember the user properly
- protected routes are harder to manage

### After

- passwords are hashed with `bcryptjs`
- Passport handles authentication flow
- `passport-local` handles username/password strategy
- `express-session` keeps users logged in across requests
- protected routes can use `req.isAuthenticated()`

## In One Sentence

Before, authentication was basic and manual.

Now, authentication is more secure, more organized, and closer to how real Express apps handle login systems.
