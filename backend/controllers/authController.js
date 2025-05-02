const jwt = require('jsonwebtoken');
const db = require('../db');  // Your database file where you interact with the database
const encryptPassword = require('../utils/EncryptPassword');  // The password encryption module

// Function to check user credentials
const checkUidPwd = async (usr_cd, passwd) => {
    try {
      // Encrypt the password using the provided encryption function
      const encPass = encryptPassword(passwd);
  
      // Query to get the user details based on provided credentials
      const query = `
      SELECT usr_cd, usr_nm, desig, gpf_no, posting_cd, circle_cd, charge_cd, office_cd, passwd 
      FROM usr_cd 
      WHERE usr_cd=$1 AND passwd=$2
    `;
      
      // Execute the query
      const result = await db.query(query, [usr_cd, encPass]);
  
      if (result.rows.length > 0) {
        console.log('Successfully Log In');
        return result.rows[0]; // Return the user details for JWT creation
      } else {
        console.log('No Such User Available');
        return null;
      }
    } catch (err) {
      console.error('Error checking credentials:', err);
      throw err;
    }
};
  
  

// Login controller
const login = async (req, res) => {
    const { usr_cd, passwd } = req.body;
  
    if (!usr_cd || !passwd) {
      return res.status(400).json({ message: 'Invalid Login' });
    }
  
    try {
      // Check user credentials using the function that queries the database
      const user = await checkUidPwd(usr_cd, passwd);
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid Login' });
      }
  
      // Create a JWT token for the user
      const token = jwt.sign(
        {  userId: user.usr_cd,
            userName: user.usr_nm,
            designation: user.desig,
            gpfNo: user.gpf_no,
            postingCode: user.posting_cd,
            circleCode: user.circle_cd,
            chargeCode: user.charge_cd,
            officeCode: user.office_cd},
        process.env.JWT_SECRET,  // Secret key from environment variables
        { expiresIn: '1h' }      // Set the token expiration time (1 hour)
      );
  
      // Respond with the JWT token
      res.json({
        message: 'Login successful',
        token, 
        user: {
            userName: user.usr_nm,
            designation: user.desig,
            gpfNo: user.gpf_no,
            postingCode: user.posting_cd,
            circleCode: user.circle_cd,
            chargeCode: user.charge_cd,
            officeCode: user.office_cd,
        },// Return the JWT token for client-side authentication
      });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = {
  login,
};
