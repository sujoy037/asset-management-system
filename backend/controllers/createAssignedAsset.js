const { query } = require('../db');

// Create assigned asset
const createAssignedAsset = async (req, res) => {
  try {
    const {
      office_cd, office_nm, name_of_user, building, floor, room_no,
      cpu_number, keyboard_serial_no, mouse_serial_no, working_status_id, assignment_date, accessory_id, serial_number, hrms_id_of_user,
      monitor_serial_no
    } = req.body;

    console.log('Incoming request:', req.body);

    // Ensure required fields are provided
    if (!office_cd || !office_nm || !building || !floor || !room_no || !working_status_id || !accessory_id || !name_of_user || !hrms_id_of_user) {
      return res.status(400).json({
        errorCode: 'MISSING_REQUIRED_FIELDS',
        message: 'All required fields are required.'
      });
    }

    // Generate the current date in the format dd-mm-yy
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB').replace(/\//g, '-');
    const assetId = `ASSET-${formattedDate}-${Date.now()}`;  // Append a timestamp to avoid duplicates

    // Validate assignment_date format (yyyy-mm-dd)
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (assignment_date && !datePattern.test(assignment_date)) {
      return res.status(400).json({
        errorCode: 'INVALID_DATE_FORMAT',
        message: 'Invalid assignment_date format. Use yyyy-mm-dd.'
      });
    }

    // Use the provided assignment_date or default to the current date
    const finalAssignmentDate = assignment_date ? assignment_date : formattedDate;

    // Step 2: Insert the assignment record into the appropriate table based on accessory_id
    let insertQuery = '';
    let queryParams = [];

    if (accessory_id === 1) {
      // Inserting for other asset types (without serial_number)
      insertQuery = `
      INSERT INTO asset_assignment (
  id, office_cd, office_nm, name_of_user, building, floor, room_no, cpu_number,
  keyboard_serial_no, mouse_serial_no, working_status_id, assignment_date, monitor_serial_no, hrms_id_of_user, accessory_id
) 
VALUES (
  $1, $2, $3, $4, $5, $6, $7, $8, 
  $9, $10, $11, $12, $13, $14, $15
)
RETURNING id;

      ;
    `;
      queryParams = [
        assetId, office_cd, office_nm, name_of_user, building, floor, room_no, cpu_number,
        keyboard_serial_no, mouse_serial_no, working_status_id, finalAssignmentDate, monitor_serial_no, hrms_id_of_user, accessory_id
      ];
    } else {
      // Default insert for asset types that include serial numbers
      insertQuery = `
        INSERT INTO other_asset_assignment (
          id, office_cd, office_nm, name_of_user, building, floor, room_no, serial_number,
          working_status_id, assignment_date, hrms_id_of_user, accessory_id
        ) 
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
        )
        RETURNING id;
      `;
      queryParams = [
        assetId, office_cd, office_nm, name_of_user, building, floor, room_no, serial_number,
        working_status_id, finalAssignmentDate, hrms_id_of_user, accessory_id
      ];
    }

    // Step 3: Execute the insertion
    const result = await query(insertQuery, queryParams);

    console.log('Insert result:', result);

    // Step 4: Send a success response
    res.status(200).json({
      message: 'Asset assigned successfully!',
      data: result.rows[0].id
    });

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      errorCode: 'INTERNAL_SERVER_ERROR',
      message: 'Error assigning asset',
      errorDetails: err.message || err
    });
  }
};


const getAssetAssignments = async (req, res) => {
  try {
    // Extract query parameters from the request
    const { office_nm, accessory_id } = req.query;

    //console.log('office_nm:', office_nm); // Log office_nm parameter
    //console.log('accessory_id:', accessory_id); // Log accessory_id parameter

    // SQL query with placeholders for office_nm and accessory_id
    let queryText = `
      SELECT 
          id, office_cd, office_nm, name_of_user, building, floor, room_no, cpu_number,
          keyboard_serial_no, mouse_serial_no, working_status_id, assignment_date, monitor_serial_no,
          hrms_id_of_user, accessory_id, logdate
      FROM asset_assignment
      WHERE (office_nm ILIKE $1 OR $1 IS NULL)
      AND (accessory_id = $2 OR $2 IS NULL)

      UNION

      SELECT 
          id, office_cd, office_nm, name_of_user, building, floor, room_no, NULL as cpu_number,
          NULL as keyboard_serial_no, NULL as mouse_serial_no, working_status_id, assignment_date, NULL as monitor_serial_no,
          hrms_id_of_user, accessory_id, logdate
      FROM other_asset_assignment
      WHERE (office_nm ILIKE $1 OR $1 IS NULL)
      AND (accessory_id = $2 OR $2 IS NULL);
    `;

    // Prepare query parameters to avoid SQL injection
    const queryParams = [
      office_nm || null,  // If office_nm is provided, use it; otherwise, use null
      accessory_id || null, // If accessory_id is provided, use it; otherwise, use null
    ];

    //console.log('queryParams:', queryParams); // Log the parameters for debugging

    // Execute the query
    const result = await query(queryText, queryParams); // Execute the query using the query function

    //console.log('Query result:', result); // Log the result of the query

    // Send the result back as a JSON response
    res.status(200).json({
      message: 'Asset assignments retrieved successfully.',
      data: result.rows,  // Assuming 'result.rows' contains the data
    });
  } catch (err) {
    console.error('Error occurred:', err);  // Log the full error for debugging
    res.status(500).json({
      errorCode: 'INTERNAL_SERVER_ERROR',
      message: 'Error retrieving asset assignments.',
      errorDetails: err.message || err,  // Include error details in the response
    });
  }
};




