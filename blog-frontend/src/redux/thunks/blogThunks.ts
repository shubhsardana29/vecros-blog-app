import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';
import { Blog } from '../../types/blog';

// Define a custom error type
interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const fetchBlogs = createAsyncThunk(
  'blog/fetchBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.fetchBlogs();  
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to fetch blogs');
    }
  }
);

export const fetchBlogById = createAsyncThunk(
  'blog/fetchBlogById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.fetchBlogById(id);
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to fetch blog');
    }
  }
);

export const createBlog = createAsyncThunk(
  'blog/createBlog',
  async (blogData: { title: string; content: string; category: string }, { rejectWithValue }) => {
    try {
      const response = await api.createBlog(blogData);
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to create blog');
    }
  }
);

export const updateBlog = createAsyncThunk(
  'blog/updateBlog',
  async ({ id, blogData }: { id: number; blogData: Partial<Blog> }, { rejectWithValue }) => {
    try {
      const response = await api.updateBlog(id, blogData);
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to update blog');
    }
  }
);

export const deleteBlog = createAsyncThunk(
  'blog/deleteBlog',
  async (id: number, { rejectWithValue }) => {
    try {
      await api.deleteBlog(id);
      return id;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to delete blog');
    }
  }
);

export const shareBlog = createAsyncThunk(
  'blog/shareBlog',
  async (shareData: { blogId: number; userId: number; permission: string }, { rejectWithValue }) => {
    try {
      await api.shareBlog(shareData);
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to share blog');
    }
  }
);

export const getSharedBlogs = createAsyncThunk(
  'blog/getSharedBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getSharedBlogs();
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to fetch shared blogs');
    }
  }
);

export const fetchBlogsByCategory = createAsyncThunk(
  'blog/fetchBlogsByCategory',
  async (category: string, { rejectWithValue }) => {
    try {
      const response = await api.fetchBlogsByCategory(category);
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to fetch blogs by category');
    }
  }
);

export const fetchUserBlogs = createAsyncThunk(
  'blog/fetchUserBlogs',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await api.fetchUserBlogs(userId);
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to fetch user blogs');
    }
  }
);
