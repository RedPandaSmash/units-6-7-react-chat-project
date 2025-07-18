import User from "../models/user.model.js";
import { Router } from "express";

const router = Router();

// user routes should be at "/api/users"
router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const newUser = new User({
      email,
      password,
      firstName,
      lastName,
    });

    const savedUser = await newUser.save();

    res.json({
      message: "User made successfully",
      savedUser,
    });
  } catch (error) {
    console.error(error);
  }
});

export default router;
