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
      { expiresIn: "1h" }
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

export default router;
