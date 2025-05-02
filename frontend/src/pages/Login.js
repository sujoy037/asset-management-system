import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container, Paper, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackgroundImage from '../components/chart/bg-new-vec.jpg';
import LogoImage from '../components/chart/login.png';
import api from '../../src/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
  const navigate = useNavigate();
  const [usr_cd, setUsrCd] = useState('');
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
      const response = await api.get('/captcha');
      setCaptchaImage(response.data.captchaImage);
      setCaptchaId(response.data.captchaId);
    } catch (err) {
      console.error('Error fetching CAPTCHA:', err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/user-login', {
        usr_cd,
        passwd,
        captcha,
        captchaId,
        role,
      });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('selectedRole', role);

        if (role === 'Admin') {
          navigate('/admin-dashboard');
        } else if (role === 'ISD') {
          navigate('/isd-dashboard');
        } else if (role === 'Employee') {
          navigate('/employee-dashboard');
        } else if (role === 'Technician') {
          navigate('/technician-dashboard');
        }
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Login failed');
      fetchCaptcha();
    }
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1,
        }}
      />

      <Container
        component="main"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',  // Reduced height
          overflow: 'hidden', // Prevent scrolling
          paddingTop: '100px', // Adds space before the login card
        }}
      >
        <Paper
          sx={{
            padding: 3, // Reduce padding
            maxWidth: 350, // Decrease max width
            width: '100%',
            borderRadius: '12px',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.15)', // Slightly reduced shadow
            background: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box textAlign="center" mb={2}>
              <img src={LogoImage} alt="Logo" style={{ height: '60px' }} /> {/* Reduce logo size */}
              <Typography variant="h6" color="#1976D2" fontWeight="bold">
                Asset Management System
              </Typography>
            </Box>
            {/* <Typography variant="h5" align="center" gutterBottom>
              Sign In
            </Typography> */}
            {errorMessage && (
              <Typography variant="body2" color="error" align="center">
                {errorMessage}
              </Typography>
            )}
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}> {/* Reduce gaps */}
                <TextField
                  label="User ID"
                  variant="outlined"
                  value={usr_cd}
                  onChange={(e) => setUsrCd(e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={passwd}
                  onChange={(e) => setPasswd(e.target.value)}
                  fullWidth
                  size="small"
                />
                <FormControl fullWidth size="small">
                  <InputLabel>Role</InputLabel>
                  <Select value={role} onChange={(e) => setRole(e.target.value)} label="Role">
                    <MenuItem value="ISD">ISD</MenuItem>
                    <MenuItem value="Employee">Employee</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Technician">Technician</MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <img src={captchaImage} alt="CAPTCHA" style={{ height: '40px' }} /> {/* Reduce CAPTCHA size */}
                  <TextField
                    label="Enter CAPTCHA"
                    variant="outlined"
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                    fullWidth
                    size="small"
                  />
                </Box>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    background: 'linear-gradient(to right, #1976D2, #0D47A1)',
                    color: 'white',
                    padding: '8px', // Reduce button padding
                    fontSize: '14px', // Reduce font size
                    borderRadius: '8px',
                    '&:hover': { background: 'linear-gradient(to right, #1565C0, #0D47A1)' },
                  }}
                >
                  Log In
                </Button>
              </Box>
            </form>
          </motion.div>
        </Paper>
      </Container>

      <Footer />
    </>
  );
};

export default Login;
