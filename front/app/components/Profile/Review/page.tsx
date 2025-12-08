import React from "react";
import { FaPencil } from "react-icons/fa6";
import "../../../styles/Doctorreviews.css";

interface StarRatingProps {
  rating: number;
}

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

const Reviews = () => {
  const reviews = [
    {
      name: "Ronald Richards",
      occupation: "Engineer",
      date: "8 Jun, 2021",
      review:
        "Thank you to Dr. Stephen Conley and staff for a great experience right from the start. Everyone made me feel comfortable and the outcome was great. If you need heart surgery check out Dr. Stephen.",
      rating: 4.5,
      image: "https://img.freepik.com/free-photo/medium-shot-smiley-man-posing_23-2148243624.jpg",
    },
    {
      name: "Annette Black",
      occupation: "Teacher",
      date: "8 Jun, 2021",
      review:
        "Dr. Stephen Conley did a great job on my knee! After my injection I was able to walk again without pain. Before His Injection I had 24 hour round the clock pain. Now, I can walk without any discomfort. Thank You Dr. Stephen",
      rating: 5,
      image: "https://img.freepik.com/free-photo/intriguing-mysterious-handsome-young-european-man-looks-curiously_273609-17036.jpg",
    },
    {
      name: "Angelina Jully",
      occupation: "Teacher",
      date: "8 Jun, 2021",
      review:
        "Excellent cardiologist, my husband and i have both had surgery and ongoing care from him over the years, the medical technology used is state of the art as well, continue to highly recommend.",
      rating: 5,
      image: "https://img.freepik.com/free-photo/close-up-brunette-woman-looking-camera-gray_171337-1000.jpg",
    },
    {
      name: "Jane Cooper",
      occupation: "Teacher",
      date: "8 Jun, 2021",
      review:
        "Excellent cardiologist, my husband and i have both had surgery and ongoing care from him over the years, the medical technology used is state of the art as well, continue to highly recommend.",
      rating: 5,
      image: "https://img.freepik.com/premium-photo/portrait-young-man-against-blue-background_1048944-17038912.jpg",
    },
  ];
  const doctorDetails = {
    name: "Dr. Stephen Conley",
    occupation: "Cardiologist",
    image: "https://i.pinimg.com/736x/d6/98/e4/d698e40a01d77ed5e3394851338a4c5c.jpg",
    rating: 95,
  };

  return (
    <div className="reviews">
      <div className="profile">
        My Profile
      </div>
      <div className="doctor-container">
        <div className="doctor-details">
          <img className="img" src={doctorDetails.image} alt={doctorDetails.name} />
          <div className="doctor-info">
            <h1>{doctorDetails.name}</h1>
            <p>{doctorDetails.occupation}</p>
            <button className="batouna"><FaPencil /> Edit Profile</button>
            <StarRating rating={doctorDetails.rating} />
          </div>
        </div>
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
