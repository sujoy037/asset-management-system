// apiKeyMiddleware.js
const apiKeyMiddleware = (req, res, next) => {
    // Get the API key from the request header
    const apiKey = req.header('X-API-Key'); 
    console.log('Received API Key:', apiKey);
    // Check if the provided API key matches the expected one
    if (apiKey === process.env.API_KEY) {
      return next();  // Proceed to the next middleware if the API key is valid
    } else {
      return res.status(403).json({ message: 'Forbidden: Invalid API Key' });  // Return Forbidden if the API key is invalid
    }
  };
  
  module.exports = apiKeyMiddleware;
  