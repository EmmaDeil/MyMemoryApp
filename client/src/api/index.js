import axios from 'axios';
import { API_BASE_URL, REQUEST_TIMEOUT, STORAGE_KEYS, ERROR_MESSAGES } from './constants.js';

// Create axios instance with base configuration
const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      window.location.href = '/auth';
    }
    
    if (error.response?.status === 403) {
      console.error('Access forbidden');
    }
    
    if (error.response?.status >= 500) {
      console.error('Server error occurred');
    }
    
    if (!error.response) {
      // Network error
      error.message = ERROR_MESSAGES.NETWORK_ERROR;
    }
    
    return Promise.reject(error);
  }
);

// Export the configured axios instance
export default API;

// Export all API modules
export { default as authAPI } from './auth.js';
export { default as postsAPI } from './posts.js';
export { default as apiUtils } from './utils.js';
export * from './constants.js';
export * from './types.ts';