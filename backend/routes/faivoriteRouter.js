import express from "express";
import Faivorite from "../models/faivoritList.js";


const faivorite = express.Router();

faivorite.get("/", async (req, res) => {
    const faivorite = await Faivorite.find();
    res.send(faivorite);
})

faivorite.post('/faivorite/add', (req, res) => {
    const faivorite = req.body;
    console.log("faivorite detail >>>>>", faivorite);
})



export default faivorite;


