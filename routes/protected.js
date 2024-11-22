const express = require('express');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.get('/', authenticate, (req, res) => {
  res.status(200).json({ message: `Welcome, User ${req.user.id}` });
});

module.exports = router;
