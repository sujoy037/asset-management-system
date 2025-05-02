import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button, Grid, Box, Typography, CircularProgress, Paper, Card, CardMedia, useMediaQuery } from '@mui/material';
import axios from 'axios';
import DashboardLayout from '../../components/DashboardLayout';
import AddIcon from '@mui/icons-material/Add';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackgroundImage from '../../components/chart/bg-new-vec.jpg';
import RoleImage from '../../components/chart/AssignRole.jpg';
import api from '../../api';
import { useTheme } from '@mui/material/styles';
const gridVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};
const formVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const AssignRoleAndStatus = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
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
          api.get('/roles', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/statuses', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/charge-cd-list', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setRoles(rolesResponse.data);
        setStatuses(statusesResponse.data);
        setCharges(chargesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching initial data');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      if (chargeCd) {
        try {
          const response = await api.get(`/users?charge_cd=${chargeCd}`, { headers: { Authorization: `Bearer ${token}` } });
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
    const data = { charge_cd: chargeCd, usr_cd: usrCd, role_cd: roleCd, status_cd: statusCd, start_dt: startDt, end_dt: endDt };
    try {
      const token = localStorage.getItem('authToken');
      const response = await api.post('/assign-role-status', data, { headers: { Authorization: `Bearer ${token}` } });
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

  return (
    <DashboardLayout role="ISD">
      <motion.div initial="hidden" animate="visible" transition={{ duration: 0.8, staggerChildren: 0.2 }}>
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
            borderRadius: '10px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${BackgroundImage})`,
          }}
        >
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            {/* Left Side - Image Card */}
            <Grid item xs={12} sm={5} md={4}>
              <motion.div variants={gridVariants}>
                <Card elevation={7} sx={{ borderRadius: '16px', overflow: 'hidden', width: isSmallScreen ? '100%' : '50%', }}>
                  <CardMedia component="img" image={RoleImage} alt="Assign Role" sx={{ height: 230 }} />
                </Card>
              </motion.div>
            </Grid>

            {/* Right Side - Form */}

            <Grid item xs={12} md={6}>
              <motion.div variants={formVariants}>
                <Paper elevation={3} sx={{ padding: 5, borderRadius: '16px', background: 'white' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, width: isSmallScreen ? '100%' : '50%' }}>
                    <Button startIcon={<ArrowBack />} onClick={() => navigate('/assign-roles-card')} sx={{ textTransform: 'none', color: 'primary.main' }}>
                      Back
                    </Button>
                    <Typography variant="h4" color="primary">
                      Assign Role & Status
                    </Typography>
                  </Box>

                  {error && <Typography color="error" gutterBottom>{error}</Typography>}

                  <form onSubmit={handleAssignRole}>
                    <Grid container spacing={3}>
                      {/* Dropdown Fields */}
                      {[{ label: "Charge", value: chargeCd, setValue: setChargeCd, options: charges, key: "charge_cd" },
                      { label: "User", value: usrCd, setValue: setUsrCd, options: users, key: "usr_cd", disabled: !chargeCd },
                      { label: "Role", value: roleCd, setValue: setRoleCd, options: roles, key: "role_cd" },
                      { label: "Status", value: statusCd, setValue: setStatusCd, options: statuses, key: "status_cd" }]
                        .map(({ label, value, setValue, options, key, disabled }) => (
                          <Grid item xs={12} key={label}>
                            <TextField fullWidth label={label} select value={value} onChange={(e) => setValue(e.target.value)} required variant="outlined" disabled={disabled}>
                              {options.map((opt) => (
                                <MenuItem key={opt[key]} value={opt[key]}>
                                  {opt[key]} - {opt.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                        ))}

                      {/* Date Fields */}
                      <Grid item xs={12}><TextField fullWidth label="Start Date" type="date" value={startDt} onChange={(e) => setStartDt(e.target.value)} required InputLabelProps={{ shrink: true }} /></Grid>
                      <Grid item xs={12}><TextField fullWidth label="End Date (Optional)" type="date" value={endDt} onChange={(e) => setEndDt(e.target.value)} InputLabelProps={{ shrink: true }} /></Grid>

                      {/* Submit Button */}
                      <Grid item xs={12}><Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ padding: 1.5 }}> <AddIcon /> {loading ? <CircularProgress size={24} /> : 'Assign Role & Status'} </Button></Grid>
                    </Grid>
                  </form>
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
