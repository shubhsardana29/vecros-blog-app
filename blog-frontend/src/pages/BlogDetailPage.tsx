import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, CircularProgress, Button, Box } from '@mui/material';
import { fetchBlogById, deleteBlog } from '../redux/thunks/blogThunks';
import { RootState, AppDispatch } from '../redux/store';

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { currentBlog, loading, error } = useSelector((state: RootState) => state.blog);
  const currentUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(parseInt(id)));
    }
  }, [dispatch, id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!currentBlog) return <Typography>Blog not found</Typography>;

  const isAuthor = currentUser && currentBlog.author.name === currentUser.name;
  
  const handleEdit = () => {
    navigate(`/edit/${currentBlog.id}`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      dispatch(deleteBlog(currentBlog.id));
      navigate('/dashboard');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>{currentBlog.title}</Typography>
      <Typography variant="subtitle1" gutterBottom>
        Created by: {currentBlog.author.name} on {new Date(currentBlog.createdAt).toLocaleString()}
      </Typography>
      <Typography variant="body1" paragraph>{currentBlog.content}</Typography>
      
      {isAuthor && (
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleEdit} sx={{ mr: 1 }}>
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default BlogDetailPage;