// src/components/SignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Updated import
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const SignIn = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/admin/login/userlogin', { // Adjust API URL as needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apiauthkey': 'aBcD1eFgH2iJkLmNoPqRsTuVwXyZ012345678jasldjalsdjurewouroewiru' // Replace with your actual API key
        },
        body: JSON.stringify({ phone, password })
      });

      const data = await response.json();

      if (response.ok) {
        const { authtoken } = data;
        const decodedToken = jwtDecode(authtoken); // Use named import here
        const userId = decodedToken.userid;

        // Redirect to user-specific dashboard
        navigate(`/dashboard/${userId}`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        height="100vh"
        alignItems="center"
      >
        <Typography variant="h4" gutterBottom>
          Admin Sign In
        </Typography>
        <form onSubmit={handleSignIn}>
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
