const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");

//Handle auth for all admin apis
app.use("/admin", adminAuth);

app.get("/admin", (req, res) => {
  // throw new Error("Something went wrong");
  res.send("Hello Admin");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("This is admin data");
});

app.delete("/admin/deleteUser", (req, res) => {
  res.send("User data deleted");
});

app.get("/user", userAuth, (req, res) => {
  res.send("Hello User");
});

// No auth for this api, anyone can access
app.get("/products", (req, res) => {
  res.send("This is product data");
});

//Error handler middleware
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
