const express = require('express');
const {getCircleCd} = require('../controllers/circleController');  // Import the controller
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// POST route for user login
router.get('/circles',authenticateToken,getCircleCd);

module.exports = router;
