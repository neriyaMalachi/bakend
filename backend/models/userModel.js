import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    faivorit: { type:[{
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
    }], require: true },
    isAdmin: { type: Boolean, default: false, required: true },

  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
