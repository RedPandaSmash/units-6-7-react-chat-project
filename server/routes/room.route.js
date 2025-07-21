import Room from "../models/room.model.js";
import { Router } from "express";

const router = Router();

// add new room to chat in
router.post("/newroom", async (req, res) => {
  const { name, description, addedUsers } = req.body;
  // need to ask how to get the user by mongo user id
  // const { addedUsers } = req.user._id;
  //
  try {
    const newRoom = new Room({
      name,
      description,
      addedUsers,
    });

    const savedRoom = await newRoom.save();

    res.json({
      message: "Room made successfully",
      savedRoom,
    });
  } catch (error) {
    console.error(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const rooms = await Rooms.find();
    res.status(200).json({
      rooms: rooms,
      message: "Rooms were found",
    });
  } catch (error) {
    console.error(error);
  }
});

export default router;
