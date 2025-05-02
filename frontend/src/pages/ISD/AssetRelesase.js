import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, CircularProgress, Select, InputLabel, MenuItem, FormControl } from '@mui/material';
import { useParams } from 'react-router-dom';

const UpdateAssignedAsset = () => {
    const { assetId } = useParams();  // Get assetId from the URL params
    const [formData, setFormData] = useState({
        office_cd: '',
        office_nm: '',
        name_of_user: '',
        building: '',
        floor: '',
        room_no: '',
        cpu_number: '',
        keyboard_serial_no: '',
        mouse_serial_no: '',
        working_status_id: '',
        assignment_date: '',
        accessory_id: '',
        monitor_serial_no: '',
        hrms_id_of_user: ''
    });


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [accessory, setAccessory] = useState([]);
    const [status, setStatus] = useState([]);
    const [officeList, setOfficeList] = useState([]);  // Store list of office codes
    const [isLoading, setIsLoading] = useState(false);
    const [assets, setAssets] = useState([]);
     const [filteredAssets, setFilteredAssets] = useState([]);

    useEffect(() => {
        const fetchAssetData = async () => {
            if (!assetId) {
                setError('Asset ID is missing!');
                return;
            }
            console.log('Asset ID:', assetId);  // Log assetId for debugging
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get(`http://localhost:5001/api/asset-assignment/${assetId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('Response:', response.data.data);  // Log the API response

                // Format the date to yyyy-mm-dd
                const formattedDate = response.data.data.assignment_date ? response.data.data.assignment_date.split('T')[0] : '';

                setFormData({
                    ...response.data.data,
                    assignment_date: formattedDate  // Format assignment_date for the date input
                });
            } catch (err) {
                setError('Error fetching asset details.');
                console.error('Error:', err);  // Log the error for debugging
            }
        };

        fetchAssetData();
    }, [assetId]);
    console.log('Updated assetData:', formData);


    // Fetch accessories data
    useEffect(() => {
        const fetchAccessory = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await axios.get('http://localhost:5001/api/accessory', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAccessory(response.data); // Store accessories data
            } catch (error) {
                setError('Error fetching accessories.');
                console.error(error);
            }
        };
        fetchAccessory();
    }, []);

    // Fetch complain status data
    useEffect(() => {
        const fetchComplainStatus = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await axios.get('http://localhost:5001/api/working-status', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStatus(response.data); // Store complain status data
            } catch (error) {
                setError('Error fetching complain status.');
                console.error(error);
            }
        };
        fetchComplainStatus();
    }, []);


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


    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission for updating asset
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.put(
                `http://localhost:5001/api/asset-assignment/${assetId}`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert('Asset updated successfully!');
            // You can handle successful update here (e.g., redirecting, clearing form)
        } catch (err) {
            setError('Error updating asset.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Transfer Asset</h2>

            {/* Display Error Message */}
            {error && <div style={{ color: 'red' }}>{error}</div>}

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {/* Form Fields */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="office-code-label">Office Code</InputLabel>
                            <Select
                                labelId="office-code-label"
                                name="office_cd"
                                value={formData.office_cd}
                                onChange={handleOfficeCdChange}
                                label="Office Code"
                            >
                                {officeList.map((office) => (
                                    <MenuItem key={office.id} value={office.office_cd}>
                                        {office.office_cd} - {office.office_nm}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>

                        <FormControl fullWidth>
                            <InputLabel id="office-nm-label">Office Name</InputLabel>
                            <Select
                                labelId="office-nm-label"
                                name="office-nm"
                                value={formData.office_nm}
                                onChange={handleOfficeCdChange}
                                label="Office Name"
                            >
                                {officeList.map((office) => (
                                    <MenuItem key={office.id} value={office.office_nm}>
                                        {office.office_nm}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid item xs={12} sm={6}>

                        <FormControl fullWidth>
                            <InputLabel id="name-of-user-label">Name of User</InputLabel>
                            <Select
                                labelId="name-of-user-label"
                                name="name_of_user"
                                value={formData.name_of_user}
                                onChange={handleChange}
                                label="Name of User"
                            >
                                {assets.map((office) => (
                                    <MenuItem key={office.id} value={office.name_of_user}>
                                        {office.name_of_user}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                       
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Building"
                            variant="outlined"
                            fullWidth
                            name="building"
                            value={formData.building}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Floor"
                            variant="outlined"
                            fullWidth
                            name="floor"
                            value={formData.floor}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Room No"
                            variant="outlined"
                            fullWidth
                            name="room_no"
                            value={formData.room_no}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="CPU Number"
                            variant="outlined"
                            fullWidth
                            name="cpu_number"
                            value={formData.cpu_number}
                            onChange={handleChange}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Keyboard Serial No"
                            variant="outlined"
                            fullWidth
                            name="keyboard_serial_no"
                            value={formData.keyboard_serial_no}
                            onChange={handleChange}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Mouse Serial No"
                            variant="outlined"
                            fullWidth
                            name="mouse_serial_no"
                            value={formData.mouse_serial_no}
                            onChange={handleChange}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="working-status-label">Working Status</InputLabel>
                            <Select
                                labelId="working-status-label"
                                name="working_status_id"
                                value={formData.working_status_id}
                                onChange={handleChange}
                                label="Working Status"
                            >
                                {status.map((statusItem) => (
                                    <MenuItem key={statusItem.id} value={statusItem.id}>
                                        {statusItem.status}
                                    </MenuItem>
                                ))}
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
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Monitor Serial No"
                            variant="outlined"
                            fullWidth
                            name="monitor_serial_no"
                            value={formData.monitor_serial_no}
                            onChange={handleChange}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="HRMS ID of User"
                            variant="outlined"
                            fullWidth
                            name="hrms_id_of_user"
                            value={formData.hrms_id_of_user}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="accessory-label">Accessory</InputLabel>
                            <Select
                                labelId="accessory-label"
                                name="accessory_id"
                                value={formData.accessory_id}
                                onChange={handleChange}
                                label="Accessory"
                            >
                                {accessory.map((acc) => (
                                    <MenuItem key={acc.id} value={acc.id}>
                                        {acc.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Update Asset'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default UpdateAssignedAsset;
