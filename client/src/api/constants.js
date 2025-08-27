// API Constants and Configuration

// Base URLs
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
export const UPLOAD_URL = `${API_BASE_URL}/uploads`;

// API Endpoints
export const ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    REGISTER: '/users/register',
    LOGIN: '/users/login',
    LOGOUT: '/users/logout',
    PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
    FORGOT_PASSWORD: '/users/forgot-password',
    RESET_PASSWORD: '/users/reset-password',
    VERIFY_EMAIL: '/users/verify-email',
    DELETE_ACCOUNT: '/users/account',
  },
  
  // Posts endpoints
  POSTS: {
    GET_ALL: '/posts',
    GET_BY_ID: (id) => `/posts/${id}`,
    GET_USER_POSTS: (userId) => `/posts/user/${userId}`,
    GET_MY_POSTS: '/posts/my-posts',
    CREATE: '/posts',
    UPDATE: (id) => `/posts/${id}`,
    DELETE: (id) => `/posts/${id}`,
    LIKE: (id) => `/posts/${id}/like`,
    SEARCH: '/posts/search',
    TRENDING: '/posts/trending',
    BY_TAGS: '/posts/tags',
    REPORT: (id) => `/posts/${id}/report`,
    ANALYTICS: (id) => `/posts/${id}/analytics`,
  },
  
  // Comments endpoints
  COMMENTS: {
    ADD: (postId) => `/posts/${postId}/comments`,
    UPDATE: (postId, commentId) => `/posts/${postId}/comments/${commentId}`,
    DELETE: (postId, commentId) => `/posts/${postId}/comments/${commentId}`,
  },
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};

// Request timeout (in milliseconds)
export const REQUEST_TIMEOUT = 10000;

// File upload constraints
export const FILE_CONSTRAINTS = {
  MAX_SIZE_MB: 10,
  MAX_SIZE_BYTES: 10 * 1024 * 1024,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/ogg'],
  ALLOWED_FILE_TYPES: [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'video/mp4', 'video/webm', 'video/ogg'
  ],
};

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

// Sort options
export const SORT_OPTIONS = {
  NEWEST: { sortBy: 'createdAt', sortOrder: 'desc' },
  OLDEST: { sortBy: 'createdAt', sortOrder: 'asc' },
  MOST_LIKED: { sortBy: 'likes', sortOrder: 'desc' },
  ALPHABETICAL: { sortBy: 'title', sortOrder: 'asc' },
};

// Cache duration (in milliseconds)
export const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000,    // 5 minutes
  MEDIUM: 30 * 60 * 1000,  // 30 minutes
  LONG: 60 * 60 * 1000,    // 1 hour
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access forbidden.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  FILE_TOO_LARGE: `File size must be less than ${FILE_CONSTRAINTS.MAX_SIZE_MB}MB.`,
  INVALID_FILE_TYPE: 'Invalid file type. Please select an image or video file.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Welcome back!',
  REGISTER_SUCCESS: 'Account created successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  POST_CREATED: 'Memory created successfully!',
  POST_UPDATED: 'Memory updated successfully!',
  POST_DELETED: 'Memory deleted successfully.',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  EMAIL_SENT: 'Email sent successfully!',
  COMMENT_ADDED: 'Comment added successfully!',
  COMMENT_UPDATED: 'Comment updated successfully!',
  COMMENT_DELETED: 'Comment deleted successfully.',
};

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
  RECENT_SEARCHES: 'recent_searches',
};

// Feature flags
export const FEATURES = {
  COMMENTS_ENABLED: true,
  LIKES_ENABLED: true,
  SHARING_ENABLED: true,
  ANALYTICS_ENABLED: true,
  REPORTS_ENABLED: true,
  EMAIL_VERIFICATION_REQUIRED: false,
  REGISTRATION_ENABLED: true,
};

export default {
  API_BASE_URL,
  UPLOAD_URL,
  ENDPOINTS,
  HTTP_STATUS,
  REQUEST_TIMEOUT,
  FILE_CONSTRAINTS,
  PAGINATION,
  SORT_OPTIONS,
  CACHE_DURATION,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  STORAGE_KEYS,
  FEATURES,
};
