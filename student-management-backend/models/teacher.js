import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
  },
  experienceYears: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    required: true,
  },
});

const Teacher = mongoose.model("expense", teacherSchema);

export default Teacher;
