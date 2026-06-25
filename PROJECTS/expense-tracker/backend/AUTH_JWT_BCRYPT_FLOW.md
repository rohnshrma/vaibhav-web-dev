# JWT + bcrypt Authentication Flow (Beginner Guide)

This guide explains authentication in your current Expense Tracker backend using:
- `bcrypt` for password hashing
- `JWT` (JSON Web Token) for login sessions

It also explains how the same backend is used from:
- a React frontend app
- Postman

---

## 1) Simple idea first

Authentication means: **"Who are you?"**

Your project uses this 2-step idea:
1. Store passwords safely (never plain text) using `bcrypt`.
2. After login, give user a signed token (`JWT`) to prove identity in future requests.

Think of JWT like a temporary digital ID card.

---

## 2) Why bcrypt?

If you save plain password in DB, anyone with DB access can read user passwords.

So at register time, you do:
- `bcrypt.hash(password, 10)`
- store hash in MongoDB (`user.password`)

### What `10` means

`10` is salt rounds (cost factor):
- higher number = stronger but slower
- `10` is a common practical value for many apps

### Verify password during login

At login, you do not decrypt (hashes are one-way). You compare:
- input password from user
- stored hash in DB

Using:
- `bcrypt.compare(password, user.password)`

If compare is true, password is valid.

---

## 3) Why JWT?

After login success, user should not send email/password on every request.

So server creates JWT:
- payload: `{ id: user._id }`
- secret: `process.env.JWT_SECRET`
- expiry: `7d`

From your code (`controllers/authController.js`):
```js
const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
  expiresIn: "7d",
});
```

The token is then returned to client.

Client sends token in future requests:
- Header: `Authorization: Bearer <token>`

Server verifies token in middleware before protected routes.

---

## 4) Your current backend auth flow (exact project flow)

## 4.1 Register flow (`POST /api/auth/register`)

File: `controllers/authController.js`

Steps:
1. Read `name`, `email`, `password` from request body.
2. Check if user exists by email.
3. If exists -> return 400 `User Already Exists`.
4. Hash password with bcrypt.
5. Create user in DB with hashed password.
6. Generate JWT with user id.
7. Return `201` with `{ user, token }`.

Result:
- User is created.
- Client already gets token and can directly access protected routes.

---

## 4.2 Login flow (`POST /api/auth/login`)

File: `controllers/authController.js`

Steps:
1. Read `email`, `password`.
2. Find user by email.
3. If not found -> `404 User not found`.
4. Compare input password with hashed DB password using bcrypt.
5. If wrong -> `400 Invalid Password`.
6. Generate JWT.
7. Return `201` with `{ user, token }`.

Result:
- User gets fresh token after successful login.

---

## 4.3 Protected route flow (`/api/expenses`)

File: `routes/expenseRoutes.js`

Important line:
```js
router.use(authMiddeware);
```

Meaning:
- Every route in this router requires authentication.

Middleware file: `middlewares/authMiddleware.js`

Steps in middleware:
1. Read `req.headers.authorization`.
2. Validate it starts with `Bearer `.
3. Extract token part.
4. `jwt.verify(token, process.env.JWT_SECRET)`.
5. Get user id from decoded token.
6. Find user in DB and exclude password: `.select("-password")`.
7. Attach user to request: `req.user = user`.
8. Call `next()` so controller executes.

If anything fails -> return `401` or `404`.

---

## 4.4 Why `req.user` matters in expense controllers

In `controllers/expenseController.js`, all operations use:
- `req.user._id`

Examples:
- `GET_EXPENSES`: finds only expenses for logged-in user.
- `ADD_EXPENSE`: creates expense with `user: req.user._id`.
- `DELETE_EXPENSE` / `UPDATE_EXPENSE`: only allow action on expense belonging to logged-in user.

This prevents one user from accessing another user’s expenses.

---

## 5) Full request lifecycle (big picture)

