import React from 'react';
import { Grid } from '@mui/material';
import BlogCard from './BlogCard';
import { Blog } from '../../types/blog';

interface BlogListProps {
  blogs: Blog[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  return (
    <Grid container spacing={4}>
      {blogs.map((blog) => (
        <Grid item xs={12} sm={6} md={4} key={blog.id}>
          <BlogCard blog={blog} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BlogList;