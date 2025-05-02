const express = require('express');
const {getAllAcessory} = require('../controllers/accessoryController');  // Import the controller
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Get  accessory
router.get('/accessory',authenticateToken,getAllAcessory);

module.exports = router;