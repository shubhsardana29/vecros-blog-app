import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Blog } from '../../types/blog';
import { fetchBlogs } from '../thunks/blogThunks';

interface BlogState {
    blogs: Blog[];  
  currentBlog: Blog | null;
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
    blogs: [],
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