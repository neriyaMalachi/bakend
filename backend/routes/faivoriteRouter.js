import express from "express";
import Faivorite from "../models/faivoritListModel.js";


const faivorite = express.Router();

faivorite.get("/", async (req, res) => {
    const faivorite = await Faivorite.find();
    res.status(200).send(faivorite);
})




faivorite.post('/add', async (req, res) => {
    const faivoriteDto = req.body;
    const newFavourite = new Faivorite(faivoriteDto.item);
    try {
        const favourite = await newFavourite.save();
        res.status(201).send(favourite)
    } catch (err) {
        console.log(err)
        if (err.code === 11000)
            res.status(409).send()

        res.status(400).send()
    }
})



export default faivorite;


