import express from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import Blog from "./model/blog.js";
const app = express();
const PORT = process.env.PORT || 3000;
config();

connectDB();

// middlewares
// static files
app.use(express.static("public"));
// enable read form data
app.use(express.urlencoded({ extended: true }));
// change app setting
app.set("view engine", "ejs");

// routes

app.route("/").get((req, res) => res.render("Home"));
app
  .route("/compose")
  .get((req, res) => res.render("Compose"))
  .post(async (req, res) => {
    try {
      const { title, description, category } = req.body;

      if (!title || !description || !category) {
        console.log("Title, Description and Category fields are required");
        return res.redirect("/compose");
      }

      if (title.length < 20 || description.length < 100) {
        console.log("Title and Description length are lower than required");
        return res.redirect("/compose");
      }

      const blog = await Blog.create({
        title: title,
        description: description,
        category: category,
      });

      console.log("New Blog => ", blog);
      res.redirect("/blog");
    } catch (err) {
      console.log("Error ", err);
      res.redirect("/compose");
    }
  });
app.route("/blog").get(async (req, res) => {
  try {
    const blogs = await Blog.find({});

    if (!blogs) {
      console.log("Something went wrong");
      return res.redirect("/");
    }

    res.render("blog", {
      blogs,
    });
  } catch (err) {
    console.log("Error ", err);
    res.redirect("/blog");
  }
});

app.route("/blog-details/:id").get(async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById({ _id: blogId });

    if (!blog) {
      console.log("Blog Not Found");
      return res.status(404).render("Post", {
        blog: null,
      });
    }

    res.render("Post", {
      blog,
    });
  } catch (err) {
    console.log("Error ", err);
    res.status(404).render("Post", {
      blog: null,
    });
  }
});

app.listen(PORT, () => console.log("Server started on port :", PORT));
