const { query } = require('../db');

const createComplaintStatus = async (req, res) => {
    const {
        status_name
    } = req.body;
    try {
        const result = await query(`
            INSERT INTO complaint_status (
                status_name
            ) VALUES ($1) RETURNING id;
        `, [
            status_name
        ]);

        res.status(201).json({ message: 'Complaint Status created successfully!', complainStatusId: result.rows[0].id });
        
    } catch (error) {
        console.error(error);  // Fixed this from 'err' to 'error'
        res.status(500).json({ message: 'Error creating complaint status', error: error.message });
    }
}

const getAllComplaintStatus = async (req, res) => {
    try {
        const result = await query(`SELECT * FROM complaint_status`);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving complaint status', error: err.message });
    }
}








module.exports = {createComplaintStatus,getAllComplaintStatus};
