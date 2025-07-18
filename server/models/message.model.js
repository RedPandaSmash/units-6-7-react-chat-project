// import modules from mongoose
import { Schema, model } from "mongoose";

// create a schema for the message model
const messageSchema = new Schema({
  when: {
    type: Date,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

// create the message model using the schema
export default model("Message", messageSchema);
