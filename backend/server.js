import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRoute from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongoose.connect("mongodb://127.0.0.1:27017/Store_N")


mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URI);

app.listen(3002, () => {
  console.log("new server conect");
});


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.use(express.json());
app.use("/api/seed", seedRouter);
app.use("/api/propertis", productRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port =  5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
