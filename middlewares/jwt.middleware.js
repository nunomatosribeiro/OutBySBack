const User = require('../models/User.model');
const { expressjwt } = require('express-jwt');



// Function used to extract the JWT token from the request's 'Authorization' Headers
const getTokenFromHeaders = async (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1];
    console.log('Authorization header:', req.headers.authorization);
    console.log('Token extracted from headers:', token);
    return token;
  }
  return null;
};

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

/** Check Admin Status **/
const checkAdminStatus = async (req, res, next) => {
  const { userId } = req.body;

  try {
    const user = await User.findOne({ userId });

    if (user && user.isAdmin) {
      // User is an admin
      req.user.isAdmin = true;
    }

    next();
  } catch (error) {
    console.error('Error checking admin status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
  try {
    console.log('user object admin:', req.body); // Log the entire req.user object
    const { email } = req.body; // Assuming you have user information in the request object

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

module.exports = {
  isAuthenticated,
  extractUserId,
  checkAdminStatus,
  isAdmin,
};