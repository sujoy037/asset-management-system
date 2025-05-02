// Correctly import controller functions
const express = require('express');
const {assignRoleAndStatus,fetchAllUserRolesStatus} = require('../controllers/userRoleStatusController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();



// Route to assign role and status to a user
// authenticateToken is middleware, followed by the controller function
router.post('/assign-role-status',authenticateToken,assignRoleAndStatus);
router.get('/user-roles-status',authenticateToken,fetchAllUserRolesStatus);

module.exports = router;
