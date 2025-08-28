import API from './index.js';
import axios from 'axios';

// Auth API endpoints
interface AuthPayload {
  email: string;
  password: string;
  name?: string;
}

export const login = async (data: AuthPayload) => {
  const response = await API.post('/auth/login', data);
  return response.data;
  };

  export const register = async (userData: AuthPayload) => {
    const response = await API.post('/auth/register', userData);
    return response.data;
  };

export const authAPI = {
  // User registration
  register: async (userData: AuthPayload) => {
    try {
      const response = await API.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  },

  // User login
  login: async (credentials) => {
    try {
      const response = await API.post('/users/login', credentials);
      const { token, user } = response.data;
      
      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  },

  // User logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user profile
  getProfile: async () => {
    try {
      const response = await API.get('/users/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get profile';
    }
  },

  // Update user profile
  updateProfile: async (updateData) => {
    try {
      const response = await API.put('/users/profile', updateData);
      const updatedUser = response.data.user;
      
      // Update stored user data
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update profile';
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await API.put('/users/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to change password';
    }
  },

  // Delete account
  deleteAccount: async () => {
    try {
      const response = await API.delete('/users/account');
      // Clear local storage on account deletion
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to delete account';
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await API.post('/users/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to send reset email';
    }
  },

  // Reset password
  resetPassword: async (resetToken, newPassword) => {
    try {
      const response = await API.post('/users/reset-password', {
        token: resetToken,
        password: newPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to reset password';
    }
  },

  // Verify email
  verifyEmail: async (verificationToken) => {
    try {
      const response = await API.post('/users/verify-email', {
        token: verificationToken,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Email verification failed';
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Get stored user data
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default authAPI;