require("dotenv").config();
const connect  = require("../config/connect");
const User = require("../models/userSchema"); 

const seedUsers = [
  {
    email: "emma.thompson@example.com",
    fullName: "Emma Thompson",
    username: "emma_thompson",
    dob: new Date("1998-05-12"),
    password: "password123",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    email: "olivia.miller@example.com",
    fullName: "Olivia Miller",
    username: "olivia_miller",
    dob: new Date("1997-08-21"),
    password: "password123",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    email: "james.anderson@example.com",
    fullName: "James Anderson",
    username: "james_anderson",
    dob: new Date("1995-11-03"),
    password: "password123",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
];


const seedDatabase = async () => {
  try {
    await connect();
    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run seed
seedDatabase();
