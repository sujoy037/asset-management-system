import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { Box, Typography, Button, useMediaQuery, Grid, Card } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BackgroundImage from '../../components/chart/bg-new-vec.jpg';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/material/styles';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import RoleImage from '../../components/chart/role.jpg';

const Roles = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
                        marginTop: 1,
                        padding: isSmallScreen ? 3 : 5,
                        borderRadius: '10px',
                        boxShadow: '0px 4px 10px rgba(34, 2, 2, 0.1)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage: `url(${BackgroundImage})`,
                    }}
                >
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={10} sm={5} display="flex" justifyContent="center">
                            <img src={RoleImage} alt="Role" style={{ width: '100%', maxWidth: '400px', borderRadius: '10px' }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h5" sx={{ fontWeight: 'light', color: 'blue', marginBottom: 1,textAlign:'center' }}>
                                Manage Roles
                            </Typography>
                            <Grid container spacing={2}>
                                {cards.map((card, index) => (
                                    <Grid item xs={12} key={index}>
                                        <motion.div
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                        >
                                            <Card
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    padding: 2,
                                                    backgroundColor: card.color,
                                                    color: 'white',
                                                    borderRadius: '10px',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => navigate(card.path)}
                                            >
                                                <card.Icon fontSize="large" sx={{ marginRight: 2 }} />
                                                <Typography variant="body1">{card.title}</Typography>
                                            </Card>
                                        </motion.div>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </motion.div>
        </DashboardLayout>
    );
};

export default Roles;
