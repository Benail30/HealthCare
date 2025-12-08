export const fetchBlogs = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3000/api/blogs/all'); 
    const blogs = await response.json();
    dispatch({
      type: 'FETCH_BLOGS_SUCCESS',
      payload: blogs,
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_BLOGS_FAILURE',
      error,
    });
  }
};


export const addBlog = (blogData) => ({
  type: 'ADD_BLOG',
  payload: blogData,
});

