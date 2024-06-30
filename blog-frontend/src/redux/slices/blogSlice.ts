import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Blog } from '../../types/blog';
import { fetchBlogs, fetchBlogById, deleteBlog, fetchSharedBlogs } from '../thunks/blogThunks';

interface BlogState {
    blogs: Blog[];  
  currentBlog: Blog | null;
  sharedBlogs: Blog[];
    loading: boolean;
    error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  sharedBlogs: [],
    currentBlog: null,
    loading: false,
    error: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    fetchBlogsStart: (state) => {
      state.loading = true;
    },
    fetchBlogsSuccess: (state, action: PayloadAction<Blog[]>) => {
      state.blogs = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchBlogsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentBlog: (state, action: PayloadAction<Blog>) => {
      state.currentBlog = action.payload;
    },
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<Blog[]>) => {
        state.blogs = action.payload;
        state.loading = false;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user blogs';
      })
      // Add these cases for fetchBlogById
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.currentBlog = action.payload;
        state.loading = false;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch blog details';
        state.currentBlog = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(fetchSharedBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSharedBlogs.fulfilled, (state, action: PayloadAction<Blog[]>) => {
        state.sharedBlogs = action.payload;
        state.loading = false;
      })
      .addCase(fetchSharedBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch shared blogs';
      });
  },
});

export const {
  fetchBlogsStart,
  fetchBlogsSuccess,
  fetchBlogsFailure,
  setCurrentBlog,
  clearCurrentBlog,
} = blogSlice.actions;

export default blogSlice.reducer;