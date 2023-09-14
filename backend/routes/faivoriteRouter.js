import express from "express";
import Faivorite from "../models/faivoritListModel.js";


const faivorite = express.Router();

faivorite.get("/getAllListFaivoritProps", async (req, res) => {
    const faivorite = await Faivorite.find();
    console.log(faivorite.length);
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
faivorite.delete("/deleteFaivorit/:item",async (req, res) => {
    const result = await Faivorite.deleteOne({ _id: req.params.item });
    console.log(result);
    res.send(result);
  })
//   faivorite.put("/update/:id", async (req, res) => {
//     console.log("iv");
//     let result = await Faivorite.updateOne(
//       { _id: req.params.id },
//       { $set: req.body },
//       console.log("update")
//     );
//     res.send(result);
//     console.log("nnooo_update")

//   });

export default faivorite;


