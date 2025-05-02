import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios';
import DashboardLayout from '../../components/DashboardLayout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from '../../components/chart/bg-blue.jpg';

const AssetsAllocationStatus = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usrCd, setUsrCd] = useState('');

  // Fetch the logged-in user code from localStorage (or session)
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Assuming JWT is stored in localStorage
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decoding the JWT to extract user data
      console.log('Decoded Token:', decodedToken); // Debugging
      setUsrCd(decodedToken.userId); // Use the correct field, `userId` from the decoded token
    }
  }, []);

  // Fetch assets for the logged-in user
  useEffect(() => {
    if (!usrCd) {
      console.log('No usrCd available, skipping fetch');
      return; // Ensure usrCd is defined before making the request
    }

    const fetchAssets = async () => {
      const token = localStorage.getItem('authToken'); // Assuming JWT is stored in localStorage
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`http://localhost:5001/api/assets?usr_cd=${usrCd}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('API Response:', response); // Debugging response
        setAssets(response.data.data);
      } catch (err) {
        console.error('API Error:', err); // Debugging error
        setError('No assets found or there was an error with the request');
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [usrCd]); // Make sure usrCd is set before this runs

  return (
    <DashboardLayout role="ISD">
      {/* Animated Content Wrapper */}
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <Box
          sx={{
            minHeight: '100vh',
            padding: 4,
            background: `url(${BackgroundImage}) no-repeat center center fixed`,
            backgroundSize: 'cover',
          }}
        >
          <Container maxWidth="md">


            <Typography
              variant="h5"
              gutterBottom
              align="center"
              sx={{ color: 'white', textTransform: 'uppercase', marginBottom: 3 }}
            >
              Assets Allocation Status of User
            </Typography>

            {loading && (
              <Box display="flex" justifyContent="center">
                <CircularProgress size={24} />
              </Box>
            )}

            {error && (
              <Typography color="error" variant="body2" align="center" sx={{ marginTop: 2 }}>
                {error}
              </Typography>
            )}

            {assets.length > 0 && (
              <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'blue' }}>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>ID</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>Charge Code</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>User Code</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>Room Number</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>CPU Number</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>Printer Serial</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>Assignment Date</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>Allocation Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {assets.map((asset) => (
                      <TableRow key={asset.id}>
                        <TableCell>{asset.id}</TableCell>
                        <TableCell>{asset.charge_cd}</TableCell>
                        <TableCell>{asset.usr_cd}</TableCell>
                        <TableCell>{asset.room_no}</TableCell>
                        <TableCell>{asset.cpu_number}</TableCell>
                        <TableCell>{asset.printer_serial_no}</TableCell>
                        <TableCell>{new Date(asset.assignment_date).toLocaleString()}</TableCell>
                        <TableCell>{asset.working_status_id === 1 ? 'Assign' : asset.working_status_id === 2 ? 'Not Assign' : 'Unknown'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

          </Container>
          <br/>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/assets')}
              sx={{
                marginBottom: 2,
                background: 'linear-gradient(to right, #bf0ae2, #bf0ae2)',
                color: 'white',
              }}
            >
              Back
            </Button>
          </Box>
        </Box>
      </motion.div>
    </DashboardLayout>
  );
};

export default AssetsAllocationStatus;
