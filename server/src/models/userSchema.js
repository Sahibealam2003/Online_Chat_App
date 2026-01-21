const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePicture: {
      type: String, // URL ya path of image
      default: "", // optional, blank if not uploaded
    },
    dob: {
      type: Date,
      required: true,
    },
  },

  { timestamps: true },
);

// Model
const User = mongoose.model("User", userSchema);

module.exports = User;
