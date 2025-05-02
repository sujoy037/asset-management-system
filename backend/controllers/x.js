const updateAssignedAsset = async (req, res) => {
    const { assetId } = req.params; // Get the assetId from URL parameters
    console.log("Asset ID:", assetId); // Log assetId
  
    const {
      office_cd,
      office_nm,
      name_of_user,
      building,
      floor,
      room_no,
      cpu_number,
      keyboard_serial_no,
      mouse_serial_no,
      working_status_id,
      assignment_date,
      accessory_id,
      serial_number,
      hrms_id_of_user,
      monitor_serial_no,
    } = req.body; // Get the updated data from the request body
  
    try {
      console.log("Incoming request to update asset:", req.body);
  
      // Ensure required fields are provided for the update
      if (
        !office_cd ||
        !office_nm ||
        !building ||
        !floor ||
        !room_no ||
        !working_status_id ||
        !accessory_id ||
        !name_of_user ||
        !hrms_id_of_user
      ) {
        return res.status(400).json({
          errorCode: "MISSING_REQUIRED_FIELDS",
          message: "All required fields must be provided.",
        });
      }
  
      // Step 1: Validate the assignment_date format (yyyy-mm-dd)
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      if (assignment_date && !datePattern.test(assignment_date)) {
        return res.status(400).json({
          errorCode: "INVALID_DATE_FORMAT",
          message: "Invalid assignment_date format. Use yyyy-mm-dd.",
        });
      }
  
      // Step 2: Check if assetId exists in asset_assignment or other_asset_assignment table
      const checkAssetQuery = `
        SELECT * FROM asset_assignment WHERE id = $1
      `;
      const checkOtherAssetQuery = `
        SELECT * FROM other_asset_assignment WHERE id = $1
      `;
  
      let checkAssetResult = await query(checkAssetQuery, [assetId]);
      let isAssetAssignment = true;
      let asset = null;
  
      // If not found in asset_assignment, check the other_asset_assignment table
      if (checkAssetResult.rowCount === 0) {
        checkAssetResult = await query(checkOtherAssetQuery, [assetId]);
        isAssetAssignment = false;
      } else {
        asset = checkAssetResult.rows[0];
      }
  
      if (checkAssetResult.rowCount === 0) {
        return res.status(404).json({
          errorCode: "ASSET_NOT_FOUND",
          message: "Asset with the given ID not found.",
        });
      }
  
      // Step 3: Insert current data into the corresponding history table
      let insertHistoryQuery = '';
      let insertHistoryParams = [];
      
      if (isAssetAssignment) {
        insertHistoryQuery = `
          INSERT INTO asset_assignment_history 
          (
            office_cd, office_nm, name_of_user, building, floor, room_no, 
            cpu_number, keyboard_serial_no, mouse_serial_no, working_status_id, 
            assignment_date, monitor_serial_no, hrms_id_of_user, accessory_id, 
            asset_id, action_taken
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        `;
        insertHistoryParams = [
          asset.office_cd,
          asset.office_nm,
          asset.name_of_user,
          asset.building,
          asset.floor,
          asset.room_no,
          asset.cpu_number,
          asset.keyboard_serial_no,
          asset.mouse_serial_no,
          asset.working_status_id,
          asset.assignment_date,
          asset.monitor_serial_no,
          asset.hrms_id_of_user,
          asset.accessory_id,
          asset.id,  // asset ID
          "UPDATE"  // action_taken
        ];
      } else {
        insertHistoryQuery = `
          INSERT INTO other_asset_history 
          (
            office_cd, office_nm, name_of_user, building, floor, room_no, 
            serial_number, working_status_id, assignment_date, hrms_id_of_user, accessory_id, 
            asset_id, action_taken
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        `;
        insertHistoryParams = [
          asset.office_cd,
          asset.office_nm,
          asset.name_of_user,
          asset.building,
          asset.floor,
          asset.room_no,
          asset.serial_number,
          asset.working_status_id,
          asset.assignment_date,
          asset.hrms_id_of_user,
          asset.accessory_id,
          asset.id,  // asset ID
          "UPDATE"  // action_taken
        ];
      }
  
      // Insert into history table
      await query(insertHistoryQuery, insertHistoryParams);
  
      // Step 4: Update the record in asset_assignment or other_asset_assignment table
      let updateQuery = '';
      let queryParams = [];
  
      if (isAssetAssignment) {
        updateQuery = `
          UPDATE asset_assignment
          SET office_cd = $1, office_nm = $2, name_of_user = $3, building = $4, floor = $5, room_no = $6, 
              cpu_number = $7, keyboard_serial_no = $8, mouse_serial_no = $9, working_status_id = $10, 
              assignment_date = $11, monitor_serial_no = $12, hrms_id_of_user = $13, accessory_id = $14
          WHERE id = $15
          RETURNING id;
        `;
        queryParams = [
          office_cd,
          office_nm,
          name_of_user,
          building,
          floor,
          room_no,
          cpu_number,
          keyboard_serial_no,
          mouse_serial_no,
          working_status_id,
          assignment_date,
          monitor_serial_no,
          hrms_id_of_user,
          accessory_id,
          assetId,  // Asset ID remains the same
        ];
      } else {
        updateQuery = `
          UPDATE other_asset_assignment
          SET office_cd = $1, office_nm = $2, name_of_user = $3, building = $4, floor = $5, room_no = $6, 
              serial_number = $7, working_status_id = $8, assignment_date = $9, hrms_id_of_user = $10, accessory_id = $11
          WHERE id = $12
          RETURNING id;
        `;
        queryParams = [
          office_cd,
          office_nm,
          name_of_user,
          building,
          floor,
          room_no,
          serial_number,
          working_status_id,
          assignment_date,
          hrms_id_of_user,
          accessory_id,
          assetId,  // Asset ID remains the same
        ];
      }
  
      // Step 5: Execute the update query
      const result = await query(updateQuery, queryParams);
  
      // Step 6: If no rows are affected, send an error
      if (result.rowCount === 0) {
        return res.status(404).json({
          errorCode: "ASSET_NOT_FOUND",
          message: "Asset with the given ID not found.",
        });
      }
  
      // Step 7: Return a success response with the updated asset ID
      res.status(200).json({
        message: "Asset updated successfully!",
        data: result.rows[0].id, // Return the updated asset ID
      });
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({
        errorCode: "INTERNAL_SERVER_ERROR",
        message: "Error updating asset",
        errorDetails: err.message || err,
      });
    }
  };
  