import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRoute from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import multer from "multer";
// import cors from "cors"

dotenv.config();

const app = express();
// const cors = require('cors')

// app.use(cors({"strict-origin-when-cross-origin": * }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
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
app.use(express.json())
app.use("/api/seed", seedRouter);
app.use("/api/propertis", productRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
// app.use(cors({
//   origin:"http://localhost:3000",

// }))
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
  console.log(data.propertis);
});

const multer = multer();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null,  uniqueSuffix + file.originalname );
  }
})

const upload = multer({ storage: storage })

app.post("/upload-image",upload.single("image"),async(req,res)=>{
  console.log(req.body);
  res.send("Uploaded!!!");
})