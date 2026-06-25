import mongoose from "mongoose";
import Expense from "../models/expense.js";

export const GET_EXPENSES = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }); // all expenses of authenticated user

    if (!expenses || expenses.length <= 0)
      return res
        .status(404)
        .json({ data: { expenses: null }, message: "No Expenses Found" });

    return res
      .status(200)
      .json({ data: { expenses }, message: "Expenses Fetched Successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Failed to Fetch Expenses" });
  }
};
export const ADD_EXPENSE = async (req, res) => {
  try {
    const { name, amount } = req.body;
    let expense;

    expense = await Expense.findOne({ name: name, user: req.user._id });

    if (expense)
      return res
        .status(500)
        .json({ data: { expense }, message: "Expense Already Exists" });

    const newExpense = await Expense.create({
      name,
      amount,
      user: req.user._id,
    });

    return res.status(201).json({
      data: { expense: newExpense },
      message: "Tasks Added Successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Failed to Add Expense" });
  }
};
export const DELETE_EXPENSE = async (req, res) => {
  try {
    const id = req.params.id;
    let expense;
    expense = await Expense.findOne({ _id: id, user: req.user._id });

    if (!expense)
      return res
        .status(500)
        .json({ data: { expense }, message: "Expense Doesn't Exist" });

    await Expense.findByIdAndDelete(id);

    return res.status(200).json({
      data: { expense: null },
      message: "Tasks Deleted Successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Faield to Delete Expense" });
  }
};
export const UPDATE_EXPENSE = async (req, res) => {
  try {
    const { name, amount } = req.body;
    const { id } = req.params;

    const expense = await Expense.findOne({ _id: id, user: req.user._id });

    if (!expense)
      return res
        .status(404)
        .json({ data: { expense: null }, message: "Expense Not Found" });

    expense.name = name;
    expense.amount = amount;

    await expense.save();

    return res.status(200).json({
      data: { expense: expense },
      message: "Expense Updated Successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Failed to Update Expense" });
  }
};
