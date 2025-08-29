import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from '../../api/axiosInstance'
import type {RootState} from '../../app/store'

export interface Blog {
    _id: string;
    title: string;
    desc: string;
    tags: string[];
    location: string;
    images: string[]
    videos: string[]
    user: {
        _id: string;
        name: string;
        email: string;
    };
    createdAt: string;
    updatedAt: string;
}

interface BlogState {
    blogs: Blog[];
    userBlogs: Blog[];
    singleBlog: Blog | null;
    loading: boolean;
    error?: string;
}

const initialState: BlogState = {
    blogs: JSON.parse(localStorage.getItem('Blogs') || '[]'),
    userBlogs: JSON.parse(localStorage.getItem('userBlogs') || '[]'),
    singleBlog: null,
    loading: false,
    error: undefined,
}

export const fetchBlogs = createAsyncThunk<Blog[], void, {rejectValue: string}>(
    'blogs/fetchBlogs',
    async(_, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get('/blogs')
            return response.data as Blog[]
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch Blogs')
        }
    }
)

export const fetchBlogsByUser = createAsyncThunk<Blog[], string, {rejectValue: string}>(
    'blogs/fetchBlogsByUser',
    async(userId, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(/blogs/user/${userId})
            return response.data as Blog[]
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user Blogs')
        }
    }
)


export const fetchUserBlogById = createAsyncThunk<
  Blog,
  { userId: string; blogId: string },
  { rejectValue: string }
>(
  'blogs/fetchUserBlogById',
  async ({ userId, blogId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(/blogs/user/${userId}/${blogId});
      return response.data as Blog;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch Blog');
    }
  }
);

export const fetchBlogById = createAsyncThunk<Blog, string, { rejectValue: string }>(
  'blogs/fetchBlogById',
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(/Blogs/${blogId});
      return response.data as Blog;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch Blog');
    }
  }
);

export const createBlog = createAsyncThunk<
  Blog,
  {
    title: string;
    description: string;
    price: number;
    location: string;
    images?: string[];
    videos?: string[];
  },
  { rejectValue: string }
>(
  'blogs/createBlog',
  async (newBlog, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/blogs/create', newBlog);
      console.log('Create Blog response:', response.data);
      return response.data as Blog;
    } catch (err: any) {
      console.error('Create Blog error:', err.response?.data);
      return rejectWithValue(err.response?.data?.message || 'Failed to create Blog');
    }
  }
);

export const updateBlog = createAsyncThunk<
  Blog,
  {
    id: string;
    updates: Partial<Omit<Blog, '_id' | 'user' | 'createdAt' | 'updatedAt'>>;
  },
  { rejectValue: string }
>(
  'blogs/updateBlog',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(/blogs/${id}, updates);
      console.log('Update Blog response:', response.data);
      return response.data as Blog;
    } catch (err: any) {
      console.error('Update Blog error:', err.response?.data);
      return rejectWithValue(err.response?.data?.message || 'Failed to update Blog');
    }
  }
);

export const deleteBlog = createAsyncThunk<string, string, { rejectValue: string }>(
  'blogs/deleteBlog',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(/blogs/${id});
      console.log('Delete Blog response:', response.data);
      return id;
    } catch (err: any) {
      console.error('Delete Blog error:', err.response?.data);
      return rejectWithValue(err.response?.data?.message || 'Failed to delete Blog');
    }
  }
);

// Slice
const BlogSlice = createSlice({
  name: 'Blogs',
  initialState,
  reducers: {
    clearError(state) {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<Blog[]>) => {
        state.loading = false;
        state.blogs = action.payload;
        localStorage.setItem('Blogs', JSON.stringify(action.payload));
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Blogs by User
      .addCase(fetchBlogsByUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchBlogsByUser.fulfilled, (state, action: PayloadAction<Blog[]>) => {
        state.loading = false;
        state.userBlogs = action.payload; 
        localStorage.setItem('userBlogs', JSON.stringify(action.payload));
      })
      .addCase(fetchBlogsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch User Blog by ID
      .addCase(fetchUserBlogById.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchUserBlogById.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.loading = false;
        state.singleBlog = action.payload;
        const index = state.userBlogs.findIndex((l) => l._id === action.payload._id);
        if (index !== -1) state.userBlogs[index] = action.payload;
        else state.userBlogs.unshift(action.payload);
        localStorage.setItem('userBlogs', JSON.stringify(state.userBlogs));
      })
      .addCase(fetchUserBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Single Blog
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchBlogById.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.loading = false;
        state.singleBlog = action.payload;
        const index = state.blogs.findIndex((l) => l._id === action.payload._id);
        if (index !== -1) state.blogs[index] = action.payload;
        else state.blogs.unshift(action.payload);
        localStorage.setItem('Blogs', JSON.stringify(state.blogs));
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Blog
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(createBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.loading = false;
        state.userBlogs.unshift(action.payload); 
        state.blogs.unshift(action.payload); 
        localStorage.setItem('userBlogs', JSON.stringify(state.userBlogs));
        localStorage.setItem('Blogs', JSON.stringify(state.blogs));
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Blog
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.loading = false;
        const userIndex = state.userBlogs.findIndex((l) => l._id === action.payload._id);
        if (userIndex !== -1) state.userBlogs[userIndex] = action.payload;
        const globalIndex = state.blogs.findIndex((l) => l._id === action.payload._id);
        if (globalIndex !== -1) state.blogs[globalIndex] = action.payload;
        if (state.singleBlog && state.singleBlog._id === action.payload._id) {
          state.singleBlog = action.payload;
        }
        localStorage.setItem('userBlogs', JSON.stringify(state.userBlogs));
        localStorage.setItem('Blogs', JSON.stringify(state.blogs));
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Blog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(deleteBlog.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.userBlogs = state.userBlogs.filter((l) => l._id !== action.payload);
        state.blogs = state.blogs.filter((l) => l._id !== action.payload);
        if (state.singleBlog && state.singleBlog._id === action.payload) {
          state.singleBlog = null;
        }
        localStorage.setItem('userBlogs', JSON.stringify(state.userBlogs));
        localStorage.setItem('Blogs', JSON.stringify(state.blogs));
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectBlogs = (state: RootState) => state.blogs.blogs;
export const selectUserBlogs = (state: RootState) => state.blogs.userBlogs; 
export const selectSingleBlog = (state: RootState) => state.blogs.singleBlog;
export const selectBlogsLoading = (state: RootState) => state.blogs.loading;
export const selectBlogsError = (state: RootState) => state.blogs.error;

export const { clearError } = BlogSlice.actions;
export default BlogSlice.reducer;