import express from "express";
import Product from "../models/productModel.js";

const productRoute = express.Router();

productRoute.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

//chack for slug
productRoute.get("/slug/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
  console.log(product);
});

//chack for id
productRoute.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
  console.log(product);
});

productRoute.post("/addProducts/add", async (req, res) => {
  const productDetail = req.body;
  await Product.create(productDetail, (err, data) => {
    if (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    } else {
      console.log(productDetail);
      res.status(201).send(data);
    }
  });
});

productRoute.delete("/deleteProduct/:id", async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

productRoute.put("/updateProducts/:id", async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

export default productRoute;
