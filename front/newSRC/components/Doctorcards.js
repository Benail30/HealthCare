import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";
import axios from "axios";
import BookForm from "./BookForm";
import { Modal } from 'react-bootstrap';

function Doctorcards() {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const[doctor, setDoctor] = useState({})

  useEffect(() => {
    getDoctors();
  }, []);

  
  const getDoctors = async () => {
    const response = await axios.get("http://localhost:3000/api/users/all");
    console.log(response.data);
    const data = response.data.filter((doctor) => {
        return doctor.UserType === "Doctor";
    });
    setDoctors(data);
  };

  const handleBookClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1 className="ms-3" style={{ color: "#007E85", textAlign: "center" }}>
        Find Your Specialists
      </h1>
      <p className="text-muted para mb-0">
        Great doctor if you need your family member to get effective immediate
        assistance, emergency treatment or a simple consultation.
      </p>
      <div className="row">
        {doctors.map((doctor, index) => (
          <div className="col-xl-4 col-lg-4 col-md-6 mt-4 pt-2" key={index}>
            <div className="card border-0 rounded shadow overflow-hidden" style={{ width: "300px", height: "575px", marginLeft: "90px" }}>
              <img
                src="https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fdoctors%2F01.jpg&w=1920&q=75"
                className="card-img-top"
                alt="Doctor"
                style={{ transition: "transform 0.3s", cursor: "pointer" }}
                onMouseOver={(e) => {
                  e.target.style.transform = "scale(1.1)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "scale(1)";
                }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  Dr. {doctor.FirstName + " " + doctor.LastName}
                </h5>
                <p className="card-text">Specialty: {doctor.Speciality}</p>
                <ReactStars
                  count={5}
                  value={4} // Assuming rating is provided by doctor object
                  size={17}
                  color1="#CCCCCC"
                  color2="#FFD700"
                  edit={false}
                />
                <ul className="list-unstyled mt-3" style={{ alignItems: "end" }}>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icons"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#396CF1"
                      width="16"
                      height="16"
                      style={{ alignItems: "end" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <small className="text-muted ms-2">
                      Mon: 2:00PM - 6:00PM
                    </small>
                  </li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icons"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#396CF1"
                      width="16"
                      height="16"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12.793V5a2 2 0 00-2-2H5a2 2 0 00-2 2v7.793a1 1 0 00.553.894l8 4.5a1 1 0 001.09 0l8-4.5a1 1 0 00.554-.894z"
                      />
                    </svg>
                    <small className="text-muted ms-2">
                      63, PG Shustoke, UK
                    </small>
                  </li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icons"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#396CF1"
                      width="16"
                      height="16"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 13 6h-.02a4.5 4.5 0 0 0-1.79.37l-4.38 1.96a1.5 1.5 0 0 1-1.81-2.36l1.49-1.3a4.5 4.5 0 0 0-.12-6.86l-.05-.04A10.02 10.02 0 0 1 12 3m0 18c-3.68 0-7-2-9-5l18-8c2 3 5.32 5 9 5s7-2 9-5l-18 8c-2 3-5.32 5-9 5z"
                      />
                    </svg>
                    <small className="text-muted ms-2">$ 75 USD / Visit</small>
                  </li>
                </ul>
                <ul className="list-unstyled mt-2 mb-0">
                  <li className="list-inline-item">
                    <button
                      className="btn btn-icon btn-pills btn-soft-primary"
                     
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icons"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        height="1.5em"
                        width="1.5em"
                      >
                        <path d="M3 18c0 1.1.9 2 2 2h10l4 4V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v13z" />
                      </svg>
                    </button>
                  </li>
                  <li className="mt-2 list-inline-item">
                    <button className="btn btn-icon btn-pills btn-soft-primary"
                     onClick={()=>{
                        setDoctor(doctor);
                        handleBookClick();
                     }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icons"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        height="1.5em"
                        width="1.5em"
                      >
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M5 14v3a2 2 0 002 2h10a2 2 0 002-2v-3" />
                      </svg>
                    </button>
                  </li>
                  <li className="mt-2 list-inline-item">
                    <button className="btn btn-icon btn-pills btn-soft-primary">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icons"
                        height="1.5em"
                        width="1.5em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </button>
                  </li>
                  <li className="mt-2 list-inline-item">
                    <button className="btn btn-icon btn-pills btn-soft-primary">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icons"
                        height="1.5em"
                        width="1.5em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 13 6h-.02a4.5 4.5 0 0 0-1.79.37l-4.38 1.96a1.5 1.5 0 0 1-1.81-2.36l1.49-1.3a4.5 4.5 0 0 0-.12-6.86l-.05-.04A10.02 10.02 0 0 1 12 3m0 18c-3.68 0-7-2-9-5l18-8c2 3 5.32 5 9 5s7-2 9-5l-18 8c-2 3-5.32 5-9 5z" />
                      </svg>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Book Appointment</Modal.Title>
  </Modal.Header>
  <Modal.Body className="d-flex justify-content-center align-items-center" >
   <div style={{marginRight:'380px'}}>
    {console.log(doctor)}
    <BookForm doctor={doctor}/> 
    </div>
  </Modal.Body>
</Modal>
    </div>
  );
}

export default Doctorcards;
