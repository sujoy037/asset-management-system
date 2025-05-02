import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import NICLogo from './chart/NIC.png';

const Footer = () => {
  return (
    <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, background: 'linear-gradient(to right,rgb(212, 212, 212),rgb(9, 57, 214))' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
        {/* NIC Logo */}
        <Box component="img" src={NICLogo}  sx={{ height: 30 }} />

        {/* Footer Text */}
        <Typography variant="body2">
          © National Informatics Center West Bengal || {new Date().getFullYear()} ASSET MANAGEMENT SYSTEM V-1.0 || All Rights Reserved
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
