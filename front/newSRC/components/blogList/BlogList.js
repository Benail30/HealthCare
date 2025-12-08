import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../redux/actions/blogActions'; 
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer'; 
import './BlogList.css';
import dummyBlogs from './dummyBlogs'; 
import { FaComment } from 'react-icons/fa';
import Navbar from '../Navbar';

const BlogList = () => {
  const dispatch = useDispatch();
  // Remove or comment out these lines if you're not fetching data immediately
  // const { blogs, loading, error } = useSelector((state) => state.blog);

  // useEffect(() => {
  //   dispatch(fetchBlogs());
  // }, [dispatch]);

  const blogs = dummyBlogs; // Temporary replacement

  // Uncomment these lines when you start fetching data from the API
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className="blog-list-page">
      <Navbar />
      <div className="blog-grid">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            {blog.ImageUrl && (
              <img src={blog.ImageUrl} alt={blog.Title} className="blog-image" />
            )}
            <div className="blog-content">
            <div className="title-with-icon">
              <h2>{blog.Title}</h2>
              <FaComment className="comment-icon" />
              </div>
              <p>{blog.Text.substring(0, 200)}...</p>
              
              <Link to={`/bloglist/${blog.id}`} className="read-more">Read More</Link>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default BlogList;
