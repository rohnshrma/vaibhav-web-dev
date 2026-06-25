import express from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import Expense from "./models/expense.js";

const app = express();

config();

connectDB();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const calculateTotalExpenses = (expenses) =>
  expenses.reduce((total, expense) => total + expense.amount, 0);

app.route("/").get(async (req, res) => {
  try {
    const expenses = await Expense.find({});
    console.log("All Expenses =>", expenses);

    res.render("home", {
      expenses,
      total: calculateTotalExpenses(expenses),
    });
  } catch (err) {
    console.log("Error while loading home page =>", err);
    res.redirect("/");
  }
});

app.route("/add-expense").post(async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const amount = Number(req.body.amount);

    if (!name || Number.isNaN(amount) || amount <= 0) {
      console.log("Name and amount are invalid");
      return res.redirect("/");
    }

    const expense = await Expense.create({
      name,
      amount,
    });

    console.log("expense added =>", expense);
    res.redirect("/");
  } catch (err) {
    console.log("Error while submitting form =>", err);
    res.redirect("/");
  }
});

app.route("/delete/:id").post(async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findById(id);
    if (!expense) {
      console.log("No Expense Found With given id");
      return res.redirect("/");
    }

    await Expense.findByIdAndDelete(id);
    console.log("Expense Deleted");

    res.redirect("/");
  } catch (err) {
    console.log("Error while deleting item =>", err);
    res.redirect("/");
  }
});

app
  .route("/update/:id")
  .get(async (req, res) => {
    try {
      const { id } = req.params;

      const expense = await Expense.findById(id);
      if (!expense) {
        console.log("Expense not found");
        return res.redirect("/");
      }

      res.render("edit", {
        expense,
      });
    } catch (err) {
      console.log("Error while loading edit page =>", err);
      res.redirect("/");
    }
  })
  .post(async (req, res) => {
    try {
      const { id } = req.params;
      const name = req.body.name?.trim();
      const amount = Number(req.body.amount);

      if (!name || Number.isNaN(amount) || amount <= 0) {
        console.log("Name and amount are invalid");
        return res.redirect("/");
      }

      const expense = await Expense.findById(id);
      if (!expense) {
        console.log("Expense not found");
        return res.redirect("/");
      }

      expense.name = name;
      expense.amount = amount;

      await expense.save();

      console.log("expense updated =>", expense);
      res.redirect("/");
    } catch (err) {
      console.log("Error while updating form =>", err);
      res.redirect("/");
    }
  });

app.listen(PORT, () => console.log("Server Started on PORT :", PORT));
