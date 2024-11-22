const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Get the token after "Bearer"
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token
    req.user = verified;  // Attach the verified user info to the request
    next();  // Continue to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });  // Invalid or expired token
  }
};

module.exports = authenticate;
