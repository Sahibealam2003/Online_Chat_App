import Message from "../models/messageSchema.js";
import User from "../models/userSchema.js";
import cloudinary from "../utils/cloudinary.js";
import { getReciverSocketId, io } from "../utils/socket.js";

// Get all users except logged-in user
export const getAllUser = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const filterUser = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    if (filterUser.length === 0) {
      throw new Error("No friend yet");
    }

    res.status(200).json({ users: filterUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all messages between sender & receiver
export const getAllMessage = async (req, res) => {
  try {
    const { id: reciverId } = req.params;
    const senderId = req.user._id;

    const allMessage = await Message.find({
      $or: [
        { senderId, reciverId },
        { senderId: reciverId, reciverId: senderId },
      ],
    });

    res.status(200).json({ data: allMessage });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Send message
export const sendMessage = async (req, res) => {
  try {
    const { id: reciverId } = req.params;
    const senderId = req.user._id;
    const { text, image } = req.body;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      reciverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const reciverSocketId = getReciverSocketId(reciverId);
    if (reciverSocketId) {
      io.to(reciverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({ data: newMessage });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
