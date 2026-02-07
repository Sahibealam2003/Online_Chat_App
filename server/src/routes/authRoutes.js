import express from "express";
const router = express.Router();

import {
  login,
  signup,
  logout,
  updateProfile,
  updateUser,
  getUserInfo,
  removeProfile,
  removeUser,
} from "../controllers/authController.js";

import { protectRoute } from "../middleware/protectRoute.js";

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// Logout
router.post("/logout", logout);

// Profile & User
router.put("/update-profile", protectRoute, updateProfile);
router.put("/remove-profile", protectRoute, removeProfile);
router.put("/update-user", protectRoute, updateUser);
router.get("/getUser", protectRoute, getUserInfo);
router.delete("/removeUser/:id", protectRoute, removeUser);

export default router;
