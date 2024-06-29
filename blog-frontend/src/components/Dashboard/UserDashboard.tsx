import React from 'react';
import { Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Blog } from '../../types/blog';

interface UserDashboardProps {
  userBlogs: Blog[];
}

const UserDashboard: React.FC<UserDashboardProps> = ({ userBlogs }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>Your Blogs</Typography>
      <Button variant="contained" color="primary" component={Link} to="/create">
        Create New Blog
      </Button>
      <List>
        {userBlogs.map((blog) => (
          <ListItem key={blog.id}>
            <ListItemText primary={blog.title} secondary={blog.createdAt} />
            <Button component={Link} to={`/edit/${blog.id}`}>Edit</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UserDashboard;