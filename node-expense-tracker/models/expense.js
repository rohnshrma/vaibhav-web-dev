import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Expense = mongoose.model("expense", expenseSchema);

export default Expense;
