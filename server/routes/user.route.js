import User from "../models/user.model.js";
import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

// user routes should be at "/api/users"
router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const newUser = new User({
      email,
      password: await bcrypt.hash(password, 10), // hash the password
      firstName,
      lastName,
    });

    const savedUser = await newUser.save();

    // issue the token to the user
    const token = jwt.sign(
      {
        id: savedUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.json({
      message: "User made successfully",
      savedUser,
      token,
    });
  } catch (error) {
    console.error(error);
  }
});

// login route /api/users/login
router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // find the user by email
  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  // compare the password with the hashed password
  // save in the database
  const verifyPwd = await bcrypt.compare(password, foundUser.password);

  if (!verifyPwd) {
    return res.status(401).json({
      error: "Invalid password",
    });
  }

  // issue the token to the user
  const token = jwt.sign(
    {
      id: foundUser._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3h" }
  );

  // send the user and token in the response
  res.status(200).json({
    user: foundUser,
    token: token,
    message: "User logged in successfully!",
  });
  try {
  } catch (error) {
    console.error(error);
  }
});

export default router;
