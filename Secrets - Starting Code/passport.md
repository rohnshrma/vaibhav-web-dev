# Understanding Passport Authentication in This Project

This guide explains how authentication works in this project using **Passport**, **passport-local**, **express-session**, and **bcryptjs**.

---

## Table of Contents

1. [Big Picture Overview](#big-picture-overview)
2. [What Each Technology Does](#what-each-technology-does)
3. [The Complete Flow: User Registration](#the-complete-flow-user-registration)
4. [The Complete Flow: User Login](#the-complete-flow-user-login)
5. [Session Management](#session-management)
6. [The Code Breakdown](#the-code-breakdown)
7. [Protecting Routes](#protecting-routes)
8. [Logout](#logout)

---

## Big Picture Overview

When a user visits your app, they need to:

1. **Register** → create an account with a username and password
2. **Login** → prove they are who they claim to be
3. **Stay Logged In** → the server remembers them without asking for their password every time
4. **Logout** → end their session

Each of these steps requires different technologies working together:

- **bcryptjs** → hashes passwords so they're not stored in plain text
- **Passport** → manages authentication (checking if username/password are correct)
- **express-session** → remembers which user is logged in using browser cookies
- **MongoDB** → stores user data (username and hashed password)

---

## What Each Technology Does

### 1. bcryptjs - Password Hashing

**Purpose:** Store passwords safely so hackers cannot read them

**How it works:**

- When a user registers, their password is hashed (scrambled) using a special algorithm
- The hash is stored in the database, NOT the actual password
- When the user logs in, we hash the password they typed and compare it to the stored hash
- If both hashes match, the password is correct

**Example:**

```
Original password:     "mySecurePass123"
Hashed password:       "$2a$10$aBcDeFgH1jKlMnOpQrStUv..."
(these never match exactly, but we can compare them)
```

**Functions we use:**

```javascript
// Hashing (during registration)
bcrypt.hash(password, 10); // 10 = "salt rounds" (how complex the hash is)

// Comparing (during login)
bcrypt.compare(passwordTyped, hashedPasswordInDB); // returns true or false
```

---

### 2. Passport - Authentication Strategy

**Purpose:** Check if a username and password are correct

**How it works:**

- Passport is a framework that handles user authentication
- It has different "strategies" (ways to authenticate)
- We use the **local strategy** (username + password stored in our database)
- Other strategies exist: Google, GitHub, Facebook, etc.

**What Passport does:**

1. Takes the username and password from the login form
2. Finds the user in the database
3. Compares the password using bcrypt
4. If correct, it tells Express-Session to create a session for this user
5. If incorrect, it sends the user back to login

---

### 3. express-session - Session Management

**Purpose:** Remember which user is logged in (without storing password in cookie)

**How it works:**

1. When a user successfully logs in, a **session ID** is created
2. This ID is stored in the browser's cookies
3. Every time the user sends a request, the browser automatically includes this cookie
4. The server reads the cookie and knows who the user is
5. We don't store passwords in the cookie, only the session ID (which is random and secure)

**Visual:**

```
Browser Cookie:  { sessionID: "abc123xyz789" }
Server Memory:   { "abc123xyz789": { user_id: "507f1f77bcf86cd799439011" } }
```

When the user visits `/secrets`:

1. Browser sends cookie with `sessionID`
2. Server looks up that session ID
3. Server finds the user ID in memory
4. Server looks up user details in MongoDB
5. The request continues with `req.user` available

---

### 4. MongoDB - Data Storage

**Purpose:** Store user accounts permanently

**Fields stored:**

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  username: "johndoe",
  password: "$2a$10$aBcDeFgH1jKlMnOpQrStUv..." // hashed, not plain text
}
```

---

## The Complete Flow: User Registration

### What the user does:

1. Clicks "Register"
2. Types username and password
3. Clicks "Sign Up"

### What happens in the code:

**Step 1: Form submits to `POST /register`**

File: `routes/authRoutes.js`

```javascript
router
  .route("/register")
  .post(async (req, res) => {
    // Form data arrives here
    const { username, password } = req.body;
```

The form (in `views/register.ejs`) sends:

```html
<form action="/register" method="POST">
  <input name="username" type="text" />
  <input name="password" type="password" />
  <button type="submit">Sign Up</button>
</form>
```

**Step 2: Check if user already exists**

```javascript
const user = await User.findOne({ username: username });

if (user) {
  console.log("User already exists");
  return res.redirect("/login");
}
```

We query MongoDB to see if this username is taken.

**Step 3: Hash the password**

```javascript
password: await bcrypt.hash(password, 10);
```

- Original: `"myPassword123"`
- After hashing: `"$2a$10$aBcDeFgH1jKlMnOpQrStUv..."`
- The hash is random each time, even for the same password
- It's designed to be hard to reverse

The `10` means the algorithm runs 10 "rounds" (more rounds = more secure but slower)

**Step 4: Save to MongoDB**

```javascript
await User.create({
  username,
  password: await bcrypt.hash(password, 10),
});
```

Now the user is stored in the database with a hashed password.

**Step 5: Redirect to login**

```javascript
res.redirect("/login");
```

User registration is complete! Now they need to log in.

---

## The Complete Flow: User Login

### What the user does:

1. Clicks "Login"
2. Types username and password
3. Clicks "Sign In"

### What happens in the code:

**Step 1: Form submits to `POST /login`**

File: `routes/authRoutes.js`

```javascript
router.route("/login").post(
  passport.authenticate("local", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);
```

This tells Passport to check the username and password using the **local strategy**.

**Step 2: Passport's Local Strategy checks credentials**

File: `auth/auth.js`

```javascript
passport.use(
  new LocalStrategy(async (username, password, cb) => {
    // Step 2a: Find user in database
    const user = await User.findOne({ username: username });

    if (!user) {
      return cb(null, false, { message: "User not found" });
    }
    // If user doesn't exist, login fails
```

Passport automatically extracts `username` and `password` from the login form and passes them here.

**Step 2a: User exists in database?**

```javascript
const user = await User.findOne({ username: username });
if (!user) {
  return cb(null, false, { message: "User not found" });
}
```

We search MongoDB for a user with this username.

- If not found → login fails → user is redirected to `/login`

**Step 2b: Password correct?**

```javascript
try {
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return cb(null, false, { message: "Password is incorrect" });
  }
```

`bcrypt.compare()` does this:

1. Takes the password the user typed: `"myPassword123"`
2. Takes the hashed password from database: `"$2a$10$aBcDeFgH1jKlMnOpQrStUv..."`
3. Runs the hash algorithm on the typed password with the same salt
4. Compares the result to the stored hash
5. Returns `true` if they match, `false` if they don't

If they don't match → login fails → user is redirected to `/login`

**Step 2c: Credentials are correct!**

```javascript
return cb(null, user, { message: "Correct username and password" });
```

We call the callback with the user object. Passport now knows this login is valid.

**Step 3: Serialize the user**

File: `auth/auth.js`

```javascript
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});
```

- **When does this run?** Right after successful login
- **What does it do?** Takes the user object and extracts just the ID
- **Why?** We only need the ID to recreate the user object later

Example:

```javascript
// User object:
{ _id: "507f1f77bcf86cd799439011", username: "john", password: "..." }

// Serialized (stored in session):
"507f1f77bcf86cd799439011"
```

**Step 4: Create a session**

File: `app.js`

```javascript
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
```

- `secret` → a random string that signs the session cookie (no one can fake it)
- `resave: false` → only save session if something changed
- `saveUninitialized: false` → don't save empty sessions

**What happens:**

1. A random session ID is generated: `"abc123xyz789"`
2. The serialized user ID is stored: `sessions["abc123xyz789"] = "507f1f77bcf86cd799439011"`
3. The session ID is sent to the browser as a cookie
4. Browser stores it automatically

Browser cookie now contains:

```
connect.sid = abc123xyz789
```

**Step 5: Redirect to success page**

```javascript
passport.authenticate("local", {
  successRedirect: "/secrets", // ← user goes here after login
  failureRedirect: "/login", // ← user goes here if login fails
});
```

User is now logged in and redirected to `/secrets`!

---

## Session Management

### What happens on every request after login

**When the user visits `/secrets`:**

```
Browser Request:
  Cookie: { connect.sid: "abc123xyz789" }

Server Processing:
  1. Express-Session middleware reads the cookie
  2. Looks up the session: sessions["abc123xyz789"]
  3. Finds the serialized user ID: "507f1f77bcf86cd799439011"
  4. Calls deserializeUser()

Passport deserializes:
  passport.deserializeUser(async (id, cb) => {
    const user = await User.findById(id);
    cb(null, user);  // ← Now req.user contains the full user object
  });

Route Handler:
  req.user = { _id: "507f1f77bcf86cd799439011", username: "john", password: "..." }
  req.isAuthenticated() = true
  Route continues and renders "/secrets"
```

**Why serialize and deserialize?**

- **Serialization:** Store only the ID in the session (small, secure)
- **Deserialization:** Recreate the user object from the ID when needed

This is efficient because we don't store large objects in session memory.

---

## The Code Breakdown

### File: `app.js` - Main Application Setup

```javascript
import session from "express-session";
import passport from "./auth/auth.js";

// Session middleware BEFORE passport
app.use(
  session({
    secret: process.env.SESSION_SECRET, // ← Secret key to sign cookies
    resave: false, // ← Don't save if nothing changed
    saveUninitialized: false, // ← Don't create empty sessions
  })
);

// Passport middleware AFTER session
app.use(passport.initialize()); // ← Initialize Passport
app.use(passport.session()); // ← Connect Passport to session
```

**Order matters!** Session must be set up before Passport.

Why? Because Passport uses the session to store/retrieve user data.

---

### File: `auth/auth.js` - Authentication Logic

**Local Strategy:**

```javascript
passport.use(
  new LocalStrategy(async (username, password, cb) => {
    // 1. Find user by username
    const user = await User.findOne({ username: username });
    if (!user) {
      return cb(null, false, { message: "User not found" });
    }

    // 2. Compare passwords
    try {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return cb(null, false, { message: "Password is incorrect" });
      }

      // 3. Passwords match! Return user
      return cb(null, user, { message: "Correct username and password" });
    } catch (err) {
      return cb(err); // Return error if something goes wrong
    }
  })
);
```

**Serialize:**

```javascript
passport.serializeUser((user, cb) => {
  cb(null, user.id); // Store only the ID in the session
});
```

When: Right after login succeeds
Input: Full user object
Output: Just the user ID

**Deserialize:**

```javascript
passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id); // Fetch full user from database
  cb(null, user); // Attach to req.user
});
```

When: On every request after login
Input: User ID from session
Output: Full user object attached to `req.user`

---

### File: `routes/authRoutes.js` - Routes

**Register:**

```javascript
router.route("/register").post(async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Check if user already exists
    const user = await User.findOne({ username: username });
    if (user) {
      return res.redirect("/login");
    }

    // 2. Hash password and save user
    await User.create({
      username,
      password: await bcrypt.hash(password, 10),
    });

    console.log("User Successfully Registered");
    res.redirect("/login");
  } catch (err) {
    console.log("Failed to Register!");
    res.redirect("/register");
  }
});
```

Flow: Get form → Check if exists → Hash password → Save → Redirect to login

**Login:**

```javascript
router.route("/login").post(
  passport.authenticate("local", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);
```

Flow: Get form → Passport checks credentials → Serialize/Deserialize → Create session → Redirect

**Logout:**

```javascript
router.route("/logout").get(async (req, res) => {
  req.logOut((err) => {
    if (!err) {
      return res.redirect("/");
    }
    console.log(err);
    return res.redirect("/");
  });
});
```

Flow: Destroy session → Delete cookie → Redirect home

---

### File: `models/user.js` - Database Schema

```javascript
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // ← Can't have two users with same username
    minlength: 8,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true, // ← This is the HASHED password, not plain text
  },
});
```

Never store plain text passwords! Always hash them with bcrypt.

---

## Protecting Routes

### The `isLoggedIn` Middleware

File: `routes/authRoutes.js`

```javascript
function isLoggedIn(req, res, next) {
  console.log("is authenticated =>", req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log("user =>", req.user);
    return next(); // ← User is logged in, continue to route
  }
  res.redirect("/login"); // ← User not logged in, go to login
}
```

**How it works:**

1. `req.isAuthenticated()` returns `true` if there's a valid session
2. If `true`, call `next()` to continue to the route handler
3. If `false`, redirect to `/login`

**Usage:**

```javascript
// Only logged-in users can access /secrets
router.route("/secrets").get(isLoggedIn, (req, res) => {
  res.render("secrets");
});
```

If an unauthenticated user tries to visit `/secrets`:

1. `isLoggedIn` checks `req.isAuthenticated()`
2. It's `false` (no session)
3. User is redirected to `/login`

---

## Complete Request Cycle

### New User Registers

```
1. User fills form and submits
2. POST /register arrives at server
3. bcrypt.hash() → password is hashed
4. User.create() → saved to MongoDB with hashed password
5. res.redirect("/login") → user sent to login page
```

### User Logs In

```
1. User fills form and submits
2. POST /login → passport.authenticate("local")
3. Local Strategy:
   - Finds user in MongoDB
   - bcrypt.compare() checks password
   - Returns user object if correct
4. passport.serializeUser() → stores user.id in session
5. Session middleware → creates session and sends cookie
6. res.redirect("/secrets") → user sees secrets page
```

### User Visits Protected Page (logged in)

```
1. GET /secrets request arrives with cookie
2. Session middleware → reads cookie, finds session
3. passport.deserializeUser() → fetches user from DB using ID
4. req.user → now contains full user object
5. isLoggedIn() → checks req.isAuthenticated()
6. true → continue to route
7. Route renders page
```

### User Visits Protected Page (NOT logged in)

```
1. GET /secrets request arrives (no cookie)
2. req.isAuthenticated() → false (no session)
3. isLoggedIn() → calls res.redirect("/login")
4. User sees login page
```

### User Logs Out

```
1. GET /logout
2. req.logOut() → destroys session
3. Cookie is deleted from browser
4. res.redirect("/") → user sent to home
5. Future requests → no cookie, req.isAuthenticated() = false
```

---

## Summary

| Technology          | Job                | Example                          |
| ------------------- | ------------------ | -------------------------------- |
| **bcryptjs**        | Hash passwords     | `bcrypt.hash("pass", 10)`        |
| **Passport**        | Authenticate users | Checks username/password         |
| **express-session** | Remember user      | Stores session ID in cookie      |
| **MongoDB**         | Store accounts     | Saves username + hashed password |

The flow is:

1. **Register** → User types password → bcrypt hashes it → Saved to DB
2. **Login** → User types password → Passport compares with hash → Session created → Cookie sent
3. **Protected route** → User visits with cookie → Session found → User deserialized → Access granted
4. **Logout** → Session destroyed → Cookie deleted → No access

---

## Key Takeaways

✅ **Passwords are hashed, never stored plain text**
✅ **Sessions use a random cookie, not user credentials**
✅ **Passport handles the authentication logic**
✅ **express-session handles session persistence**
✅ **Middleware protects routes from unauthenticated users**
✅ **`req.user` is available after authentication**
✅ **Serialize stores minimal data, deserialize recreates user object**
