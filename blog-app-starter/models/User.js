import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
  },
  googleId: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;
