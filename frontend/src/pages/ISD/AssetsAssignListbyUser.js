import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AssetsAssignListbyUser = () => {
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
          accessory_id: accessoryId
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
    <div style={{ padding: '20px' }}>
      <h2>Asset Assignment Search</h2>

      {/* Filter Form */}
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Office Name"
            variant="outlined"
            fullWidth
            value={officeName}
            onChange={(e) => setOfficeName(e.target.value)}
            select
            SelectProps={{
              native: true,
            }}
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
            label="Accessory ID"
            variant="outlined"
            fullWidth
            type="number"
            value={accessoryId}
            onChange={(e) => setAccessoryId(e.target.value)}
            select
            SelectProps={{
              native: true,
            }}
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </Grid>
      </Grid>

      {/* Error Message */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Asset Assignment Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset ID</TableCell>
              <TableCell>Office Name</TableCell>
              <TableCell>Name of User</TableCell>
              <TableCell>Building</TableCell>
              <TableCell>Floor</TableCell>
              <TableCell>Room No</TableCell>
              <TableCell>Working Status</TableCell>
              <TableCell>Assignment Date</TableCell>
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
    </div>
  );
};

export default AssetsAssignListbyUser;
