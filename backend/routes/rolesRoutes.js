const express = require('express');
const {getRoles} = require('../controllers/rolesController');  // Import the controller
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// POST route for user login
router.get('/roles',authenticateToken,getRoles);

module.exports = router;
