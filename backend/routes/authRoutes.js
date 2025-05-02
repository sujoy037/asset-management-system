const express = require('express');
const {login} = require('../controllers/authController');  // Import the controller
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');

const router = express.Router();

// POST route for user login
router.post('/login',apiKeyMiddleware,login);

module.exports = router;
