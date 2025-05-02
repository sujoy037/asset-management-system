const db = require('../db');  // Assuming db.js connects to your PostgreSQL database

// Get all assets with charge_nm from charge_cd
const getAllAssets = async (req, res) => {
  const { office_cd } = req.query; // Extract charge_cd from query parameters

  // Base query to select all assets
  let query = `
    SELECT 
      * 
    FROM 
      total_assets 
  `;

  // If office_cd is provided, filter assets by office_cd
  const queryParams = [];
  if (office_cd) {
    query += ` WHERE office_cd = $1`;
    queryParams.push(office_cd); // Add charge_cd to the query parameters
  }

  try {
    const result = await db.query(query, queryParams); // Use parameterized query to prevent SQL injection
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error retrieving assets:', err);
    res.status(500).json({ message: 'Error retrieving assets' });
  }
};







// Assuming you're using Express for routing
const getAssetsByUser = async (req, res) => {
  const { name_of_user } = req.query;  // Access the 'name_of_user' query parameter

  if (!name_of_user) {
    return res.status(400).json({ error: 'User (name_of_user) is required' });
  }

  const query = `
    SELECT * FROM total_assets
    WHERE name_of_user = $1;  // Fetch assets for the specified user
  `;

  try {
    const result = await db.query(query, [name_of_user]);

    if (result.rowCount > 0) {
      res.status(200).json({
        success: true,
        data: result.rows, // Return the assets for the user
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No assets found for this user.',
      });
    }
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching asset details.',
    });
  }
};














module.exports = {getAllAssets,getAssetsByUser};
