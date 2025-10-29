import { Server } from "socket.io";
import jwt from "jsonwebtoken";

export default function socketHandler(server) {
    const io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL,
            methods: ["GET", "POST"]
        }
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) return next(new Error("Authentication error: No Token"));

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = decoded;
            next();
        } catch (error) {
            next(new Error("Authentication error: Invalid token"));
        }
    });

    io.on("connection", (socket) => {
        console.log("User connected: ", socket.user.username);

        socket.on("joinRoom", (roomId) => {
            socket.join(roomId);
            console.log(`${socket.user.username} joined room ${roomId}`);
        })

        // Whiteboard drawing
        socket.on("drawing", ({roomId, ...data}) => {
            socket.to(roomId).emit("drawing", data);
        });

        socket.on("clear", (roomId) => {
            socket.to(roomId).emit("clear");
        });

        socket.on("chat", ({roomId, msg}) => {
            io.to(roomId).emit("chat", { user: socket.user.username, msg });
        });
    });

    return io;
}