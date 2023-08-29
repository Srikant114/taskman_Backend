const express = require("express");
const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET


const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("All users available");
});

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 5, async (err, hash) => {
    if (err)
      return res.send({
        message: "Ooops, Something Went Wrong",
        status: 0,
      });
    try {
      let user = new UserModel({ name, email, password: hash });
      await user.save();
      res.send({
        message: "User Created",
        status: 1,
      });
    } catch (error) {
      res.send({
        message: err.message,
        status: 0,
      });
    }
  });
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let option = {
    expiresIn:"7d"
  }
  try {
    let data = await UserModel.find({ email });
    if (data.length > 0) {
      let token = jwt.sign({ userId: data[0]._id },jwtSecret,option);
      bcrypt.compare(password, data[0].password, (err, result) => {
        if (err)
          return res.send({
            message: `Something Went Wrong:${err}`,
            status: 0,
          });
        if (result) {
          res.send({
            message: "User Logged in Successfully",
            token: token,
            status: 1,
          });
        } else {
          res.send({
            message: "Incorrect password",
            status: 1,
          });
        }
      });
    } else {
      res.send({
        message: "User Does not Exist",
        status: 0,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});

module.exports = { userRouter };
