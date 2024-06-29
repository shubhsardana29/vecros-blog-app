import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const categories = ['Technology', 'Travel', 'Food', 'Lifestyle'];

const Sidebar: React.FC = () => {
  return (
    <Box sx={{ width: 200, bgcolor: 'background.paper' }}>
      <List>
        {categories.map((category) => (
          <ListItem button key={category} component={Link} to={`/category/${category.toLowerCase()}`}>
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;