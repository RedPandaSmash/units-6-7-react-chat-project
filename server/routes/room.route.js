import Room from "../models/room.model.js";
import { Router } from "express";

const router = Router();

// add new room to chat in
router.post("/newroom", async (req, res) => {
  const { name, description } = req.body;
  // check if the user is logged in to be able to create a room
  // add the current user to the array of addedUsers (the users who can access the room and see its messages)
  let currentUser = await User.findOne;

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
