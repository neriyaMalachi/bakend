import express from "express";
import Review from "../models/reviewsModel.js";

const reviewRouter = express.Router();
reviewRouter.get("/", async (req, res) => {
    const reviews = await Review.find();
    res.send(reviews);
});
reviewRouter.post("/addReview", async (req, res) => {
    const reviewDetail = req.body;
    console.log(reviewDetail);
    await Review.create(reviewDetail, (err, data) => {
        if (err) {
            console.log(err.message);
            res.status(500).send(err);
        } else {
            console.log(reviewDetail);
            res.status(201).send(data);
        }
    });



})
reviewRouter.put("/editeReview", async (req, res) => {
    let newReview = await Review.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.send(newReview);

})


export default reviewRouter;
