const { query } = require('../db');

// Controller function to fetch designation_cd data
const getDesignationCd = async (req, res) => {
    try {
        // Fetch all data from designation_cd table
        const result = await query('SELECT * FROM designation_cd');
        
        // Send the result as a JSON response
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching designation data:', err);
        
        // Return an error response if something goes wrong
        res.status(500).json({ error: 'Failed to fetch designation data', details: err.message });
    }
};

module.exports = {
    getDesignationCd,
};
