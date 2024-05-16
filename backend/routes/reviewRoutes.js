import express from "express";
import Review from "../models/reviewsModel.js";
import { Error } from "mongoose";

const reviewRouter = express.Router();
reviewRouter.get("/", async (req, res) => {
  const reviews = await Review.find();
  res.send(reviews);
});
reviewRouter.post("/addReview", async (req, res) => {
  const reviewDetail = req.body;
  const review = await Review.findOne({ email: req.body.email });
  if (!review) {
    await Review.create(reviewDetail, (err, data) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(201).send(data);
    });
  } else {
    res.send(err.message);
  }
});
reviewRouter.put("/editeReview/:id", async (req, res) => {
  let newReview = await Review.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(newReview);
});
reviewRouter.get("/checkIfExists", async (req, res) => {
  const review = await Review.findOne({ email: req.body.email });
  if (!review) {
    res.send(false);
  } else {
    res.send(review);
  }
});
reviewRouter.post("/checkIfUserInputReview", async (req, res) => {
  const review = await Review.findOne({ email: req.body.email });
  if (review) {
    res.status(201).send(true);
  } else {
    res.send(false);
  }
});
reviewRouter.delete("/deleteReview/:id", async (req, res) => {
  const review = await Review.deleteOne({ _id: req.params.id });
  res.send(review);
});

export default reviewRouter;
