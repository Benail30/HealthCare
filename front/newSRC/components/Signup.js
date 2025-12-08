import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/signup.css";
import Navbar from "./Navbar";
import Dropzone from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { sendSignupEmail } from './redux/actions/emailActions';


const Signup = () => {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [UserType, setUsertype] = useState("");
  const [error, setError] = useState("");
  const [Specialization, setSpecialization] = useState("");
  const navigate = useNavigate();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state
  
  const dispatch = useDispatch();
  
  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log(Username, Email, Password, UserType);
    try {
      const body = {
        UserType: UserType,
        Username: Username,
        Email: Email,
        Password: Password,
        UserType: UserType,
        FirstName: FirstName,
        LastName: LastName,
        PhoneNumber: PhoneNumber,
        imageUrl: image,
        Speciality: Specialization,
      };
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        body
      );
      console.log(response.data);
      setError("");
      
      if(UserType === 'Doctor') {
        console.log('1');
        dispatch(sendSignupEmail(Email, Username, UserType, Specialization));
      }
      if(UserType === 'Patient') {
        console.log("2");
        dispatch(sendSignupEmail(Email, Username, UserType));
      }

      navigate("/login");
    } catch (err) {
      setError(err.response.data.error);
      console.log(err.response.data.error);
    }
  };
  const handleImageDrop = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]); // Make sure the file is the first item in the acceptedFiles array

    try {
      setIsLoading(true); // Set isLoading to true when image upload starts
      const response = await axios.post("http://localhost:3000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Add this line
        },
      });
      const imageUrl = response.data.imageUrl;
      console.log(imageUrl);
      setImage(imageUrl);
      setIsLoading(false); // Set isLoading to false when image upload is complete
    } catch (error) {
      console.error(error);
      setIsLoading(false); // Set isLoading to false when image upload fails
    }
  };
  return (
    <div>
      <Navbar />
      <div className="form doctor-form" style={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "center", marginLeft:'340px',backgroundColor:'white'}}>
              <form onSubmit={HandleSubmit}>
            <h2 style={{ color: "#007E85", marginBottom:'20px',marginLeft:'120px',marginTop:'33px'}}> Sign Up</h2>
            <div>
            <div className="doctor-image">
              <img
                src="https://th.bing.com/th/id/OIP.czYUxy7G0x5DDRsqs9xq0QHaHa?w=204&h=204&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                alt="Doctor"
                style={{marginBottom:'20px' , borderRadius:'20%',marginLeft:'50px',marginTop:'20px',background:'transparent'}}
              />
            </div>
            <div>
            <input
              type="text"
              placeholder="Username"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="First Name"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={PhoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div>
              {UserType === "Doctor" && (
                <input
                  type="text"
                  placeholder="Specialization"
                  value={Specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  required
                />
              )}
              <select
                onChange={(e) => {
                  console.log(e.target.value);
                  setUsertype(e.target.value);
                }}
                required
                style={{
                  marginBottom: "10px",
                  marginLeft: "20px",
                  width: "180px",
                  padding: "5px",
                  borderRadius: "11px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="Doctor">Doctor</option>
                <option value="Patient">Patient</option>
              </select>
              <Dropzone onDrop={handleImageDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', border: '2px dashed #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9', color: '#888', fontSize: '16px', cursor: 'pointer' }}>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {isLoading ? ( // Show loading screen if isLoading is true
                        <p style={{ margin: '0' }}>Uploading image...</p>
                      ) : (
                        <p style={{ margin: '0' }}>Drag 'n' drop some files here, or click to select files</p>
                      )}
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
          </div>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
          <button type="submit">Sign Up</button>
        </form>
       
      </div>
    </div>
    
  );
};

export default Signup;
