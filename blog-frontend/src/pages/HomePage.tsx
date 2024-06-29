import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import BlogList from '../components/Blog/BlogList';
import SearchBar from '../components/Common/SearchBar';
import { fetchBlogs } from '../redux/thunks/blogThunks';
import { RootState, AppDispatch } from '../redux/store';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, loading, error } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleSearch = (query: string) => {
    // Implement search functionality here
    console.log('Search query:', query);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Our Blog
      </Typography>
      <SearchBar onSearch={handleSearch} />
      <BlogList blogs={blogs} />
    </Container>
  );
};

export default HomePage;