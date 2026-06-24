const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

// signup
app.post("/signup", async (req, res) => {
  try {
    //validate of data
    validateSignupData(req);
    //hash the password
    const { firstName, lastName, emailId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
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

// get user by emailid
app.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({
      emailId: req.body.emailId,
      firstName: req.body.firstName,
    });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(500).send("Error finding user by emailId");
  }
});

// get all users
app.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("No users found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(500).send("Error finding users");
  }
});

// get user by id
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(500).send("Error finding user by Id");
  }
});

//update user by id
app.patch("/user/:id", async (req, res) => {
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    const user = await User.findByIdAndUpdate(req.params?.id, data, {
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (err) {
    res.status(500).send("Error updating user " + err.message);
  }
});

//delete user by id
app.delete("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send("User deleted successfully");
    }
  } catch (err) {
    res.status(500).send("Error deleting user");
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
