import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Rating from 'react-rating-stars-component';
import infoStyles from './DoctorInfo.module.css';
import { useSelector } from 'react-redux';

// const DoctorInfo = () => {
//   const { name, specialty, picture, ratings } = useSelector((state) => state.doctor.profile);

const DoctorInfo = ({ name, specialty, picture, ratings }) => {
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [imageUrl, setImageUrl] = useState(picture);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // const dispatch = useDispatch();
// const handleSubmit = (updatedProfileData) => {
  //   dispatch(setDoctorProfile(updatedProfileData));

  const handleImageUpload = () => {
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'YOUR_CLOUD_NAME',
        uploadPreset: 'YOUR_UPLOAD_PRESET',
        sources: ['local', 'url', 'camera'],
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Upload successful: ', result.info);
          setImageUrl(result.info.secure_url);
        }
      }
    ).open();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      username,
      phoneNumber,
      imageUrl,
    });
    handleCloseModal();
  };

  return (
    <div>
      <div className={`card text-center ${infoStyles.DoctorInfo}`}>
        <img src={imageUrl} alt={name} className={`card-img-top ${infoStyles.DoctorImage}`} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{specialty}</p>
          <Rating value={ratings} edit={false} size={24} activeColor="#007E85" />
          <Button style={{ backgroundColor: '#007E85', borderColor: '#007E85' }} className="mt-2" onClick={handleShowModal}>Edit Profile</Button>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Doctor Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </Form.Group>
            <div className="mb-3">
              <Button style={{ backgroundColor: '#007E85', borderColor: '#007E85' }} onClick={handleImageUpload}>Upload New Picture</Button>
              <div className="mt-3">Current Image URL: <a href={imageUrl} target="_blank" rel="noopener noreferrer">{imageUrl}</a></div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" style={{ borderColor: '#007E85' }} onClick={handleCloseModal}>Close</Button>
          <Button style={{ backgroundColor: '#007E85', borderColor: '#007E85' }} onClick={handleEditSubmit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DoctorInfo;
