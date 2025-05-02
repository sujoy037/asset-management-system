const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to accept only CSV files
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'text/csv') {
//     cb(null, true);
//   } else {
//     cb(new Error('Only CSV files are allowed'), false);
//   }
// };

// Multer instance
const upload = multer({ storage});

module.exports = upload;
