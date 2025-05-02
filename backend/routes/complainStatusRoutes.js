const express = require('express');
const {createComplaintStatus,getAllComplaintStatus} = require('../controllers/complainStatusController');  // Import the controller
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// route 

router.post('/status',authenticateToken,createComplaintStatus);
router.get('/complain-status',authenticateToken, getAllComplaintStatus);


module.exports = router;