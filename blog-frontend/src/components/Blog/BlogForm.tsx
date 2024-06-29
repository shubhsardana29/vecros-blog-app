import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Blog } from '../../types/blog';

interface BlogFormProps {
  initialBlog?: Blog;
  onSubmit: (blog: Partial<Blog>) => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ initialBlog, onSubmit }) => {
  const [title, setTitle] = useState(initialBlog?.title || '');
  const [content, setContent] = useState(initialBlog?.content || '');
  const [category, setCategory] = useState(initialBlog?.category || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, category });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        margin="normal"
        multiline
        rows={4}
        required
      />
      <TextField
        fullWidth
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary">
        {initialBlog ? 'Update' : 'Create'} Blog
      </Button>
    </Box>
  );
};

export default BlogForm;
