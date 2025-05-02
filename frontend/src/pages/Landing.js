import React, { useState } from 'react';
import { Button, Box, Typography, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundImage from '../components/chart/bg-new-vec.jpg';
import LogoImage from '../components/chart/NIC.png';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Landing = () => {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {/* Header */}
      <Header />

      {/* Full-Screen Background Image */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1,
        }}
      />

      {/* Main Content Wrapper */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 1,
          paddingTop: '80px',
          
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: 4,
              borderRadius: '10px',
              boxShadow: 3,
              backdropFilter: 'blur(8px)',
              
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                  <img
                    src={LogoImage}
                    alt="NIC Logo"
                    style={{ height: '100px', marginBottom: '16px' }}
                  />
                  <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                    ASSET MANAGEMENT SYSTEM V-1.0
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
                    The <strong>Asset Management System</strong> is designed to streamline the
                    tracking and management of assets under the Directorate of Commercial Taxes, West Bengal.
                    This system ensures accurate asset allocation, efficient resource utilization, and compliance
                    with government policies.
                  </Typography>

                  <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
                    Designed & Developed by <strong>National Informatics Centre (NIC), West Bengal</strong>,
                    this portal provides <strong>asset tracking, automated reporting, and easy
                      maintenance scheduling</strong> to enhance efficiency and transparency in asset management.
                  </Typography>
                </Grid>

                {/* Buttons */}
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/login')}
                    sx={{
                      background: 'linear-gradient(to right,#1976D2,#0D47A1)',
                      color: 'white',
                      padding: '10px 20px',
                      fontSize: '16px',
                      borderRadius: '8px',
                    }}
                  >
                    Login
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => setShowMore(!showMore)}
                    sx={{
                      borderColor: '#1976D2',
                      color: '#1976D2',
                      padding: '10px 20px',
                      fontSize: '16px',
                      borderRadius: '8px',
                    }}
                  >
                    {showMore ? "Show Less" : "Learn More"}
                  </Button>
                </Grid>

                {/* Expanded Section - Learn More */}
                <AnimatePresence>
                  {showMore && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5 }}
                      style={{ overflow: "hidden", width: "100%", marginTop: "16px" }}
                    >
                      <Grid item xs={12}>
                        <Typography variant="h6" color="primary" sx={{ mt: 3, fontWeight: "bold" }}>
                          What is an Asset Management System?
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
                          An Asset Management System (AMS)
                          is a digital solution that helps organizations efficiently track, manage,
                          and optimize their physical and digital assets throughout their lifecycle.
                          These assets can include **machinery, IT equipment, vehicles, real estate, software licenses,
                          and other valuable resources
                          that require monitoring for maintenance, usage, and financial tracking.
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ mt: 3, fontWeight: "bold" }}>
                          Key Features of an Asset Management System
                        </Typography>
                        <ul style={{ textAlign: "left", paddingLeft: "20px" }}>
                          <li><strong>Asset Tracking & Inventory Management:</strong> Keeps a centralized inventory of all assets
                            with details
                            such as purchase date, location,
                            condition, and ownership.</li>
                          <li><strong>Lifecycle Management:</strong>racks an asset’s journey
                            from procurement to disposal
                            - Helps in planning upgrades,
                            replacements, and maintenance
                            schedules.</li>
                          <li><strong>Maintenance & Compliance:</strong>Schedules preventive
                            maintenance
                            to reduce downtime and repair costs.
                            - Ensures compliance with financial regulations and
                            safety standards.</li>
                          <li><strong>Depreciation & Financial Management:</strong>Calculates depreciation values
                            and asset worth over time.
                            - Provides financial reports for budgeting and auditing</li>
                          <li><strong>User Access & Role-Based Permissions:</strong>Assigns different roles and access levels to
                            administrators, employees, and auditors.
                            - Ensures secure handling of sensitive asset information</li>
                          <li><strong>Integration with Other Systems:</strong>Provides APIs for data sharing with
                            other business tools</li>
                        </ul>

                        <Typography variant="h6" color="primary" sx={{ mt: 3, fontWeight: "bold" }}>
                          Why Choose Our Asset Management System?
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
                          Our Asset Management System provides:
                        </Typography>
                        <ul style={{ textAlign: "left", paddingLeft: "20px" }}>
                          <li><strong>Tracking:</strong> Monitor asset location and usage.</li>
                          <li><strong>Automated Reports:</strong> Generate audit and usage reports instantly.</li>
                          <li><strong>Maintenance Alerts:</strong> Get notifications for upcoming maintenance.</li>
                          <li><strong>Secure Access:</strong> Role-based authentication for enhanced security.</li>
                          <li><strong>Easy Integration:</strong> Works seamlessly with existing systems.</li>
                        </ul>

                        <Typography variant="h6" color="primary" sx={{ mt: 3, fontWeight: "bold" }}>
                        Benefits of an Asset Management System
                        </Typography>                      
                        <ul style={{ textAlign: "left", paddingLeft: "20px" }}>
                          <li><strong>Improved Efficiency:</strong>educes manual tracking efforts, saving time and resources.</li>
                          <li><strong>Cost Savings:</strong>Helps avoid unnecessary purchases and optimizes asset utilization.</li>
                          <li><strong>Better Compliance:</strong>Ensures regulatory and financial compliance.</li>
                          <li><strong>Enhanced Security:</strong>Prevents asset theft or misuse with access control and tracking.</li>
                          <li><strong>Data-Driven Decision Making:</strong>Provides real-time insights for informed business decisions.</li>
                        </ul>
                      </Grid>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Grid>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ width: '100%', position: 'relative', bottom: 0, mt: 4 }}>
        <Footer />
      </Box>
    </>
  );
};

export default Landing;
