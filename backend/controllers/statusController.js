// statusController.js
const { query } = require('../db'); // Import query function from db.js

const getStatuses = async (req, res) => {
    try {
        const result = await query('SELECT * FROM status');
        res.status(200).json(result.rows);  // Send the statuses as JSON response
    } catch (err) {
        console.error('Error fetching statuses:', err);
        res.status(500).json({ error: 'Failed to fetch statuses' });
    }
};

module.exports = {
    getStatuses,
};