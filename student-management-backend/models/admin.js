import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "teacher"],
      default: "teacher",
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("admin", adminSchema);

export default Admin;
