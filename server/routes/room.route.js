import Room from "../models/room.model.js";
import { Router } from "express";
import User from "../models/user.model.js";
import validateSession from "../middleware/validatesession.js";

const router = Router();

// add new room to chat in
router.post("/newroom", validateSession, async (req, res) => {
  const { name, description, invitedUserIds = [] } = req.body;
  try {
    const creatorId = req.user._id;

    const addedUsers = [creatorId];

    if (invitedUserIds.length > 0) {
      const validUsers = await User.find({ _id: { $in: invitedUserIds } });

      const validUserIds = validUsers.map((user) => user._id);
      addedUsers.push(...validUserIds);
    }

    const newRoom = new Room({
      name,
      description,
      addedUsers,
      createdBy: creatorId,
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
    const rooms = await Room.find();
    res.status(200).json({
      rooms: rooms,
      message: "Rooms were found",
    });
  } catch (error) {
    console.error(error);
  }
});

export default router;
