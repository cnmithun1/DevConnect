const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://cnmithun1:cnmithun1@myfirstcluster.fltbk56.mongodb.net/",
  );
};

module.exports = connectDB;
