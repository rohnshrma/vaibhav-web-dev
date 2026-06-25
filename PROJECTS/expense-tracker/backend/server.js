import express from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import authRoutes from "./routes/authRoutes.js";

config();

connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

app.listen(PORT, () => console.log("Server started on port : ", PORT));
