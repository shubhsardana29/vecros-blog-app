import React, { useState } from 'react';
import { Typography, List, ListItem, ListItemText, Button, IconButton, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Delete as DeleteIcon, Edit as EditIcon, Share as ShareIcon } from '@mui/icons-material';
import { Blog } from '../../types/blog';
import { useDispatch } from 'react-redux';
import { deleteBlog } from '../../redux/thunks/blogThunks';
import { AppDispatch } from '../../redux/store';
import ShareBlogDialog from '../Blog/ShareBlogDialog';


interface UserDashboardProps {
  userBlogs: Blog[];
}

const UserDashboard: React.FC<UserDashboardProps> = ({ userBlogs }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);

  if (!userBlogs || userBlogs.length === 0) {
    return <Typography>You haven't created any blogs yet.</Typography>;
  }

  const handleDelete = (blogId: number) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      dispatch(deleteBlog(blogId));
    }
  };

  const handleBlogClick = (blogId: number) => {
    navigate(`/blog/${blogId}`);
  };

  const handleShare = (blogId: number) => {
    setSelectedBlogId(blogId);
    setShareDialogOpen(true);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Your Blogs</Typography>
      <Button variant="contained" color="primary" component={Link} to="/create" sx={{ mb: 2 }}>
        CREATE NEW BLOG
      </Button>
      <List>
        {userBlogs.map((blog) => (
          <ListItem 
            key={blog.id}
            sx={{ 
              cursor: 'pointer', 
              '&:hover': { backgroundColor: 'action.hover' }
            }}
            onClick={() => handleBlogClick(blog.id)}
          >
            <ListItemText
              primary={blog.title}
              secondary={`Created: ${new Date(blog.createdAt).toLocaleString()}`}
            />
            <IconButton onClick={(e) => { e.stopPropagation(); navigate(`/edit/${blog.id}`); }}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={(e) => { e.stopPropagation(); handleShare(blog.id); }}>
              <ShareIcon />
            </IconButton>
            <IconButton onClick={(e) => { e.stopPropagation(); handleDelete(blog.id); }}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      {selectedBlogId && (
        <ShareBlogDialog
          open={shareDialogOpen}
          onClose={() => setShareDialogOpen(false)}
          blogId={selectedBlogId}
        />
      )}
    </Box>
  );
};

export default UserDashboard;