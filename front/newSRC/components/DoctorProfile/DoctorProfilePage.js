import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorInfo from '../DoctorInfo/DoctorInfo';
import Rating from 'react-rating-stars-component';
import { Modal, Button, Form } from 'react-bootstrap';
import profileImage from './image_16.png';
import './DoctorProfile.css';
import Reviews from '../Reviews';

const DoctorProfilePage = () => {
  const [doctorData, setDoctorData] = useState({
    name: "Dr. Zven Den",
    specialty: "Cardiology",
    imageUrl: "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
    ratings: 4.2,
    reviews: [
      { author: "Jane Smith", comment: "Very thorough and kind.", rating: 5 },
      { author: "Doe John", comment: "Helpful and informative.", rating: 4 },
    ],
    appointments: [
      { name: "Alice Wonderland", date: "2024-04-15, 10:00 AM", description: "Routine check-up", rating: 4 },
      { name: "Charlie Bucket", date: "2024-04-16, 11:00 AM", description: "Consultation", rating: 5 },
      { name: "Peter Pan", date: "2024-04-17, 09:00 AM", description: "Follow-up", rating: 4 },
      { name: "Wendy Darling", date: "2024-04-18, 01:00 PM", description: "Vaccination", rating: 5 },
      { name: "Captain Hook", date: "2024-04-19, 02:00 PM", description: "Surgery consultation", rating: 3 },
    ]
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isReview, setIsReview] = useState(false);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
        const user = JSON.parse(userString);
        user.appointments = [
          { name: "Alice Wonderland", date: "2024-04-15, 10:00 AM", description: "Routine check-up", rating: 4 },
          { name: "Charlie Bucket", date: "2024-04-16, 11:00 AM", description: "Consultation", rating: 5 },
        ]
        setDoctorData(user);
    } else {
        console.log('No user found in localStorage.');
    }
  }, [searchQuery, showPasswordModal, showProfileModal, isReview])

  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleShowPasswordModal = () => setShowPasswordModal(true);
  const handleClosePasswordModal = () => setShowPasswordModal(false);
  const handleShowProfileModal = () => setShowProfileModal(true);
  const handleCloseProfileModal = () => setShowProfileModal(false);

  return (
    <div className="doctor-profile-container my-5">
      <img src={profileImage} alt="Profile" className="doctor-profile-picture" />
      <div className="row">
        <div className="col-md-3">
          <DoctorInfo
            name={doctorData.name}
            specialty={doctorData.specialty}
            picture={doctorData.imageUrl}
            ratings={doctorData.ratings}
          />
        </div>
        <div className="col-md-9">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search appointments..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
           <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <Button variant="primary" onClick={handleShowProfileModal} className="me-2">My Profile</Button>
            </li>
            <li className="nav-item">
              <Button variant="primary" onClick={handleShowPasswordModal} className="me-2">Change Password</Button>
              <Button variant="primary" onClick={() => setIsReview(false)}>Appointments</Button>
            </li>
            <li className="nav-item">
              <Button variant="primary" onClick={() => navigate('/postblog')} className="me-2">Post Blog</Button>
            </li>
            <li className="nav-item">
              <Button variant="primary" onClick={() => navigate('/notifications')} className="me-2">Notifications</Button>
            </li>
            <li className="nav-item">
              <Button variant="primary" onClick={() => setIsReview(true)}>Reviews</Button>
            </li>
          </ul>
          <div className="mt-4">
            <h5>Filtered Appointments</h5>
            {isReview ? <Reviews /> : doctorData.appointments.filter(appointment => appointment.name.toLowerCase().includes(searchQuery.toLowerCase()) || appointment.description.toLowerCase().includes(searchQuery.toLowerCase())).map((appointment, index) => (
              <div key={index} className="doctor-profile-card card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{appointment.name}</h5>
                  <p className="card-text">{appointment.description}</p>
                  <p className="card-text"><small className="text-muted">{appointment.date}</small></p>
                  <Rating value={appointment.rating} edit={false} size={24} activeColor="#007E85" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal show={showPasswordModal} onHide={handleClosePasswordModal}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="new-password">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="" />
            </Form.Group>
            <Form.Group controlId="confirm-new-password">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control type="password" placeholder="" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePasswordModal}>Close</Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showProfileModal} onHide={handleCloseProfileModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Doctor Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DoctorInfo
            name={doctorData.name}
            specialty={doctorData.specialty}
            picture={doctorData.imageUrl}
            ratings={doctorData.ratings}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseProfileModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DoctorProfilePage;