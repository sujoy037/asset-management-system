const express = require('express');
const uploadXlsData = require('../controllers/uploadXlsDataController');
const upload = require('../middleware/uploadMiddleware'); // File upload middleware
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Route for uploading CSV data
router.post('/upload-xls',authenticateToken, upload.single('file'), uploadXlsData);
// Route to get all assets
//router.get('/assets',authenticateToken,getAllAssets);

module.exports = router;
