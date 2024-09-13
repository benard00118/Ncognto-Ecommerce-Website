const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/protected-route', authMiddleware, (req, res) => {
  res.send('Protected route accessed');
});

module.exports = router;
