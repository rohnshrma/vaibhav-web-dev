import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
  },
  googleId: { type: String },
});

export default mongoose.model("User", userSchema);
