import Message from "../models/message.model.js";
import { Router } from "express";
import User from "../models/user.model.js";
import Room from "../models/room.model.js";
import validateSession from "../middleware/validatesession.js";

const router = Router();

// get all messages within a room
router.get("/:roomId", async (req, res) => {
  const { roomId } = req.params;
  try {
    // find all messages in the room and display
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "That room does not exist." });
  }
});

//post a message to a specific room
router.post("/:roomId", validateSession, async (req, res) => {
  const { roomId } = req.params;
  const { content } = req.body;

  try {
    // check that id corresponds to a valid room
    const room = await Room.findById(roomId);
    if (!room) {
      return res
        .status(404)
        .json({ error: "The room you are trying to post in does not exist." });
    }
    // assuming room exists, capture the Id of the user attempting to post the message
    const authorId = req.user._id;
    // NOTE: goal was originally to use the user's first and last name as the author, but upon realization that using the ID number is far more practical for validation checks when trying to edit or delete, ID it is.
    const newMessage = new Message({
      user: authorId,
      room: roomId,
      body: content,
    });

    const savedMessage = await newMessage.save();

    res.json({
      success: "Message posted successfully!",
      savedMessage,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong posting that meesage..." });
  }
});

// put method to update a message within a room while checking to see that the user is the one who posted the message
router.put("/:roomId/:messageId", validateSession, async (req, res) => {
  const { roomId, messageId } = req.params;
  const { content } = req.body;
  // capture the ID of the user attempting to edit the message
  const { editorId } = req.user._id;
  try {
    // validate that the user trying to edit the message is the one who posted it
    // must first use roomId to ensure the room exists
    const roomToSearch = await Room.findById(roomId);
    if (!roomToSearch) {
      return res.status(404).json({ error: "Room not found." });
    }
    const originalMessage = await Message.findById(messageId);
    if (!originalMessage) {
      return res.status(404).json({ error: "Message not found." });
    }
    // NOTE: unsure if .toString() method is necessary
    const originalAuthor = originalMessage.user.toString();
    if (originalAuthor !== editorId.toString()) {
      return res.status(403).json({
        error:
          "You are not the original author of this message, so you may not not edit or delete it.",
      });
    }
    // if user has permission to edit, update the message body with the content provided in the req.body
    originalMessage.body = content;
    // create the new message object to replace the old one
    const editedMessage = await originalMessage.save();
    res
      .status(200)
      .json({ success: "Message successfully edited", editedMessage });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong editing that meesage..." });
  }
});

// delete method to delete a messages within a room while checking to see that the user is the one who posted the message
router.delete("/:roomId/:messageId", validateSession, async (req, res) => {
  const { roomId, messageId } = req.params;
  const { deleterId } = req.user._id;
  try {
    //validate that the user trying to delete the message is the one who posted it
    // must first use roomId to ensure the room exists
    const roomToSearch = await Room.findById(roomId);
    if (!roomToSearch) {
      return res.status(404).json({ error: "Room not found." });
    }
    const originalMessage = await Message.findById(messageId);
    if (!originalMessage) {
      return res.status(404).json({ error: "Message not found." });
    }
    // NOTE: unsure if .toString() method is necessary
    const originalAuthor = originalMessage.user.toString();
    if (originalAuthor !== deleterId.toString()) {
      return res.status(403).json({
        error:
          "You are not the original author of this message, so you may not not edit or delete it.",
      });
    }
    // if user matches the user who posted, delete the message and return a success message showing the deleted message
    const deletedMessage = await Message.findOneAndDelete({ _id: messageId });
    res.status(200).json({
      success: "Message deleted successfully!",
      deletedMessage,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong deleting that message..." });
  }
});

export default router;
