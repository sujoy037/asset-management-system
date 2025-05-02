const express = require('express');
const {getAllAssets,getAssetsByUser} = require('../controllers/assetController');  // Import the controller
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// POST route for user login charge-cd-list
router.get('/total-assets',authenticateToken,getAllAssets);
//router.post('/assets-by-charge-cd', authenticateToken,getAssetsByChargeCd);
// Define a route to get assets by charge_cd
router.get('/assets',authenticateToken, getAssetsByUser);


module.exports = router;