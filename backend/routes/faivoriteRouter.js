import express from "express";
import Faivorite from "../models/faivoritListModel.js";


const faivorite = express.Router();

faivorite.get("/getAllListFaivoritProps", async (req, res) => {
    const faivorite = await Faivorite.find();
    console.log(faivorite.length);
    res.status(200).send(faivorite);

})




export default faivorite;


