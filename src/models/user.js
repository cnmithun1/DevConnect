const mongoose = require("mongoose");

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
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
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

module.exports = mongoose.model("User", userSchema);
