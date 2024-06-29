import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';
import { User } from '../../types/user';

// Define a custom error type
interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const register = createAsyncThunk(
  'auth/register',
  async (userData: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.register(userData);
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Registration failed');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.login(credentials);
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Login failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem('token');
    } catch (error: unknown) {
      return rejectWithValue('Logout failed');
    }
  }
);

export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getUserProfile();
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to fetch user profile');
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await api.updateUserProfile(userData);
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to update user profile');
    }
  }
);
