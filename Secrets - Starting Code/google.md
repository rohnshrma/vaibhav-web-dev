# Understanding Google OAuth 2.0 Authentication in This Project

This guide explains how authentication works in this project using **passport-google-oauth20** alongside **Passport**, **express-session**, and **MongoDB**.

---

## Table of Contents

1. [Big Picture Overview](#big-picture-overview)
2. [What is OAuth 2.0?](#what-is-oauth-20)
3. [The Complete Flow: Google Login/Registration](#the-complete-flow-google-loginregistration)
4. [The Code Breakdown](#the-code-breakdown)
5. [Database Changes](#database-changes)

---

## Big Picture Overview

Instead of forcing users to create a new username and password for your app, you can let them log in using their existing Google account. This process is called **OAuth 2.0**.

When a user chooses to "Sign in with Google":
1. **Redirect** → Your app sends the user to Google's secure login page.
2. **Consent** → The user logs in to Google and grants your app permission to access their basic profile information (like email and name).
3. **Callback** → Google sends the user back to your app with a special token.
4. **Authenticate** → Your app uses this token to retrieve the user's profile from Google.
5. **Login/Register** → Your app checks if the user is in your database. If yes, it logs them in. If not, it creates a new account for them automatically without requiring a password.
6. **Stay Logged In** → Using `express-session`, the server remembers them.

---

## What is OAuth 2.0?

**Purpose:** Securely grant a third-party application (your app) access to user information stored by another service (Google) without exposing the user's password.

**How it works in Passport:**
- We use the `passport-google-oauth20` strategy.
- It requires a **Client ID** and **Client Secret**, which are obtained by registering your application in the Google Cloud Console.
- It also needs a **Callback URL**, which is an endpoint in your application that Google will redirect the user to after they authenticate.

---

## The Complete Flow: Google Login/Registration

### What the user does:

1. Clicks "Sign in with Google" on your website.
2. Is redirected to Google's login screen.
3. Selects their Google account or enters their Google credentials.
4. Is redirected back to your app's protected page (e.g., `/secrets`).

### What happens in the code:

**Step 1: User clicks the Google login link**

File: `routes/authRoutes.js`

```javascript
router
  .route("/auth/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));
```

This route triggers Passport's Google strategy. 
- `scope: ["profile", "email"]` tells Google what information we want to access.

**Step 2: Google handles authentication**

The user leaves your app and logs in on Google's domain. Your app waits.

**Step 3: Google redirects back to your Callback URL**

File: `routes/authRoutes.js`

```javascript
router.route("/auth/google/callback").get(
  passport.authenticate("google", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);
```

When Google sends the user back, they visit `/auth/google/callback` along with an authorization code. Passport takes over, exchanges the code for a token, and uses the token to fetch the user's Google profile.

**Step 4: Passport's Google Strategy processes the profile**

File: `auth/auth.js`

```javascript
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      // Step 4a: Check if user exists
      try {
        let user = await User.findOne({ googleId: profile.id });

        // Step 4b: If not, create a new user
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            username: profile.emails[0].value,
          });
        }

        // Step 4c: Return the user
        return cb(null, user);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);
```

**Step 4a: Does this Google user exist in our DB?**
We search MongoDB for a user with the matching `googleId`.

**Step 4b: Create user if they don't exist**
If `user` is null, we create a new document. Notice we store the `googleId` and use their Google email (`profile.emails[0].value`) as their `username`. They don't have a password in our database!

**Step 4c: Successful authentication**
We call the callback `cb(null, user)` with the user object.

**Step 5: Serialize and Session**

Just like with the Local Strategy, Passport serializes the `user.id` into the session, creating a cookie so the user stays logged in. (This is done by the same `serializeUser` and `deserializeUser` methods used by the Local Strategy).

---

## The Code Breakdown

### File: `auth/auth.js` - Strategy Configuration

You need to initialize the `GoogleStrategy` with credentials from Google:

```javascript
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,         // Found in Google Cloud Console
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Found in Google Cloud Console
      callbackURL: "/auth/google/callback",           // Must match your registered Google settings
    },
    async (accessToken, refreshToken, profile, cb) => {
      // Find or create user logic...
    }
  )
);
```

**Security Note:** `clientID` and `clientSecret` are stored in `.env` and loaded using `process.env`. Never commit these to GitHub!

### File: `routes/authRoutes.js` - Dedicated Routes

Unlike Local Auth which uses POST routes for form submissions, Google OAuth relies on GET requests for redirects.

```javascript
// 1. Send the user to Google
router
  .route("/auth/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

// 2. Google sends them back here
router.route("/auth/google/callback").get(
  passport.authenticate("google", {
    successRedirect: "/secrets", // Login successful!
    failureRedirect: "/login",   // Login failed.
  })
);
```

---

## Database Changes

### File: `models/user.js` - Updated Schema

To support Google OAuth, our database schema needs to accommodate users who *don't* have a password but *do* have a Google ID.

```javascript
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    // Note: 'required' is removed! 
    // Google users won't have a password in our database.
  },
  googleId: { 
    type: String 
    // Stores the unique ID provided by Google
  },
});
```

**Key changes:**
1. Added `googleId`.
2. `password` is no longer `required: true`. If it were required, MongoDB would throw an error when trying to save a new Google user.

---

## Summary of the Flow

1. **Click** → User visits `/auth/google`
2. **Redirect to Google** → Passport redirects user to Google's servers
3. **Consent** → User logs in to Google and approves access
4. **Callback** → Google redirects user back to `/auth/google/callback` with a code
5. **Verify** → Passport exchanges code for profile info
6. **Database** → Our app finds or creates the user based on `googleId`
7. **Session** → `express-session` remembers the user via a cookie
8. **Success** → User is redirected to `/secrets`
