import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import {
  Box,
  Button,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from '@mui/material';
import BackgroundImage from '../../components/chart/bg-new-vec.jpg';
import ReportImage from '../../components/chart/report.jpg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/material/styles';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AssignmentIcon from '@mui/icons-material/Assignment';

const Report = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const cards = [
    { title: 'Total Assets Usages Reports', path: '/asset-usages-report', color: 'rgb(46, 109, 204)', Icon: AssignmentIcon },
    { title: 'Total Assets Complaints Reports', path: '/asset-complain-report', color: 'rgb(52, 152, 219)', Icon: AssignmentIcon },
    { title: 'Total Employee Transfers Reports', path: '/employee-transfer-report', color: 'rgb(230, 126, 34)', Icon: AssignmentIcon },
    { title: 'Chargewise Assets Usages Reports', path: '/chargwise-asset-use-report', color: 'rgb(241, 196, 15)', Icon: AssignmentIcon },
    { title: 'Chargewise Assets Complaints Reports', path: '/chargwise-asset-complaint-report', color: 'rgb(231, 76, 60)', Icon: AssignmentIcon },
    { title: 'Chargewise Assets Transfers Reports', path: '/chargwise-asset-transfer-report', color: 'rgb(142, 68, 173)', Icon: AssignmentIcon },
    { title: 'Assets Creation Reports', path: '/asset-creation-report', color: 'rgb(211, 84, 0)', Icon: AssignmentIcon },
    { title: 'ISD Role Creation Reports', path: '/isd-creation-report', color: 'rgb(41, 128, 185)', Icon: AssignmentIcon },
    { title: 'Admin Role Creation Reports', path: '/admin-creation-report', color: 'rgb(243, 156, 18)', Icon: AssignmentIcon },
    { title: 'Employee Role Creation Reports', path: '/employee-creation-report', color: 'rgb(155, 89, 182)', Icon: AssignmentIcon },
  ];

  return (
    <DashboardLayout role="ISD">
      <motion.div initial="hidden" animate="visible" transition={{ duration: 0.8, staggerChildren: 0.2 }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/isd-dashboard')}
          sx={{ marginBottom: 2, background: 'linear-gradient(to right,#bf0ae2,#bf0ae2)', color: 'white' }}
        >
        </Button>
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
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <img src={ReportImage} alt="Report" style={{ width: '70%', borderRadius: '10px' }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                <Table aria-label="report table">
                  <TableHead sx={{ backgroundColor: 'blue' }}>
                    <TableRow>
                      <TableCell align="left" sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>Report Title</TableCell>
                      <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cards.map((card, index) => (
                      <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'rgba(197, 177, 232, 0.8)' : 'rgba(162, 195, 176, 0.8)' }}>
                        <TableCell align="left">
                          <SummarizeIcon sx={{ marginRight: 1, color: 'green' }} />
                          <span  style={{ color: 'white' }}>{card.title}</span >
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            sx={{ backgroundColor: card.color, color: 'white', '&:hover': { backgroundColor: card.color } }}
                            onClick={() => navigate(card.path)}
                            startIcon={<card.Icon />}
                          >
                            View Report
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </DashboardLayout>
  );
};

export default Report;
