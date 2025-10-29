// socket.js
import { io } from "socket.io-client";

export const createSocket = () => {
  const token = localStorage.getItem("token"); // stored after login
  return io(process.env.REACT_APP_BACKEND_URL || "http://localhost:5000", {
    auth: { token }, // send token in handshake
    transports: ["websocket", "polling"],
  });
};
