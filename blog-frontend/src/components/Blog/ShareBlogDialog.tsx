import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { shareBlog } from '../../redux/thunks/blogThunks';
import { AppDispatch } from '../../redux/store';

interface ShareBlogDialogProps {
  open: boolean;
  onClose: () => void;
  blogId: number;
}

const ShareBlogDialog: React.FC<ShareBlogDialogProps> = ({ open, onClose, blogId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [userId, setUserId] = useState<string>('');
  const [permission, setPermission] = useState<'view' | 'edit'>('view');

  const handleShare = () => {
    if (userId) {
      dispatch(shareBlog({
        blogId,
        userId: parseInt(userId),
        permission
      }));
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Share Blog</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="userId"
          label="User ID to share with"
          type="number"
          fullWidth
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="permission-label">Permission</InputLabel>
          <Select
            labelId="permission-label"
            id="permission"
            value={permission}
            label="Permission"
            onChange={(e) => setPermission(e.target.value as 'view' | 'edit')}
          >
            <MenuItem value="view">View</MenuItem>
            <MenuItem value="edit">Edit</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleShare}>Share</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareBlogDialog;