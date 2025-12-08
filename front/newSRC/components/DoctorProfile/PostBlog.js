import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBlog } from '../redux/actions/blogActions';
import './PostBlog.css';
import MenuDoctor from '../menuDoctor/MenuDoctor';
import { Menu } from 'antd';

const PostBlog = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const dispatch = useDispatch();

    const openCloudinaryWidget = () => {
        window.cloudinary.openUploadWidget({ 
            cloudName: 'your_cloud_name', 
            uploadPreset: 'your_preset' 
        }, (error, result) => {
            if (!error && result && result.event === "success") { 
                console.log('Done! Here is the image info: ', result.info); 
                setImageUrl(result.info.secure_url);
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addBlog({ title, text, imageUrl }));
        setTitle('');
        setText('');
        setImageUrl('');
    };

    return ( <div>
          <div className="post-blog-card">
            <h2 className="post-blog-header">Create Post</h2>
            <form className="post-blog-form" onSubmit={handleSubmit}>
                <label htmlFor="title" className="post-blog-label">Title</label>
                <input 
                    id="title"
                    type="text" 
                    placeholder="Enter your blog title here" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <label htmlFor="text" className="post-blog-label">Text</label>
                <textarea 
                    id="text"
                    placeholder="What's on your mind?" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)}
                />
                <label htmlFor="image-upload" className="image-upload-label">Upload Image</label>
                <button id="image-upload" type="button" onClick={openCloudinaryWidget} className="upload-image-btn">Choose an Image</button>
                <input 
                    type="hidden" 
                    value={imageUrl} 
                />
                <button type="submit" className="submit-blog-btn">Post Blog</button>
            </form>
        </div>
        </div>
    );
};

export default PostBlog;