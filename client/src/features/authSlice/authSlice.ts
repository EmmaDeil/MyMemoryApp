import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PayLoadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '../../axiosInstance';

interface User {
   _id: string;
   name: string;
   email: string;
}

interface AuthState{
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
}

export const registerUser = createAsyncThunk(
   'auth/registerUser',
   async ({ name, email, password }: { name: string; email: string; password: string },
      { rejectWithValue }
   ) => {
      try {
         const response = await axiosInstance.post('/auth/register', { name, email, password });
         return response.data;
      } catch (error : any) {
         return rejectWithValue(error.response?.data?.message || 'Registration failed');
      }
   }
);

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      login: (state, action) => {
         state.user = action.payload.user;
         state.token = action.payload.token;
      },
      logout: (state) => {
         state.user = null;
         state.token = null;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
         })
         .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

