const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const { log } = require("console");

var app = express();

const PORT = 8000;
let cors = require("cors");
app.use(cors());

//json middleware
app.use(express.json());

//Routes

app.get("/api/users", function (req, res) {
  return res.json(users);
});

app.post("/api/users", function (req, res) {
  const user = req.body;

  if (user.email == "") {
    return res.json("message: Email are not there");
  }

  const existingUserIndex = users.findIndex((u) => u.email === user.email);

  if (existingUserIndex !== -1) {
    users.splice(existingUserIndex, 1, user);
  } else {
    users.push(user);
  }

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(user);
  });
});

app.patch("/api/users/:email", (req, res) => {
  const email = req.params.email;
  const updatedUser = req.body;

  const existingUser = users.find((user) => user.email === email);
  console.log(existingUser);
  if (!existingUser) {
    return res.status(404).json({ error: "User not found" });
  }

  Object.assign(existingUser, updatedUser);

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(existingUser);
  });
});

app.delete("/api/users/:email", (req, res) => {
  const email = req.params.email;

  const index = users.findIndex((user) => user.email === email);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  // Remove the user from the array
  const deletedUser = users.splice(index, 1)[0];

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(deletedUser);
  });
});

app.listen(PORT, function () {
  console.log("Started application on port %d", PORT);
});
