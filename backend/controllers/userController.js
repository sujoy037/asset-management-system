const jwt = require('jsonwebtoken');
const db = require('../db'); // Database connection
const encryptPassword = require('../utils/EncryptPassword'); // Password encryption module
const { generateCaptcha, verifyCaptcha } = require('../utils/captcha'); // Captcha utility

// Function to check user credentials
const checkUidPwd = async (usr_cd, passwd) => {
  try {
    const encPass = encryptPassword(passwd);

    const query = `
      SELECT usr_cd, usr_nm, desig, gpf_no, circle_cd, charge_cd, office_cd, passwd 
      FROM usr_cd 
      WHERE usr_cd=$1 AND passwd=$2
    `;

    const result = await db.query(query, [usr_cd, encPass]);

    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (err) {
    console.error('Error checking credentials:', err);
    throw err;
  }
};

// Function to get user roles and statuses
const getUserRolesAndStatus = async (usr_cd) => {
  try {
    const query = `
      SELECT role_cd, status_cd
      FROM user_roles_status
      WHERE usr_cd = $1
    `;

    const result = await db.query(query, [usr_cd]);
    return result.rows;
  } catch (err) {
    console.error('Error fetching user roles and statuses:', err);
    throw err;
  }
};

// Login controller
const userlogin = async (req, res) => {
  const { usr_cd, passwd, captcha, captchaId, role } = req.body;

  if (!usr_cd || !passwd || !captcha || !captchaId || !role) {
    return res.status(400).json({ message: 'Invalid login data' });
  }

  // Verify CAPTCHA
  const isCaptchaValid = verifyCaptcha(captchaId, captcha);
  if (!isCaptchaValid) {
    return res.status(400).json({ message: 'Invalid CAPTCHA' });
  }

  try {
    const user = await checkUidPwd(usr_cd, passwd);

    if (!user) {
      return res.status(400).json({ message: 'Invalid Login' });
    }

    const rolesAndStatus = await getUserRolesAndStatus(usr_cd);

    if (!rolesAndStatus || rolesAndStatus.length === 0) {
      return res.status(403).json({ message: 'User does not have valid roles or status' });
    }

    // Separate roles and statuses
    const roles = rolesAndStatus.map(item => item.role_cd);
    const statuses = rolesAndStatus.map(item => item.status_cd);

    // Check if user is active (status)
    if (!statuses.includes('Active')) {
      return res.status(403).json({ message: 'User is inactive. Please contact support.' });
    }

    // Check if user has the required role (role check)
    if (!roles.includes(role)) {
      return res.status(403).json({ message: 'User does not have the required role' });
    }

    // Check if user has at least one valid role (ISD, Employee, Admin)
    if (!roles.some(role => ['ISD', 'Employee', 'Admin'].includes(role))) {
      return res.status(403).json({ message: 'User does not have a valid role' });
    }

    const token = jwt.sign(
      {
        userId: user.usr_cd,
        userName: user.usr_nm,
        designation: user.desig,
        gpfNo: user.gpf_no,
        circleCode: user.circle_cd,
        chargeCode: user.charge_cd,
        officeCode: user.office_cd,
        roles,
      },
      
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        userName: user.usr_nm,
        designation: user.desig,
        gpfNo: user.gpf_no,
        circleCode: user.circle_cd,
        chargeCode: user.charge_cd,
        officeCode: user.office_cd,
        roles,
      },
      selectedRole: role,
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Generate CAPTCHA
const getCaptcha = (req, res) => {
  const { captchaImage, captchaId } = generateCaptcha();
  res.json({ captchaImage, captchaId });
};

module.exports = {
  userlogin,
  getCaptcha,
};
