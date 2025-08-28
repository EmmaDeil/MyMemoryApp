import axiosInstance from "axios";

interface BlogPayLoad {
   title: string;
   desc: string;
   tags: string[];
   likeCount: number;
   image: string[];
   video: string[];
   location: string;
}

const getAllBlogs = async () => {
   const response = await axiosInstance.get('/blogs/get');
   return response.data;
};

const getBlogByUser = async (userId: string) => {
   const response = await axiosInstance.get(`/blog/user/${userId}`);
   return response.data;
};

const getUserBlogById = async (userId: string, blogId: string) => {
   const response = await axiosInstance.get(`/blog/user/${userId}/${blogId}`);
   return response.data;
};

const getBlogsById = async (blogId: string) => {
   const response = await axiosInstance.get(`/blog/${blogId}`);
   return response.data;
};

const createBlogPost = async (data: BlogPayLoad) => {
   const response = await axiosInstance.post('/blog', data);
   return response.data;
};

const updateBlogPost = async (userId: string, data: BlogPayLoad) => {
   const response = await axiosInstance.put(`/blog/${userId}`, data);
   return response.data;
};

const deleteBlogPost = async (id: string) => {
   const response = await axiosInstance.delete(`/blog/${id}`);
   return response.data;
};


export {
   createBlogPost,
   getBlogByUser,
   getUserBlogById,
   getAllBlogs,
   getBlogsById,
   updateBlogPost,
   deleteBlogPost
};
