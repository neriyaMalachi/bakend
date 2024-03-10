import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: String, require: true },
    email:{type: String,require: true},
    review: { type: String, require: true },
    rating: {type: Number, require: true},
  },
  {
    timestamps: true,
  }
);
const Review = mongoose.model("Review", reviewSchema);
export default Review;

   