// import modules from mongoose
import { Schema, model } from "mongoose";

// create a schema for the room model
const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  addedUsers: {
    type: Array,
    required: true,
  },
});

// create the room model using the schema
export default model("Room", roomSchema);
