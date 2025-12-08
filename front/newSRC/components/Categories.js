import React from 'react'
import Footer from './footer/Footer'
import Navbar from './Navbar'
import { FaUserDoctor } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { LuMicroscope } from "react-icons/lu";
import { FaAmbulance } from "react-icons/fa";
import { RiShieldCrossLine } from "react-icons/ri";
import DoctorComponent from './doctorComponent';

function Categories() {
  const data = [
    {
      icon: <FaUserDoctor style={{ color: "#007E85", fontSize: "35px", textAlign: "left", marginRight: '90px',marginBottom:'20px' }} />,
      title: "Doctors",
      description: "Due to its wide spread use as filler text.",
    },
    {
      icon: <GiMedicines style={{ color: "#007E85", fontSize: "35px", textAlign: "left", marginRight: '90px',marginBottom:'20px' }} />,
      title: "Medicines",
      description: "Due to its wide spread use as filler text.",
    },
    {
      icon: <LuMicroscope style={{ color: "#007E85", fontSize: "35px", textAlign: "left", marginRight: '90px',marginBottom:'20px' }} />,
      title: "Laboratory",
      description: "Due to its wide spread use as filler text.",
    },
    {
      icon: <FaAmbulance style={{ color: "#007E85", fontSize: "35px", textAlign: "left", marginRight: '90px',marginBottom:'20px' }} />,
      title: "Ambulance",
      description: "Due to its wide spread use as filler text.",
    },
    {
      icon: <RiShieldCrossLine style={{ color: "#007E85", fontSize: "35px", textAlign: "left", marginRight: '90px',marginBottom:'20px' }} />,
      title: "Insurance",
      description: "Due to its wide spread use as filler text.",
    }
  ];

  return (
    <div>
      <div style={{ backgroundColor: "#ECECEC", margin: 0, padding: 0 }}>
        <h1 style={{ color: "#007E85", textAlign: "center" }}>Explore By Categories</h1>
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
          Great doctor if you need your family member to get effective immediate assistance, emergency treatment or a simple consultation.
        </h3>
      </div>

      <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
        {data.map((item, index) => (
          <div key={index} style={{ marginLeft: "20px", width: "180px", height: "200px" }}>
            {item.icon}
            <br />
        
            <h2 style={{ color: "#000", textAlign: "left", fontSize: "19px" }}>{item.title}</h2>
            <br />
            <p style={{ color: "#5D5D5D", textAlign: "left", fontSize: "15px", marginBottom: "1em" }}>{item.description}</p>
            <p style={{ color: "#000", textAlign: "left" }}>
              <a href="#" style={{ textDecoration: "none" }}>Find Here &#8594;</a>
            </p>
           <br />
          </div>
        ))}
      </div>
          <br />
          <br />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '1200px', // Increase the width to make the card bigger
            padding: '20px',
            // border: '1px solid #ccc',
            borderRadius: '10px',
            margin: 'auto',
          }}>
            <div style={{marginTop:'100px'}}>
              <h2 style={{ textAlign: 'left' }}>
                Good Services And Better<br />
                 Health By  Our Specialists<br />
               
              </h2>
<br />
              <p style={{ textAlign: 'left', color: '#8492A6', fontSize: '16px' }}>Great doctor if you need your family member to get effective immediate assistance, emergency treatment or a simple consultation.</p>
              <br />
              <p style={{ textAlign: 'left', color: '#8492A6', fontSize: '16px' }}>The most well-known dummy text is the Lorem Ipsum, which is said to have originated in the 16th century. Lorem Ipsum is composed in a pseudo-Latin language which more or less corresponds to proper Latin. It contains a series of real Latin words.</p>

              
            </div>
            <img src="https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fabout%2Fabout-2.png&w=3840&q=75" alt="description_here" style={{ width: '500px', height: '500px' }} />
            
          </div>
       
    </div>
  )
}

export default Categories;
