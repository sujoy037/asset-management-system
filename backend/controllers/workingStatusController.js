// Import the query function from db.js to interact with the database
const { query } = require('../db'); 

// Controller function to fetch circle data
const getwokingStatus = async (req, res) => {
    try {
        // Fetch all data from circle_cd table
        const result = await query('SELECT * FROM working_status');
        
        // Send the result as a JSON response
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching working status data:', err);
        
        // Return an error response if something goes wrong
        res.status(500).json({ error: 'Failed to fetch working status data', details: err.message });
    }
};

// Export the function so it can be used in other parts of the app
module.exports = {
    getwokingStatus
};
