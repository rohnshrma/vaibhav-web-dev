import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    description: { type: String, required: true, trim: true, minlength: 3 },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);

export default Product;
