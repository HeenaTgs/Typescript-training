// authMiddleware.js

const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  let token = req.headers.authorization;
  
    token = token?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    const decoded = jwt.verify(token, 'test'); // Extract token from 'Bearer token'
    req.user = decoded.id
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { authenticateUser };
