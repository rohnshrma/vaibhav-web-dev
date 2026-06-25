# Next Steps: Let Students Add Secrets

This file explains the next feature a beginner can build in this project:

Students should be able to:

1. Open the `submit` page
2. Type a secret
3. Save that secret in MongoDB
4. See saved secrets on the `secrets` page

This project already has:

- user registration
- user login
- Passport authentication
- a `submit.ejs` form

So the next job is to connect that form to the database and routes.

## Big Picture Flow

The full flow should work like this:

1. A logged-in user visits `/submit`
2. The server renders `views/submit.ejs`
3. The user writes a secret and submits the form
4. A `POST /submit` route receives the form data
5. The server saves the secret in MongoDB
6. The user is redirected to `/secrets`
7. The `secrets` page shows saved secrets

## Step 1: Update the User Model

File: [models/user.js](/Users/rohan/Desktop/Rohan Desktop/Classes/vaibhav web dev sessions/Secrets - Starting Code/models/user.js)

Right now the `User` model only stores:

- `username`
- `password`

To let each user save one secret, add a new field:

```js
secret: {
  type: String,
  trim: true,
}
```

Your schema will then store:

- the username
- the hashed password
- the user's secret

Beginner note:

You do **not** need a brand new model if you only want each user to have one secret.

If later you want:

- one user to save many secrets
- likes
- comments
- timestamps

then you can create a separate `Secret` model.

## Step 2: Add a GET Route for `/submit`

File: [routes/authRoutes.js](/Users/rohan/Desktop/Rohan Desktop/Classes/vaibhav web dev sessions/Secrets - Starting Code/routes/authRoutes.js)

The app already protects `/secrets` using `isLoggedIn`.

Do the same for `/submit`.

Goal:

- only logged-in users can open the submit page
- if someone is not logged in, they should go to `/login`

Example idea:

```js
router.route("/submit").get(isLoggedIn, (req, res) => {
  res.render("submit");
});
```

This route simply shows the form from `views/submit.ejs`.

## Step 3: Add a POST Route for `/submit`

File: [routes/authRoutes.js](/Users/rohan/Desktop/Rohan Desktop/Classes/vaibhav web dev sessions/Secrets - Starting Code/routes/authRoutes.js)

Your form already sends data here:

```html
<form action="/submit" method="POST" class="submit-form">
```

That means Express now needs a matching `POST /submit` route.

This route should:

1. read `req.body.secret`
2. find the currently logged-in user
3. save the secret to that user
4. redirect to `/secrets`

Because Passport stores the logged-in user in `req.user`, you can use `req.user.id`.

Beginner version:

```js
router.route("/submit").post(isLoggedIn, async (req, res) => {
  try {
    const submittedSecret = req.body.secret;

    await User.findByIdAndUpdate(req.user.id, {
      secret: submittedSecret,
    });

    res.redirect("/secrets");
  } catch (err) {
    console.log(err);
    res.redirect("/submit");
  }
});
```

## Step 4: Update the `/secrets` Route

File: [routes/authRoutes.js](/Users/rohan/Desktop/Rohan Desktop/Classes/vaibhav web dev sessions/Secrets - Starting Code/routes/authRoutes.js)

Right now `/secrets` only renders the page:

```js
res.render("secrets");
```

That is why it shows hard-coded text instead of real database data.

Next, fetch users who have a secret saved.

Example idea:

```js
router.route("/secrets").get(isLoggedIn, async (req, res) => {
  try {
    const usersWithSecrets = await User.find({
      secret: { $nin: [null, ""] },
    });

    res.render("secrets", { usersWithSecrets });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});
```

Important beginner note:

MongoDB query filters are used to find only users whose `secret` field is not empty.

## Step 5: Update `views/secrets.ejs`

File: [views/secrets.ejs](/Users/rohan/Desktop/Rohan Desktop/Classes/vaibhav web dev sessions/Secrets - Starting Code/views/secrets.ejs)

Right now the page contains a fixed line:

```html
<p class="secret-text">Jack Bauer is my hero.</p>
```

Replace that with EJS that loops through the secrets coming from the route.

Example idea:

```ejs
<% usersWithSecrets.forEach((user) => { %>
  <p class="secret-text"><%= user.secret %></p>
<% }) %>
```

This means:

- `usersWithSecrets` comes from the route
- EJS loops over each user
- each saved secret is printed on the page

## Step 6: Test the Feature

After building it, test this order:

1. Register a new user
2. Log in
3. Open `/submit`
4. Enter a secret
5. Submit the form
6. Check if the app redirects to `/secrets`
7. Check if the secret appears on the page

Also test:

- opening `/submit` without logging in
- submitting an empty secret
- logging in as another user and adding another secret

## Simple Improvement Ideas

Once the basic feature works, students can improve it with:

- form validation so empty secrets are not saved
- flash/error messages
- timestamps like `createdAt`
- a separate `Secret` model for multiple secrets per user
- showing all secrets anonymously without showing usernames

## Recommended Build Order

If a beginner gets confused, follow this exact order:

1. add `secret` to the `User` model
2. create `GET /submit`
3. create `POST /submit`
4. update `GET /secrets`
5. update `views/secrets.ejs`
6. test in the browser

## One Important Teaching Note

For this codebase, the easiest beginner approach is:

- keep using the existing `User` model
- store one secret per user

That keeps the feature small and easier to understand.

Creating a separate `Secret` model is a good **next-level refactor**, but it is not the best first step for a beginner unless you specifically want to teach model relationships.
