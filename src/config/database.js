const mongoose = require("mongoose");
require("dotenv").config();

// Set custom DNS servers to avoid potential DNS resolution issues
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = { connectDB };
