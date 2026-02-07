import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "development"
        ? ["http://localhost:5173"]
        : true, // allow same-origin (Render)
    credentials: true,
  },
});


// Online users map
const userSocket = {};

export const getReciverSocketId = (userId) => {
  return userSocket[userId];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocket[userId] = socket.id;
  }
  // Send all online users
  io.emit("getOnlineUsers", Object.keys(userSocket));

  socket.on("disconnect", () => {
    if (userId) {
      delete userSocket[userId];
    }

    io.emit("getOnlineUsers", Object.keys(userSocket));
  });
});

export { io, app, server };
