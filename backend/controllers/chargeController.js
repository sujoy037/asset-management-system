// Import the query function from db.js to interact with the database
const { query } = require('../db');

// Controller to fetch all charge_cd values
const getChargeCdList = async (req, res) => {
    try {
        // Query to fetch all charge_cd values
        const sqlQuery = 'SELECT charge_cd, charge_nm FROM charge_cd ORDER BY charge_nm ASC'; // Assuming 'charge_cd' table has 'charge_cd' and 'name'
        const result = await query(sqlQuery); // Execute query to get charge_cd and name

        // Check if any charge_cd values are found
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No charge_cd values found' });
        }

        // Send the charge_cd values as the response
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching charge_cd list:', err); // Log error on the server
        res.status(500).json({ error: 'Failed to fetch charge_cd list', details: err.message }); // Return error response
    }
};

// Controller to fetch users by charge_cd
const getUsersByChargeCd = async (req, res) => {
    const { charge_cd } = req.query; // Get charge_cd from query parameters

    if (!charge_cd) {
        return res.status(400).json({ error: 'charge_cd is required' }); // If charge_cd is missing, return an error
    }

    try {
        // Query to fetch users for the given charge_cd
        const sqlQuery = 'SELECT * FROM usr_cd WHERE charge_cd = $1 ORDER BY charge_cd ASC'; // Assuming 'usr_cd' table has 'charge_cd'
        const result = await query(sqlQuery, [charge_cd]); // Execute query with charge_cd as parameter

        // Check if users are found
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No users found for this charge_cd' });
        }

        // Send the users as the response
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching user data:', err); // Log error on the server
        res.status(500).json({ error: 'Failed to fetch user data', details: err.message }); // Return error response
    }
};

// Export the function so it can be used in other parts of the app
module.exports = {
    getUsersByChargeCd,getChargeCdList
};
