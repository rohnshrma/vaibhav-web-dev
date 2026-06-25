import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      minlength: 4,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
      default: 0,
      min: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
