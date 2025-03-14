const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { name, email, balance } = req.body;
    const user = new User({ name, email, balance });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "User Creation Failed", error: err.message });
  }
};

module.exports = { createUser };
