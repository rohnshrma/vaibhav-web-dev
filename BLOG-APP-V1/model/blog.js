import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      minlength: 20,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 100,
    },
    category: {
      type: String,
      enum: [
        "Technology",
        "Lifestyle",
        "Travel",
        "Business",
        "Health",
        "Food",
        "Education",
        "Entertainment",
        "Sports",
        "Personal",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = new mongoose.model("blog", blogSchema);

export default Blog;
