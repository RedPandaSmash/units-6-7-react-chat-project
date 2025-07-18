import Room from "../models/room.model.js";
import { Router } from "express";

const router = Router();

//
router.post("/newroom", async (req, res) => {
  const { name, description, addedUsers } = req.body;
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
