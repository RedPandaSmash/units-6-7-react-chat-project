import Room from "../models/room.model.js";
import { Router } from "express";

const router = Router();

//
router.post("/newroom", (req, res) => {
  const { name, description, addedUsers } = req.body;
  //
  try {
    const newRoom = new Room({});
  } catch (error) {}
});

// router.get();

export default router;
