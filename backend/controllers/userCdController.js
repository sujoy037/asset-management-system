const { query } = require('../db'); // Ensure this imports the query function correctly

const getUsrCd = async (req, res) => {
    const { charge_cd } = req.query;  // Extract the charge_cd query parameter

    // Start with a base query to fetch from the usr_cd table
    let sqlQuery = 'SELECT * FROM usr_cd WHERE 1=1';  
    const values = [];

    // If charge_cd is provided, add it to the query
    if (charge_cd) {
        sqlQuery += ' AND charge_cd = $' + (values.length + 1);
        values.push(charge_cd);
    }

    try {
        console.log('Constructed SQL Query:', sqlQuery);
        console.log('Query Values:', values);

        const result = await query(sqlQuery, values);

        // Return the fetched users as a JSON response
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching user data:', err.message);
        res.status(500).json({ error: 'Failed to fetch user data', details: err.message });
    }
};

module.exports = { getUsrCd };
