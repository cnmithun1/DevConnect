const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minLength: 2, maxLength: 50 },
    lastName: { type: String, required: true, minLength: 2, maxLength: 50 },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Not a valid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Not a strong password");
        }
      },
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Enter valid Gender");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqM2hpq4kPRwrJt7zH5lnes5ktd7z_auwgzfcKWA0d7w&s",
    },
    about: { type: String, default: "This is a default bio" },
    skills: { type: [String] },
  },
  { timestamps: true },
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id, emailId: user.emailId },
    process.env.JWT_SECRET,
  );

  return token;
};

userSchema.methods.validatePassword = async function (userEnteredPassword) {
  const user = this;
  const hashedPassword = user.password;
  const isValidPassword = await bcrypt.compare(
    userEnteredPassword,
    hashedPassword,
  );

  return isValidPassword;
};

module.exports = mongoose.model("User", userSchema);
