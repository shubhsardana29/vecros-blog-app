import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import BlogDetail from '../components/Blog/BlogDetail';
import { fetchBlogById } from '../redux/thunks/blogThunks';
import { RootState, AppDispatch } from '../redux/store';

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { currentBlog, loading, error } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    if (id) {
      const blogId = parseInt(id);
      if (!isNaN(blogId)) {
        dispatch(fetchBlogById(blogId));
      }
    }
  }, [dispatch, id]);

  if (!id || isNaN(parseInt(id))) {
    return <Typography>Invalid blog ID</Typography>;
  }

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!currentBlog) return <Typography>Blog not found</Typography>;

  return (
    <Container>
      <BlogDetail blog={currentBlog} />
    </Container>
  );
};

export default BlogDetailPage;