const express = require("express");
const { logger } = require("../middlewares/logger");
const { validator } = require("../middlewares/validator");
const { UserModel } = require("../models/User.model");

const userRouter = express.Router();

/* ------ Get all User ------ */
userRouter.get("/", async (req, res) => {
  try {
    const data = await UserModel.find();
    res.status(200).send({ users: data });
  } catch (error) {
    res.status(400).send(error);
  }
});

/* ------ Get one  User ------ */
userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let user = await UserModel.find({ _id: id });
    res.status(200).send({ user: user[0] });
  } catch (error) {}
});

/* ------ Register User ------ */
userRouter.post("/register", async (req, res) => {
  let data = req.body;
  try {
    let user = new UserModel(data);
    await user.save();
    res.status(200).send({ res: "User Added" });
  } catch (error) {
    res.status(400).send(error);
  }
});

/* ------ Edit User ------ */
userRouter.patch("/edit/:id", validator, logger, async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    await UserModel.findByIdAndUpdate({ _id: id }, data);
    res.status(200).send({ res: "Updated User Successfully" });
  } catch (error) {
    res.status(200).send(error);
  }
});

/* ------ Delete User ------ */
userRouter.delete("/delete/:id", validator, logger, async (req, res) => {
  const { id } = req.params;
  try {
    await UserModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ res: "Deleted User Successfully" });
  } catch (error) {
    res.status(200).send(error);
  }
});

/* ------ Exports ------ */
module.exports = { userRouter };
