const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//signup
authRouter.post("/signup", async (req, res) => {
  try {
    //validate of data
    validateSignupData(req);
    //hash the password
    const { firstName, lastName, emailId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//login
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Enter valid data");
    }
    const isValidPassword = await user.validatePassword(password);
    if (isValidPassword) {
      // Create a JWT token and send cookie
      const jwtToken = await user.getJWT();
      res.cookie("token", jwtToken);

      res.send("Login Successfull");
    } else {
      throw new Error("Enter valid data");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = authRouter;
