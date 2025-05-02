const { query } = require('../db');

// Controller to fetch all charge_cd values
const getAllAcessory = async (req, res) => {
    try {
        // Query to fetch all charge_cd values
        const sqlQuery = 'SELECT * FROM accessories'; // Assuming 'charge_cd' table has 'charge_cd' and 'name'
        const result = await query(sqlQuery); // Execute query to get charge_cd and name

        // Check if any charge_cd values are found
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No accessories values found' });
        }

        // Send the charge_cd values as the response
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching charge_cd list:', err); // Log error on the server
        res.status(500).json({ error: 'Failed to fetch charge_cd list', details: err.message }); // Return error response
    }
};

module.exports={getAllAcessory}