import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  rollNumber: {
    type: String,
    unique: true,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    required: true,
  },
});

const Student = mongoose.model("student", studentSchema);

export default Student;
