const express = require('express');
const {createAssetcomplaints,getAllComplaints,getComplaintsById,updateComplaintsId} = require('../controllers/createAssetcomplaints');  // Import the controller
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// route 

router.post('/complaints',authenticateToken,createAssetcomplaints);
router.get('/complaints',authenticateToken, getAllComplaints);
router.get('/complaints/:id',authenticateToken, getComplaintsById);
router.put('/complaints/:id',authenticateToken, updateComplaintsId);

module.exports = router;