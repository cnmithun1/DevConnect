const mongoose = require("mongoose");

// Set custom DNS servers to avoid potential DNS resolution issues
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://cnmithun1:cnmithun1@myfirstcluster.fltbk56.mongodb.net/devConnect",
  );
};

module.exports = { connectDB };
