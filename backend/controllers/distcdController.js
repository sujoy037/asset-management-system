const { query } = require('../db');

// Controller function to fetch dist_cd data
const getDistCd = async (req, res) => {
    try {
        // Fetch all data from dist_cd table
        const result = await query('SELECT * FROM dist_cd');
        
        // Send the result as a JSON response
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching district data:', err);
        
        // Return an error response if something goes wrong
        res.status(500).json({ error: 'Failed to fetch district data', details: err.message });
    }
};

module.exports = {
    getDistCd,
};
