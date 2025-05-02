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
  TextField,
  Grid,
} from '@mui/material';
import axios from 'axios';
import DashboardLayout from '../../components/DashboardLayout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from '../../components/chart/bg-new-vec.jpg';
import AssetAssignImage from '../../components/chart/assign-asset.jpg';
import api from '../../api';

const AssetsAssignListbyUser = () => {
  const navigate = useNavigate();
  const [officeName, setOfficeName] = useState('');
  const [accessoryId, setAccessoryId] = useState('');
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accessories, setAccessories] = useState([]);
  const [offices, setOffices] = useState([]);

  // Fetch office and accessory data (once)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const officeResponse = await axios.get('http://localhost:5001/api/office-cd', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOffices(officeResponse.data);

        const accessoryResponse = await axios.get('http://localhost:5001/api/accessory', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAccessories(accessoryResponse.data);
      } catch (error) {
        setError('Error fetching office or accessory data.');
      }
    };

    fetchData();
  }, []);

  // Handle form submission to fetch data
  const handleSearch = async () => {
    const token = localStorage.getItem('authToken');
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5001/api/asset-assignments', {
        params: {
          office_nm: officeName,
          accessory_id: accessoryId,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssignments(response.data.data);
    } catch (err) {
      setError('Error fetching asset assignments');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="ISD">
      {/* Animated Content Wrapper */}
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/assets')}
          sx={{
            marginBottom: 2,
            background: 'linear-gradient(to right, #bf0ae2, #bf0ae2)',
            color: 'white',
          }}
        />

        <Box
          sx={{
            minHeight: '100vh',
            padding: 4,
            background: `url(${BackgroundImage}) no-repeat center center fixed`,
            backgroundSize: 'cover',
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              sx={{ color: 'blue', textTransform: 'uppercase', marginBottom: 3 }}
            >
              Assets Assigned List by User
            </Typography>

            {/* Main Layout with Image on Left and Form on Right */}
            <Grid container spacing={3}>
              {/* Left Side - Image */}
              <Grid item xs={12} sm={4} display="flex" alignItems="center" justifyContent="center">
                <img
                  src={AssetAssignImage}
                  alt="Asset Assignment"
                  style={{
                    width: '100%',
                    maxWidth: '350px',
                    borderRadius: '22px',
                    boxShadow: '4px 4px 20px rgba(0,0,0,0.2)',
                  }}
                />
              </Grid>

              {/* Right Side - Form and Table */}
              <Grid item xs={12} sm={8}>
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

                {/* Filter Form */}
                <Grid container spacing={2} style={{ marginBottom: '20px' }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={officeName}
                      onChange={(e) => setOfficeName(e.target.value)}
                      select
                      SelectProps={{ native: true }}
                    >
                      <option value="">Select Office</option>
                      {offices.map((office) => (
                        <option key={office.office_cd} value={office.office_nm}>
                          {office.office_nm}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      type="number"
                      value={accessoryId}
                      onChange={(e) => setAccessoryId(e.target.value)}
                      select
                      SelectProps={{ native: true }}
                    >
                      <option value="">Select Accessory</option>
                      {accessories.map((accessory) => (
                        <option key={accessory.id} value={accessory.id}>
                          {accessory.name}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading}>
                      {loading ? 'Searching...' : 'Search'}
                    </Button>
                  </Grid>
                </Grid>

                {/* Asset Assignment Table */}
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead sx={{ backgroundColor: 'blue' }}>
                      <TableRow>
                        <TableCell sx={{ color: 'white' }}>Asset ID</TableCell>
                        <TableCell sx={{ color: 'white' }}>Office Name</TableCell>
                        <TableCell sx={{ color: 'white' }}>Name of User</TableCell>
                        <TableCell sx={{ color: 'white' }}>Building</TableCell>
                        <TableCell sx={{ color: 'white' }}>Floor</TableCell>
                        <TableCell sx={{ color: 'white' }}>Room No</TableCell>
                        <TableCell sx={{ color: 'white' }}>Working Status</TableCell>
                        <TableCell sx={{ color: 'white' }}>Assignment Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {assignments.map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell>{assignment.id}</TableCell>
                          <TableCell>{assignment.office_nm}</TableCell>
                          <TableCell>{assignment.name_of_user}</TableCell>
                          <TableCell>{assignment.building}</TableCell>
                          <TableCell>{assignment.floor}</TableCell>
                          <TableCell>{assignment.room_no}</TableCell>
                          <TableCell>{assignment.working_status_id}</TableCell>
                          <TableCell>{assignment.assignment_date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </motion.div>
    </DashboardLayout>
  );
};

export default AssetsAssignListbyUser;
