require("dotenv").config();
const express = require("express");
const connect = require("./src/config/connect.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path')
const authRoute = require("./src/routes/authRoutes.js");
const messageRoute = require("./src/routes/messageRoute.js");
const { app,server } = require("./src/utils/socket.js");


const __dirname=path.resolve()
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ CORS MUST be used like this
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

if (process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../Client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Client", "dist", "index.html"));
  });
}

connect();

server.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
