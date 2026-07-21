import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Recipe from "./models/recipe.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/vjRecipe");

app.get("/recipe", async (req, res) => {
  const recipe = await Recipe.find();
  res.json(recipe);
});

app.post("/recipe", async (req, res) => {
  try {
    const { name, category, ingredients, time } = req.body;
    const recipe = new Recipe({
      name,
      category,
      ingredients,
      time,
    });

    await recipe.save();
    res.json(recipe);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});
app.delete("/recipe/:id", async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);

  res.json({
    message: "DELETED",
  });
});

app.listen(3000, () => {
  console.log("SERVER running on PORT 3000");
});
