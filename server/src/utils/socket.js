const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

//Online Users
const userSocket = {};


 function getReciverSocketId(userId){
  return userSocket[userId];
 }


io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) userSocket[userId] = socket.id;

  //send all Online USer

  io.emit("getOnlineUsers", Object.keys(userSocket));
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete userSocket[userId];
    io.emit("getOnlineUsers", Object.keys(userSocket));
  });
});

module.exports = { io, app, server,getReciverSocketId };
