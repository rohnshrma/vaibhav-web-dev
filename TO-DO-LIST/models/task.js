// model => collection

import mongoose from "mongoose";

// blueprint / schema

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    unqiue: true,
    trim: true,
    lowercase: true,
  },
});

const Task = mongoose.model("task", taskSchema);

export default Task;
