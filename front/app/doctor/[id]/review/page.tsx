'use client'
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { FaPencil } from "react-icons/fa6";
import "../../../styles/Doctorreviews.css";
import axios from 'axios';

interface StarRatingProps {
  rating: number;
}

interface Review {
  name: string;
  occupation: string;
  date: string;
  review: string;
  image: string;
  rating: number;
}

interface DoctorDetails {
  name: string;
  occupation: string;
  image: string;
  rating: number;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [doctorDetails, setDoctorDetails] = useState<DoctorDetails[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/review/')
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });

    axios.get('http://localhost:3001/api/doctorinf/')
      .then(response => {
        setDoctorDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctor details:', error);
      });
  }, []);

  const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i} className="star">&#9733;</span>);
      } else {
        stars.push(<span key={i} className="star">&#9734;</span>);
      }
    }
    return <div className="star-rating">{stars}</div>;
  };

  return (
    <div className="reviews">
      <div className="profile">
        My Profile
      </div>
      <div className="doctor-container">
        {doctorDetails.map((doctor, index) => (
          <div key={index} className="doctor-details">
            <img className="img" src={doctor.image} alt={doctor.name} />
            <div className="doctor-info">
              <h1>{doctor.name}</h1>
              <p>{doctor.occupation}</p>
              <button className="batouna"><FaPencil /> Edit Profile</button>
              <StarRating rating={doctor.rating} />
            </div>
          </div>
        ))}
      </div>
      <div className="toolbar-container">
        <div className="toolbar">
          <button>My Profile</button>
          <button>Change Password</button>
          <button>Notification</button>
          <button>Reviews</button>
        </div>
      </div>
      <div className="reviews-container">
        <div className="review-list">
          {reviews.map((review, index) => (
            <div key={index} className="review">
              <div className="review-header">
                <div className="review-name">{review.name}</div>
                <div className="review-occupation">{review.occupation}</div>
                <div className="review-date">{review.date}</div>
              </div>
              <div className="review-body">{review.review}</div>
              <img src={review.image} alt={review.name} className="review-image" />
              <StarRating rating={review.rating} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
