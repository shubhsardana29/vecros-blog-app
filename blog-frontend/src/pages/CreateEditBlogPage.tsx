import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import BlogForm from '../components/Blog/BlogForm';
import { createBlog, updateBlog } from '../redux/thunks/blogThunks';
import { RootState, AppDispatch } from '../redux/store';
import { Blog } from '@/types/blog';

const CreateEditBlogPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const currentBlog = useSelector((state: RootState) =>
    state.blog.blogs.find((blog) => blog.id === (id ? parseInt(id) : undefined))
  );

  const handleSubmit = async (blogData: Partial<Blog>) => {
    if (id) {
      await dispatch(updateBlog({ id: parseInt(id), blogData }));
    } else {
      await dispatch(createBlog(blogData as Blog));
    }
    navigate('/');
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {id ? 'Edit Blog' : 'Create New Blog'}
      </Typography>
      <BlogForm initialBlog={currentBlog || undefined} onSubmit={handleSubmit} />
    </Container>
  );
};

export default CreateEditBlogPage;
