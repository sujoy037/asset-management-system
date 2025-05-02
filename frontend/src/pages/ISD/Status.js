import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { Box, Typography, Button, useMediaQuery, Grid, Card } from '@mui/material';
import BackgroundImage from '../../components/chart/bg-blue.jpg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/material/styles';
import HistoryAssignPieChart from '../../components/chart/HistoryAssignPieChart';
import HistoryChart from '../../components/chart/HistoryChart';
import { YearlyHistoryStatus } from '../../components/chart/YearlyHistoryStatus';
import AssignmentIcon from '@mui/icons-material/Assignment';

// Animation for cards
const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
};

const gridVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
};

const Status = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // Define card data
    const cards = [
        { title: 'Asset Replacement Status', path: '/replacement-Status', color: 'rgb(46, 204, 113)', Icon: AssignmentIcon },
        { title: 'Asset Assign Status', path: '/assign-Status', color: 'rgb(52, 152, 219)', Icon: AssignmentIcon },
        { title: 'Asset Complaint Status', path: '/complaint-Status', color: 'rgb(230, 126, 34)', Icon: AssignmentIcon },
        { title: 'Admin Creation Status ', path: '/admin-creation-Status', color: 'rgb(241, 196, 15)', Icon: AssignmentIcon },
        { title: 'ISD Creation Status', path: '/isd-creation-Status', color: 'rgb(231, 76, 60)', Icon: AssignmentIcon },
        { title: 'Employee Creation Status', path: '/employee-creation-Status', color: 'rgb(142, 68, 173)', Icon: AssignmentIcon },
        { title: 'Admin Transfer Status', path: '/admin-transfer-Status', color: 'rgb(211, 84, 0)', Icon: AssignmentIcon },
        { title: 'ISD Transfer Status', path: '/isd-transfer-Status', color: 'rgb(41, 128, 185)', Icon: AssignmentIcon },
        { title: 'Employee Transfer Status', path: '/employee-transfer-Status', color: 'rgb(243, 156, 18)', Icon: AssignmentIcon },
        { title: 'Asset Repair Status', path: '/asset-repair-Status', color: 'rgb(155, 89, 182)', Icon: AssignmentIcon },
    ];
    

    const leftCircleCards = cards.slice(0, 5);  // First 5 cards for the left circle
    const rightCircleCards = cards.slice(5);    // Last 5 cards for the right circle

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
                >
                    {/* Flex container for two circles */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: isSmallScreen ? 'column' : 'row',
                            gap: 4,
                            marginTop: 4,
                        }}
                    >
                        {/* Left Circle */}
                        <Box
                            sx={{
                                position: 'relative',
                                width: isSmallScreen ? 250 : 400,
                                height: isSmallScreen ? 250 : 400,
                                margin: '0 auto',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, #ffffff, #e3e3e3)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#000',
                                    fontWeight: 'bold',
                                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                                }}
                            >
                                Status
                            </Typography>

                            {/* Circular Segments for Left Circle */}
                            {leftCircleCards.map((card, index) => {
                                const angle = (index / leftCircleCards.length) * 360;
                                const radians = (angle * Math.PI) / 180;
                                const x = Math.cos(radians) * 150;
                                const y = Math.sin(radians) * 150;

                                return (
                                    <motion.div
                                        key={index}
                                        initial="hidden"
                                        animate="visible"
                                        variants={cardVariants}
                                        transition={{ duration: 0.5 }}
                                        style={{
                                            position: 'absolute',
                                            top: `calc(35% + ${y}px)`,
                                            left: `calc(35% + ${x}px)`,
                                            transform: 'translate(-50%, -50%)',
                                            width: 100,
                                            height: 100,
                                            backgroundColor: card.color,
                                            borderRadius: '10%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                        }}
                                        onClick={() => navigate(card.path)}
                                    >
                                        <card.Icon fontSize={isSmallScreen ? 'small' : 'large'} sx={{ color: '#fff' }} />
                                        {!isSmallScreen && (
                                            <Typography variant="caption" sx={{ color: '#fff', textAlign: 'center' }}>
                                                {card.title}
                                            </Typography>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </Box>

                        {/* Right Circle */}
                        <Box
                            sx={{
                                position: 'relative',
                                width: isSmallScreen ? 250 : 400,
                                height: isSmallScreen ? 250 : 400,
                                margin: '0 auto',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, #ffffff, #e3e3e3)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#000',
                                    fontWeight: 'bold',
                                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                                }}
                            >
                                Status
                            </Typography>

                            {/* Circular Segments for Right Circle */}
                            {rightCircleCards.map((card, index) => {
                                const angle = (index / rightCircleCards.length) * 360;
                                const radians = (angle * Math.PI) / 180;
                                const x = Math.cos(radians) * 150;
                                const y = Math.sin(radians) * 150;

                                return (
                                    <motion.div
                                        key={index}
                                        initial="hidden"
                                        animate="visible"
                                        variants={cardVariants}
                                        transition={{ duration: 0.5 }}
                                        style={{
                                            position: 'absolute',
                                            top: `calc(35% + ${y}px)`,
                                            left: `calc(35% + ${x}px)`,
                                            transform: 'translate(-50%, -50%)',
                                            width: 100,
                                            height: 100,
                                            backgroundColor: card.color,
                                            borderRadius: '10%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                        }}
                                        onClick={() => navigate(card.path)}
                                    >
                                        <card.Icon fontSize={isSmallScreen ? 'small' : 'large'} sx={{ color: '#fff' }} />
                                        {!isSmallScreen && (
                                            <Typography variant="caption" sx={{ color: '#fff', textAlign: 'center' }}>
                                                {card.title}
                                            </Typography>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </Box>
                    </Box>

                    {/* Other Content */}
                    <motion.div variants={gridVariants}>
                        <Grid container spacing={2} sx={{ marginTop: 4 }}>
                            {[HistoryAssignPieChart, HistoryChart, YearlyHistoryStatus].map((ChartComponent, index) => (
                                <Grid item xs={12} sm={4} key={index}>
                                    <motion.div variants={cardVariants}>
                                        <Card sx={{ borderRadius: '16px', padding: 2, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                                            <ChartComponent />
                                        </Card>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </motion.div>

                    {/* Back Button */}
                    <Button
                        onClick={() => navigate('/isd-dashboard')}
                        variant="contained"
                        color="secondary"
                        sx={{ marginTop: 4, textTransform: 'none' }}
                        startIcon={<ArrowBackIcon />}
                    >
                        Back
                    </Button>
                </Box>
            </motion.div>
        </DashboardLayout>
    );
};

export default Status;
