import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
//import { TextField, Button, Grid, Box, Typography, CircularProgress, Alert, MenuItem, useMediaQuery } from '@mui/material';
import { TextField, Button, Grid, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl, Alert, CircularProgress, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import BackgroundImage from '../../components/chart/bg-new-vec.jpg';
import TechnicianImage from '../../components/chart/technician.jpg';
const RegisterTechnician = () => {
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
        <DashboardLayout role="Technician">
            <motion.div initial="hidden" animate="visible" transition={{ duration: 0.8, staggerChildren: 0.2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isSmallScreen ? 'column' : 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: isSmallScreen ? 3 : 10,
                        borderRadius: '10px',
                        boxShadow: '0px 4px 10px rgba(34, 2, 2, 0.1)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage: `url(${BackgroundImage})`,
                        textAlign: 'center',
                    }}
                >
                    {/* Image Section */}
                    <Box sx={{ flex: 1, textAlign: 'center', padding: 2 }}>
                        <img src={TechnicianImage} alt="Complaints" style={{ maxWidth: isSmallScreen ? '80%' : '50%', height: 'auto', borderRadius: '10px' }} />
                    </Box>

                    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3, borderRadius: '16px', boxShadow: 3, backgroundColor: '#fff' }}>
                        <Typography variant="h5" gutterBottom>Register Technician</Typography>
                        <Box textAlign="center" mt={3} display="flex" justifyContent="space-between">
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: "#757575", "&:hover": { backgroundColor: "#616161" } }}
                                onClick={() => navigate("/technician-dashboard")}
                            >
                                Back
                            </Button>
                        </Box>
                        {error && <Alert severity="error">{error}</Alert>}
                        {successMessage && <Alert severity="success">{successMessage}</Alert>}
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>

                                {/* First Name */}
                                <Grid item xs={12}>
                                    <TextField
                                        label="First Name"
                                        name="first_name"
                                        fullWidth
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>

                                {/* Last Name */}
                                <Grid item xs={12}>
                                    <TextField
                                        label="Last Name"
                                        name="last_name"
                                        fullWidth
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>

                                {/* Mobile Number */}
                                <Grid item xs={12}>
                                    <TextField
                                        label="Mobile"
                                        name="mobile"
                                        fullWidth
                                        type="tel"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        required
                                        inputProps={{ maxLength: 10 }}
                                    />
                                </Grid>

                                {/* Email */}
                                <Grid item xs={12}>
                                    <TextField
                                        label="Email"
                                        name="email"
                                        fullWidth
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>

                                {/* Submit Button */}
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                                        {loading ? <CircularProgress size={24} /> : 'Submit'}
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

export default RegisterTechnician;
