import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { Box, Typography, Button, useMediaQuery, Grid, Card } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BackgroundImage from '../../components/chart/bg-blue.jpg';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/material/styles';
import RoleAssignPieChart from '../../components/chart/RoleAssignPieChart';
import RoleChart from '../../components/chart/RoleChart';
import { ComboChart } from '../../components/chart/ComboChart';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';

// Animation for cards
const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
};

const gridVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
};
const Roles = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // Define card data
    const cards = [
        { title: 'User Role Create', path: '/assign-roles', color: 'rgb(34, 153, 84)', Icon: PersonAddIcon },
        { title: 'User Role List', path: '/user-roles', color: 'rgb(52, 152, 219)', Icon: ListIcon },
        { title: 'Transfer Role', path: '/manage-roles/add-role', color: 'rgb(8, 99, 236)', Icon: TransferWithinAStationIcon },
        { title: 'Edit Role', path: '/manage-roles/edit-role', color: 'rgb(241, 196, 15)', Icon: EditIcon },
        { title: 'Delete Role', path: '/manage-roles/delete-role', color: 'rgb(155, 89, 182)', Icon: DeleteIcon },
    ];

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
                    {/* Circular Layout Container */}
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
                        {/* Centered Text */}
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#000',
                                fontWeight: 'bold',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                                bottom: '55%',
                                right: '50%',
                                transform: 'translateX(10%)',
                            }}
                        >
                            Roles
                        </Typography>

                        {/* Circular Segments */}
                        {cards.map((card, index) => {
                            const angle = (index / cards.length) * 360;
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
                                        top: `calc(30% + ${y}px)`,
                                        left: `calc(35% + ${x}px)`,
                                        transform: 'translate(-50%, -50%)',
                                        width: 100,
                                        height: 100,
                                        backgroundColor: card.color,
                                        borderRadius: '30%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                    }}
                                    onClick={() => navigate(card.path)}
                                >
                                    {/* Corrected Icon Usage */}
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
                    <motion.div variants={gridVariants}>
                        <Grid container spacing={2} sx={{ marginTop: 4 }}>

                            {[RoleAssignPieChart, RoleChart, ComboChart].map((ChartComponent, index) => (
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
                    <br />
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
                </Box>

            </motion.div>

        </DashboardLayout>
    );
};



export default Roles;
