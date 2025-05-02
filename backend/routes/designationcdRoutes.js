const express = require('express');
const {getDesignationCd} = require('../controllers/designationcdController');  // Import the controller
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// POST route for user login
router.get('/designation-cd',authenticateToken,getDesignationCd);

module.exports = router;