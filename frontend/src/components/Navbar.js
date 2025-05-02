import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Menu, MenuItem, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove JWT token
    navigate('/'); // Redirect to login page
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: 1201 ,background: 'linear-gradient(to right,rgb(212, 212, 212),rgb(9, 57, 214))' }}>
      <Toolbar>
        {/* Menu Button to Toggle Sidebar */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ASSET MANAGEMENT SYSTEM V-1.0
        </Typography>

        {/* Notification Icon */}
        <Tooltip title="Notifications">
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
        </Tooltip>

        {/* Message Icon */}
        <Tooltip title="Messages">
          <IconButton color="inherit">
            <MessageIcon />
          </IconButton>
        </Tooltip>

        {/* Logout Icon */}
        <Tooltip title="Logout">
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
