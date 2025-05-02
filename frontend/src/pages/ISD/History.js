import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/material/styles';
import HistoryIcon from '@mui/icons-material/History';
import BackgroundImage from '../../components/chart/bg-new-vec.jpg';
import HistoryImage from '../../components/chart/history.jpg';

const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
};

const colors = [
    'linear-gradient(135deg, #ff9a9e, #fad0c4)',
    'linear-gradient(135deg, #a18cd1, #fbc2eb)',
    'linear-gradient(135deg, #fad0c4, #ffd1ff)',
    'linear-gradient(135deg, #ffecd2, #fcb69f)',
    'linear-gradient(135deg, #a1c4fd, #c2e9fb)',
    'linear-gradient(135deg, #ff9a9e, #fecfef)',
    'linear-gradient(135deg, #fbc2eb, #a6c1ee)',
    'linear-gradient(135deg,rgb(141, 121, 252), #96e6a1)',
    'linear-gradient(135deg, #84fab0,rgb(29, 85, 112))',
    'linear-gradient(135deg, #fccb90, #ffafbd)',
];

const History = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const historyItems = [
        'Asset Replacement History',
        'Asset Assign History',
        'Asset Complaint History',
        'Admin Creation History',
        'ISD Creation History',
        'Employee Creation History',
        'Admin Transfer History',
        'ISD Transfer History',
        'Employee Transfer History',
        'Asset Repair History'
    ];

    return (
        <DashboardLayout role="ISD">
            <motion.div initial="hidden" animate="visible" transition={{ duration: 0.8, staggerChildren: 0.2 }}>
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/isd-dashboard')}
                    sx={{ marginBottom: 2, background: 'linear-gradient(to right,#bf0ae2,#bf0ae2)', color: 'white' }}
                >
                    Back
                </Button>
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
                        display: 'flex',
                        flexDirection: isSmallScreen ? 'column' : 'row',
                        gap: 4,
                        alignItems: 'center',
                    }}
                >
                    {/* Left Side - History Image */}
                    <Box
                        sx={{
                            width: isSmallScreen ? '100%' : '50%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <img src={HistoryImage} alt="History" style={{ width: '60%', borderRadius: '10px' }} />
                    </Box>
                    
                    {/* Right Side - History List */}
                    <Box
                        sx={{
                            width: isSmallScreen ? '100%' : '50%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: 'light', marginBottom: 2, textAlign: 'center', color: 'blue' }}>History</Typography>
                        {historyItems.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => navigate(`/${item.toLowerCase().replace(/ /g, '-')}`)}
                                style={{
                                    width: '80%',
                                    padding: '12px',
                                    marginBottom: '10px',
                                    background: colors[index % colors.length],
                                    borderRadius: '10px',
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                }}
                            >
                                <HistoryIcon sx={{ marginRight: 2, color: '#fff' }} />
                                <Typography variant="body1">{item}</Typography>
                            </motion.div>
                        ))}
                    </Box>
                </Box>
            </motion.div>
        </DashboardLayout>
    );
};

export default History;
