import React, { useEffect } from 'react';
import { Typography, Container, Box } from '@mui/material';

const NotFound = () => {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={8}>
        <Typography variant="h1" component="h1" gutterBottom>
          404 Not Found
        </Typography>
        <Typography variant="body1">
          Sorry, the page you are looking for does not exist.
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFound;

