import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true }, // קוד קופון
    discount: { type: Number, required: true }, // אחוז הנחה
    expirationDate: { type: Date, required: true }, // תאריך תפוגה
    isActive: { type: Boolean, default: true }, // מצב קופון (פעיל/לא פעיל)
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;