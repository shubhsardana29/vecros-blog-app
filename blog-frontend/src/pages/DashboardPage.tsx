import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import UserDashboard from '../components/Dashboard/UserDashboard';
import { fetchUserBlogs } from '../redux/thunks/blogThunks';
import { RootState, AppDispatch } from '../redux/store';

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userBlogs, loading, error } = useSelector((state: RootState) => state.blog);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserBlogs(user.id));
    }
  }, [dispatch, user]);

  if (!user) return <Typography>Please log in to view your dashboard</Typography>;
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Dashboard
      </Typography>
      <UserDashboard userBlogs={userBlogs} />
    </Container>
  );
};

export default DashboardPage;