import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Task from "./models/todo.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/vjtbhtdlDB");

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const task = new Task({
    title: req.body.title,
  });

  await task.save();

  res.json(task);
});
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);

  res.json({
    message: "Deleted",
  });
});

app.listen(3000, () => {
  console.log("Server running");
});
