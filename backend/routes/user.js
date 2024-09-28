const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware");

const userSchema = zod.object({
  username: zod.string().min(3).max(30).email(),
  firstName: zod.string().max(50),
  lastName: zod.string().max(50),
  password: zod.string().min(6),
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const payload = req.body;
  const username = payload.username;
  const data = userSchema.safeParse(payload);
  if (data.success) {
    const userExists = await User.find({ username });
    if (!!userExists?.length) {
      res.status(411).json({ message: "Email already taken" });
    } else {
      try {
        const newUser = await User.create(payload);
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
        res.status(200).json({
          message: "User created successfully",
          token,
        });
      } catch (err) {
        res.status(411).json({ message: "user not created, try again" });
      }
    }
  } else {
    res.status(411).json({ message: "Incorrect Inputs" });
  }
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  const user = await User.findOne({ username, password });
  if (user?.id) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.status(200).json({ token });
  } else {
    res.status(411).json({ message: "Error while logging in" });
  }
});

router.put('/', authMiddleware, async (req, res) => {
  const _id = req.userId
  const update = {};
  for (const key of Object.keys(req.body)) {
    if (req.body[key] !== '') {
      update[key] = req.body[key];
    }
  }
  try {
    const user = await User.findOneAndUpdate({ _id }, { $set: update },)
    console.log(user)
    res.status(200).json({ message: 'Updated Successfuly' })
  }
  catch (err) {
    res.status(411).json({ message: "Error while updating" })
  }
})

module.exports = router;
