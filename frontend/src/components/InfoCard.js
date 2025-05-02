import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const InfoCard = ({ title, value, color, icon: Icon }) => {
  return (
    <Card
      sx={{
        backgroundColor: color,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Box>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </Box>
      {Icon && <Icon sx={{ fontSize: 60 }} />}
    </Card>
  );
};

export default InfoCard;
