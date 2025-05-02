const express = require('express');
const {createAssignedAsset,getAssetAssignments,updateAssignedAsset,getAssetById} = require('../controllers/createAssignedAsset');  // Import the controller
const authenticateToken = require('../middleware/auth');

const router = express.Router();



//router.post('/api/create-asset',authenticateToken, createAssignedAsset);
router.post('/assign-assets',authenticateToken, createAssignedAsset);
//router.get('/asset-assignments',authenticateToken, getAssetAssignmentsByChargeName);
router.get('/asset-assignments',authenticateToken, getAssetAssignments);


// Route to update an asset by assetId
router.get('/asset-assignment/:assetId',authenticateToken,getAssetById);


// Route to update an asset by assetId
router.put('/asset-assignment/:assetId',authenticateToken,updateAssignedAsset);

module.exports = router;