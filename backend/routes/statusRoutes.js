const express = require('express');
const {getStatuses} = require('../controllers/statusController');  // Import the controller
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// POST route for user login
router.get('/statuses',authenticateToken,getStatuses);

module.exports = router;
