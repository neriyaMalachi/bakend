import express from "express";
import Review from "../models/reviewsModel.js";

const reviewRouter = express.Router();

reviewRouter.post("/addReview", async (req, res) => {
    const reviewDetail = req.body;
    await Review.create(reviewDetail, (err, data) => {
        if (err) {
            console.log(err.message);
            res.status(500).send("1");
        } else {
            console.log(reviewDetail);
            res.status(201).send(data);
        }
    });
})


export default reviewRouter;
