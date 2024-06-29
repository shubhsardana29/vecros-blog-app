import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import BlogList from '../components/Blog/BlogList';
import { fetchBlogsByCategory } from '../redux/thunks/blogThunks';
import { RootState, AppDispatch } from '../redux/store';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { blogs, loading, error } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    if (category) {
      dispatch(fetchBlogsByCategory(category));
    } else {
      // Redirect to home page or show an error if category is undefined
      navigate('/');
    }
  }, [dispatch, category, navigate]);

  if (!category) {
    return <Typography>Invalid category</Typography>;
  }

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {category} Blogs
      </Typography>
      {blogs.length > 0 ? (
        <BlogList blogs={blogs} />
      ) : (
        <Typography>No blogs found in this category.</Typography>
      )}
    </Container>
  );
};

export default CategoryPage;