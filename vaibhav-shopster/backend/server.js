import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import productRoutes from "./router/productRoutes.js";

config();
const app = express();
const PORT = process.env.PORT || 5000;

const MONGO_URI =
  process.env.MONGO_URI ||
  process.env.MONGODB_URI ||
  "mongodb://127.0.0.1:27017/shopster";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    message: "Shopster backend is running",
    status: "Success",
  });
});

app.use("/api/products", productRoutes);
app.use("/products", productRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    data: null,
    status: "Failed",
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    data: null,
    status: "Failed",
  });
});

mongoose
  .connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
