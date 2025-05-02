import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Container, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const AssignAssets = () => {
  const [formData, setFormData] = useState({
    office_cd: '',
    office_nm: '',
    name_of_user: '',
    hrms_id_of_user: '',
    building: '',
    floor: '',
    room_no: '',
    cpu_number: '',
    keyboard_serial_no: '',
    mouse_serial_no: '',
    monitor_serial_no: '',
    working_status_id: '',
    assignment_date: '',
    accessory_id: '',
    serial_number: '',
    logdate: new Date().toISOString().split('T')[0]  // Set logdate to current date in 'YYYY-MM-DD' format
  });
  

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [officeList, setOfficeList] = useState([]);  // Store list of office codes
  const [accessory, setAccessory] = useState([]); // State to hold charge names
  const [status, setStatus] = useState([]); // State to hold charge names

  // Fetch office codes and total assets from API
  useEffect(() => {
    const fetchAssetsAndOffices = async () => {
      setIsLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError('Authentication token is missing. Please log in again.');
          setIsLoading(false);
          return;
        }

        // Fetch assets and offices
        const [assetsResponse, officesResponse] = await Promise.all([
          axios.get('http://localhost:5001/api/total-assets', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5001/api/office-cd', {  // Fetch office list
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setAssets(assetsResponse.data || []);
        setOfficeList(officesResponse.data || []);  // Store the office list



      } catch (err) {
        console.error('Error fetching assets or offices:', err);
        setError('Error fetching assets or offices.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssetsAndOffices();
  }, []);

  //console.log('Office List:', officeList);
  //console.log('Assets:', assets);

  // Fetch Accessory
  useEffect(() => {
    const fetchAccessory = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get('http://localhost:5001/api/accessory', {
          headers: { Authorization: `Bearer ${token}` },
        });
        //console.log(response);

        setAccessory(response.data); // Populate charge names dropdown with response data
      } catch (error) {
        //console.error('Error fetching charge names', error);
        setError('Error fetching charge names.');
      }
    };

    fetchAccessory();
  }, []);



  // Fetch compalin status
  useEffect(() => {
    const fetchComplainStatus = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get('http://localhost:5001/api/working-status', {
          headers: { Authorization: `Bearer ${token}` },
        });
        //console.log(response);

        setStatus(response.data); // Populate charge names dropdown with response data
      } catch (error) {
        console.error('Error fetching charge names', error);
        setError('Error fetching charge names.');
      }
    };

    fetchComplainStatus();
  }, []);


  // Handle office_cd change and filter assets
  const handleOfficeCdChange = (e) => {
    const { value } = e.target;  // Get the selected office_cd
    console.log('Selected Office Code:', value); // Log for debugging

    // Update formData with the selected office_cd
    setFormData((prevFormData) => ({
      ...prevFormData,
      office_cd: value,
    }));

    // Find the office name based on the selected office_cd
    const selectedOffice = officeList.find((office) => office.office_cd === value);
    if (selectedOffice) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        office_nm: selectedOffice.office_nm,  // Update office_nm based on office_cd
      }));
    }

    // Filter assets based on the selected office_cd
    const filtered = assets.filter((asset) => asset.office_cd === value);
    setFilteredAssets(filtered); // Update filtered assets based on the selected office_cd
  };



  useEffect(() => {
    console.log('Initial formData:', formData); // Debugging line
  }, [formData]);

  
 // Handle name_of_user change and filter assets accordingly
 const handleNameOfUserChange = (e) => {
  const { value } = e.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    name_of_user: value,
  }));

  // Filter the assets based on the selected name_of_user
  const userAssets = assets.filter((asset) => asset.name_of_user === value);
  setFilteredAssets(userAssets); 
};

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // Update this part where accessory_id is selected
  useEffect(() => {
    // Check if accessory_id is NOT equal to 1
    if (parseInt(formData.accessory_id) !== 1) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        serial_number: '', // Clear serial_number when accessory_id is not 1
      }));
    }
  }, [formData.accessory_id]);  // Effect depends on formData.accessory_id


  // Handle form submission
  const handleSubmit = async (e) => {
    const token = localStorage.getItem('authToken');
    e.preventDefault();
  
    // Basic validation before sending to the API
    if (
      !formData.office_cd ||
      !formData.office_nm ||
      !formData.name_of_user ||
      !formData.hrms_id_of_user ||
      !formData.building ||
      !formData.floor ||
      !formData.room_no ||
      !formData.working_status_id ||
      !formData.accessory_id ||
      (formData.accessory_id && [2, 3, 4].includes(parseInt(formData.accessory_id)) && !formData.serial_number) // Ensure serial number is provided for relevant accessory_ids
    ) {
      setError('Please fill in all required fields.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5001/api/assign-assets', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        alert('Asset assigned successfully!');
        setFormData({
          office_cd: '',
          office_nm: '',
          name_of_user: '',
          hrms_id_of_user: '',
          building: '',
          floor: '',
          room_no: '',
          cpu_number: '',
          keyboard_serial_no: '',
          mouse_serial_no: '',
          monitor_serial_no: '',
          working_status_id: '',
          assignment_date: '',
          accessory_id: '',
          serial_number: '',  // Reset serial_number after submission
          logdate: new Date().toISOString().split('T')[0]  // Reset logdate to current date after submission
        });
        setError('');
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred while submitting the form.');
    }
  };
  

  return (
    <Container>
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h4" gutterBottom>
          Assign Asset
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Accessory ID</InputLabel>
                <Select
                  label="Accessory ID"
                  name="accessory_id"
                  value={formData.accessory_id}
                  onChange={handleChange}
                  required
                >
                  {accessory.length > 0 ? (
                    accessory.map((acc) => (
                      <MenuItem key={acc.id} value={acc.id}>
                        {acc.name} {/* Assuming 'name' is the label to show */}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">No accessories available</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            {/* Office Code Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Office Code</InputLabel>
                <Select
                  label="Office Code"
                  name="office_cd"
                  value={formData.office_cd}
                  onChange={handleOfficeCdChange} // Ensure the handler is correctly linked
                  required
                >
                  {officeList.map((office) => (
                    <MenuItem key={office.office_cd} value={office.office_cd}>
                      {office.office_cd} - {office.office_nm}  {/* Display the office code and name */}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

            </Grid>

            {/* Office Name  */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Office Name"
                variant="outlined"
                fullWidth
                name="office_nm"
                value={formData.office_nm}
                onChange={handleChange}
                required
                disabled
              />
            </Grid>
            {/* Officer Name Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Officer Name</InputLabel>
                <Select
                  label="Officer Name"
                  name="name_of_user"  // Ensure this matches the field in your formData
                  value={formData.name_of_user}
                  onChange={handleNameOfUserChange}  // Handle officer name change
                  required
                >

                  {/* Map over officeList to create MenuItems for officer names */}
                  {assets.map((office) => (
                    <MenuItem key={office.name_of_user} value={office.name_of_user}>
                      {office.name_of_user} {/* Display the officer's name */}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
             {/* Building  Dropdown */}
             <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Hrms Id</InputLabel>
                <Select
                  label="Hrms Id"
                  name="hrms_id_of_user"  // Ensure this matches the field in your formData
                  value={formData.hrms_id_of_user}
                  onChange={handleChange}
                  required
                >
                   {filteredAssets.map((office) => (
                    <MenuItem key={office.hrms_id_of_user} value={office.hrms_id_of_user}>
                      {office.hrms_id_of_user}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Building  Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Building</InputLabel>
                <Select
                  label="Building"
                  name="building"  // Ensure this matches the field in your formData
                  value={formData.building}
                  onChange={handleChange}
                  required
                >
                   {filteredAssets.map((office) => (
                    <MenuItem key={office.building} value={office.building}>
                      {office.building}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Floor Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Floor</InputLabel>
                <Select
                  label="Floor"
                  name="floor"  // Ensure this matches the field in your formData
                  value={formData.floor}
                  onChange={handleChange}
                  required
                >
                   {filteredAssets.map((office) => (
                    <MenuItem key={office.floor} value={office.floor}>
                      {office.floor}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Room Dropdown */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Room Number</InputLabel>
                <Select
                  label="Room Number"
                  name="room_no"  // Ensure this matches the field in your formData
                  value={formData.room_no}
                  onChange={handleChange}
                  required
                >

                {filteredAssets.map((office) => (
                    <MenuItem key={office.room_no} value={office.room_no}>
                      {office.room_no}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Serial Number (conditional rendering) */}
            {formData.accessory_id && parseInt(formData.accessory_id) !== 1 && (
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Serial Number"
                  variant="outlined"
                  fullWidth
                  name="serial_number"
                  value={formData.serial_number}
                  onChange={handleChange}
                  required
                />
              </Grid>
            )}

            {/* CPU Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>CPU Number</InputLabel>
                <Select
                  label="CPU Number"
                  name="cpu_number"  // Ensure this matches the field in your formData
                  value={formData.cpu_number}
                  onChange={handleChange}
                  required
                  disabled={formData.accessory_id && formData.accessory_id !== 1}  // Disable when accessory_id is not 1

                >
                   {filteredAssets.map((office) => (
                    <MenuItem key={office.cpu_number} value={office.cpu_number}>
                      {office.cpu_number}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Keyborard */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Keyboard Serial Number"
                variant="outlined"
                fullWidth
                name="keyboard_serial_no"
                value={formData.keyboard_serial_no}
                onChange={handleChange}
                disabled={formData.accessory_id && formData.accessory_id !== 1}  // Disable based on accessory_id
              />
            </Grid>
            {/* Mouse  */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Mouse Serial Number"
                variant="outlined"
                fullWidth
                name="mouse_serial_no"
                value={formData.mouse_serial_no}
                onChange={handleChange}
                disabled={formData.accessory_id && formData.accessory_id !== 1}  // Disable based on accessory_id
              />
            </Grid>
            {/* Keyborard */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Monitor Serial Number"
                variant="outlined"
                fullWidth
                name="monitor_serial_no"
                value={formData.monitor_serial_no}
                onChange={handleChange}
                disabled={formData.accessory_id && formData.accessory_id !== 1}  // Disable based on accessory_id
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Working Status</InputLabel>
                <Select
                  label="Working Status"
                  name="working_status_id"
                  value={formData.working_status_id}
                  onChange={handleChange}
                  required
                >
                  {status.length > 0 ? (
                    status.map((stat) => (
                      <MenuItem key={stat.id} value={stat.id}>
                        {stat.status} {/* Assuming 'status_name' is the label */}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">No status available</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Assignment Date"
                variant="outlined"
                fullWidth
                name="assignment_date"
                value={formData.assignment_date}
                onChange={handleChange}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
           
          </Grid>
          <Box sx={{ marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Assign Asset
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AssignAssets;
