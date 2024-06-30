import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Blog App. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;