// Update Assigned Asset by Asset ID
const updateAssignedAsset = async (req, res) => {
  const { assetId } = req.params;  // Get the assetId from URL parameters
  console.log('hii');
  
  const {
    office_cd, office_nm, name_of_user, building, floor, room_no,
    cpu_number, keyboard_serial_no, mouse_serial_no, working_status_id, assignment_date, accessory_id, serial_number, hrms_id_of_user,
    monitor_serial_no
  } = req.body;  // Get the updated data from the request body

  try {
    console.log('Incoming request to update asset:', req.body);

    // Ensure required fields are provided for the update
    if (!office_cd || !office_nm || !building || !floor || !room_no || !working_status_id || !accessory_id || !name_of_user || !hrms_id_of_user) {
      return res.status(400).json({
        errorCode: 'MISSING_REQUIRED_FIELDS',
        message: 'All required fields must be provided.'
      });
    }

    // Step 1: Validate the assignment_date format (yyyy-mm-dd)
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (assignment_date && !datePattern.test(assignment_date)) {
      return res.status(400).json({
        errorCode: 'INVALID_DATE_FORMAT',
        message: 'Invalid assignment_date format. Use yyyy-mm-dd.'
      });
    }

    // Step 2: Update the record for asset assignment (depending on accessory_id)
    let updateQuery = '';
    let queryParams = [];

    if (accessory_id === 1) {
      // For assets without serial numbers (like monitor, CPU, etc.)
      updateQuery = `
        UPDATE asset_assignment
        SET office_cd = $1, office_nm = $2, name_of_user = $3, building = $4, floor = $5, room_no = $6, cpu_number = $7,
            keyboard_serial_no = $8, mouse_serial_no = $9, working_status_id = $10, assignment_date = $11, 
            monitor_serial_no = $12, hrms_id_of_user = $13, accessory_id = $14
        WHERE id = $15
        RETURNING id;
      `;
      queryParams = [
        office_cd, office_nm, name_of_user, building, floor, room_no, cpu_number, keyboard_serial_no,
        mouse_serial_no, working_status_id, assignment_date, monitor_serial_no, hrms_id_of_user, accessory_id, assetId
      ];
    } else {
      // For assets that require a serial number (e.g., other asset types)
      updateQuery = `
        UPDATE other_asset_assignment
        SET office_cd = $1, office_nm = $2, name_of_user = $3, building = $4, floor = $5, room_no = $6, 
            serial_number = $7, working_status_id = $8, assignment_date = $9, hrms_id_of_user = $10, accessory_id = $11
        WHERE id = $12
        RETURNING id;
      `;
      queryParams = [
        office_cd, office_nm, name_of_user, building, floor, room_no, serial_number, working_status_id, 
        assignment_date, hrms_id_of_user, accessory_id, assetId
      ];
    }

    // Step 3: Execute the update query
    const result = await query(updateQuery, queryParams);

    

    // Step 4: If no rows are affected, send an error
    if (result.rowCount === 0) {
      return res.status(404).json({
        errorCode: 'ASSET_NOT_FOUND',
        message: 'Asset with the given ID not found.'
      });
    }

    // Step 5: Return a success response with the updated asset ID
    res.status(200).json({
      message: 'Asset updated successfully!',
      data: result.rows[0].id  // Return the updated asset ID
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      errorCode: 'INTERNAL_SERVER_ERROR',
      message: 'Error updating asset',
      errorDetails: err.message || err
    });
  }
};




// Get asset data by assetId
const getAssetById = async (req, res) => {
  const { assetId } = req.params;  // Get the assetId from the URL parameter

  try {
    console.log('Received assetId:', assetId);  // Log assetId for debugging

    // Query to check if the assetId exists in the asset_assignment table
    let result = await query('SELECT * FROM asset_assignment WHERE id = $1', [assetId]);

    if (result.rows.length === 0) {
      // If not found in asset_assignment, check the other_asset_assignment table
      result = await query('SELECT * FROM other_asset_assignment WHERE id = $1', [assetId]);

      if (result.rows.length === 0) {
        // Return 404 if assetId is not found in either table
        return res.status(404).json({
          errorCode: 'ASSET_NOT_FOUND',
          message: `Asset with ID ${assetId} not found.`,
        });
      }
    }

    // Return the found asset data
    res.status(200).json({
      message: 'Asset data retrieved successfully!',
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error fetching asset data:', err);
    res.status(500).json({
      errorCode: 'INTERNAL_SERVER_ERROR',
      message: 'Error fetching asset data',
      errorDetails: err.message || err,
    });
  }
};








module.exports = {
  createAssignedAsset,
  getAssetAssignments,
  updateAssignedAsset,
  getAssetById
  
};