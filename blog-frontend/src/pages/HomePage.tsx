import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import BlogList from '../components/Blog/BlogList';
import SearchBar from '../components/Common/SearchBar';
import { fetchBlogs } from '../redux/thunks/blogThunks';
import { RootState, AppDispatch } from '../redux/store';
import { Blog } from '../types/blog';
import debounce from 'lodash/debounce';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, loading, error } = useSelector((state: RootState) => state.blog);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    setFilteredBlogs(blogs);
  }, [blogs]);

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = blogs.filter((blog) =>
          blog.title.toLowerCase().includes(lowercasedQuery) ||
          blog.content.toLowerCase().includes(lowercasedQuery) ||
          blog.author.name.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredBlogs(filtered);
      }, 300),
    [blogs]
  );

  const handleSearch = (query: string) => {
    debouncedSearch(query);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Our Blog
      </Typography>
      <SearchBar onSearch={handleSearch} />
      <BlogList blogs={filteredBlogs} />
    </Container>
  );
};

export default HomePage;