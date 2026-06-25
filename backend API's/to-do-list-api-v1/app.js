import express from "express";
import morgan from "morgan";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import { config } from "dotenv";

config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => console.log("APP RUNNING ON PORT", PORT));
