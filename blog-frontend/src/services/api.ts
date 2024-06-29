import axios, { AxiosInstance } from 'axios';
import { Blog } from '../types/blog';
import { User, LoginResponse, RegisterResponse } from '../types/user';

const API_URL = 'http://localhost:5000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User Registration
export const register = (userData: { name: string; email: string; password: string }) => 
  api.post<RegisterResponse>('/auth/register', userData);

// User Login
export const login = (credentials: { email: string; password: string }) => 
  api.post<LoginResponse>('/auth/login', credentials);

// Create a Blog Post
export const createBlog = (blogData: { title: string; content: string; category: string }) => 
  api.post<Blog>('/blogs', blogData);

// Get All Blogs
export const fetchBlogs = () => 
  api.get<Blog[]>('/blogs');

// Get a Specific Blog
export const fetchBlogById = (id: number) => 
  api.get<Blog>(`/blogs/${id}`);

// Update a Blog Post
export const updateBlog = (id: number, blogData: Partial<Blog>) => 
  api.put<Blog>(`/blogs/${id}`, blogData);

// Delete a Blog Post
export const deleteBlog = (id: number) => 
  api.delete(`/blogs/${id}`);

// Share a Blog Post
export const shareBlog = (shareData: { blogId: number; userId: number; permission: string }) => 
  api.post('/blogs/share', shareData);

// Get Shared Blogs
export const getSharedBlogs = () => 
  api.get<Blog[]>('/blogs/shared');

// Get User Profile
export const getUserProfile = () => 
  api.get<User>('/users/profile');

// Update User Profile
export const updateUserProfile = (userData: Partial<User>) => 
  api.put<User>('/users/profile', userData);

// Fetch Blogs by Category (assuming this endpoint exists)
export const fetchBlogsByCategory = (category: string) => 
  api.get<Blog[]>(`/blogs/category/${category}`);

// Fetch User Blogs (assuming this endpoint exists)
export const fetchUserBlogs = (userId: number) => 
  api.get<Blog[]>(`/users/${userId}/blogs`);

export default api;