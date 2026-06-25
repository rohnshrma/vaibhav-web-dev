# Expense Tracker Backend Documentation

This is a Node.js + Express + MongoDB backend for managing expenses with basic CRUD operations.

## 1. Tech Stack

- Node.js
- Express (`^5.2.1`)
- MongoDB + Mongoose (`^9.5.0`)
- dotenv
- ES Modules (`"type": "module"`)

## 2. Project Structure

```txt
backend/
├── config/
│   └── db.js
├── controllers/
│   └── expenseController.js
├── models/
│   └── expense.js
├── routes/
│   └── expenseRoutes.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## 3. High-Level Architecture

Request flow:

1. Client sends HTTP request.
2. `server.js` receives request.
3. Request is routed to `/api/expenses`.
4. `routes/expenseRoutes.js` maps endpoint + method to a controller.
5. Controller in `controllers/expenseController.js` runs business logic.
6. Controller uses `Expense` model from `models/expense.js` for DB queries.
7. Mongoose talks to MongoDB (connection from `config/db.js`).
8. JSON response is returned to client.

## 4. Startup and Boot Flow

In `server.js`:

1. Imports `express`, `dotenv`, DB connector, and expense routes.
2. Calls `config()` to load env variables.
3. Calls `connectDB()` once during startup.
4. Creates Express app.
5. Registers `express.json()` middleware for JSON parsing.
6. Mounts route group at `/api/expenses`.
7. Starts server on `process.env.PORT || 3000`.

If DB connection fails in `config/db.js`, process exits using `process.exit(1)`.

## 5. Database Layer

### `config/db.js`

- Uses:
  - `process.env.MONGO_URI`
  - fallback: `mongodb://localhost:27017/expense-tracker-api`
- On success logs DB host.
- On failure logs error message and exits app.

## 6. Data Model

### `models/expense.js`

`Expense` schema fields:

- `name`
  - `String`
  - `required: true`
  - `lowercase: true`
  - `unique: true`
  - `trim: true`
  - `minlength: 4`
- `amount`
  - `Number`
  - `required: true`
  - `default: 0`
  - `min: 0`

Also enabled:

- `timestamps: true` (auto adds `createdAt`, `updatedAt`)

Important behavior:

- `name` is converted to lowercase before save.
- `name` must be unique across collection.
- `amount` cannot be negative.

## 7. Routes and Endpoints

Base path: `/api/expenses`

Defined in `routes/expenseRoutes.js`:

- `GET /` -> `GET_EXPENSES`
- `POST /` -> `ADD_EXPENSE`
- `DELETE /:id` -> `DELETE_EXPENSE`
- `PUT /:id` -> `UPDATE_EXPENSE`

## 8. Controller Deep Dive

### `GET_EXPENSES`

File: `controllers/expenseController.js`

Flow:

1. Runs `Expense.find({})`.
2. If result is empty, returns `404` with `"No Expenses Found"`.
3. Otherwise returns `200` with all expenses.
4. On exception returns `500`.

Response shape:

```json
{
  "data": { "expenses": [] },
  "message": "Expenses Fetched Successfully"
}
```

### `ADD_EXPENSE`

Flow:

1. Reads `{ name, amount }` from request body.
2. Checks existing doc with `Expense.findOne({ name })`.
3. If exists, returns `500` with `"Expense Already Exists"`.
4. Otherwise creates new expense using `Expense.create({ name, amount })`.
5. Returns `201` with created document.
6. On exception returns `500`.

Response shape:

```json
{
  "data": { "expense": {} },
  "message": "Tasks Added Successfully"
}
```

### `DELETE_EXPENSE`

Flow:

1. Reads `id` from URL param.
2. Checks existing doc with `Expense.findById(id)`.
3. If not found, returns `500` with `"Expense Doesn't Exist"`.
4. If found, deletes by `Expense.findByIdAndDelete(id)`.
5. Returns `200`.
6. On exception returns `500`.

### `UPDATE_EXPENSE`

Flow:

