import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
  title: String,
});

const Task = mongoose.model("Task", todoSchema);

export default Task;
