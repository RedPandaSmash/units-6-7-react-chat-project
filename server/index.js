import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import roomRoutes from "./routes/room.route.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();
const PORT = process.env.PORT || 8080;
const MONGO = process.env.MONGO;

const app = express();

app.use(cors());
app.use(express.json());

// connect to mongodb
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(MONGO);

    console.log("Connected to mongodb!");
  } catch (error) {
    console.error("Error" + error);
    process.exit(1);
  }
};

connectDB();

// health endpoint
app.get("/api/health", (req, res) => {
  res.send("it works");
});

// use user routes
app.use("/api/users", userRoutes);

// use room routes
app.use("/api/rooms", roomRoutes);

app.listen(PORT, () => {
  console.log(`The server is alive beeotch. Port: ${PORT}`);
});
