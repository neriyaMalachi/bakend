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
        console.log("addd");
        await Review.create(reviewDetail, (err, data) => {
            if (err) {
                console.log(err.message);
                res.status(500).send(err);
            }
        res.status(201).send(data);

        });
    }
    else {
        res.send(err.message);

    }
})
reviewRouter.put("/editeReview/:id", async (req, res) => {
    let newReview = await Review.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    
    res.send(newReview);

})
reviewRouter.get("/checkIfExists", async (req, res) => {
    const review = await Review.findOne({ email: req.body.email });
    if (!review) {
        console.log("false");
        res.send(false);
    } else {
        console.log("true");

        res.send(review);
    }
})

reviewRouter.get("/checkIfUserInputReview", async (req, res) => {
    const review = await Review.findOne({ email: req.body.email });
    if (!review) {
        console.log("false");
        res.send();
    } else {
        console.log("true");

        res.send(true);
    }
})


reviewRouter.delete("/deleteReview/:id", async (req, res) => {
    const review = await Review.deleteOne({ _id: req.params.id });
    console.log(req.params.id);
    res.send(review);

})

export default reviewRouter;
