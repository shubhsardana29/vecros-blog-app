import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Blog } from '../../types/blog';

interface BlogState {
    blogs: Blog[];
    userBlogs: Blog[];
  currentBlog: Blog | null;
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
    blogs: [],
    userBlogs: [],
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
});

export const {
  fetchBlogsStart,
  fetchBlogsSuccess,
  fetchBlogsFailure,
  setCurrentBlog,
  clearCurrentBlog,
} = blogSlice.actions;

export default blogSlice.reducer;