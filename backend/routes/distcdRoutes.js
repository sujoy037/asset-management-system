const express = require('express');
const {getDistCd} = require('../controllers/distcdController');  // Import the controller
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// POST route for user login
router.get('/dist-cd',authenticateToken,getDistCd);

module.exports = router;