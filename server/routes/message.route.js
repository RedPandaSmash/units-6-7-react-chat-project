import Message from "../models/message.model";
import { Router } from "express";

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
router.post("/:roomId", async (req, res) => {
  const { roomId } = req.params;
  const { content } = req.body;
  // placeholder(?) for pulling user ID from the database, for now inputing it manually
  const { userId } = req.body;
  // need code to capture user's name based on userId
  try {
    const newMessage = new Message({
      user: userId, // goal is to replace this with the user's name
      room: roomId,
      body: content,
      when: new Date(),
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
router.put("/:roomId/:messageId", async (req, res) => {
  const { roomId, messageId } = req.params;
  const { content } = req.body;
  // same placeholder as in post method
  const { userId } = req.body;
  try {
    // validate that the user trying to edit the message is the one who posted it
    // replace this when we figure out how to actually capture the ID of the user who posted the message
    const editedMessage = await Message.findOneAndUpdate(/*placeholder*/);
    // save the edited message
    const savedMessage = await editedMessage.save();
    res.json({
      success: "Message updated successfully!",
      savedMessage,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong editing that meesage..." });
  }
});

// delete method to delete a messages within a room while checking to see that the user is the one who posted the message
router.delete("/:roomId/:messageId", async (req, res) => {
  const { roomId, messageId } = req.params;
  // same placeholder as in post and put methods
  const { userId } = req.body;
  try {
    //validate that the user trying to delete the message is the one who posted it
    //placeholder
    // if user matches the user who posted, delete the message and return a success message showing the deleted message
    const deletedMessage = await Message.findOneAndDelete(/*placeholder*/);
    res.status(200).json({
      success: "Message deleted successfully!",
      deletedMessage,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong deleting that meesage..." });
  }
});

export default router;
