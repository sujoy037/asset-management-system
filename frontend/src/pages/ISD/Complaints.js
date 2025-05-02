import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { Box, Typography, Button, useMediaQuery, Grid, Card } from '@mui/material';
import BackgroundImage from '../../components/chart/bg-new-vec.jpg';
import ComplaintImage from '../../components/chart/complaint.jpg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/material/styles';
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
};

const Complaints = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const cards = [
        { title: 'Raise Complaint', path: '/raise-complaints', color: 'rgb(46, 204, 113)', Icon: ReportProblemIcon },
        { title: 'Track Complaint', path: '/track-complaint', color: 'rgb(52, 152, 219)', Icon: ContentPasteSearchIcon },
        { title: 'Replace', path: '/replace-asset-against-complaint', color: 'rgb(230, 126, 34)', Icon: PublishedWithChangesIcon }
    ];

    return (
        <DashboardLayout role="ISD">
            <motion.div initial="hidden" animate="visible" transition={{ duration: 0.8, staggerChildren: 0.2 }}>
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/isd-dashboard')}
                    sx={{ marginBottom: 2, background: 'linear-gradient(to right,#bf0ae2,#bf0ae2)', color: 'white' }}
                ></Button>

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
                        <img src={ComplaintImage} alt="Complaints" style={{ maxWidth: isSmallScreen ? '80%' : '50%', height: 'auto', borderRadius: '10px' }} />
                    </Box>

                    {/* Cards Section */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'light', color: 'blue', marginBottom: 1, textAlign: 'center' }}>
                            Manage Complaints
                        </Typography>
                        {cards.map((card, index) => (
                            <motion.div
                                key={index}
                                initial="hidden"
                                animate="visible"
                                variants={cardVariants}
                                transition={{ duration: 0.5 }}
                                style={{
                                    width: '90%',
                                    maxWidth: 400,
                                    backgroundColor: card.color,
                                    borderRadius: '10px',
                                    padding: '5px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                }}
                                onClick={() => navigate(card.path)}
                            >
                                <card.Icon fontSize={isSmallScreen ? 'small' : 'large'} sx={{ color: '#fff', marginRight: 1 }} />
                                <Typography variant={isSmallScreen ? "body2" : "h6"} sx={{ color: '#fff' }}>{card.title}</Typography>
                            </motion.div>
                        ))}
                    </Box>
                </Box>
            </motion.div>
        </DashboardLayout>
    );
};

export default Complaints;
