import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
