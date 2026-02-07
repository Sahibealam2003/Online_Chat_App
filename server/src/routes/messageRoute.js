import express from "express";
const router = express.Router();

import {
  getAllUser,
  getAllMessage,
  sendMessage,
} from "../controllers/messageController.js";

import { protectRoute } from "../middleware/protectRoute.js";

router.get("/users", protectRoute, getAllUser);
router.get("/:id", protectRoute, getAllMessage);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
