const fs = require('fs');
const XLSX = require('xlsx');
const db = require('../db'); // Adjust path based on your structure

const uploadXlsData = async (req, res) => {
  const { office_cd } = req.body;

  if (!office_cd) {
    return res.status(400).json({ message: 'Office code (office_cd) is required.' });
  }

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const filePath = req.file.path;

  try {
    // Check if data already exists for the office_cd
    const checkQuery = 'SELECT COUNT(*) FROM total_assets WHERE office_cd = $1';
    const checkResult = await db.query(checkQuery, [office_cd]);
    if (checkResult.rows[0].count > 0) {
      return res.status(400).json({ message: `Data for office_cd ${office_cd} already exists.` });
    }

    // Read the uploaded XLSX file
    const workbook = XLSX.readFile(filePath);

    // Assuming the data is in the first sheet (can adjust if needed)
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet data to JSON format
    const results = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Extract the header (column names)
    const [header, ...dataRows] = results;

    let successCount = 0;
    let failureCount = 0;

    // Insert data into DB
    for (const row of dataRows) {
      const normalizedRow = header.reduce((acc, key, index) => {
        const normalizedKey = key.trim().toLowerCase();
        acc[normalizedKey] = row[index]?.toString().trim();
        return acc;
      }, {});

      // Generate the ID in the required format: TOASSET-DD/MM/YYYY-XXXX
      const dateFormatted = new Date().toLocaleDateString('en-GB').replace(/\//g, '-'); // Format as DD-MM-YYYY
      const sequenceResult = await db.query('SELECT nextval(\'toasset_seq\') AS seq_value'); // Fetch next sequence value
      const sequenceValue = sequenceResult.rows[0].seq_value.toString().padStart(4, '0'); // Format sequence value

      const assetId = `TOASSET-${dateFormatted}-${sequenceValue}`;

      // Insert data into total_assets table with the generated ID
      const query = `
        INSERT INTO total_assets (id, office_name, building, floor, room_no, cpu_number, name_of_user, hrms_id_of_user, voip_of_user, office_cd, logdate)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP)
      `;

      const values = [
        assetId, // Use the dynamically generated asset ID
        normalizedRow['office_name'] || null,
        normalizedRow['building'] || 'Unknown',
        normalizedRow['floor'] || null,
        normalizedRow['room_no'] || null,
        normalizedRow['cpu_number'] || null,
        normalizedRow['name_of_user'] || null,
        normalizedRow['hrms_id_of_user'] || null,
        normalizedRow['voip_of_user'] || null,
        office_cd,
      ];

      try {
        await db.query(query, values);
        successCount++;
      } catch (err) {
        console.error('Database error for row:', normalizedRow, err);
        failureCount++;
      }
    }

    // Clean up by deleting the uploaded file after processing
    fs.unlinkSync(filePath);

    if (successCount > 0) {
      // Return success message if at least one record was successfully inserted
      res.status(200).json({
        message: `${successCount} record(s) inserted successfully. ${failureCount} record(s) failed.`,
      });
    } else {
      // If no records were inserted successfully, return an error message
      res.status(500).json({
        message: 'No records were inserted. Please check the file format or data.',
      });
    }
  } catch (err) {
    console.error('Error processing XLS file:', err);
    fs.unlinkSync(filePath);  // Make sure to clean up the file
    res.status(500).json({ message: 'Error processing Excel file.', error: err.message });
  }
};

module.exports = uploadXlsData;
