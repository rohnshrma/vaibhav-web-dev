import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  category: {
    type: String,
    required: true,
    trim: true,
  },
  ingredients: {
    type: String,
    required: true,
    trim: true,
  },

  time: {
    type: Number,
    required: true,
    min: 1,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
