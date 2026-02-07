import mongoose from "mongoose";

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
      minlength: 8,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// Model
const User = mongoose.model("User", userSchema);

export default User;
