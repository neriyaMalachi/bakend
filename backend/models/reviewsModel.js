import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    description: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);
const Review = mongoose.model("Review", reviewSchema);
export default Review;

