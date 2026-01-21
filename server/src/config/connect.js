const mongoose = require("mongoose");
require("dotenv").config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connectes");
  } catch (error) {
    console.log("Databse nor=t connect");
  }
};

module.exports = connect;
