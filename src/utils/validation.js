const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is required");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter a valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};

module.exports = { validateSignupData };
