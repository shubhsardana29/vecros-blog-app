import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserDashboard from '../components/Dashboard/UserDashboard';
import { fetchUserBlogs } from '../redux/thunks/blogThunks';
import { RootState, AppDispatch } from '../redux/store';

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { userBlogs, loading, error } = useSelector((state: RootState) => state.blog);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
    } else {
      dispatch(fetchUserBlogs(user.id));
    }
  }, [dispatch, user, isAuthenticated, navigate]);

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