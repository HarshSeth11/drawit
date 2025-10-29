import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import authRouters from "./routes/authRoutes.js";
import mongoose from "mongoose";
import { verifyToken } from "./middleware/authMiddleware.js";
import socketHandler from "./socket.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Routes
app.use("/api/auth", authRouters);
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you are authenticated!`});
})

// Socket
socketHandler(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
