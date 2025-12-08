import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Image } from 'cloudinary-react';
import '../css/test.css'; // Import CSS file

const ProfileComponent = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [userData, setUserData] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({
    Username: '',
    Email: '',
    bio: '',
    phoneNumber: '',
    Adress: '',
    Avatar: ''
  });
  const [avatarFile, setAvatarFile] = useState(null);
  // const [showImage, setShowImage] = useState(true); // State variable to toggle image visibility

  useEffect(() => {
    axios.get('http://localhost:3000/api/users/1')
      .then(response => {
        setUserData(response.data);
        setUpdatedUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  useEffect(() => {
    if (avatarFile) {
      handleSubmitAvatar();
    }
  }, [avatarFile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleSubmitAvatar = () => {
    if (avatarFile) {
      const formData = new FormData();
      formData.append('file', avatarFile);
      formData.append('upload_preset', 'pa4ezjqw');

      axios.post('https://api.cloudinary.com/v1_1/dfsyqvvim/image/upload', formData)
        .then(response => {
          setUpdatedUserData(prevData => ({
            ...prevData,
            Avatar: response.data.secure_url
          }));
          return axios.put('http://localhost:3000/api/users/update/1', updatedUserData);
        })
        .then(response => {
          console.log('Profile updated successfully:', response.data);
          setUserData(response.data);
          setAvatarFile(null); // Reset the avatarFile state after saving
        })
        .catch(error => {
          console.error('Error updating profile:', error);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:3000/api/users/update/1', updatedUserData)
      .then(response => {
        console.log('Profile updated successfully:', response.data);
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
  };

  return (
    <div className="container">
      <div className="profile-header">
        <div className="profile-img" onClick={() => document.getElementById('avatarInput').click()}>
          {/* <Image cloudName="dfsyqvvim" publicId={userData ? userData.Avatar : "default_avatar"} width="200" /> */}
        </div>
        <input id="avatarInput" type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
        {/* {showImage && <img className='statistics' src="https://images2.imgbox.com/bb/8c/BnsbhkLO_o.png" alt="Settings" />} Conditionally render the image */}
        <div className="profile-nav-info">
          <h3 className="user-name">{userData ? userData.Username : 'Loading...'}</h3>
          <div className="address">
            <p id="state" className="state">{userData ? userData.Adress : 'Loading...'}</p>
          </div>
        </div>
      </div>

      <div className="main-bd">
        <div className="left-side">
          <div className="profile-side">
            <p className="mobile-no"><i className="fa fa-phone"></i> Phone Number:{userData ? userData.phoneNumber : 'Loading...'}</p>
            <p className="user-mail"><i className="fa fa-envelope"></i>Email: {userData ? userData.Email : 'Loading...'}</p>
            <div className="user-bio">
              <h3>Bio</h3>
              <p className="bio">{userData ? userData.bio : 'Loading...'}</p>
            </div>
          </div>
        </div>
        <div className="right-side">
          <div className="nav">
            <ul>
              {/* <li id="seti" className={`user-setting ${activeTab === 2 ? 'active' : ''}`} onClick={() => { setActiveTab(2); setShowImage(false); }}>Settings</li> Toggle showImage when Settings clicked */}
            </ul>
          </div>
          <div className="profile-body">
            <div className="profile-settings tab" style={{ display: activeTab === 2 ? 'block' : 'none' }}>
              <div className="account-setting">
                <h1>Account Settings</h1>
                <div className='ss'>
                  <form onSubmit={handleSubmit}>
                    <input className="input-field" type="text" name="Username" value={updatedUserData.Username} onChange={handleInputChange} placeholder="Username" />
                    <input className="input-field" id="email" type="email" name="Email" value={updatedUserData.Email} onChange={handleInputChange} placeholder="Email" />
                    <textarea className="input-field" name="bio" value={updatedUserData.bio} onChange={handleInputChange} placeholder="Bio"></textarea>
                    <input className="input-field" id="phone" type="text" name="phoneNumber" value={updatedUserData.phoneNumber} onChange={handleInputChange} placeholder="Phone Number" />

                    <input className="input-field" type="text" name="Adress" value={updatedUserData.Adress} onChange={handleInputChange} placeholder="Address" />
                    <input className="input-field" id='pass' type="password" name="password" value={updatedUserData.Password} onChange={handleInputChange} placeholder="new password" />
                    <button className='button-3' type="submit">Update</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
