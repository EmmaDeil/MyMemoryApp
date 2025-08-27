// API Types for TypeScript support
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  message: string;
  creator: string;
  tags?: string[];
  selectedFile?: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  user: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

export interface PostsResponse {
  posts: Post[];
  totalPages: number;
  currentPage: number;
  total: number;
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: any[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
}

export interface PostCreateData {
  title: string;
  message: string;
  tags?: string[];
  selectedFile?: File;
}

export interface PostUpdateData extends Partial<PostCreateData> {}

export interface PostFilters {
  tags?: string;
  creator?: string;
  sortBy?: 'createdAt' | 'likes' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface SearchParams {
  q?: string;
  tags?: string[];
  creator?: string;
  dateFrom?: string;
  dateTo?: string;
}
