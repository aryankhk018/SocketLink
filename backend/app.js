import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import connetToSocket from "./src/controllers/socketManager.js";
import userRoutes from "./src/routes/userRoutes.js";
const app = express();
const server = createServer(app);
const io = connetToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(
  cors({
    origin: "https://socketlink.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
  app.set("mongo_user");
  const connectionDb = await mongoose.connect(
    "mongodb+srv://aryan2460:Aryan123@videocall.1ymuj.mongodb.net/"
  );
  console.log(`database connected ${connectionDb.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log("app is running on port 8000");
  });
};

start();
