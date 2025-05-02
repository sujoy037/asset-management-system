const { query } = require('../db');

// Controller to assign role and status for a specific user
const assignRoleAndStatus = async (req, res) => {
    const { usr_cd, charge_cd, role_cd, status_cd, start_dt, end_dt } = req.body; // Input data

    // Validate input
    if (!usr_cd || !charge_cd || !role_cd || !status_cd || !start_dt) {
        return res.status(400).json({ error: 'usr_cd, charge_cd, role_cd, status_cd, and start_dt are required' });
    }

    try {
        // Check if user exists for the given charge_cd and usr_cd
        const userResult = await query('SELECT usr_cd, charge_cd FROM usr_cd WHERE usr_cd = $1 AND charge_cd = $2', [usr_cd, charge_cd]);
        const user = userResult.rows[0];

        // If user is not found
        if (!user) {
            return res.status(404).json({ error: 'User not found for the given charge_cd' });
        }

        // Start transaction
        await query('BEGIN');

        // Insert role and status into user_roles_status
        const insertQuery = `
            INSERT INTO user_roles_status (usr_cd, role_cd, status_cd, start_dt, end_dt, charge_cd)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;

        await query(insertQuery, [
            usr_cd, 
            role_cd, 
            status_cd, 
            start_dt, 
            end_dt || null, 
            charge_cd
        ]);

        // Commit transaction
        await query('COMMIT');

        res.status(200).json({ message: 'Role and status assigned successfully', assignedUser: usr_cd });
    } catch (err) {
        // Rollback transaction on error
        await query('ROLLBACK');
        console.error('Error assigning role and status:', err);
        res.status(500).json({ error: 'Failed to assign role and status', details: err.message });
    }
};

// Controller to fetch user roles and statuses based on filters
// Controller to fetch all records from user_roles_status and return totals
const fetchAllUserRolesStatus = async (req, res) => {
    try {
        // Fetch all records from the user_roles_status table
        const result = await query('SELECT * FROM user_roles_status');

        // If no records found
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No records found' });
        }

        // Fetch the total count of users, roles, charges, and statuses
        const countQuery = `
            SELECT 
                COUNT(DISTINCT usr_cd) AS total_users,
                COUNT(DISTINCT role_cd) AS total_roles,
                COUNT(DISTINCT charge_cd) AS total_charges,
                COUNT(DISTINCT status_cd) AS total_statuses
            FROM user_roles_status
        `;

        // Execute the count query
        const countResult = await query(countQuery);

        // Extract counts from the result
        const { total_users, total_roles, total_charges, total_statuses } = countResult.rows[0];

        // Return the fetched records along with the counts
        res.status(200).json({
            data: result.rows,
            totals: {
                total_users,
                total_roles,
                total_charges,
                total_statuses
            }
        });
    } catch (err) {
        console.error('Error fetching records:', err);
        res.status(500).json({ error: 'Failed to fetch records', details: err.message });
    }
};

module.exports = {
    assignRoleAndStatus,fetchAllUserRolesStatus
};
