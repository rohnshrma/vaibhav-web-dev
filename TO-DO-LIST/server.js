import express from "express";
import connectDB from "./config/db.js";
import Task from "./models/task.js";

const app = express();

const PORT = 3000;

connectDB();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({});

    if (!tasks) {
      console.log("Failed to fetch tasks");
      return res.send(
        "<div><h1>Something Went Wrong</h1><a href='/'>BACK TO HOME</a></div>"
      );
    }

    res.render("index", {
      tasks,
    });
  } catch (err) {
    console.log(err);
    res.send(
      "<div><h1>Something Went Wrong</h1><a href='/'>BACK TO HOME</a></div>"
    );
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const name = req.body.name;

    if (!name) {
      console.log("Name field must be provided");
      return res.redirect("/");
    }

    const newTask = await Task.create({
      name,
    });

    console.log(newTask);

    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.send(
      "<div><h1>Something Went Wrong</h1><a href='/'>BACK TO HOME</a></div>"
    );
  }
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
