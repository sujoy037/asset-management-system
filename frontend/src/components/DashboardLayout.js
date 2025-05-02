import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Toolbar, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from './Navbar';


//import BackgroundImage from '../components/chart/logo.png';

const DashboardLayout = ({ role, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Retrieve `usr_nm` from localStorage
    const storedName = localStorage.getItem('usr_nm');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <Sidebar
        role={role}
        uer_nm={userName} // Pass user name to Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: '4px', // Ensures content starts below the Navbar
          //height: '100vh', // Ensure the Box takes full viewport height


        }}
      >
        <Toolbar /> {/* Adds spacing for AppBar */}
        {/* Adds spacing for AppBar
        <Typography variant="h6" gutterBottom>
          Welcome, {userName || 'User'}!
        </Typography> */}
        <Typography variant="h6" gutterBottom>
          Welcome, {userName || 'User'}!
        </Typography>

        {children}

      </Box>
    
    </Box>
  );
};

export default DashboardLayout;
