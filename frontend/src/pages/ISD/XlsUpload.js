import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button, Box, CircularProgress, Alert, TextField, MenuItem, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import DashboardLayout from '../../components/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BackgroundImage from '../../components/chart/bg-new-vec.jpg';
import UploadImage from '../../components/chart/upload.jpg';
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedFile, setSelectedFile] = useState(null);
  const [officeCd, setOfficeCd] = useState('');
  const [officeCdList, setOfficeCdList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchOfficeCdList = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setMessage('Authentication token is missing. Please log in again.');
          return;
        }
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
  const handleOfficeCdChange = (event) => setOfficeCd(event.target.value);
  const handleUpload = async () => {
    if (!selectedFile || !officeCd) {
      setMessage('Please select a charge code and upload a file.');
      return;
    }
    setIsLoading(true);
    setMessage('');
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('office_cd', officeCd);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setMessage('Authentication token is missing. Please log in again.');
        return;
      }
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
          }}
        >
          <Container maxWidth="md">
            <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={() => navigate('/assets')} sx={{ mb: 2 }}>
              Back
            </Button>
            <Paper elevation={6} sx={{ p: 4, borderRadius: '16px', background: 'rgba(255, 255, 255, 0.9)' }}>
              <Box sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', gap: 3, alignItems: 'center' }}>
                {!isSmallScreen && (
                  <Box component="img" src={UploadImage} alt="Upload" sx={{ width: '40%', borderRadius: 2 }} />
                )}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" gutterBottom align="center">
                    Upload Excel File
                  </Typography>
                  {message && <Alert severity={message.includes('success') ? 'success' : 'error'}>{message}</Alert>}
                  <TextField select label="Office Name" fullWidth value={officeCd} onChange={handleOfficeCdChange}>
                    {officeCdList.map((item) => (
                      <MenuItem key={item.office_cd} value={item.office_cd}>
                        {item.office_nm}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ mt: 2 }}>
                    Select File
                    <VisuallyHiddenInput type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
                  </Button>
                  {selectedFile && <Typography variant="body2">Selected File: {selectedFile.name}</Typography>}
                  <Button variant="contained" fullWidth onClick={handleUpload} disabled={!selectedFile || !officeCd || isLoading} sx={{ mt: 2 }}>
                    {isLoading ? <CircularProgress size={24} /> : 'UPLOAD'}
                  </Button>
                  <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    <a href="fileFormatSample.xlsx" download style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}>
                      Download Sample File
                    </a>
                  </Typography>

                </Box>
              </Box>
            </Paper>
          </Container>
        </Box>
      </motion.div>
    </DashboardLayout>
  );
};

export default XlsUpload;
