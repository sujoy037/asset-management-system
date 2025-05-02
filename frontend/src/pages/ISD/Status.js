import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { Box, Typography, Button, useMediaQuery, Grid, Card } from '@mui/material';
import BackgroundImage from '../../components/chart/bg-new-vec.jpg';
import StatusImage from '../../components/chart/status.jpg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/material/styles';
import AssignmentIcon from '@mui/icons-material/Assignment';

const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
};

const Status = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const cards = [
        { title: 'Asset Replacement Status', path: '/replacement-Status', color: 'rgb(46, 204, 113)', Icon: AssignmentIcon },
        { title: 'Asset Assign Status', path: '/assign-Status', color: 'rgb(52, 152, 219)', Icon: AssignmentIcon },
        { title: 'Asset Complaint Status', path: '/complaint-Status', color: 'rgb(230, 126, 34)', Icon: AssignmentIcon },
        { title: 'Admin Creation Status', path: '/admin-creation-Status', color: 'rgb(241, 196, 15)', Icon: AssignmentIcon },
        { title: 'ISD Creation Status', path: '/isd-creation-Status', color: 'rgb(231, 76, 60)', Icon: AssignmentIcon },
        { title: 'Employee Creation Status', path: '/employee-creation-Status', color: 'rgb(142, 68, 173)', Icon: AssignmentIcon },
    ];

    return (
        <DashboardLayout role="ISD">
            <motion.div initial="hidden" animate="visible" transition={{ duration: 0.8, staggerChildren: 0.2 }}>
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/isd-dashboard')}
                    sx={{
                        marginBottom: 2,
                        background: 'linear-gradient(to right,#bf0ae2,#bf0ae2)',
                        color: 'white',
                    }}
                >
                    Back
                </Button>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isSmallScreen ? 'column' : 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: isSmallScreen ? 3 : 10,
                        borderRadius: '10px',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage: `url(${BackgroundImage})`,
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    {/* Left Side - Status Image */}
                    <Box
                        sx={{
                            width: isSmallScreen ? '100%' : '40%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <img src={StatusImage} alt="Status" style={{ width: '60%', borderRadius: '10px' }} />
                    </Box>

                    {/* Right Side - Status List */}
                    <Box
                        sx={{
                            width: isSmallScreen ? '100%' : '50%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            marginTop: isSmallScreen ? 4 : 0,
                        }}
                    >
                        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'light',textAlign:'center' ,color:'blueviolet',textAnchor:'initial'}}>Manage Status</Typography>
                        {cards.map((card, index) => (
                            <motion.div key={index} variants={cardVariants}>
                                <Card
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: 2,
                                        backgroundColor: card.color,
                                        color: 'white',
                                        cursor: 'pointer',
                                        '&:hover': { opacity: 0.8 }
                                    }}
                                    onClick={() => navigate(card.path)}
                                >
                                    <card.Icon sx={{ marginRight: 2 }} />
                                    <Typography>{card.title}</Typography>
                                </Card>
                            </motion.div>
                        ))}
                    </Box>
                </Box>
            </motion.div>
        </DashboardLayout>
    );
};

export default Status;
