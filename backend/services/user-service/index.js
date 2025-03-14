const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

const app = express();
const port = 3001;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fintech', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Registration
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  res.status(201).send('User registered');
});

app.listen(port, () => {
  console.log(`User Service running on port ${port}`);
});