const express = require('express');
const {getUsersByChargeCd,getChargeCdList} = require('../controllers/chargeController');  // Import the controller
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// POST route for user login charge-cd-list
router.get('/charges',authenticateToken,getChargeCdList,getUsersByChargeCd);
router.get('/charge-cd-list',authenticateToken,getChargeCdList);

module.exports = router;
