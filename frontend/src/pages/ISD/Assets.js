import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { Box, Typography, Button, useMediaQuery, Grid, Card } from '@mui/material';
import BackgroundImage from '../../components/chart/bg-new-vec.jpg';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/material/styles';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import BuildIcon from '@mui/icons-material/Build';
import MovingIcon from '@mui/icons-material/Moving';
import AssetImage from '../../components/chart/assetillustr.jpg';

const Assets = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const cards = [
        { title: 'Assets File Upload', path: '/upload', color: '#2ecc71', Icon: UploadFileIcon },
        { title: 'Assets Assigned List by User', path: '/assets-assign-list-by-user', color: '#3498db', Icon: HowToRegIcon },
        { title: 'Transfer Assets', path: '/transfer-assigned-asset', color: '#e67e22', Icon: MoveUpIcon },
        { title: 'Assets Available List', path: '/total-assets', color: '#f1c40f', Icon: SpellcheckIcon },
        { title: 'Assets Under Repair List', path: '/manage-roles/delete-role', color: '#e74c3c', Icon: BuildIcon },
        { title: 'Assign Assets', path: '/create-assigned-asset', color: '#8e44ad', Icon: EditIcon },
        { title: 'Total Asset Allocation Status', path: '/status-assets-allocation', color: '#1abc9c', Icon: MovingIcon },
    ];

    return (
        <DashboardLayout role="ISD">
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
                    display: 'flex',
                    flexDirection: isSmallScreen ? 'column' : 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: isSmallScreen ? 2 : 5,
                    borderRadius: '10px',
                    boxShadow: '0px 4px 10px rgba(34, 2, 2, 0.1)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `url(${BackgroundImage})`,
                }}
            >
                {/* Left Side - Image */}
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                    <img src={AssetImage} alt="Assets" style={{ maxWidth: '60%', borderRadius: '10px' }} />
                </Box>

                {/* Right Side - List */}
                <Box sx={{ flex: 1, padding: 3 }}>
                    <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'light',textAlign:'center' ,color:'blueviolet',textAnchor:'initial'}}>Manage Assets</Typography>
                    <Grid container spacing={2}>
                        {cards.map((card, index) => (
                            <Grid item xs={12} key={index}>
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <Card
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: 2,
                                            backgroundColor: card.color,
                                            color: 'white',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => navigate(card.path)}
                                    >
                                        <card.Icon sx={{ marginRight: 2 }} />
                                        <Typography>{card.title}</Typography>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </DashboardLayout>
    );
};

export default Assets;
