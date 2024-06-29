import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} Blog App. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;