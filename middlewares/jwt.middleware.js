const User = require('../models/User.model')

const { expressjwt } = require('express-jwt');

// Function used to extracts the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
  // Check if the token is available on the request Headers
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(' ')[1];
    return token;
  }
  return null;
}

// Instantiate the JWT token validation middleware
const isAuthenticated = expressjwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'payload',
  getToken: getTokenFromHeaders,
   expiresIn: '1d',
});

// Middleware to extract user ID from the payload and attach it to req.userId
function extractUserId(req, res, next) {
  if (req.payload && req.payload._id) {
    req.userId = req.payload._id;
  }
  next();
}

// middleware/isAdmin.js
const isAdmin = async (req, res, next) => {
  try {
    const { email } = req.user; // Assuming you have user information in the request object

    const user = await User.findOne({ email });

    if (user && user.isAdmin) {
      // User is an admin, proceed to the next middleware or route handler
      next();
    } else {
      // User is not an admin, send an unauthorized response
      res.status(403).json({ error: 'Access forbidden. Admins only.' });
    }
  } catch (error) {
    // Handle errors
    console.error('Error checking admin status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Export the middleware so that we can use it to create protected routes
module.exports = {
  isAuthenticated,
  extractUserId,
  isAdmin,
};
