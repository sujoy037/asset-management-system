const express = require('express');
const {userlogin,getCaptcha} = require('../controllers/userController');  // Import the controller


const router = express.Router();

// GET route to generate a new CAPTCHA
router.get('/captcha', getCaptcha);

// POST route for user login
router.post('/user-login', userlogin);

module.exports = router;
