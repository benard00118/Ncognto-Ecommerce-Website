// const { createUser, findUserByEmail, matchPassword } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const config = require('../config');

// Register a new user
exports.registerUser = (req, res) => {
  const { name, email, password } = req.body;

  findUserByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });

    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    createUser(name, email, password, (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });

      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

// User login
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = results[0];
    matchPassword(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Server error' });

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      });
    });
  });
};
