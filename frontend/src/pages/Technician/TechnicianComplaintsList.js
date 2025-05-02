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
} from '@mui/material';
import axios from 'axios';
import DashboardLayout from '../../components/DashboardLayout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from '../../components/chart/bg-new-vec.jpg';
import api from '../../api';

const TechnicianComplaintsList = () => {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch complaints from the API using Axios
        const fetchComplaints = async () => {
            const token = localStorage.getItem('authToken'); // Get the token from localStorage
            try {
                const response = await api.get('/complaints', {
                    headers: { Authorization: `Bearer ${token}` } // Pass token in the headers
                });
                setComplaints(response.data); // Set the complaints data
                console.log(response);

            } catch (err) {
                setError(err.message); // If there's an error, set the error state
            } finally {
                setLoading(false); // Set loading to false once the request completes
            }
        };

        fetchComplaints();
    }, []); // Empty dependency array ensures it runs once after initial render

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <DashboardLayout role="Technician">
            {/* Animated Content Wrapper */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
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
                            Complaints Status of User
                        </Typography>

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

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Asset ID</TableCell>
                                    <TableCell>Charge Name</TableCell>
                                    <TableCell>Room No</TableCell>
                                    <TableCell>Office Name</TableCell>
                                    <TableCell>Complaint Description</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Reported By</TableCell>
                                    <TableCell>Reported Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {complaints.map((complaint) => (
                                    <TableRow key={complaint.id}>
                                        <TableCell>{complaint.id}</TableCell>
                                        <TableCell>{complaint.asset_id}</TableCell>
                                        <TableCell>{complaint.charge_nm}</TableCell>
                                        <TableCell>{complaint.room_no}</TableCell>
                                        <TableCell>{complaint.office_name}</TableCell>
                                        <TableCell>{complaint.complaint_description}</TableCell>
                                        <TableCell>{complaint.complaint_status_id === 1 ? 'Open' : 'Closed'}</TableCell>
                                        <TableCell>{complaint.reported_by}</TableCell>
                                        <TableCell>{new Date(complaint.reported_date).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Container>
                    <br />
                    <Box display="flex" justifyContent="center">
                        <Button
                            variant="contained"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/technician-dashboard')}
                            sx={{
                                marginBottom: 2,
                                background: 'linear-gradient(to right, #bf0ae2, #bf0ae2)',
                                color: 'white',
                            }}
                        >
                            Back
                        </Button>
                    </Box>
                </Box>
            </motion.div>
        </DashboardLayout>
    );
};

export default TechnicianComplaintsList;
