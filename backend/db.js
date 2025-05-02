// db.js
const { Pool } = require('pg');  // PostgreSQL client
require('dotenv').config();  // Load environment variables

// Create a new pool for managing PostgreSQL connections
const pool = new Pool({
  user: process.env.DB_USER,        // Database user from .env
  host: process.env.DB_HOST,        // Database host from .env
  database: process.env.DB_NAME,    // Database name from .env
  password: process.env.DB_PASSWORD, // Database password from .env
  port: process.env.DB_PORT || 5432, // Default PostgreSQL port
});

// Query function to interact with the database
const query = (text, params) => pool.query(text, params);

// Export query and pool for other files to use
module.exports = {
  query,
};
