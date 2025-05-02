import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  TablePagination,
  Grid,
  TableSortLabel,
  Button,
  Box,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../../components/DashboardLayout';
import BackgroundImage from '../../components/chart/bg-blue.jpg';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
const AssetTable = () => {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  //const [searchQuery, setSearchQuery] = useState('');
  const [searchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');

  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Fetch total assets from API
  useEffect(() => {
    const fetchAssets = async () => {
      setIsLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError('Authentication token is missing. Please log in again.');
          setIsLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5001/api/total-assets', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAssets(response.data || []);
      } catch (err) {
        console.error('Error fetching assets:', err);
        setError('Error fetching assets.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssets();
  }, []);

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle sorting
  const handleRequestSort = (property) => {
    const isAscending = orderBy === property && order === 'asc';
    setOrder(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedAssets = assets
    .filter((asset) =>
      Object.values(asset).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
      return 0;
    });

  const paginatedAssets = sortedAssets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <DashboardLayout role="ISD">
      <motion.div initial="hidden" animate="visible" transition={{ duration: 0.8, staggerChildren: 0.2 }}>
        <Box
          sx={{
            marginTop: 2,
            padding: isSmallScreen ? 3 : 10,
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(34, 2, 2, 0.1)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${BackgroundImage})`,
            textAlign: 'center',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h5" gutterBottom>
                    Upload Total Assets
                  </Typography>
                </Grid>
              </Grid>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {isLoading ? (
                <CircularProgress />
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead sx={{ background: 'linear-gradient(to right, rgb(83, 70, 230), rgb(10, 15, 32))', color: 'white' }}>
                      <TableRow>
                        {[
                          { id: 'id', label: 'ID' },
                          { id: 'building', label: 'Building' },
                          { id: 'office_cd', label: 'Office Code' },
                          //{ id: 'charge_nm', label: 'Charge Name' },
                          { id: 'cpu_number', label: 'CPU Number' },
                          { id: 'floor', label: 'Floor' },
                          { id: 'hrms_id_of_user', label: 'HRMS ID' },
                          { id: 'name_of_user', label: 'User Name' },
                          { id: 'office_name', label: 'Office Name' },
                          { id: 'room_no', label: 'Room Number' },
                          //{ id: 'voip_of_user', label: 'VOIP' },
                          { id: 'logdate', label: 'Log Date' },
                        ].map((column) => (
                          <TableCell key={column.id} sx={{ color: 'white' }}>
                            <TableSortLabel
                              active={orderBy === column.id}
                              direction={orderBy === column.id ? order : 'asc'}
                              onClick={() => handleRequestSort(column.id)}
                            >
                              {column.label}
                            </TableSortLabel>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedAssets.map((asset) => (
                        <TableRow key={asset.id}>
                          <TableCell>{asset.id}</TableCell>
                          <TableCell>{asset.building}</TableCell>
                          <TableCell>{asset.office_cd}</TableCell>
                          {/* <TableCell>{asset.charge_nm}</TableCell> */}
                          <TableCell>{asset.cpu_number}</TableCell>
                          <TableCell>{asset.floor}</TableCell>
                           <TableCell>{asset.hrms_id_of_user}</TableCell>
                          <TableCell>{asset.name_of_user}</TableCell> 
                          <TableCell>{asset.office_name}</TableCell>
                          <TableCell>{asset.room_no}</TableCell>
                          {/* <TableCell>{asset.voip_of_user}</TableCell> */}
                          <TableCell>{new Date(asset.logdate).toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              <TablePagination
                component="div"
                count={sortedAssets.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />

              <Button
                variant="contained"
                sx={{ mt: 3 }}
                onClick={() => navigate('/assets')}
              >
                Back
              </Button>
            </Paper>
          </Container>
        </Box>
      </motion.div>

    </DashboardLayout>
  );
};

export default AssetTable;
