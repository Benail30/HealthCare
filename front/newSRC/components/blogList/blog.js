import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import { useParams } from 'react-router-dom';
import './BlogDetail.css';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../footer/Footer';

function OneBlog() {
  let { blogId } = useParams();
  const [blog, setBlog] = useState({});
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getOne(blogId);
    fetchComments();
  }, [blogId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/comments/all');
      console.log(response.data);
      setComments(response.data.filter(comment => comment.BlogId === parseInt(blogId)));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const getOne = (id) => {
    axios.get(`http://localhost:3000/api/blogs/${id}`)
      .then(response => {
        console.log(response.data);
        setBlog(response.data);
      })
      .catch(error => {
        console.error('Error fetching blog:', error);
      });
  };

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const body = {
        BlogId: blogId,
        author: name,
        comment: comment,
        timestamp: new Date().toISOString(),
        UserId: localStorage.getItem('userId') || 1
      };
      console.log(body);
      const response = await axios.post('http://localhost:3000/api/comments', body);
      console.log('Comment posted:', response.data);
      // Update comments
      fetchComments();
      setComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <h2> Lorem Ipsum</h2>
        <br />
        <p className='textupBlogD'>Great doctor if you need your family member to get effective immediate assistance, <br />emergency treatment or a simple consultation.</p>
        <p> Calvin Carlo 29th Nov 2023</p>
      </div>

      <div className='SideBarr'>
        <Box
          height={500}
          width={300}
          my={4}
          display="flex"
          alignItems="center"
          gap={4}
          p={2}
          sx={{ border: '2px solid grey' }}
        >
          <div className="searchBlog">
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Search"
            />
          </div>
          <div>
            <div className='LastBlogsDiv'>
              <img className='LastBlogs1' src='https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fblog%2F07.jpg&w=1920&q=75' />
              <p className='LastBlogsP'>Consultant Business</p>
            </div>
            <div className='LastBlogsDiv'>
              <img className='LastBlogs2' src='https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fblog%2F08.jpg&w=1920&q=75' />
              <p className='LastBlogsP'>Look On The Glorious Balance</p>
            </div>
            <div className='LastBlogsDiv'>
              <img className='LastBlogs3' src='https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fblog%2F01.jpg&w=1920&q=75' />
              <p className='LastBlogsP'>Research Financial.</p>
            </div>
          </div>
        </Box>
      </div>
      <img className='imgBlogDetail' src='https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fblog%2F07.jpg&w=1920&q=75' />

      <div >
        <p className='textDownBlogd'>This is required when, for example, the final text is not yet available. Dummy text is also known as fill text.<br /> It is said that song composers of the past used dummy texts as lyrics when writing melodies in order<br />
          to have a ready-made text to sing with the melody. Dummy texts have been in use by typesetters
          <br />
          since the 16th century.
          <br />
          Due to its widespread use as filler text for layouts, non-readability is of
          <br />
          great importance: human perception is tuned to recognize certain patterns and repetitions in texts.
          <br />
          For this reason, dummy text usually consists of a more or less random series of words or syllables.</p>
      </div>

      <div className='Comment'>
        <hr />
        <h3>Comments:</h3>
        {comments.map(comment => (
          <div key={comment.id}>
            <p><strong>{comment.author}</strong> - {comment.timestamp}</p>
            <p className='content'>{comment.comment}</p>
          </div>
        ))}
      </div>
      <div className='Leave-Comment'>
        <h3 className='Leave-CommentN'>Leave Comment :</h3>
        <form className='form'>
          Your Comment
          <input className='yout-comment' type="text" name="name" placeholder="your Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div>
            <label>
              Name:
              <input className='name' type="text" name="name" placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Email:
              <input className='email' type="text" name="email" placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <input className='send' onClick={(e) => postComment(e)} type="submit" value="send Message " />
        </form>
      </div>
      {/* <Footer /> */}
    </div>
  )
}
export default OneBlog;
