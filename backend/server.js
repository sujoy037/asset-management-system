const express = require('express');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

// Importing route files
const rolesRoutes = require('./routes/rolesRoutes');
const statusRoutes = require('./routes/statusRoutes');
const userCdRoutes = require('./routes/userCdRoutes');
const circleRoutes = require('./routes/circleRoutes');
const chargeRoutes = require('./routes/chargeRoutes');
const designationcdRoutes = require('./routes/designationcdRoutes');
const distcdRoutes = require('./routes/distcdRoutes');
const officecdRoutes = require('./routes/officecdRoutes');
const workingStatusRoutes = require('./routes/wokingstatusRoutes');
const complainStatusRoutes = require('./routes/complainStatusRoutes');
const accessoriesRoutes = require('./routes/accessoriesRoutes');

// login
const userRoutes = require('./routes/userRoutes');
// Role assign
const userRoleStatusRoutes = require('./routes/userRoleStatusRoutes');
// Asset File upload & assign
const uploadXlsDataRoutes = require('./routes/uploadXlsDataRoutes');
const assetRoutes = require('./routes/assetRoutes');
const createAssignedAssetRoutes = require('./routes/createAssignedAssetRoutes');
// Complain 
const craeteAssetcomplaintsRoutes = require('./routes/craeteAssetcomplaintsRoutes');

const app = express();
const PORT = process.env.PORT || 5001;
app.use(express.json());

// Session configuration (Optional for JWT authentication)
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultSecret',
  resave: false,
  saveUninitialized: true,
}));

// Middleware to set the Referrer-Policy header globally for all routes
app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();  // Continue to the next middleware or route
});

app.use(cors({
  origin: [
    'http://localhost:3000', // Allow requests from local machine
    'http://192.168.139.30:3000' // Allow requests from other machine's IP
  ],
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));

// app.use(cors({
//   origin: '*',
//   methods: 'GET, POST, PUT, DELETE',
//   allowedHeaders: 'Content-Type, Authorization'
// }));

app.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

// Use all routes
app.use('/api', rolesRoutes);
app.use('/api', statusRoutes);
app.use('/api', userCdRoutes);
app.use('/api', userRoleStatusRoutes);
app.use('/api', circleRoutes);
app.use('/api', chargeRoutes);
app.use('/api', designationcdRoutes);
app.use('/api', distcdRoutes);
app.use('/api', officecdRoutes);
app.use('/api', workingStatusRoutes);
app.use('/api', complainStatusRoutes);
app.use('/api', accessoriesRoutes);
app.use('/api', userRoutes);
app.use('/api', uploadXlsDataRoutes);
app.use('/api', assetRoutes);
app.use('/api', createAssignedAssetRoutes);
app.use('/api', craeteAssetcomplaintsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server is running on http://192.168.139.30:${PORT}`);
// });