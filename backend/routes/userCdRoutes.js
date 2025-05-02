const express = require('express');
const {getUsrCd} = require('../controllers/userCdController');  // Import the controller
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// POST route for user login
router.get('/users',authenticateToken,getUsrCd);

module.exports = router;
