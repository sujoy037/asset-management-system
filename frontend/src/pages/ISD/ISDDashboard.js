import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { Box, Grid, Card, Typography } from '@mui/material';
import { ReportProblem as ReportProblemIcon } from '@mui/icons-material';
import Barchartpage from '../../components/chart/Barchartpage';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SummarizeIcon from '@mui/icons-material/Summarize';
import HistoryIcon from '@mui/icons-material/History';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BackgroundImage from '../../components/chart/bg-new-vec.jpg';

// Animation for cards and grid elements
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const gridVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const IsdDashboard = () => {
  const navigate = useNavigate(); // For programmatic navigation

  // Define card data
  const cards = [
    { title: 'Roles', path: '/assign-roles-card', color: 'rgb(34, 153, 84)', Icon: PersonAddIcon },
    { title: 'Assets', path: '/assets', color: 'rgb(52, 152, 219)', Icon: WebAssetIcon },
    { title: 'Complaints', path: '/complaints', color: 'rgb(231, 76, 60)', Icon: ReportProblemIcon },
    { title: 'Report', path: '/reports', color: 'rgb(241, 196, 15)', Icon: SummarizeIcon },
    { title: 'History', path: '/history', color: 'rgb(155, 89, 182)', Icon: HistoryIcon },
    { title: 'Status', path: '/status', color: 'rgb(44, 62, 80)', Icon: AssignmentIcon },
  ];

  return (
    <DashboardLayout role="ISD">
      <motion.div initial="hidden" animate="visible" transition={{ duration: 0.8, staggerChildren: 0.2 }}>
        <Box
          sx={{
            marginTop: 2,
            padding: 10,
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(34, 2, 2, 0.1)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${BackgroundImage})`,
          }}
        >
          <Grid container spacing={3}>
            {cards.map((card, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <motion.div variants={cardVariants}>
                  {/* Clickable Card */}
                  <Card
                    sx={{
                      backgroundColor: card.color,
                      borderRadius: '10px',
                      boxShadow: '0px 4px 10px rgba(12, 1, 1, 0.1)',
                      height: 150,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      '&:hover': { boxShadow: '0px 6px 12px rgba(0,0,0,0.2)' },
                    }}
                    onClick={() => navigate(card.path)}
                  >
                    {/* Circular Icon */}
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <card.Icon fontSize="large" sx={{ color: '#F8F8FF', fontSize: '32px' }} />
                    </Box>

                    <Typography variant="h6" sx={{ color: '#F0FFFF' }}>{card.title}</Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Animated Chart Section */}
          <motion.div variants={gridVariants}>
            <Grid container spacing={2} sx={{ marginTop: 4 }}>
              <Grid item xs={12}>
                <Card sx={{ borderRadius: '16px', padding: 2, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                  <Barchartpage />
                </Card>
              </Grid>

            </Grid>
          </motion.div>
        </Box>
      </motion.div>
    </DashboardLayout>
  );
};

export default IsdDashboard;
