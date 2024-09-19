import express from "express";
import Coupon from '../models/couponModel.js'

const compont = express.Router();

// יצירת קופון חדש
compont.post("/create", async (req, res) => {
  try {
    const { code, discount, expirationDate, isActive } = req.body;
    const newCoupon = new Coupon({
      code,
      discount,
      expirationDate,
      isActive,
    });
    await newCoupon.save();
    res.status(201).json({ message: "Coupon created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating coupon", error });
  }
});

// קבלת כל הקופונים
compont.get("/", async (req, res) => {
  try {
    const coupons = await Coupon.find({});
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: "Error fetching coupons", error });
  }
});

// עריכת קופון קיים
compont.put("/update/:id", async (req, res) => {
  try {
    const { code, discount, expirationDate, isActive } = req.body;
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      {
        code,
        discount,
        expirationDate,
        isActive,
      },
      { new: true }
    );
    res.status(200).json({ message: "Coupon updated", updatedCoupon });
  } catch (error) {
    res.status(500).json({ message: "Error updating coupon", error });
  }
});

// מחיקת קופון
compont.delete("/delete/:id", async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Coupon deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting coupon", error });
  }
});

compont.get("/validate/:code", async (req, res) => {
    const { code } = req.params;
    
    try {
      const coupon = await Coupon.findOne({ code });
      
      if (!coupon) {
        return res.status(400).json({ isValid: false, message: "Invalid coupon" });
      }
  
      const now = new Date();
      if (now > new Date(coupon.expirationDate)) {
        return res.status(400).json({ isValid: false, message: "Coupon expired" });
      }
  
      return res.status(200).json({
        isValid: true,
        discount: coupon.discount,
        code: coupon.code,
      });
    } catch (err) {
      return res.status(500).json({ message: "Server error" });
    }
  });
  
export default compont;
