import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button, Box, CircularProgress, Alert, TextField, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import DashboardLayout from '../../components/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BackgroundImage from '../../components/chart/bg-blue.jpg';
import { motion } from 'framer-motion';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const XlsUpload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [officeCd, setOfficeCd] = useState(''); // Renaming this to match the usage below
  const [officeCdList, setOfficeCdList] = useState([]); // Renaming to officeCdList to match usage
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchOfficeCdList = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setMessage('Authentication token is missing. Please log in again.');
        return;
      }
      try {
        const response = await axios.get('http://localhost:5001/api/office-cd', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOfficeCdList(response.data || []);
      } catch (error) {
        setMessage('Error fetching office code list.');
      }
    };
    fetchOfficeCdList();
  }, []);

  const handleFileChange = (event) => setSelectedFile(event.target.files[0]);
  const handleOfficeCdChange = (event) => setOfficeCd(event.target.value); // Fixing variable name

  const handleUpload = async () => {
    if (!selectedFile || !officeCd) {
      setMessage('Please select a charge code and upload a file.');
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('office_cd', officeCd);
    const token = localStorage.getItem('authToken');
    if (!token) {
      setMessage('Authentication token is missing. Please log in again.');
      return;
    }
    setIsLoading(true);
    setMessage('');
    try {
      const response = await axios.post('http://localhost:5001/api/upload-xls', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      });
      setMessage(response.data.message || 'File uploaded successfully!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error uploading file.');
    } finally {
      setIsLoading(false);
      setSelectedFile(null);
      setOfficeCd('');
    }
  };

  return (
    <DashboardLayout role="ISD">
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 4,
            background: `url(${BackgroundImage}) no-repeat center center fixed`,
            backgroundSize: 'cover',
            animation: 'backgroundAnim 10s infinite alternate',
          }}
        >
          <style>
            {`@keyframes backgroundAnim { 0% { background-position: 0% 0%; } 100% { background-position: 100% 100%; } }`}
          </style>
          <Container maxWidth="sm">
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/assets')}
              sx={{ marginBottom: 2, background: 'linear-gradient(to right,#bf0ae2,#bf0ae2)', color: 'white' }}
            >
              Back
            </Button>
            <Paper elevation={6} sx={{ p: 4, borderRadius: '16px', background: 'rgba(255, 255, 255, 0.8)', color: 'black' }}>
              <Typography variant="h5" gutterBottom align="center">
                Upload Excel File
              </Typography>
              {message && <Alert severity={message.includes('success') ? 'success' : 'error'} sx={{ mb: 2 }}>{message}</Alert>}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <TextField
                  select
                  label="Office Name"
                  variant="outlined"
                  fullWidth
                  value={officeCd}
                  onChange={handleOfficeCdChange} // Corrected to match state name
                  sx={{ bgcolor: 'white', borderRadius: 1 }}
                >
                  {officeCdList.map((item) => (
                    <MenuItem key={item.office_cd} value={item.office_cd}>
                      {item.office_nm}
                    </MenuItem>
                  ))}
                </TextField>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  sx={{ bgcolor: 'white', color: '#1976d2', borderRadius: 1, '&:hover': { bgcolor: '#e3f2fd' } }}
                >
                  Select File
                  <VisuallyHiddenInput type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
                </Button>
                {selectedFile && <Typography variant="body2" color="black">Selected File: {selectedFile.name}</Typography>}
                <Button
                  variant="contained"
                  onClick={handleUpload}
                  disabled={!selectedFile || !officeCd || isLoading}
                  startIcon={!isLoading && <CloudUploadIcon />}
                  sx={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: '#1565c0' },
                  }}
                >
                  {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'UPLOAD'}
                </Button>
              </Box>
            </Paper>
          </Container>
        </Box>
      </motion.div>
    </DashboardLayout>
  );
};

export default XlsUpload;
