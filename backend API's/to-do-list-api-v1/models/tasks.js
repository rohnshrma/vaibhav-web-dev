import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "user",
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const Task = new mongoose.model("task", taskSchema);

export default Task;
