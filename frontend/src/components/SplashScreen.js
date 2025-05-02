import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import logo from '../assets/download.png';

const SplashScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show splash screen for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#EEA47F', // Light blue background
          padding: 2,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Government Logo"
          sx={{
            width: '200px',
            height: '200px',
            borderRadius: '100%', // Rounded shape
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
            backgroundColor: '#00539C', // Bright yellow background
            padding: .5, // Add padding inside the circle
          }}
        />

        <Typography
          variant="h6"
          sx={{
            marginTop: 2,
            fontWeight: 'bold',
            color: '#00539C', // Blue text color
          }}
        >
          Asset Management System Loading ....
        </Typography>
      </Box>
    );
  }

  // Render the main app after splash screen
  return <MainApp />;
};

const MainApp = () => {
  return <div>Your main application goes here!</div>;
};

export default SplashScreen;
