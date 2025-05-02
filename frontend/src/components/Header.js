import React from 'react';
import { AppBar, Toolbar, Typography, Box,  Avatar  } from '@mui/material';
import logo from './chart/Emblem_of_West_Bengal.svg'; // Import your logo

const Header = () => {
    return (
        <AppBar position="fixed" sx={{ zIndex: 1201 }}>
            
            {/* Top White Bar with Logo (Increased Size) */}
            <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
                <Toolbar sx={{ justifyContent: 'center', paddingTop: '15px' }}>
                    <Avatar src={logo} alt="Logo" sx={{ width: 100, height: 120 }} /> {/* Increased size to 100x100 */}
                </Toolbar>
            </AppBar>

            {/* Main Header Bar */}
            <AppBar 
                position="static" 
                sx={{ background: 'linear-gradient(to right,rgb(212, 212, 212),rgb(9, 57, 214))', boxShadow: 'none' }}
            >
                <Toolbar>
                    <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                        <Box>
                            <Box>
                                <Typography variant="h6">
                                    Directorate of Commercial Taxes
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontSize: '0.9rem' }}>
                                    Government of West Bengal
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </AppBar>
    );
};
export default Header;