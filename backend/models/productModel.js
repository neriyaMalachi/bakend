import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    category: { type: String, require: true },
    slug: { type: String, require: true, unique: true },
    image: { type: String, require: true },
    price: { type: String, require: true },
    countInStock: { type: String, require: true },
    brand: { type: String, require: true },
    rating: { type: Number, require: true },
    numReviews: { type: Number, require: true },
    description: { type: String, require: true },
    sale: { type: Boolean},

  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
export default Product;

