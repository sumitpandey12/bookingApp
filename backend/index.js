const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const { log } = require("console");

const sequelize = require("./utils/database");

const UserController = require("./controllers/user");

var app = express();

const PORT = 8000;
let cors = require("cors");
app.use(cors());

//json middleware
app.use(express.json());

//Routes

app.get("/api/users", UserController.getUsers);

app.post("/api/users", UserController.postUser);

app.patch("/api/users/:email", UserController.patchUser);

app.delete("/api/users/:email", UserController.deleteUser);

// app.patch("/api/users/:email", (req, res) => {
//   const email = req.params.email;
//   const updatedUser = req.body;

//   const existingUser = users.find((user) => user.email === email);
//   console.log(existingUser);
//   if (!existingUser) {
//     return res.status(404).json({ error: "User not found" });
//   }

//   Object.assign(existingUser, updatedUser);

//   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//     return res.json(existingUser);
//   });
// });

// app.delete("/api/users/:email", (req, res) => {
//   const email = req.params.email;

//   const index = users.findIndex((user) => user.email === email);

//   if (index === -1) {
//     return res.status(404).json({ error: "User not found" });
//   }

//   // Remove the user from the array
//   const deletedUser = users.splice(index, 1)[0];

//   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//     return res.json(deletedUser);
//   });
// });

sequelize
  .sync()
  .then((result) => {
    app.listen(PORT, function () {
      console.log("Started application on port %d", PORT);
    });
  })
  .catch((errr) => console.log(errr));
