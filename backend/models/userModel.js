const db = require('../config');
const bcrypt = require('bcryptjs');

// Create a new user
const createUser = (name, email, password, callback) => {
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) throw err;

    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, hashedPassword], callback);
  });
};

// Find a user by email
const findUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], callback);
};

// Match user password
const matchPassword = (enteredPassword, userPassword, callback) => {
  bcrypt.compare(enteredPassword, userPassword, callback);
};

module.exports = { createUser, findUserByEmail, matchPassword };
