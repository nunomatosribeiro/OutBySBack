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

// Admin Middleware
function isAdmin(req, res, next) {
  if (req.payload && req.payload.role === 'admin') {
    // User is an admin, proceed to the route
    return next();
  } else {
    return res.status(403).json({ error: 'Permission denied.' });
  }
}
// Export the middleware so that we can use it to create protected routes
module.exports = {
  isAuthenticated,
  extractUserId,
  isAdmin,
};
