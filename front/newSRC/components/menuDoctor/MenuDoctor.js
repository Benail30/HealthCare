import React, { useState } from "react";
import "./menuDoctor.css";

// import ProfilDoctor from "../profilDoctor/ProfilDoctor";
import { useNavigate } from "react-router-dom";
// import TopMenu from "../topmenu/TopMenu";

const MenuDoctor = () => {
 
  
  const [activdiv, setActivediv] = useState("");
  const navigate = useNavigate();

  return (
    <div className="container_doctor_profil">
     {/* <TopMenu/> */}
      {/* menu bar */}
      <div className="content_doctor_profil">
        <div className="menu_left_doctor">
          <ul className="list_profil_doctor">
            <div
              className={`icon_list ${activdiv === "Overview" ? "active" : ""}`}
              onClick={() => {
                setActivediv("Overview");
              }}
            >
              <i className="fa-brands fa-microsoft" />
              <span className="text_sid" onClick={()=>navigate("overview")}>Overview</span>
            </div>
            <div
              className={`icon_list ${
                activdiv === "Appointment" ? "active" : ""
              }`}
              onClick={() => {
                setActivediv("Appointment");
              }}
            >
              <i className="fa-regular fa-calendar"></i>

              <span className="text_sid" onClick={()=>navigate("/")}>Appointment</span>
            </div>
            <div
              className={`icon_list ${
                activdiv === "My Patients" ? "active" : ""
              }`}
              onClick={() => {
                setActivediv("My Patients");
              }}
            >
              <i className="fa-solid fa-user-plus"></i>
              <span className="text_sid">My Patients</span>
            </div>
            <div
              className={`icon_list ${
                activdiv === "Schedule Timings" ? "active" : ""
              }`}
              onClick={() => {
                setActivediv("Schedule Timings");
              }}
            >
              <i className="fa-sharp fa-solid fa-clock"></i>
              <span className="text_sid">Schedule Timings</span>
            </div>
            <div
              className={`icon_list ${activdiv === "Payments" ? "active" : ""}`}
              onClick={() => {
                setActivediv("Payments");
              }}
            >
              <i className="far fa-credit-card"></i>
              <span className="text_sid">Payments</span>
            </div>
            <div
              className={`icon_list ${activdiv === "Messages" ? "active" : ""}`}
              onClick={() => {
                setActivediv("Messages");
              }}
            >
              <i className="fa-regular fa-envelope"></i>
              <span className="text_sid" >Messages</span>
            </div>
            <div
              className={`icon_list ${activdiv === "Blog" ? "active" : ""}`}
              onClick={() => {
                setActivediv("Blog");
              }}
            >
              <i className="fa-solid fa-sheet-plastic"></i>
              <span className="text_sid"onClick={()=>navigate('/menuDoctor/postblog')} > Blog</span>
            </div>
            <div
              className={`icon_list ${activdiv === "Settings" ? "active" : ""}`}
              onClick={() => {
                setActivediv("Settings");
              }}
            >
              <i className="fa-solid fa-gear"></i>
              <span className="text_sid"onClick={()=>navigate('NavMenuDoctor')}>Settings</span>
            </div>
          </ul>
        </div>
      </div>
    
      {/* <ProfilDoctor/> */}
    </div>
  );
};
export default MenuDoctor;