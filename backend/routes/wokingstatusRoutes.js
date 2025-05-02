const express = require('express');
const {getwokingStatus} = require('../controllers/workingStatusController');  // Import the controller
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// POST route for user login
router.get('/working-status',authenticateToken,getwokingStatus);

module.exports = router;
