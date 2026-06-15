const express = require("express");
const app = express();

app.get("/user/:id/:name/:pwd", (req, res) => {
  console.log(req.params);
  res.send("Got user data for specific ID");
});

app.get("/user", (req, res) => {
  res.send({
    first: "John",
    last: "Doe",
    city: "New York",
  });
});

app.post("/user", (req, res) => {
  //add user logic
  res.send("User added successfully");
});

app.delete("/user", (req, res) => {
  //add user logic
  res.send("User data deleted");
});

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
