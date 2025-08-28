import axiosInstance from "axios";

interface BlogPayLoad {
   title: string;
   desc: string;
   tags: string[];
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

const createBlogs = async (data: BlogPayLoad) => {
   const response = await axiosInstance.post('blog/create', data);
   return response.data;
};

const updateBlogs = async (userId: string, data: Partial<BlogPayLoad>) => {
   const response = await axiosInstance.put(`/blog/update/${userId}`, data);
   return response.data;
};

const deleteBlog = async (id: string) => {
   const response = await axiosInstance.delete(`/blog/delete/${id}`);
   return response.data;
};

const likeBlog = async (id: string) => {
   const response = await axiosInstance.post(`/blog/like/${id}`);
   return response.data;
};


export {
   createBlogs,
   getBlogByUser,
   getUserBlogById,
   getAllBlogs,
   getBlogsById,
   updateBlogs,
   deleteBlog,
   likeBlog
};
