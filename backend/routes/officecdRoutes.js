const express = require('express');
const {getOfficeCd} = require('../controllers/officecdController');  // Import the controller
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// POST route for user login
router.get('/office-cd',authenticateToken,getOfficeCd);

module.exports = router;