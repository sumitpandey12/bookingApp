const User = require("../models/user");

exports.getUsers = (req, res, next) => {
  User.findAll()
    .then((users) => {
      return res.status(200).json({ users: users });
    })
    .catch((err) => console.log(err));
};

exports.postUser = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;

  User.create({
    name: name,
    email: email,
    phone: phone,
  })
    .then((user) => {
      console.log(user);
      return res.status(200).json({ user: user });
    })
    .catch((err) => console.log(err));
};

exports.patchUser = (req, res, next) => {
  const email = req.params.email;
  const updatedUser = req.body;
  console.log("updatedUser", updatedUser);

  User.findOne({ where: { email: email } })
    .then((user) => {
      return user.destroy();
    })
    .catch((err) => console.log(err));
};

exports.deleteUser = (req, res, next) => {
  const email = req.params.email;
  User.findOne({ where: { email: email } })
    .then((user) => {
      return user.destroy();
    })
    .catch((err) => console.log(err));
};
