import Navbar from "./Navbar";
import DoctorComponent from "./doctorComponent";
import Footer from "./footer/Footer";
import React, { useState, useEffect, useRef } from "react";
import ReactStars from "react-stars";
import axios from "axios";
import BookForm from "./BookForm";
import { Modal } from "react-bootstrap";
import { FaUserDoctor } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { LuMicroscope } from "react-icons/lu";
import { FaAmbulance } from "react-icons/fa";
import { RiShieldCrossLine } from "react-icons/ri";
import { MdOutlineWork } from "react-icons/md";
import { MdAirplay } from "react-icons/md";
import { GiHealthNormal } from "react-icons/gi";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "../css/calendar.css";
import { Link } from "react-router-dom";
function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [doctor, setDoctor] = useState({});
  const endOfPageRef = useRef(null);
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState(false);
  const [tempDoctors, setTempDoctors] = useState([]);
  const localizer = momentLocalizer(moment);

  const myEventsList = [
    {
    
      start: new Date(2024, 3, 4, 9, 0),
      end: new Date(2024, 3, 4, 12, 0),
      title: "Dr. Smith's Availability",
      color: "#5cb85c", // Green color
    },
    {
      start: new Date(2024, 3, 5, 14, 0),
      end: new Date(2024, 3, 5, 18, 0),
      title: "Dr. Johnson's Availability",
      color: "#f0ad4e", // Orange color
    },
    {
      start: new Date(2024, 3, 6, 10, 0),
      end: new Date(2024, 3, 6, 13, 0),
      title: "Dr. Williams's Availability",
      color: "#5bc0de", // Blue color
    },
    {
      start: new Date(2024, 3, 7, 9, 0),
      end: new Date(2024, 3, 7, 12, 0),
      title: "Dr. Brown's Availability",
      color: "#d9534f", // Red color
    },
    {
      start: new Date(2024, 3, 8, 15, 0),
      end: new Date(2024, 3, 8, 19, 0),
      title: "Dr. Lee's Availability",
      color: "#5cb85c", // Green color
    },
    {
      start: new Date(2024, 3, 9, 8, 0),
      end: new Date(2024, 3, 9, 11, 0),
      title: "Dr. Garcia's Availability",
      color: "#f0ad4e", // Orange color
    },
    {
      start: new Date(2024, 3, 10, 13, 0),
      end: new Date(2024, 3, 10, 17, 0),
      title: "Dr. Martinez's Availability",
      color: "#5bc0de", // Blue color
    },
    {
      start: new Date(2024, 3, 11, 9, 0),
      end: new Date(2024, 3, 11, 12, 0),
      title: "Dr. Nguyen's Availability",
      color: "#d9534f", // Red color
    },
    {
      start: new Date(2024, 3, 12, 14, 0),
      end: new Date(2024, 3, 12, 18, 0),
      title: "Dr. Kim's Availability",
      color: "#428bca", // Sky Blue color
    },
    {
      start: new Date(2024, 3, 13, 10, 0),
      end: new Date(2024, 3, 13, 13, 0),
      title: "Dr. Rodriguez's Availability",
      color: "#5cb85c", // Green color
    },
    {
      start: new Date(2024, 3, 14, 8, 0),
      end: new Date(2024, 3, 14, 11, 0),
      title: "Dr. Hernandez's Availability",
      color: "#f0ad4e", // Orange color
    },
    {
      start: new Date(2024, 3, 15, 13, 0),
      end: new Date(2024, 3, 15, 17, 0),
      title: "Dr. Patel's Availability",
      color: "#5bc0de", // Blue color
    },
    {
      start: new Date(2024, 3, 16, 9, 0),
      end: new Date(2024, 3, 16, 12, 0),
      title: "Dr. Clark's Availability",
      color: "#d9534f", // Red color
    },
    {
      start: new Date(2024, 3, 17, 15, 0),
      end: new Date(2024, 3, 17, 19, 0),
      title: "Dr. King's Availability",
      color: "#428bca", // Sky Blue color
    },
    {
      start: new Date(2024, 3, 18, 8, 0),
      end: new Date(2024, 3, 18, 11, 0),
      title: "Dr. Young's Availability",
      color: "#5cb85c", // Green color
    },
    {
      start: new Date(2024, 3, 19, 14, 0),
      end: new Date(2024, 3, 19, 18, 0),
      title: "Dr. Hernandez's Availability",
      color: "#f0ad4e", // Orange color
    },
    {
      start: new Date(2024, 3, 20, 10, 0),
      end: new Date(2024, 3, 20, 13, 0),
      title: "Dr. Jackson's Availability",
      color: "#5bc0de", // Blue color
    },
    {
      start: new Date(2024, 3, 21, 9, 0),
      end: new Date(2024, 3, 21, 12, 0),
      title: "Dr. Martin's Availability",
      color: "#d9534f", // Red color
    },
    {
      start: new Date(2024, 3, 22, 15, 0),
      end: new Date(2024, 3, 22, 19, 0),
      title: "Dr. Thompson's Availability",
      color: "#428bca", // Sky Blue color
    },
    {
      start: new Date(2024, 3, 23, 8, 0),
      end: new Date(2024, 3, 23, 11, 0),
      title: "Dr. Robinson's Availability",
      color: "#5cb85c", // Green color
    },
    {
      start: new Date(2024, 3, 24, 13, 0),
      end: new Date(2024, 3, 24, 17, 0),
      title: "Dr. Wood's Availability",
      color: "#f0ad4e", // Orange color
    },
    {
      start: new Date(2024, 3, 25, 9, 0),
      end: new Date(2024, 3, 25, 12, 0),
      title: "Dr. Adams's Availability",
      color: "#5bc0de", // Blue color
    },
    {
      start: new Date(2024, 3, 26, 14, 0),
      end: new Date(2024, 3, 26, 18, 0),
      title: "Dr. Hall's Availability",
      color: "#d9534f", // Red color
    },
    {
      start: new Date(2024, 3, 27, 10, 0),
      end: new Date(2024, 3, 27, 13, 0),
      title: "Dr. Young's Availability",
      color: "#428bca", // Sky Blue color
    },
    {
      start: new Date(2024, 3, 28, 8, 0),
      end: new Date(2024, 3, 28, 11, 0),
      title: "Dr. Hernandez's Availability",
      color: "#5cb85c", // Green color
    },
    {
      start: new Date(2024, 3, 29, 13, 0),
      end: new Date(2024, 3, 29, 17, 0),
      title: "Dr. Rodriguez's Availability",
      color: "#f0ad4e", // Orange color
    },
    {
      start: new Date(2024, 3, 30, 9, 0),
      end: new Date(2024, 3, 30, 12, 0),
      title: "Dr. Patel's Availability",
      color: "#5bc0de", // Blue color
    },
    // More events...
  ];
  let dummy = [
    {
      FirstName: "John",
      LastName: "Doe",
      Username: "john_doe123",
      Email: "john.doe@example.com",
      Password: "hashed_password",
      UserType: "Patient",
      Speciality: null,
      PhoneNumber: "123-456-7890",
    },
    {
      FirstName: "Alice",
      LastName: "Smith",
      Username: "alice_smith",
      Email: "alice.smith@example.com",
      Password: "hashed_password",
      UserType: "Doctor",
      Speciality: "Cardiology",
      PhoneNumber: "987-654-3210",
      img: "https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fdoctors%2F02.jpg&w=3840&q=75",
    },
    {
      FirstName: "Michael",
      LastName: "Johnson",
      Username: "mike_j",
      Email: "michael.johnson@example.com",
      Password: "hashed_password",
      UserType: "Doctor",
      Speciality: "Dermatology",
      PhoneNumber: "555-123-4567",
      img: "https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fdoctors%2F03.jpg&w=3840&q=75",
    },
    {
      FirstName: "Sarah",
      LastName: "Brown",
      Username: "sarah_brown",
      Email: "sarah.brown@example.com",
      Password: "hashed_password",
      UserType: "Patient",
      Speciality: null,
      PhoneNumber: "111-222-3333",
    },
    {
      FirstName: "David",
      LastName: "Williams",
      Username: "david_w",
      Email: "david.williams@example.com",
      Password: "hashed_password",
      UserType: "Doctor",
      Speciality: "Pediatrics",
      PhoneNumber: "999-888-7777",
      img: "https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fdoctors%2F04.jpg&w=3840&q=75",
    },
    {
      FirstName: "Emily",
      LastName: "Taylor",
      Username: "emily_t",
      Email: "emily.taylor@example.com",
      Password: "hashed_password",
      UserType: "Patient",
      Speciality: null,
      PhoneNumber: "444-555-6666",
      img: "https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fdoctors%2F05.jpg&w=3840&q=75",
    },
    {
      FirstName: "Christopher",
      LastName: "Clark",
      Username: "chris_c",
      Email: "christopher.clark@example.com",
      Password: "hashed_password",
      UserType: "Doctor",
      Speciality: "Orthopedics",
      PhoneNumber: "777-666-5555",
      img: "https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fdoctors%2F07.jpg&w=3840&q=75",
    },
    {
      FirstName: "Christopher",
      LastName: "Clark",
      Username: "chris_c",
      Email: "christopher.clark@example.com",
      Password: "hashed_password",
      UserType: "Doctor",
      Speciality: "Orthopedics",
      PhoneNumber: "777-666-5555",
      img: "https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fdoctors%2F05.jpg&w=3840&q=75",
    },
    {
      FirstName: "Emma",
      LastName: "Miller",
      Username: "emma_m",
      Email: "emma.miller@example.com",
      Password: "hashed_password",
      UserType: "Patient",
      Speciality: null,
      PhoneNumber: "222-333-4444",
    },
    {
      FirstName: "James",
      LastName: "Wilson",
      Username: "james_w",
      Email: "james.wilson@example.com",
      Password: "hashed_password",
      UserType: "Doctor",
      Speciality: "Oncology",
      PhoneNumber: "888-999-0000",
      img: "https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fdoctors%2F08.jpg&w=3840&q=75",
    },
    {
      FirstName: "Olivia",
      LastName: "Martinez",
      Username: "olivia_m",
      Email: "olivia.martinez@example.com",
      Password: "hashed_password",
      UserType: "Patient",
      Speciality: "Doctor",
      PhoneNumber: "666-777-8888",
      img: "https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fdoctors%2F06.jpg&w=3840&q=75",
    },
  ];
  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = async () => {
    // const response = await axios.get("http://localhost:3000/api/users/all");
    // console.log(response.data);
    const data = await dummy.filter((doctor) => {
      return doctor.UserType === "Doctor";
    });
    setDoctors(data);
    setTempDoctors(data);
  };

  const handleBookClick = () => {
    setShowModal(true);
  };
  const handleSearchClick = async () => {
    await setDoctors(tempDoctors);
    let temp = doctors.filter((doctor) => {
      return doctor.FirstName.toLowerCase().includes(searchValue.toLowerCase());
    });
    if (!temp.length) {
      setError(true);
    } else {
      setError(false);
      setDoctors(temp);
      endOfPageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCloseReview = () => {
    setShowReview(false);
  };
  const data = [
    {
      icon: (
        <FaUserDoctor
          style={{
            color: "#007E85",
            fontSize: "35px",
            textAlign: "left",
            marginRight: "90px",
            marginBottom: "20px",
          }}
        />
      ),
      title: "Doctors",
      description: "Due to its wide spread use as filler text.",
    },
    {
      icon: (
        <GiMedicines
          style={{
            color: "#007E85",
            fontSize: "35px",
            textAlign: "left",
            marginRight: "90px",
            marginBottom: "20px",
          }}
        />
      ),
      title: "Medicines",
      description: "Due to its wide spread use as filler text.",
    },
    {
      icon: (
        <LuMicroscope
          style={{
            color: "#007E85",
            fontSize: "35px",
            textAlign: "left",
            marginRight: "90px",
            marginBottom: "20px",
          }}
        />
      ),
      title: "Laboratory",
      description: "Due to its wide spread use as filler text.",
    },
    {
      icon: (
        <FaAmbulance
          style={{
            color: "#007E85",
            fontSize: "35px",
            textAlign: "left",
            marginRight: "90px",
            marginBottom: "20px",
          }}
        />
      ),
      title: "Ambulance",
      description: "Due to its wide spread use as filler text.",
    },
    {
      icon: (
        <RiShieldCrossLine
          style={{
            color: "#007E85",
            fontSize: "35px",
            textAlign: "left",
            marginRight: "90px",
            marginBottom: "20px",
          }}
        />
      ),
      title: "Insurance",
      description: "Due to its wide spread use as filler text.",
    },
  ];
  return (
    <div>
      <Navbar />
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "1200px", // Increase the width to make the card bigger
            padding: "20px",
            // border: '1px solid #ccc',
            borderRadius: "10px",
            margin: "auto",
          }}
        >
          <div style={{ marginTop: "150px" }}>
            <h2 style={{ textAlign: "left" }}>Find Best Doctor</h2>
            <br />
            <p
              style={{ textAlign: "left", color: "#8492A6", fontSize: "16px" }}
            >
              Great doctor if you need your family member to get immediate
              assistance, emergency treatment or a simple consultation.
            </p>

            <div
              style={{
                display: "inline",
                // flexDirection: 'column',
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                type="text"
                placeholder="Doctor Name"
                style={{
                  width: "300px",
                  height: "40px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  padding: "5px",
                  marginBottom: "10px",
                  marginRight: "10px",
                }}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button
                style={{
                  width: "100px",
                  height: "40px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={handleSearchClick}
              >
                Search
              </button>
              {error && <p style={{ color: "red" }}>No doctor found</p>}
            </div>
            <div
              style={{
                display: "inline",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  textAlign: "left",
                  color: "#8492A6",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Note :{" "}
              </p>
              <p
                style={{
                  marginBottom: "200px",
                  color: "#8492A6",
                  fontSize: "16px",
                }}
              >
                Please enter the doctor's name to find the best doctor for{" "}
              </p>
            </div>
          </div>

          <img
            src="https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fhero.png&w=3840&q=75"
            alt="description_here"
            style={{ width: "700px", height: "700px" }}
          />
        </div>
        <div>
          <div>
            <img
              src="https://i.ibb.co/YbTYPyL/Screenshot-2-4-2024-121214-doctris-landing-next-vercel-app.jpg"
              alt="description_here"
              style={{
                fontSize: "25px",
                width: "1400px",
                height: "100px",
                padding: "20px",
                borderRadius: "10px",
                margin: "auto",
                marginTop: "50px",
              }}
            />
          </div>
        </div>
      </div>
      <br />
      <div style={{ backgroundColor: "#ECECEC", margin: 0, padding: 0 }}>
        <h1 style={{ color: "#007E85", textAlign: "center" }}>Our Calendar</h1>
        <h3
          style={{
            color: "#5D5D5D",
            textAlign: "center",
            fontSize: "15px",
            marginBottom: "4em",
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar
          elementum tempus hac tellus libero accumsan.{" "}
        </h3>
      </div>
      <br />
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
      <br />
      <br />

      <div>
        <div style={{ backgroundColor: "#ECECEC", margin: 0, padding: 0 }}>
          <h1 style={{ color: "#007E85", textAlign: "center" }}>
            Explore By Categories
          </h1>
          <br />
          <br />
          <h3
            style={{
              color: "#5D5D5D",
              textAlign: "center",
              fontSize: "15px",
              marginBottom: "4em",
            }}
          >
            Great doctor if you need your family member to get effective
            immediate assistance, emergency treatment or a simple consultation.
          </h3>
        </div>

        <div
          style={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          {data.map((item, index) => (
            <div
              key={index}
              style={{ marginLeft: "20px", width: "180px", height: "200px" }}
            >
              {item.icon}
              <br />

              <h2
                style={{ color: "#000", textAlign: "left", fontSize: "19px" }}
              >
                {item.title}
              </h2>
              <br />
              <p
                style={{
                  color: "#5D5D5D",
                  textAlign: "left",
                  fontSize: "15px",
                  marginBottom: "1em",
                }}
              >
                {item.description}
              </p>
              <p style={{ color: "#000", textAlign: "left" }}>
                <a href="#" style={{ textDecoration: "none" }}>
                  Find Here &#8594;
                </a>
              </p>
              <br />
            </div>
          ))}
        </div>
        <br />
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "1200px", // Increase the width to make the card bigger
            padding: "20px",
            // border: '1px solid #ccc',
            borderRadius: "10px",
            margin: "auto",
          }}
        >
          <div style={{ marginTop: "100px" }}>
            <h2 style={{ textAlign: "left" }}>
              Good Services And Better
              <br />
              Health By Our Specialists
              <br />
            </h2>
            <br />
            <p
              style={{ textAlign: "left", color: "#8492A6", fontSize: "16px" }}
            >
              Great doctor if you need your family member to get effective
              immediate assistance, emergency treatment or a simple
              consultation.
            </p>
            <br />
            <p
              style={{ textAlign: "left", color: "#8492A6", fontSize: "16px" }}
            >
              The most well-known dummy text is the Lorem Ipsum, which is said
              to have originated in the 16th century. Lorem Ipsum is composed in
              a pseudo-Latin language which more or less corresponds to proper
              Latin. It contains a series of real Latin words.
            </p>
          </div>
          <img
            src="https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fabout%2Fabout-2.png&w=3840&q=75"
            alt="description_here"
            style={{ width: "500px", height: "500px" }}
          />
        </div>
      </div>

      <br />
      <div
        className="section"
        style={{
          backgroundImage:
            "url('https://doctris-landing-next.vercel.app/images/cta.jpg')",
          backgroundSize: "cover",
          height: "600px",
        }}
      >
        <div className="container">
          <div className="row">
            <div
              className="col-lg-5 offset-lg-7 col-md-7 offset-md-5"
              style={{ marginTop: "20px", marginRight: "200px" }}
            >
              <div
                className="features feature-bg-primary d-flex card flex-row p-4 rounded-md shadow position-relative overflow-hidden mt-4"
                style={{
                  borderRadius: "20px",
                  marginRight: "70px",
                  backgroundColor: "#F5F5F5",
                }}
              >
                <MdOutlineWork
                  className="icons mb-0 text-primary display-2"
                  style={{ marginRight: "10px" }}
                />
                <i
                  className="fa fa-stethoscope"
                  style={{ marginRight: "10px" }}
                ></i>
                <br />
                <div>
                  <h5 className="ms-3">Find a Doctor</h5>
                  <p className="text-muted para mb-0">
                    The most well-known dummy text is the Lorem Ipsum, which is
                    said to have originated in the 16th century.
                  </p>
                </div>
              </div>
              <div
                className="features feature-bg-primary d-flex card flex-row p-4 rounded-md shadow position-relative overflow-hidden mt-4"
                style={{ borderRadius: "20px", marginRight: "70px" }}
              >
                <MdAirplay
                  className="icons mb-0 text-primary display-2"
                  style={{ marginRight: "10px" }}
                />
                <i
                  className="fa fa-stethoscope"
                  style={{ marginRight: "10px" }}
                ></i>
                <br />
                <div>
                  <h5 className="ms-3">Find a Doctor</h5>
                  <p className="text-muted para mb-0">
                    The most well-known dummy text is the Lorem Ipsum, which is
                    said to have originated in the 16th century.
                  </p>
                </div>
              </div>
              <div
                className="features feature-bg-primary d-flex card flex-row p-4 rounded-md shadow position-relative overflow-hidden mt-4"
                style={{ borderRadius: "20px", marginRight: "70px" }}
              >
                <GiHealthNormal
                  className="icons mb-0 text-primary display-2"
                  style={{ marginRight: "10px" }}
                />
                <i
                  className="fa fa-stethoscope"
                  style={{ marginRight: "10px" }}
                ></i>
                <br />
                <div>
                  <h5 className="ms-3">Find a Doctor</h5>
                  <p className="text-muted para mb-0">
                    The most well-known dummy text is the Lorem Ipsum, which is
                    said to have originated in the 16th century.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div ref={endOfPageRef}>
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
              <div
                className="card border-0 rounded shadow overflow-hidden"
                style={{ width: "300px", height: "575px", marginLeft: "90px" }}
              >
                <img
                  src={doctor.img}
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
                  <ul
                    className="list-unstyled mt-3"
                    style={{ alignItems: "end" }}
                  >
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
                      <small className="text-muted ms-2">
                        $ 75 USD / Visit
                      </small>
                    </li>
                  </ul>
                  <ul className="list-unstyled mt-2 mb-0">
                    <li className="list-inline-item">
                    <Link to={'/chat'}>  <button className="btn btn-icon btn-pills btn-soft-primary">
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
                      </Link>
                    </li>
                    <li className="mt-2 list-inline-item">
                      <button
                        className="btn btn-icon btn-pills btn-soft-primary"
                        onClick={() => {
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
                     <Link to={'/doctorRates'}> <button className="btn btn-icon btn-pills btn-soft-primary"
                      
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
                          width="1.2em"
                        >
                          <polygon points="12 1 16 11 27 11 18 17 22 28 12 22 2 28 6 17 1 11 12 1" />
                        </svg>
                      </button>
                      </Link>
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
          <Modal.Body className="d-flex justify-content-center align-items-center">
            <div style={{ marginRight: "380px" }}>
              {console.log(doctor)}
              <BookForm doctor={doctor} />
            </div>
          </Modal.Body>
        </Modal>
       
      </div>
      <br />
      <Footer />
    </div>
  );
}

export default Doctor;
