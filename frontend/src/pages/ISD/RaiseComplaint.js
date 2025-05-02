import React, { useState, useEffect } from 'react';

import {
  TextField,
  MenuItem,
  Button,
  Grid,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import DashboardLayout from '../../components/DashboardLayout';

const RaiseComplaint = () => {
  const [assetOptions, setAssetOptions] = useState({
    buildings: [],
    floors: [],
    roomNos: [],
    officeNames: [],
    cpuNos: [],
    wtlIpAddrs: [],
    nicIpAddrs: [],
    backbones: [],
  });

  const [formData, setFormData] = useState({
    usr_cd: '',
    charge_cd: '',
    circle_cd: '',
    dist_cd: '',
    desig: '',
    building: '',
    floor: '',
    room_no: '',
    office_name: '',
    cpu_no: '',
    wtl_ipadd: '',
    nic_ipadd: '',
    backbone: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [charges, setCharges] = useState([]);
  const [users, setUsers] = useState([]);
  const [complaints, setComplaints] = useState([]); // For storing complaints data
  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    try {
      const decoded = jwtDecode(token);
      setFormData((prevState) => ({
        ...prevState,
        usr_cd: decoded.userId || '',
      }));
    } catch (error) {
      console.error('Error decoding token:', error);
      setError('Failed to decode user data. Please log in again.');
    }
  }, []);

  useEffect(() => {
    const fetchDropdownData = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const [chargeResponse, userResponse] = await Promise.all([
          axios.get('http://localhost:5001/api/charge-cd-list', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5001/api/users', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setCharges(chargeResponse.data);
        setUsers(userResponse.data);
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
        setError('Failed to fetch dropdown data. Please try again.');
      }
    };
    fetchDropdownData();
  }, []);

  useEffect(() => {
    const fetchAssetData = async () => {
      const token = localStorage.getItem('authToken');
      if (!formData.charge_cd) return;

      setLoading(true);

      try {
        const response = await axios.get(`http://localhost:5001/api/assets?charge_cd=${formData.charge_cd}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const assetData = response.data.data;

        if (assetData.length > 0) {
          const buildings = [...new Set(assetData.map(asset => asset.building))];
          const floors = [...new Set(assetData.map(asset => asset.floor))];
          const roomNos = [...new Set(assetData.map(asset => asset.room_no))];
          const officeNames = [...new Set(assetData.map(asset => asset.office_name))];
          const cpuNos = [...new Set(assetData.map(asset => asset.cpu_no))];
          const wtlIpAddrs = [...new Set(assetData.map(asset => asset.wtl_ipadd))];
          const nicIpAddrs = [...new Set(assetData.map(asset => asset.nic_ipadd))];
          const backbones = [...new Set(assetData.map(asset => asset.backbone))];

          setFormData((prevData) => ({
            ...prevData,
            building: buildings.length > 0 ? buildings[0] : '',
            floor: floors.length > 0 ? floors[0] : '',
            room_no: roomNos.length > 0 ? roomNos[0] : '',
            office_name: officeNames.length > 0 ? officeNames[0] : '',
            cpu_no: cpuNos.length > 0 ? cpuNos[0] : '',
            wtl_ipadd: wtlIpAddrs.length > 0 ? wtlIpAddrs[0] : '',
            nic_ipadd: nicIpAddrs.length > 0 ? nicIpAddrs[0] : '',
            backbone: backbones.length > 0 ? backbones[0] : '',
          }));

          setAssetOptions({
            buildings,
            floors,
            roomNos,
            officeNames,
            cpuNos,
            wtlIpAddrs,
            nicIpAddrs,
            backbones,
          });
        }
      } catch (error) {
        console.error('Error fetching asset data:', error);
        setError('Failed to fetch asset data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAssetData();
  }, [formData.charge_cd]);

  useEffect(() => {
    const fetchComplaints = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get('http://localhost:5001/api/complaints', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComplaints(response.data); // Set the complaints fetched from the server
      } catch (error) {
        console.error('Error fetching complaints:', error);
        setError('Failed to fetch complaints. Please try again.');
      }
    };

    fetchComplaints();
  }, [formData.usr_cd]); // Trigger when the user changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    const token = localStorage.getItem('authToken');

    try {
      const formPayload = {
        usr_cd: formData.usr_cd,
        charge_cd: formData.charge_cd,
        circle_cd: formData.circle_cd,
        dist_cd: formData.dist_cd,
        desig: formData.desig,
        building: formData.building,
        floor: formData.floor,
        room_no: formData.room_no,
        office_name: formData.office_name,
        cpu_no: formData.cpu_no,
        wtl_ipadd: formData.wtl_ipadd,
        nic_ipadd: formData.nic_ipadd,
        backbone: formData.backbone,
      };

      const response = await axios.post(
        'http://localhost:5001/api/assign-assets',
        formPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessMessage(response.data.message || 'Assets successfully assigned.');

      setFormData({
        usr_cd: '',
        charge_cd: '',
        circle_cd: '',
        dist_cd: '',
        desig: '',
        building: '',
        floor: '',
        room_no: '',
        office_name: '',
        cpu_no: '',
        wtl_ipadd: '',
        nic_ipadd: '',
        backbone: '',
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to assign assets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="ISD">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
        <Box
          sx={{
            width: '48%',
            padding: 3,
            borderRadius: '16px',
            boxShadow: 3,
            backgroundColor: '#fff',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Raise Complaint
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="User Code"
                  name="usr_cd"
                  value={formData.usr_cd}
                  onChange={handleChange}
                  required
                  disabled
                >
                  {users.map((user) => (
                    <MenuItem key={user.usr_cd} value={user.usr_cd}>
                      {user.usr_cd} - {user.usr_nm}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Charge Code"
                  name="charge_cd"
                  value={formData.charge_cd}
                  onChange={handleChange}
                  required
                >
                  {charges.map((charge) => (
                    <MenuItem key={charge.charge_cd} value={charge.charge_cd}>
                      {charge.charge_cd} - {charge.charge_desc}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Circle Code"
                  name="circle_cd"
                  value={formData.circle_cd}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="District Code"
                  name="dist_cd"
                  value={formData.dist_cd}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Designation"
                  name="desig"
                  value={formData.desig}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Building"
                  name="building"
                  value={formData.building}
                  onChange={handleChange}
                  required
                >
                  {assetOptions.buildings.map((building) => (
                    <MenuItem key={building} value={building}>
                      {building}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Floor"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  required
                >
                  {assetOptions.floors.map((floor) => (
                    <MenuItem key={floor} value={floor}>
                      {floor}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Room No."
                  name="room_no"
                  value={formData.room_no}
                  onChange={handleChange}
                  required
                >
                  {assetOptions.roomNos.map((roomNo) => (
                    <MenuItem key={roomNo} value={roomNo}>
                      {roomNo}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Office Name"
                  name="office_name"
                  value={formData.office_name}
                  onChange={handleChange}
                  required
                >
                  {assetOptions.officeNames.map((officeName) => (
                    <MenuItem key={officeName} value={officeName}>
                      {officeName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="CPU No."
                  name="cpu_no"
                  value={formData.cpu_no}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="WTL IP Address"
                  name="wtl_ipadd"
                  value={formData.wtl_ipadd}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="NIC IP Address"
                  name="nic_ipadd"
                  value={formData.nic_ipadd}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Backbone"
                  name="backbone"
                  value={formData.backbone}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    background: 'linear-gradient(to right,#bf0ae2,#bf0ae2)',
                    color: 'white',
                  }}
                  fullWidth
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Raise Complaint'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>

        {/* Right Side: Complaints Display */}
        <Box
          sx={{
            width: '48%',
            padding: 3,
            borderRadius: '16px',
            boxShadow: 3,
            backgroundColor: '#fff',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Complaints Registered
          </Typography>
          {complaints.length > 0 ? (
            complaints.map((complaint) => (
              <Paper key={complaint.id} sx={{ padding: 2, marginBottom: 2 }}>
                <Typography variant="h6">{complaint.title}</Typography>
                <Typography variant="body2">{complaint.description}</Typography>
                <Typography variant="caption" color="textSecondary">
                  Status: {complaint.status}
                </Typography>
              </Paper>
            ))
          ) : (
            <Typography variant="body1">No complaints registered yet.</Typography>
          )}
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default RaiseComplaint;
