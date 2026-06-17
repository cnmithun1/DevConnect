const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");
const { connectDB } = require("./config/database");
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Silpa Prajna",
    lastName: "Nayak",
    emailId: "silpa@example.com",
    password: "password123",
    gender: "Female",
  });

  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(500).send("Error creating user");
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => console.log("Database connection failed", err));
