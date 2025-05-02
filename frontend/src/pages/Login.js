import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container, Paper, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackgroundImage from '../components/chart/bg-blue.jpg';
import LogoImage from '../components/chart/logo.png';
import api from '../../src/api'


const Login = () => {
  const navigate = useNavigate();
  const [usr_cd, setUsrCd] = useState('');
  const [usr_nm, setUsrNM] = useState('');
  const [passwd, setPasswd] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaImage, setCaptchaImage] = useState('');
  const [captchaId, setCaptchaId] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const fetchCaptcha = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/captcha');
      //const response = await api.get('/captcha'); // No need to specify the full URL
      setCaptchaImage(response.data.captchaImage);
      setCaptchaId(response.data.captchaId);
    } catch (err) {
      console.error('Error fetching CAPTCHA:', err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/user-login', {
        usr_cd,
        passwd,
        captcha,
        captchaId,
        usr_nm,
        role,
      });

      // const response = await api.post('/user-login', {
      //   usr_cd,
      //   passwd,
      //   captcha,
      //   captchaId,
      //   usr_nm,
      //   role,
      // });



      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('usr_nm', response.data.user.userName); // Store user name
        localStorage.setItem('selectedRole', role); // Store selected role

        const selectedRole = response.data.selectedRole;
        if (selectedRole === 'Admin') {
          navigate('/admin-dashboard');
        } else if (selectedRole === 'ISD') {
          navigate('/isd-dashboard');
        } else if (selectedRole === 'Employee') {
          navigate('/employee-dashboard');
        }
        else if (selectedRole === 'Technician') {
          navigate('/technician-dashboard');
        }
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Login failed');
      fetchCaptcha();
    }
  };
  // Animation for cards and grid elements
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const gridVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        height: '100vh',
        position: 'relative',
      }}
    >
      {/* Animated Background Image */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
          animation: 'backgroundAnim 10s infinite alternate', // Background animation
        }}
      // animate={{ scale: 1.1 }}
      // transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
      />
      {/* Define the keyframes for background animation */}
      <style>
        {`
              @keyframes backgroundAnim {
                0% {
                  background-position: 0% 0%;
                }
                100% {
                  background-position: 100% 100%;
                }
              }
            `}
      </style>

      {/* Left Side Container with Background Image */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontSize: '24px',
          padding: 3,
        }}
      >
        {/* You can add a welcome message or logo here if needed */}
      </Box>

      {/* Right Side: Login Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 3,
          borderRadius: '1rem',
        }}
      >
        <Paper sx={{ padding: 3, width: '100%', maxWidth: 400 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* <Typography variant="h6" align="center" color='#0000FF'>
              Asset Management System
            </Typography> */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 1 }}>
              {/* Logo Image */}
              <img
                src={LogoImage} // Replace with your logo path if different
                alt="Logo"
                style={{ height: '80px', marginBottom: '8px' }} // Adjust size and spacing
              />

              {/* Application Title */}
              <Typography variant="h6" align="center" color="#0000FF">
                Asset Management System
              </Typography>
            </Box>
            <Typography variant="h5" align="center">Sign In</Typography>
            {errorMessage && (
              <Typography variant="body2" color="error" align="center">
                {errorMessage}
              </Typography>
            )}
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TextField
                    label="User ID"
                    variant="outlined"
                    value={usr_cd}
                    onChange={(e) => setUsrCd(e.target.value)}
                    fullWidth
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={passwd}
                    onChange={(e) => setPasswd(e.target.value)}
                    fullWidth
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      label="Role"
                    >
                      <MenuItem value="ISD">ISD</MenuItem>
                      <MenuItem value="Employee">Employee</MenuItem>
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Technician">Technician</MenuItem>
                    </Select>
                  </FormControl>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <img
                     src={captchaImage}  // Display Base64-encoded CAPTCHA image
                      alt="CAPTCHA"
                      style={{ height: '50px' }}
                    />
                    <TextField
                      label="Enter CAPTCHA"
                      variant="outlined"
                      value={captcha}
                      onChange={(e) => setCaptcha(e.target.value)}
                      fullWidth
                    />
                  </Box>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9 }}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    style={{
                      background: 'linear-gradient(to right,#bf0ae2,#bf0ae2)', // Gradient color
                      color: 'white', // Text color
                    }}
                  >
                    Log In
                  </Button>
                </motion.div>
              </Box>
            </form>
          </motion.div>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
