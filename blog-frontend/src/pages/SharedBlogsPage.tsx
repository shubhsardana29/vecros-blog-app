import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { fetchSharedBlogs } from "../redux/thunks/blogThunks";
import { RootState, AppDispatch } from "../redux/store";

const SharedBlogsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sharedBlogs, loading, error } = useSelector(
    (state: RootState) => state.blog
  );
  const currentUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    dispatch(fetchSharedBlogs());
  }, [dispatch]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Blogs Shared With You
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 3, bgcolor: "info.light" }}>
        <Typography variant="body1">
          Ask your friend to click on the share button icon in his Dashboard
          with permission either view or edit with your user ID.
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Your user ID is: {currentUser?.id}
        </Typography>
      </Paper>

      {sharedBlogs.length === 0 ? (
        <Typography>No blogs have been shared with you yet.</Typography>
      ) : (
        <List>
          {sharedBlogs.map((blog) => (
            <ListItem key={blog.id} divider>
              <ListItemText
                primary={blog.title}
                secondary={
                  <Box>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Author: {blog.author?.name || "Unknown"} (
                      {blog.author?.email || "No email"})
                    </Typography>
                    {blog.sharedAt && (
                      <Typography
                        component="span"
                        variant="body2"
                        display="block"
                      >
                        Shared on: {new Date(blog.sharedAt).toLocaleString()}
                      </Typography>
                    )}
                    {blog.permission && (
                      <Typography
                        component="span"
                        variant="body2"
                        display="block"
                      >
                        Permission: {blog.permission}
                      </Typography>
                    )}
                  </Box>
                }
              />
              <Button component={Link} to={`/blog/${blog.id}`}>
                View
              </Button>
              {blog.permission === "edit" && (
                <Button component={Link} to={`/edit/${blog.id}`}>
                  Edit
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default SharedBlogsPage;
