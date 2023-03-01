import express from "express";
import Product from "../models/productModel.js";

const productRoute = express.Router();

productRoute.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

//chack for slug
productRoute.get("/slug/:slug",async (req, res) => {
    const product = await Product.findOne({slug: req.params.slug});
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
    console.log(product);
  });
  
  //chack for id
  productRoute.get("/:id",async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
    console.log(product);
  });
  
  productRoute.post("/addProducts",
  
  )

export default productRoute;
