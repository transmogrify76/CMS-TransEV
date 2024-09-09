// src/pages/AdminDashboard.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { userId } = useParams(); // Retrieve userId from the URL
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box p={3}>
        <Typography variant="h4">Welcome, Admin {userId}!</Typography>
        {/* Add your dashboard content here */}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
