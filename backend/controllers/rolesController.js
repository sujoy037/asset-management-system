const { query } = require('../db'); // Import query function from db.js // Import your database connection file

const getRoles = async (req, res) => {
    try {
        const result = await query('SELECT * FROM roles');
        res.status(200).json(result.rows);  // Send the roles as JSON response
    } catch (err) {
        console.error('Error fetching roles:', err);
        res.status(500).json({ error: 'Failed to fetch roles' });
    }
};

module.exports = {
    getRoles,
};