1. User registers/logins.
2. Backend validates credentials.
3. Backend sends JWT token.
4. Frontend/Postman stores token.
5. For protected calls, token is sent in `Authorization` header.
6. Middleware verifies token.
7. Middleware sets `req.user`.
8. Protected controller runs with user context.

---

## 6) React app integration flow

Example frontend sequence:

## 6.1 Register/Login API call

- User fills form.
- React sends `POST /api/auth/register` or `POST /api/auth/login`.
- On success, response contains `data.token`.

## 6.2 Store token

Common beginner approach:
- store token in `localStorage`.

Example:
```js
localStorage.setItem("token", response.data.data.token);
```

## 6.3 Send token in protected requests

When calling `/api/expenses`:
```js
const token = localStorage.getItem("token");

await axios.get("/api/expenses", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

## 6.4 Logout flow

Basic logout:
- remove token from storage.

```js
localStorage.removeItem("token");
```

Now protected requests fail until user logs in again.

---

## 7) Postman testing flow (step-by-step)

Use these steps to test like frontend.

## 7.1 Register user

- Method: `POST`
- URL: `http://localhost:5000/api/auth/register` (use your actual port)
- Body (JSON):
```json
{
  "name": "Rohan",
  "email": "rohan@example.com",
  "password": "123456"
}
```

Copy token from response.

## 7.2 Login user

- Method: `POST`
- URL: `http://localhost:5000/api/auth/login`
- Body:
```json
{
  "email": "rohan@example.com",
  "password": "123456"
}
```

Copy token from response.

## 7.3 Access protected route

- Method: `GET`
- URL: `http://localhost:5000/api/expenses`
- Header:
  - Key: `Authorization`
  - Value: `Bearer <paste_token_here>`

If token is valid, middleware passes and you get expenses response.

## 7.4 Add expense

- Method: `POST`
- URL: `http://localhost:5000/api/expenses`
- Header: `Authorization: Bearer <token>`
- Body:
```json
{
  "name": "Groceries",
  "amount": 1200
}
```

The created expense is linked to authenticated user id.

---

## 8) Common beginner mistakes and fixes

1. Missing `Bearer ` prefix.
- Wrong: `Authorization: <token>`
- Correct: `Authorization: Bearer <token>`

2. Wrong/empty `JWT_SECRET`.
- If secret used in sign and verify doesn’t match, token is invalid.

3. Sending token to wrong place.
- Must go in request headers (not body).

4. Using expired token.
- Your tokens expire in 7 days; user must login again after expiry.

5. Not handling 401 in frontend.
- If API returns 401, clear token and redirect to login.

---

## 9) Security notes for beginners

1. Never store plain password.
- You already hash using bcrypt (good).

2. Keep strong JWT secret.
- Use long random secret in `.env`.

3. Avoid returning password in API response.
- Current code returns full user object from create/find. Since password is hashed, it is less dangerous than plain text, but still better to hide password in auth responses.

4. Use HTTPS in production.
- Protects token in network transit.

5. Consider refresh-token architecture later.
- For bigger production apps, use short access token + refresh token.

---

## 10) End-to-end example timeline

1. User logs in from React.
2. Backend verifies password hash via bcrypt compare.
3. Backend sends JWT token.
4. React stores token.
5. React calls `GET /api/expenses` with Bearer token.
6. `authMiddleware` verifies JWT.
7. Middleware sets `req.user`.
8. Controller fetches expenses for only that user.
9. Response sent back to React and shown on UI.

This is the complete "JWT + bcrypt auth flow" in your project.

---

## 11) Quick glossary

- Authentication: verifying user identity.
- Authorization: what user is allowed to access.
- Hashing: one-way transformation of password.
- Salt rounds: work factor for bcrypt hashing.
- JWT payload: data inside token (here: user id).
- Bearer token: token sent in `Authorization` header.
- Middleware: function that runs before controller.

---

If you want, next step can be creating a second file with diagrams (ASCII flowchart + sequence diagram) for even easier revision.
