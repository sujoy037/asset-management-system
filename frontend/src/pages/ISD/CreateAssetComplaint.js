import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
//import { TextField, Button, Grid, Box, Typography, CircularProgress, Alert, MenuItem, useMediaQuery } from '@mui/material';
import { TextField, Button, Grid, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl, Alert, CircularProgress, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import BackgroundImage from '../../components/chart/bg-blue.jpg';

const CreateAssetComplaint = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({
    asset_id: '',
    charge_nm: '',
    room_no: '',
    office_name: '',
    building: '',
    usr_nm: '',
    cpu_number: '',
    accessory_id: '',
    complaint_description: '',
    complaint_status_id: '',
    reported_by: '',
  });



  const [error, setError] = useState('');
  const [chargeNames, setChargeNames] = useState([]); // State to hold charge names
  const [accessory, setAccessory] = useState([]); // State to hold charge names
  const [status, setStatus] = useState([]); // State to hold charge names
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [assetList, setAssetList] = useState([])
  const [roomList, setRoomList] = useState([])
  const [officeList, setOfficeList] = useState([])
  const [buildingList, setBuildingList] = useState([])
  const [userList, setUserList] = useState([])
  const [cpuList, setCpuList] = useState([])


  // Fetch charge names and asset data when the component mounts
  useEffect(() => {
    const fetchChargeNames = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get('http://localhost:5001/api/charge-cd-list', {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(response);

        setChargeNames(response.data); // Populate charge names dropdown with response data
      } catch (error) {
        console.error('Error fetching charge names', error);
        setError('Error fetching charge names.');
      }
    };

    fetchChargeNames();
  }, []);

  // Fetch Accessory
  useEffect(() => {
    const fetchAccessory = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get('http://localhost:5001/api/accessory', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response);

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
        const response = await axios.get('http://localhost:5001/api/complain-status', {
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

  // Fetch asset data based on selected charge_nm
  useEffect(() => {
    const fetchAssetByCharge = async () => {
      const token = localStorage.getItem('authToken');
      if (formData.charge_nm) {
        try {
          // Send charge_nm as a query parameter
          const response = await axios.get('http://localhost:5001/api/asset-assignments', {
            params: { charge_nm: formData.charge_nm },  // Send charge_nm as query parameter
            headers: { Authorization: `Bearer ${token}` },  // Send the token in the Authorization header
          });
          // console.log("Response Data:", response.data.data);
          setAssetList(response.data.data)
          setRoomList(response.data.data)
          setOfficeList(response.data.data)
          setBuildingList(response.data.data)
          setUserList(response.data.data)
          setCpuList(response.data.data)

          if (response.data.data && response.data.data.length > 0) {
            const assetAssignment = response.data.data[0];  // Assuming you want to populate with the first record

            // Now populate asset_id with the value of id from the asset assignment
            setFormData({
              ...formData,
              asset_id: assetAssignment.id || '',  // Use the 'id' value for asset_id
              room_no: assetAssignment.room_no || '',
              office_name: assetAssignment.office_name || '',
              building: assetAssignment.building || '',
              usr_nm: assetAssignment.usr_nm || '',
              cpu_number: assetAssignment.cpu_number || '',
              accessory_id: '',
              complaint_description: '',
              complaint_status_id: '',
              reported_by: '',
            });
          } else {
            setError('No asset assignments found for the selected charge name.');
          }
        } catch (error) {
          console.error('Error fetching asset assignments', error);
          setError('Error fetching asset assignments.');
        }
      }
    };

    fetchAssetByCharge();
  }, [formData.charge_nm]); // Run the effect whenever charge_nm changes



  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setError('');

    // Check formData before submitting
    console.log(formData); // Ensure accessory_id is present

    try {
      const response = await axios.post('http://localhost:5001/api/complaints', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });

      console.log(response.data);
      setSuccessMessage(response.data.message); // Display success message
      setFormData({
        asset_id: '',
        charge_nm: '',
        room_no: '',
        office_name: '',
        building: '',
        usr_nm: '',
        cpu_number: '',
        accessory_id: '',
        complaint_description: '',
        complaint_status_id: '',
        reported_by: '',
      });
    } catch (error) {
      console.error(error);
      setError('There was an error creating the complaint.');
    } finally {
      setLoading(false);
    }
  };


  // Show success message for 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer); // Clean up timeout if the component unmounts or successMessage changes
    }
  }, [successMessage]);

  return (
    <DashboardLayout role="ISD">
      <motion.div initial="hidden" animate="visible" transition={{ duration: 0.8, staggerChildren: 0.2 }}>
        <Box
          sx={{
            marginTop: 2,
            padding: isSmallScreen ? 3 : 10,
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(34, 2, 2, 0.1)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${BackgroundImage})`,
            textAlign: 'center',
          }}
        ><Box sx={{ maxWidth: 600, margin: 'auto', padding: 3, borderRadius: '16px', boxShadow: 3, backgroundColor: '#fff' }}>
            <Typography variant="h5" gutterBottom>Raise Complaints</Typography>
            <Box textAlign="center" mt={3} display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                sx={{ backgroundColor: "#757575", "&:hover": { backgroundColor: "#616161" } }}
                onClick={() => navigate("/complaints")}
              >
                Back
              </Button>
            </Box>
            {error && <Alert severity="error">{error}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>



                {/* Charge Name dropdown */}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Charge Name</InputLabel>
                    <Select
                      name="charge_nm"
                      value={formData.charge_nm}
                      onChange={handleChange}
                      required
                    >
                      {chargeNames.map((charge) => (
                        <MenuItem key={charge.charge_cd} value={charge.charge_nm}>
                          {charge.charge_nm}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Asset ID</InputLabel>
                    <Select
                      name="asset_id"
                      value={formData.asset_id} // The selected Asset ID will be stored in formData.asset_id
                      onChange={handleChange} // Handle the change and update the form state
                      required
                    >
                      {/* Map through the fetched asset IDs and display them in the dropdown */}
                      {assetList.map((asset) => (
                        <MenuItem key={asset.id} value={asset.id}>
                          {asset.id} {/* Display the Asset ID */}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Other form fields (Room No, Office Name, etc.) */}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Room Number</InputLabel>
                    <Select
                      name="room_no"
                      value={formData.room_no}
                      onChange={handleChange}
                      required
                    >
                      {roomList.map((room) => (
                        <MenuItem key={room.room_no} value={room.room_no}>
                          {room.room_no}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Office Name</InputLabel>
                    <Select
                      name="office_name"
                      value={formData.office_name}
                      onChange={handleChange}
                      required
                    >
                      {officeList.map((office) => (
                        <MenuItem key={office.office_name} value={office.office_name}>
                          {office.office_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Building</InputLabel>
                    <Select
                      name="building"
                      value={formData.building}
                      onChange={handleChange}
                      required
                    >
                      {buildingList.map((building) => (
                        <MenuItem key={building.building} value={building.building}>
                          {building.building}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>User Name</InputLabel>
                    <Select
                      name="usr_nm"
                      value={formData.usr_nm}
                      onChange={handleChange}
                      required
                    >
                      {userList.map((users) => (
                        <MenuItem key={users.usr_nm} value={users.usr_nm}>
                          {users.usr_nm}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>CPU Number</InputLabel>
                    <Select
                      name="cpu_number"
                      value={formData.cpu_number}
                      onChange={handleChange}
                      required
                    >
                      {cpuList.map((cpu) => (
                        <MenuItem key={cpu.cpu_number} value={cpu.cpu_number}>
                          {cpu.cpu_number}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* Accessory Name dropdown */}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Accessory</InputLabel>
                    <Select
                      name="accessory_id"  // Make sure to store the ID in formData.accessory_id
                      value={formData.accessory_id}
                      onChange={handleChange}
                      required
                    >
                      {accessory.map((accessory) => (
                        <MenuItem key={accessory.id} value={accessory.id}>  {/* Use accessory.id as value */}
                          {accessory.name}  {/* Display accessory.name in dropdown */}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Complaint Description"
                    name="complaint_description"
                    fullWidth
                    value={formData.complaint_description}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                {/* Complain Status dropdown */}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Complain Status</InputLabel>
                    <Select
                      name="complaint_status_id"
                      value={formData.complaint_status_id}
                      onChange={handleChange}
                      required
                    >
                      {status.map((status) => (
                        <MenuItem key={status.id} value={status.id}>
                          {status.status_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Reported By"
                    name="reported_by"
                    fullWidth
                    value={formData.reported_by}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                {/* Add other fields similarly */}

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Submit Complaint'}
                  </Button>
                </Grid>

              </Grid>
            </form>
          </Box>
        </Box>
      </motion.div>

    </DashboardLayout>

  );
};

export default CreateAssetComplaint;
