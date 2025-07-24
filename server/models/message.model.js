// import modules from mongoose
import { Schema, model } from "mongoose";

// create a schema for the message model
const messageSchema = new Schema(
  {
    when: {
      type: Date,
      // ask for how to do Date
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// create the message model using the schema
export default model("Message", messageSchema);
