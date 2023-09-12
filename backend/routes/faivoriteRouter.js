import express from "express";
import Faivorite from "../models/faivoritListModel.js";


const faivorite = express.Router();

faivorite.get("/", async (req, res) => {
    const faivorite = await Faivorite.find();
    res.send(faivorite);
})

faivorite.post('/faivorite/add', (req, res) => {
    const faivorite = req.body;
    console.log("faivorite detail >>>>>", faivorite);
    faivorite.create(faivorite, (err, data) => {
        if (err) {
            res.status(500).send(err.message)
        } else {
            res.status(201).send(data)
        }
    })
})



export default faivorite;


