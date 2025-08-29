import React, { useEffect } from 'react'
import { fetchBlogs, selectBlogs, selectBlogsLoading, selectBlogsError } from '../../features/blog/blogSlice';
import 'style.css'
import { useAppSelector, useAppDispatch } from '../../app/hooks';

interface Blog{
   _id: string;
   title: string;
   desc: string;
   tags: string[];
   image: string[];
   videos: string[];
   location: string;
   user: {
      _id: string;
      name: string;
      email: string;
   };
   createdAt: string;
   updatedAt: string;
}

const GetBlogs = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const blogs = useAppSelector(selectBlogs);
const loading = useAppSelector(selectBlogsLoading);
const error = useAppSelector(selectBlogsError);

useEffect(() => {
   dispatch(fetchBlogs());
}, [dispatch]);

      const handleViewMore = (blogId: string) => {
   console.log('Navigating to general blogs details for', blogId);
   navigate(`/blog/${blogId}`);
};

return (
   <div className="all-blogs-page">
      <h2>Explore Blogs</h2>
      {loading && <p>Loading blogs...</p>}
      {error && <p className='error'>Error: {error}</p>}

      <div className="blog-grid">
            {blogs.map((blog: Blog) => (
               <div className="listing-card" key ={blog._id}>
               <div className="blog-image">
                  {blog.image && blog.image.length > 0 && (
                     <img src={blog.image[0]} alt={blog.title} />
                  ): (
                     <img src="placeholder.jpg" alt="no image available" />
                  )}
               </div>

               <div className="blog-contents">
                  <h2>{blog.title}</h2>
                  <p><strong>Desc:</strong>{blog.desc ? `${blog.desc.slice(0, 200)}...` : blog.desc}</p>
                  <p><strong>Location:</strong> {blog.location}</p>
                  <p><strong>Tags:</strong> {blog.tags.join(', ')}</p>
                  <button className='view-more-button' onClick={() => handleViewMore(blog._id)}>View More</button>
               </div>
            </div>
            )
            )}
         </div>
      </div>
   );
};

export default GetBlogs;
