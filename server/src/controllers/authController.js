const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { generateToken } = require("../utils/generateToken");
const cloudinary = require("../utils/cloudinary");
require("dotenv").config();

//DOB check
const isAbove18 = (dob) => {
  const birth = new Date(dob);
  if (isNaN(birth.getTime())) {
    throw new Error({ message: "Invalid date of birth" });
  }

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  if (age < 18) {
    throw new Error({ message: "Age must be 18+" });
  }
};

//SIGNUP
exports.signup = async (req, res) => {
  const { fullName, password, email, username, dob } = req.body;

  try {
    if ((!username && !email) || !password) {
      return res.status(400).json("All fields are required");
    }

    //Email
    if (!validator.isEmail(email)) throw new Error("Invalid email address");
    //Password
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    )
      throw new Error("Password must be strong");

    //DOB
    isAbove18(dob);

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    }).lean();

    if (existingUser) {
      return res.status(409).json({ error: "User alredy exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      fullName,
      email,
      password: hashPassword,
      username,
      dob,
    });
    generateToken(newUser._id, res);
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      username: newUser.username,
      dob: newUser.dob,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//LOGIN
exports.login = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if ((!username && !email) || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const query = [];
    if (username) query.push({ username });
    if (email) query.push({ email });

    if (query.length === 0) {
      return res.status(400).json({ error: "Username or email is required" });
    }

    const existingUser = await User.findOne({ $or: query });
    if (!existingUser) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    generateToken(existingUser._id, res);

    res.status(200).json({
      message: "Login Successfully",
      data: {
        _id: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
        fullName: existingUser.fullName,
        dob: existingUser.dob,
        profilePicture: existingUser.profilePicture,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


//LOGOUT
exports.logout = async (req, res) => {
  try {
    res.cookie("token", null);
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Profile Update
exports.updateProfile = async (req, res) => {
  const { profilePicture } = req.body;
  try {
    const userId = req.user._id;
    if (!profilePicture) {
      return res.status(400).json({ message: "Profile picture is required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePicture);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: uploadResponse.secure_url },
      { new: true },
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//User Info Update
exports.updateUser = async (req, res) => {
  const { fullName, username } = req.body;

  try {
    if (!fullName && !username) {
      return res
        .status(400)
        .json({ message: "At least one field is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { fullName, username } },
      { new: true, runValidators: true },
    ).select("-password");

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get User Info
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