1. Reads `id` from URL param and `{ name, amount }` from body.
2. Finds expense by id.
3. If not found returns `404`.
4. Mutates `expense.name` and `expense.amount`.
5. Calls `expense.save()` to persist with schema validation.
6. Returns `200` with updated expense.
7. On exception returns `500`.

## 9. Request/Response Conventions

The API generally returns:

- `data`: payload object (`expense` or `expenses`)
- `message`: human-readable result
- `error`: included only in catch blocks

Current status code usage in code:

- `200`: successful fetch/update/delete
- `201`: successful create
- `404`: used for not-found in some handlers (`GET_EXPENSES`, `UPDATE_EXPENSE`)
- `500`: used for server errors, and also for some business conditions (`Expense Already Exists`, `Expense Doesn't Exist`)

## 10. Validation Rules in Practice

Mongoose validation can fail when:

- `name` is missing
- `name` length < 4
- `amount` missing
- `amount` < 0
- duplicate `name` violates unique index

These will be caught and returned as `500` with `err.message` in current implementation.

## 11. Environment Configuration

Create `.env`:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/expense-tracker-api
```

If `MONGO_URI` is not provided, local fallback URL is used.

## 12. How To Run

Install dependencies:

```bash
npm install
```

Run in development:

```bash
npm run dev
```

Run in production mode:

```bash
npm start
```

## 13. Postman Testing Guide

Use base URL:

```txt
http://localhost:3000/api/expenses
```

Set header for body requests:

- `Content-Type: application/json`

### A. Create Expense (`POST /`)

Request:

```http
POST /api/expenses
```

Body:

```json
{
  "name": "groceries",
  "amount": 1200
}
```

Expected:

- `201` on success
- `500` if duplicate name
- `500` if validation fails

### B. Get All Expenses (`GET /`)

Request:

```http
GET /api/expenses
```

Expected:

- `200` with expenses array if data exists
- `404` if no expenses found

### C. Update Expense (`PUT /:id`)

Request:

```http
PUT /api/expenses/<expense_id>
```

Body:

```json
{
  "name": "groceries monthly",
  "amount": 1500
}
```

Expected:

- `200` if updated
- `404` if id does not exist
- `500` for invalid id format or validation issues

### D. Delete Expense (`DELETE /:id`)

Request:

```http
DELETE /api/expenses/<expense_id>
```

Expected:

- `200` on success
- `500` if expense does not exist
- `500` for invalid id format

## 14. Suggested Postman Collection Flow

Run these in order:

1. `POST /api/expenses` create first record.
2. `GET /api/expenses` confirm record exists.
3. Copy `_id` from GET response.
4. `PUT /api/expenses/:id` update amount/name.
5. `GET /api/expenses` verify update.
6. `DELETE /api/expenses/:id` delete it.
7. `GET /api/expenses` verify deletion.

## 15. Example IDs and Error Testing

Use these for negative tests:

- invalid ObjectId: `123`
- non-existing but valid ObjectId: `507f1f77bcf86cd799439011`

Test cases:

1. Create duplicate `name`.
2. Create with `amount: -1`.
3. Create with short name (`"abc"`).
4. Update with invalid id (`123`).
5. Delete with invalid id (`123`).

## 16. Current Gaps / Improvements You Can Add Next

1. Use semantic HTTP codes:
   - `409` for duplicates
   - `404` for missing resource
   - `400` for validation errors
2. Add centralized error middleware.
3. Add request validation middleware (Joi/Zod/express-validator).
4. Add pagination/sorting/filtering to `GET /api/expenses`.
5. Add authentication and user-scoped expenses.
6. Add tests (Jest + Supertest + in-memory MongoDB).

## 17. Quick File Responsibility Map

- `server.js`: app bootstrap and middleware/route mount
- `config/db.js`: MongoDB connection lifecycle
- `models/expense.js`: schema + validation rules
- `controllers/expenseController.js`: business logic per endpoint
- `routes/expenseRoutes.js`: endpoint-to-controller mapping

