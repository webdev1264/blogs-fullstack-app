const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find({}).populate("blogs", {
      title: 1,
      author: 1,
      url: 1,
      likes: 1,
    });
    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
});

userRouter.post("/", async (req, res, next) => {
  const { userName, name, password } = req.body;
  if (password.length < 3) {
    return res.status(400).json({ error: "Password validation error" });
  }

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      userName,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (e) {
    next(e);
  }
});

module.exports = userRouter;
