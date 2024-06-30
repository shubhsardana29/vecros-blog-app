import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';
import { User } from '../../types/user';
import { setUser, setToken, setLoading, setError, setMessage , clearUser} from '../slices/authSlice';

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
  async (userData: { name: string; email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const response = await api.register(userData);
      dispatch(setMessage(response.data.message));
      dispatch(setLoading(false));
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const errorMessage = apiError.response?.data?.message || 'Registration failed';
      dispatch(setError(errorMessage));
      dispatch(setLoading(false));
      return rejectWithValue(errorMessage);
    }
  }
);


export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await api.login(credentials);
      console.log('Login response:', response.data);
      localStorage.setItem('token', response.data.token);
      dispatch(setToken(response.data.token));

      // Fetch user data
      const userResponse = await api.getUserProfile();
      console.log('User data:', userResponse.data);
      dispatch(setUser(userResponse.data));

      dispatch(setMessage('Login successful'));
      return response.data.user;
    } catch (error: unknown) {
      console.error('Login error:', error);
      const apiError = error as ApiError;
      const errorMessage = apiError.response?.data?.message || 'Login failed';
      dispatch(setError(errorMessage));
      throw error;
    }
    finally {
      dispatch(setLoading(false));
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      localStorage.removeItem('token');
      dispatch(setUser(null));
      dispatch(setToken(null));
      dispatch(setMessage('Logged out successfully'));
      dispatch(clearUser());
    } catch (error: unknown) {
      const errorMessage = 'Logout failed';
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const response = await api.getUserProfile();
      dispatch(setUser(response.data));
      dispatch(setLoading(false));
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const errorMessage = apiError.response?.data?.message || 'Failed to fetch user profile';
      dispatch(setError(errorMessage));
      dispatch(setLoading(false));
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (userData: Partial<User>, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const response = await api.updateUserProfile(userData);
      dispatch(setUser(response.data));
      dispatch(setMessage('Profile updated successfully'));
      dispatch(setLoading(false));
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const errorMessage = apiError.response?.data?.message || 'Failed to update user profile';
      dispatch(setError(errorMessage));
      dispatch(setLoading(false));
      return rejectWithValue(errorMessage);
    }
  }
);