import React from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import { Box, Grid, Card, Typography } from '@mui/material';
import {
  PeopleAlt as PeopleAltIcon,
  ReportProblem as ReportProblemIcon,
  AssuredWorkload as AssuredWorkloadIcon,
  Computer as ComputerIcon,
  Pending as PendingIcon,
  AccountCircle as AccountCircleIcon,
  CorporateFare as CorporateFareIcon,
  LocationCity as LocationCityIcon,
  Domain as DomainIcon
} from '@mui/icons-material';
import Barchartpage from '../components/chart/Barchartpage';
import PieChart from '../components/chart/RoleAssignPieChart';
import RoleChart from '../components/chart/RoleChart';
import { ComboChart } from '../components/chart/ComboChart';
import BackgroundImage from '../components/chart/bg.png'; // Import your background image

// Card animation variants
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

// Grid animation variants
const gridVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};


const IsdDashboard = () => {
  return (
    <DashboardLayout role="Admin">
      {/* Info Cards Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, staggerChildren: 0.2 }}
      >
        <Box
          sx={{
            marginTop: 2,
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
          <Grid container spacing={3}>
            {[
              {
                title: 'Total Department',
                value: '2,000',
                color: '#007bff',
                Icon: AssuredWorkloadIcon,
              },
              {
                title: 'Total Complaints',
                value: '2,000',
                color: '#F08080',
                Icon: ReportProblemIcon,
              },
              {
                title: 'Total Officers',
                value: '2,00,000',
                color: '#28a745',
                Icon: PeopleAltIcon,
              },
              {
                title: 'Total Employee',
                value: '1,500',
                color: '#696969',
                Icon: AccountCircleIcon,
              },
              {
                title: 'Pending Complaints',
                value: '3,000',
                color: '#ffcc00',
                Icon: PendingIcon,
              },
              {
                title: 'Total Assets',
                value: '4,500',
                color: '#003366',
                Icon: ComputerIcon,
              },
              {
                title: 'Total Charge',
                value: '4,500',
                color: '#556B2F',
                Icon: CorporateFareIcon,
              },
              {
                title: 'Total Circle',
                value: '4,500',
                color: '#FF8C00',
                Icon: LocationCityIcon,
              },
              {
                title: 'Total Office',
                value: '4,500',
                color: '#4682B4',
                Icon: DomainIcon,
              },
            ].map((card, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <motion.div variants={cardVariants}>
                  <Card
                    sx={{
                      backgroundColor: card.color,
                      borderRadius: '10px',
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                      height: 150,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <card.Icon fontSize="large" sx={{ color: '#F0FFFF' }} />
                    <Typography variant="h6" sx={{ color: '#F0FFFF', mt: 1 }}>
                      {card.title}
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#F0FFFF', fontWeight: 'bold' }}>
                      {card.value}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
          {/* Animated Chart Section */}
          <motion.div variants={gridVariants}>
            <Grid container spacing={2} sx={{ marginTop: 4 }}>
              <Grid item xs={12}>
                <Card
                  sx={{
                    borderRadius: '16px',
                    padding: 2,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Barchartpage />
                </Card>
              </Grid>
              {[PieChart, RoleChart, ComboChart].map((ChartComponent, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <motion.div variants={cardVariants}>
                    <Card
                      sx={{
                        borderRadius: '16px',
                        padding: 2,
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <ChartComponent />
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>


      </motion.div>
    </DashboardLayout>
  );
};

export default IsdDashboard;
