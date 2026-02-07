import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import connect from "./src/config/connect.js";
import authRoute from "./src/routes/authRoutes.js";
import messageRoute from "./src/routes/messageRoute.js";
import { app, server } from "./src/utils/socket.js";

// __dirname fix for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

// Production setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../Client/dist/index.html")
    );
  });
}

// DB connect
connect();

// Server start
server.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
