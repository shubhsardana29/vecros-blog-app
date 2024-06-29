import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { Blog } from '../../types/blog';

interface BlogDetailProps {
  blog: Blog;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ blog }) => {
  return (
    <Paper elevation={3}>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>{blog.title}</Typography>
        <Typography variant="subtitle1" gutterBottom>By {blog.author.name}</Typography>
        <Typography variant="body1">{blog.content}</Typography>
      </Box>
    </Paper>
  );
};

export default BlogDetail;