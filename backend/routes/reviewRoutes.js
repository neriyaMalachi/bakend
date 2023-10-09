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

    await Review.create(reviewDetail, (err, data) => {
        if (err) {
            console.log(err.message);
            res.status(500).send(err);
        } if(!review) {
            console.log(reviewDetail);
            res.status(201).send(data);
        }
        // else{
        //     res.send
        // }
    });




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
        res.send(false);
    } else {
        res.send(review);
    }
})

reviewRouter.delete("/deleteReview/:id",async(req,res)=>{
    const review = await Review.deleteOne({ _id: req.params.id });
    console.log(req.params.id);
    res.send(review);
    
})

export default reviewRouter;
