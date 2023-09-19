import express from "express";
import User from "../models/userModel.js";
import * as mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { isAuth, generateToken } from "../utils.js";
import expressAsyncHandler from "express-async-handler";
import Faivorit from "../models/faivoritListModel.js";

const userRouter = express.Router();

userRouter.post("/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const isEqualPassword = await bcrypt.compare(req.body.password, user.password)
      if (isEqualPassword) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password " });
  })
);
userRouter.post("/forgetPassword",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      res.status(401).send({ message: "Invalid email or password " });

    } else {
      res.send({
        email: user.email,
        token: generateToken(user),

      });

      return;
    }
  })
);

userRouter.post("/signup",
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

userRouter.put("/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = await bcrypt.hash(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);

userRouter.post('/change-password', async (req, res) => {
  const { password } = req.body;
  const { email } = req.body;
  console.log(password, email);
  const user = await User.findOne({ email }).exec();


  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!password) {
    return res.status(401).json({ message: 'Current password is incorrect' });
  }

  console.log(user);

  user.password = await bcrypt.hash(password, 8);;

  user.save()

  res.status(200).json({ message: 'Password updated successfully' });
});


userRouter.get("/getAllUser", async (req, res) => {
  try {
    const allUser = await User.find({});
    res.send(allUser);
  } catch (error) {
    console.log(error);
  }
});

userRouter.delete("/deleteuser/:id", async (req, res) => {
  const result = await User.deleteOne({ _id: req.params.id });
  res.send(result);
});


userRouter.post("/addUser", async (req, res) => {
  const userDetail = req.body;
  await User.create(userDetail, (err, data) => {
    if (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    } else {
      console.log(userDetail);
      res.status(201).send(data);
    }
  });
})
userRouter.post('/addFaivoritItem:id', async (req, res) => {
  const result = await User.findById({ _id: req.params.id });

  const faivoriteDto = req.body;
  console.log(faivoriteDto,result);
  // const faivoritePerUser = new User(faivoriteDto.item)
  // try {
  //   const favouriteforListUser = await faivoritePerUser.save();
  //   res.status(201).send(favouriteforListUser)
  // } catch (err) {
  //   console.log(err)
  //   if (err.code === 11000)
  //     res.status(409).send()
  //   res.status(400).send()
  // }

})
userRouter.get("/getAllListFaivoritProps", async (req, res) => {
  const faivorite = await Faivorit.find();
  console.log(faivorite);
  res.status(200).send(faivorite);

})
export default userRouter;
