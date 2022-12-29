import express from "express";
import data from "./data.js";

const app = express();

app.get("/api/propertis", (req, res) => {
  res.send(data.propertis);
});

app.get("/api/propertis/slug/:slug", (req, res) => {
  const product = data.propertis.find((x) => x.slug === req.params.slug);
  if (product) {
    res.send(product);
   }
  else {
    res.status(404).send({ message: "Product Not Found" });
  }
  console.log(product);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
  console.log(data.propertis);
});
