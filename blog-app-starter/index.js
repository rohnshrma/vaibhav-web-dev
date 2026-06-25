import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import session from "express-session";
import passport from "./auth/auth.js";

config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SECRET || "helloworld",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);
app.use(blogRoutes);

app.listen(PORT, () => console.log("Server started on port : ", PORT));
