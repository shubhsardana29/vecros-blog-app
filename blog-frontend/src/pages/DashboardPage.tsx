import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserDashboard from '../components/Dashboard/UserDashboard';
import { fetchBlogs } from '../redux/thunks/blogThunks';
import { RootState, AppDispatch } from '../redux/store';
import { Blog } from '@/types/blog';

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { blogs, loading, error } = useSelector((state: RootState) => state.blog);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log('DashboardPage useEffect - user:', user, 'isAuthenticated:', isAuthenticated);
    if (!isAuthenticated || !user) {
      console.log('Not authenticated, navigating to login');
      navigate('/login');
    } else {
      console.log('Fetching blogs');
      dispatch(fetchBlogs());
    }
  }, [dispatch, user, isAuthenticated, navigate]);

  const userBlogs = blogs.filter((blog: Blog) => blog.author.name === user?.name);
  
  console.log('Rendering DashboardPage - userBlogs:', userBlogs, 'loading:', loading, 'error:', error);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Dashboard
      </Typography>
      {user && <UserDashboard userBlogs={userBlogs} />}
    </Container>
  );
};

export default DashboardPage;