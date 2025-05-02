import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardLayout from '../../components/DashboardLayout';
import { motion } from 'framer-motion';
import BackgroundImage from '../../components/chart/bg-new-vec.jpg';
import api from '../../api';

const ISDRoleCreationHistory = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('No token found. Please log in again.');
                return;
            }

            const response = await api.get('/user-roles-status', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            let rolesData = [];
            if (Array.isArray(response.data)) {
                rolesData = response.data;
            } else if (response.data && Array.isArray(response.data.data)) {
                rolesData = response.data.data;
            } else {
                setError('Response data is not in the expected format.');
                return;
            }

            const filteredData = rolesData.filter(role => role.role_cd === 'ISD');
            setData(filteredData);
        } catch (err) {
            setError('Failed to fetch user role status data');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const formatDate = (date) => {
        if (!date) return 'N/A';
        const d = new Date(date);
        return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = data.filter(
        (row) =>
            row.usr_cd.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.role_cd.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.status_cd.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    // const handleEdit = (usr_cd, role_cd) => {
    //     console.log(`Edit user: ${usr_cd}, role: ${role_cd}`);
    // };

    // const handleDelete = (usr_cd, role_cd) => {
    //     console.log(`Delete user: ${usr_cd}, role: ${role_cd}`);
    // };

    return (
        <DashboardLayout role="ISD">
            <motion.div
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, staggerChildren: 0.2 }}
            >
                <Box
                    sx={{
                        marginTop: 2,
                        padding: 10,
                        borderRadius: '10px',
                        boxShadow: '0px 4px 10px rgba(34, 2, 2, 0.1)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage: `url(${BackgroundImage})`,
                        animation: 'backgroundAnim 10s infinite alternate',
                    }}
                >
                    <style>
                        {`
              @keyframes backgroundAnim {
                0% {
                  background-position: 0% 0%;
                }
                100% {
                  background-position: 100% 100%;
                }
              }
            `}
                    </style>

                    <Button
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/history')}
                        sx={{ marginBottom: 2 }}
                        style={{
                            background: 'linear-gradient(to right,#bf0ae2,#bf0ae2)',
                            color: 'white',
                        }}
                    >
                        Back
                    </Button>



                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {/* Search Field */}
                        <Box sx={{ backgroundColor: 'white', padding: 2, borderRadius: '10px', marginBottom: 2 }}>
                            <TextField
                                label="Search"
                                variant="outlined"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                fullWidth
                            />
                        </Box>
                        <Typography variant="h5" gutterBottom color="blue">
                            User Role and Status Information
                        </Typography>
                        <TableContainer component={Paper} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                            <Table sx={{ minWidth: 650 }} aria-label="user role and status table">
                                <TableHead sx={{ background: 'linear-gradient(to right,rgb(37, 18, 211),rgb(10, 15, 32))', color: 'white' }}>
                                    <TableRow>
                                        <TableCell sx={{ color: 'white' }}>User Code</TableCell>
                                        <TableCell sx={{ color: 'white' }}>Role Code</TableCell>
                                        
                                        <TableCell sx={{ color: 'white' }}>Start Date</TableCell>
                                        <TableCell sx={{ color: 'white' }}>End Date</TableCell>
                                        <TableCell sx={{ color: 'white' }}>Charge Code</TableCell>
                                        
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredData.length > 0 ? (
                                        filteredData.map((row, index) => (
                                            <TableRow
                                                key={`${row.usr_cd}-${row.role_cd}`}
                                                sx={{
                                                    backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white',
                                                    '&:hover': {
                                                        backgroundColor: '#e0e0e0',
                                                    },
                                                }}
                                            >
                                                <TableCell>{row.usr_cd}</TableCell>
                                                <TableCell>{row.role_cd}</TableCell>
                                                
                                                <TableCell>{formatDate(row.start_dt)}</TableCell>
                                                <TableCell>{formatDate(row.end_dt)}</TableCell>
                                                <TableCell>{row.charge_cd}</TableCell>
                                                
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center">
                                                No data available
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </motion.div>
                </Box>
            </motion.div>
        </DashboardLayout>
    );
};

export default ISDRoleCreationHistory;