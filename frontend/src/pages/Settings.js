import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { Box, Typography, Button, useMediaQuery, TextField } from '@mui/material';
import BackgroundImage from '../components/chart/bg-blue.jpg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/material/styles';

const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const Settings = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form Data Submitted:', formData);
    };

    return (
        <DashboardLayout role="ISD">
            <motion.div initial="hidden" animate="visible" transition={{ duration: 0.8, staggerChildren: 0.2 }}>
                <Box
                    sx={{
                        marginTop: 2,
                        padding: isSmallScreen ? 2 : isMediumScreen ? 4 : 6,
                        borderRadius: '10px',
                        boxShadow: '0px 4px 10px rgba(34, 2, 2, 0.1)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage: `url(${BackgroundImage})`,
                        textAlign: 'center',
                    }}
                >


                    <Box
                        sx={{
                            backgroundColor: 'white',
                            padding: isSmallScreen ? 2 : 3,
                            borderRadius: '10px',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            width: isSmallScreen ? '90%' : '80%',
                            maxWidth: 400,
                            margin: '0 auto', // Centering the form
                        }}
                    >
                        <Typography
                            variant={isSmallScreen ? 'h6' : 'h5'}
                            sx={{
                                textAlign: 'center',
                                marginBottom: 2,
                                fontWeight: 'bold',
                                color: '#333',
                            }}
                        >
                            Edit Profile
                        </Typography>
                        <motion.form onSubmit={handleSubmit} variants={formVariants}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                                sx={{ marginBottom: 1 }}
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                                sx={{ marginBottom: 1 }}
                            />
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                                sx={{ marginBottom: 1 }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    marginTop: 2,
                                    width: '100%',
                                    padding: '10px',
                                    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
                                    color: 'white',
                                    borderRadius: '8px',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                }}
                            >
                                Save Changes
                            </Button>
                        </motion.form>
                    </Box>

                    <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/isd-dashboard')}
                            sx={{
                                color: '#2575fc',
                                borderColor: '#2575fc',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                padding: '8px 16px',
                            }}
                        >
                            Back to Dashboard
                        </Button>
                    </Box>
                </Box>
            </motion.div>
        </DashboardLayout>
    );
};

export default Settings;
