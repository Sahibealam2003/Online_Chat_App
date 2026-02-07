import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token found" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decode.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
