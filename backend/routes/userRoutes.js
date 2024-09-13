// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const pool = require('../config/db'); // Update with your MySQL config

// // Register a new user
// router.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     // Insert user into the database
//     const [result] = await pool.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

//     res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// });

// // Login user
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // Check if the user exists
//     const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
//     if (rows.length === 0) return res.status(401).json({ message: 'Invalid email or password' });

//     const user = rows[0];
    
//     // Compare the password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });
    
//     // Generate a JWT token
//     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({ message: 'Login successful', token });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Use the correct MySQL config

// Register a new user
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err });

    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, hashedPassword], (error, results) => {
      if (error) return res.status(500).json({ message: 'Server error', error });

      res.status(201).json({ message: 'User registered successfully', userId: results.insertId });
    });
  });
});

// Login user
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (error, results) => {
    if (error) return res.status(500).json({ message: 'Server error', error });

    if (results.length === 0) return res.status(401).json({ message: 'Invalid email or password' });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Server error', error: err });

      if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ message: 'Login successful', token });
    });
  });
});

module.exports = router;
