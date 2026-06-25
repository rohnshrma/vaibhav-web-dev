import express from "express";

import { config } from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import teacherStudentRoutes from "./routes/teacherStudentRoutes.js";

config();
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/teacherStudent", teacherStudentRoutes);

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
