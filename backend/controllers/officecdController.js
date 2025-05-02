const { query } = require('../db');

// Controller function to fetch office_cd data
const getOfficeCd = async (req, res) => {
    try {
        // Fetch all data from office_cd table
        const result = await query('SELECT * FROM office_cd ORDER BY office_nm ASC');
        
        // Send the result as a JSON response
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching office data:', err);
        
        // Return an error response if something goes wrong
        res.status(500).json({ error: 'Failed to fetch office data', details: err.message });
    }
};

module.exports = {
    getOfficeCd,
};
