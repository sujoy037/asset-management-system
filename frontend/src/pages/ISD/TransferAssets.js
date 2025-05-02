import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    Button,
    Box,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Grid,
} from '@mui/material';
import axios from 'axios';
import DashboardLayout from '../../components/DashboardLayout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from '../../components/chart/bg-new-vec.jpg';
import TransferAssetImage from '../../components/chart/asset-transfer.jpg';
//import api from '../../api';

const TransferAssets = () => {
    const [officeName, setOfficeName] = useState('');
    const [accessoryId, setAccessoryId] = useState('');
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [accessories, setAccessories] = useState([]);
    const [offices, setOffices] = useState([]);

    const navigate = useNavigate();  // Initialize useNavigate

    // Fetch office and accessory data (once)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const officeResponse = await axios.get('http://localhost:5001/api/office-cd', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOffices(officeResponse.data);

                const accessoryResponse = await axios.get('http://localhost:5001/api/accessory', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAccessories(accessoryResponse.data);
            } catch (error) {
                setError('Error fetching office or accessory data.');
            }
        };

        fetchData();
    }, []);

    // Handle form submission to fetch data
    const handleSearch = async () => {
        const token = localStorage.getItem('authToken');
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:5001/api/asset-assignments', {
                params: {
                    office_nm: officeName,
                    accessory_id: accessoryId
                },
                headers: { Authorization: `Bearer ${token}` },
            });
            setAssignments(response.data.data);
        } catch (err) {
            setError('Error fetching asset assignments');
        } finally {
            setLoading(false);
        }
    };


    const handleTransfer = (assetId) => {
        // Check if assetId is valid before navigating
        if (assetId) {
            navigate(`/transfer-assigned-asset/${assetId}`);
        } else {
            console.error('Invalid assetId');
        }
    };
    return (
        <DashboardLayout role="ISD">
            {/* Animated Content Wrapper */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/assets')}
                    sx={{
                        marginBottom: 2,
                        background: 'linear-gradient(to right,#bf0ae2,#bf0ae2)',
                        color: 'white',
                    }}
                >

                </Button>
                <Box
                    sx={{
                        minHeight: '100vh',
                        padding: 4,
                        background: `url(${BackgroundImage}) no-repeat center center fixed`,
                        backgroundSize: 'cover',
                    }}
                >
                    <Container maxWidth="md">


                        <Typography
                            variant="h5"
                            gutterBottom
                            align="center"
                            sx={{ color: 'blue', textTransform: 'uppercase', marginBottom: 3 }}
                        >
                            Assets Transfer List by User
                        </Typography>


                        <Grid container spacing={2}>
                            {/* Left Side - Image */}
                            <Grid item xs={12} sm={3} display="flex" alignItems="center" justifyContent="center">
                                <img
                                    src={TransferAssetImage}
                                    alt="Transfer Asset "
                                    style={{
                                        width: '100%',
                                        maxWidth: '350px',
                                        borderRadius: '22px',
                                        boxShadow: '4px 4px 20px rgba(0,0,0,0.2)',
                                    }}
                                />



                            </Grid>

                            <Grid item xs={12} sm={9}>
                                {loading && (
                                    <Box display="flex" justifyContent="center">
                                        <CircularProgress size={24} />
                                    </Box>
                                )}

                                {error && (
                                    <Typography color="error" variant="body2" align="center" sx={{ marginTop: 2 }}>
                                        {error}
                                    </Typography>
                                )}
                                {/* Filter Form */}
                                <Grid container spacing={3} style={{ marginBottom: '20px' }}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            //label="Office Name"
                                            variant="outlined"
                                            fullWidth
                                            value={officeName}
                                            onChange={(e) => setOfficeName(e.target.value)}
                                            select
                                            SelectProps={{
                                                native: true,
                                            }}
                                            sx={{
                                                '& .MuiInputBase-root': {
                                                  height: '56px', // Align with table headers
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                  padding: '8px 34px',
                                                },
                                                fontSize: '1rem',
                                              }}
                                        >
                                            <option value="">Select Office</option>
                                            {offices.map((office) => (
                                                <option key={office.office_cd} value={office.office_nm}>
                                                    {office.office_nm}
                                                </option>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            //label="Accessory ID"
                                            variant="outlined"
                                            fullWidth
                                            type="number"
                                            value={accessoryId}
                                            onChange={(e) => setAccessoryId(e.target.value)}
                                            select
                                            SelectProps={{
                                                native: true,
                                            }}
                                            sx={{
                                                '& .MuiInputBase-root': {
                                                  height: '56px', // Align with table headers
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                  padding: '8px 24px',
                                                },
                                                fontSize: '1rem',
                                              }}
                                        >
                                            <option value="">Select Accessory</option>
                                            {accessories.map((accessory) => (
                                                <option key={accessory.id} value={accessory.id}>
                                                    {accessory.name}
                                                </option>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSearch}
                                            disabled={loading}
                                        >
                                            {loading ? 'Searching...' : 'Search'}
                                        </Button>
                                    </Grid>
                                </Grid>
                                {/* Error Message */}
                                {error && <div style={{ color: 'red' }}>{error}</div>}

                                {/* Asset Assignment Table */}
                                <TableContainer
                                    component={Paper}
                                    sx={{
                                        boxShadow: 'none',
                                        overflow: 'visible',
                                        maxHeight: 'none',
                                        height: 'auto',
                                    }}
                                >
                                    <Table
                                        sx={{
                                            tableLayout: 'auto',
                                            width: '100%',
                                            border: '1px solid #ccc',
                                            '& thead': {
                                                backgroundColor: 'blue',
                                            },
                                            '& thead th': {
                                                color: 'white',
                                                fontWeight: 'bold',
                                            },
                                            '& tbody tr': {
                                                backgroundColor: '#f9f9f9',
                                            },
                                            '& tbody tr:hover': {
                                                backgroundColor: '#e0f7fa',
                                            },
                                            '& td, & th': {
                                                padding: '12px',
                                                textAlign: 'center',
                                                border: '1px solid #ddd',
                                            },
                                        }}
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Asset ID</TableCell>
                                                <TableCell>Office Name</TableCell>
                                                <TableCell>Name of User</TableCell>
                                                <TableCell>Building</TableCell>
                                                <TableCell>Floor</TableCell>
                                                <TableCell>Room No</TableCell>
                                                <TableCell>Working Status</TableCell>
                                                <TableCell>Assignment Date</TableCell>
                                                <TableCell>Transfer</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {assignments.map((assignment) => (
                                                <TableRow key={assignment.id}>
                                                    <TableCell>{assignment.id}</TableCell>
                                                    <TableCell>{assignment.office_nm}</TableCell>
                                                    <TableCell>{assignment.name_of_user}</TableCell>
                                                    <TableCell>{assignment.building}</TableCell>
                                                    <TableCell>{assignment.floor}</TableCell>
                                                    <TableCell>{assignment.room_no}</TableCell>
                                                    <TableCell>{assignment.working_status_id === 1 ? 'Working' : 'Not Working'}</TableCell>
                                                    <TableCell>{assignment.assignment_date}</TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="outlined"
                                                            color="primary"
                                                            onClick={() => handleTransfer(assignment.id)}
                                                        >
                                                            Transfer
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>



                            </Grid>
                        </Grid>
                    </Container>
                    <br />

                </Box>
            </motion.div>
        </DashboardLayout >
    );
};

export default TransferAssets;
