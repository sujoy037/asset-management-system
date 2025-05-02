import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button, Grid, Box, Typography, CircularProgress, Paper } from '@mui/material';
import axios from 'axios';
import DashboardLayout from '../../components/DashboardLayout';
import AddIcon from '@mui/icons-material/Add';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';  // Import motion for animations
import BackgroundImage from '../../components/chart/bg-blue.jpg';
// Animation variants for form items
const gridVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const AssignRoleAndStatus = () => {
  const navigate = useNavigate();
  const [chargeCd, setChargeCd] = useState('');
  const [usrCd, setUsrCd] = useState('');
  const [roleCd, setRoleCd] = useState('');
  const [statusCd, setStatusCd] = useState('');
  const [startDt, setStartDt] = useState('');
  const [endDt, setEndDt] = useState('');
  const [roles, setRoles] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [users, setUsers] = useState([]);
  const [charges, setCharges] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('No token found, please log in again');
        return;
      }

      try {
        const [rolesResponse, statusesResponse, chargesResponse] = await Promise.all([
          axios.get('http://localhost:5001/api/roles', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:5001/api/statuses', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:5001/api/charge-cd-list', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setRoles(rolesResponse.data);
        setStatuses(statusesResponse.data);
        setCharges(chargesResponse.data);
      } catch (error) {
        setError('Error fetching initial data');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      if (chargeCd) {
        try {
          const response = await axios.get(
            `http://localhost:5001/api/users?charge_cd=${chargeCd}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          setUsers(response.data && Array.isArray(response.data) ? response.data : []);
        } catch (error) {
          console.error('Error fetching users:', error);
          setError('Error fetching user data');
        }
      } else {
        setUsers([]);
      }
    };

    fetchUserData();
  }, [chargeCd]);

  const handleAssignRole = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      charge_cd: chargeCd,
      usr_cd: usrCd,
      role_cd: roleCd,
      status_cd: statusCd,
      start_dt: startDt,
      end_dt: endDt,
    };

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('http://localhost:5001/api/assign-role-status', data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(`${response.data.message}. User assigned: ${response.data.assignedUser}`);
      setUsrCd('');
      setRoleCd('');
      setStatusCd('');
      setStartDt('');
      setEndDt('');
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to assign role and status');
    } finally {
      setLoading(false);
    }
  };
// Animation for cards and grid elements
// const cardVariants = {
//   hidden: { opacity: 0, scale: 0.8 },
//   visible: { opacity: 1, scale: 1 },
// };

// const gridVariants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: { opacity: 1, y: 0 },
// };
  return (
    <DashboardLayout role="ISD">
      {/* Animated Container with Background Image */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, staggerChildren: 0.2 }}
      >
        <Box
          sx={{
            height: '100vh', // Full height
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(34, 2, 2, 0.1)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${BackgroundImage})`, // Use the imported background image
            animation: 'backgroundAnim 10s infinite alternate', // Background animation
          }}
        >
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
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <motion.div variants={gridVariants}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 4,
                    borderRadius: '16px',
                    background: 'linear-gradient(to right, #f8f9fa, #e9ecef)',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                    <Button
                      startIcon={<ArrowBack />}
                      onClick={() => navigate('/assign-roles-card')}
                      sx={{ textTransform: 'none', color: 'primary.main' }}
                    >
                      Back
                    </Button>
                    <Typography variant="h4" gutterBottom align="center" color="primary">
                      Assign Role and Status
                    </Typography>
                  </Box>

                  {error && <Typography color="error" gutterBottom>{error}</Typography>}

                  <motion.form
                    onSubmit={handleAssignRole}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <Grid container spacing={3}>
                      {/* Form Fields */}
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Charge"
                          select
                          value={chargeCd}
                          onChange={(e) => setChargeCd(e.target.value)}
                          required
                          variant="outlined"
                        >
                          {charges.map((charge) => (
                            <MenuItem key={charge.charge_cd} value={charge.charge_cd}>
                              {charge.charge_cd} - {charge.charge_nm}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="User"
                          select
                          value={usrCd}
                          onChange={(e) => setUsrCd(e.target.value)}
                          required
                          disabled={!chargeCd}
                          variant="outlined"
                        >
                          {users.map((user, index) => (
                            <MenuItem key={`${user.usr_nm}-${index}`} value={user.usr_cd}>
                              {user.usr_nm} - {user.usr_cd}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Role"
                          select
                          value={roleCd}
                          onChange={(e) => setRoleCd(e.target.value)}
                          required
                          variant="outlined"
                        >
                          {roles.map((role) => (
                            <MenuItem key={role.role_cd} value={role.role_cd}>
                              {role.role_cd} - {role.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Status"
                          select
                          value={statusCd}
                          onChange={(e) => setStatusCd(e.target.value)}
                          required
                          variant="outlined"
                        >
                          {statuses.map((status) => (
                            <MenuItem key={status.status_cd} value={status.status_cd}>
                              {status.status_cd} - {status.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Start Date"
                          type="date"
                          value={startDt}
                          onChange={(e) => setStartDt(e.target.value)}
                          required
                          InputLabelProps={{ shrink: true }}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="End Date (Optional)"
                          type="date"
                          value={endDt}
                          onChange={(e) => setEndDt(e.target.value)}
                          InputLabelProps={{ shrink: true }}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          disabled={loading}
                          sx={{ padding: 1.5 }}
                          style={{
                            background: 'linear-gradient(to right,#bf0ae2,#bf0ae2)',
                            color: 'white',
                          }}
                        >
                          <AddIcon />{loading ? <CircularProgress size={24} color="inherit" /> : 'Assign Role and Status'}
                        </Button>
                      </Grid>
                    </Grid>
                  </motion.form>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </DashboardLayout>
  );
};

export default AssignRoleAndStatus;
