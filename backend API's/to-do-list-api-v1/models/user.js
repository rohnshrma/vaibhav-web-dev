import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
  },
});

const User = new mongoose.model("user", userSchema);

export default User;
