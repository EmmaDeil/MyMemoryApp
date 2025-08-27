import API from './index.js';

// Posts/Memories API endpoints
export const postsAPI = {
  // Get all posts/memories
  getAllPosts: async (page = 1, limit = 10, filters = {}) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...filters,
      });
      
      const response = await API.get(`/posts?${params}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch posts';
    }
  },

  // Get posts by user
  getUserPosts: async (userId, page = 1, limit = 10) => {
    try {
      const response = await API.get(`/posts/user/${userId}?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch user posts';
    }
  },

  // Get current user's posts
  getMyPosts: async (page = 1, limit = 10) => {
    try {
      const response = await API.get(`/posts/my-posts?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch your posts';
    }
  },

  // Get single post by ID
  getPostById: async (postId) => {
    try {
      const response = await API.get(`/posts/${postId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch post';
    }
  },

  // Create new post/memory
  createPost: async (postData) => {
    try {
      const formData = new FormData();
      
      // Append text fields
      Object.keys(postData).forEach(key => {
        if (key !== 'selectedFile' && postData[key] !== undefined) {
          formData.append(key, postData[key]);
        }
      });
      
      // Append file if exists
      if (postData.selectedFile) {
        formData.append('selectedFile', postData.selectedFile);
      }
      
      const response = await API.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create post';
    }
  },

  // Update post
  updatePost: async (postId, updateData) => {
    try {
      const formData = new FormData();
      
      // Append text fields
      Object.keys(updateData).forEach(key => {
        if (key !== 'selectedFile' && updateData[key] !== undefined) {
          formData.append(key, updateData[key]);
        }
      });
      
      // Append file if exists
      if (updateData.selectedFile) {
        formData.append('selectedFile', updateData.selectedFile);
      }
      
      const response = await API.put(`/posts/${postId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update post';
    }
  },

  // Delete post
  deletePost: async (postId) => {
    try {
      const response = await API.delete(`/posts/${postId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to delete post';
    }
  },

  // Like/Unlike post
  likePost: async (postId) => {
    try {
      const response = await API.patch(`/posts/${postId}/like`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to like post';
    }
  },

  // Add comment to post
  addComment: async (postId, comment) => {
    try {
      const response = await API.post(`/posts/${postId}/comments`, { comment });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to add comment';
    }
  },

  // Update comment
  updateComment: async (postId, commentId, comment) => {
    try {
      const response = await API.put(`/posts/${postId}/comments/${commentId}`, { comment });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update comment';
    }
  },

  // Delete comment
  deleteComment: async (postId, commentId) => {
    try {
      const response = await API.delete(`/posts/${postId}/comments/${commentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to delete comment';
    }
  },

  // Search posts
  searchPosts: async (query, filters = {}) => {
    try {
      const params = new URLSearchParams({
        q: query,
        ...filters,
      });
      
      const response = await API.get(`/posts/search?${params}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to search posts';
    }
  },

  // Get posts by tags
  getPostsByTags: async (tags, page = 1, limit = 10) => {
    try {
      const response = await API.get(`/posts/tags?tags=${tags.join(',')}&page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch posts by tags';
    }
  },

  // Get trending posts
  getTrendingPosts: async (timeframe = 'week', limit = 10) => {
    try {
      const response = await API.get(`/posts/trending?timeframe=${timeframe}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch trending posts';
    }
  },

  // Report post
  reportPost: async (postId, reason) => {
    try {
      const response = await API.post(`/posts/${postId}/report`, { reason });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to report post';
    }
  },

  // Get post analytics (for post owner)
  getPostAnalytics: async (postId) => {
    try {
      const response = await API.get(`/posts/${postId}/analytics`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch post analytics';
    }
  },
};

export default postsAPI;