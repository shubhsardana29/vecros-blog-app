import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Blog } from '../../types/blog';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {blog.title}
        </Typography>
        <Typography color="text.secondary">
          {blog.category}
        </Typography>
        <Typography variant="body2">
          {blog.content.substring(0, 100)}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/blog/${blog.id}`}>Read More</Button>
      </CardActions>
    </Card>
  );
};

export default BlogCard;