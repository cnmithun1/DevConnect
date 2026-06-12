const express = require("express");
const app = express();

app.use("/test", (req, res) => {
  res.send("This is a test route");
});

app.use("/server", (req, res) => {
  res.send("Hello from server");
});

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
