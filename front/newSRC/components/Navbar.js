import React, { useState, useEffect } from "react";
import "../css/Navbar.css";
import { Link,useNavigate} from "react-router-dom";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [temp, setTemp] = useState("/login");
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("userType")==='Doctor') {setTemp('/doctor')}
    if(localStorage.getItem("userType")==='Patient') {setTemp('/patient')}
    if (localStorage.getItem("token")) {
      setIsLogged(true);
    }
    else {
      setIsLogged(false);
    }

  }, [isLogged,isDropdownOpen]);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userId"); 
    navigate("/login")
    setIsLogged(false);
  }
  return (
    <div className="divNavbar">
      <div className="logoContainer">
    
        <img
          className="logo"
          src="https://s3-alpha-sig.figma.com/img/efb1/3ff6/87f33e562a35e98a4b2866ad981588b7?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pNsCo6gSwajGhMArLnkzchWJ5F9xwvZDQH9p3EcC9xdhLn6VIhjM64xCh1rPdNMXVltTUAaQbCTrOwgHDza5Fb2V6XDtxhGdmQZnHl~1F4j~ovOIIEo2MiUWwVZ4H1Vb6FnmVofNZVZ4DXWjdrJnDbAUVgZ1042bqZYWGg7lRZoFyZFKNR834T0P5maRuW-sdgZh4L3306qQ7BsODW34QnanQgpG2mE-E2Ml1bu2-dJPx80a0U42xLTfd3t6uixITTIgsOqiSmObVqc8lMRT5A67UWec8CUdy8LWANYxWLBgPFsoMG-5~YLwJk4896iT5iqiyHK8HHWvimwqtcLAAg__"
          alt="Logo"
          onClick={() => {
            if(localStorage.getItem("userType")==='Doctor') {navigate('/doctor')}
        if(localStorage.getItem("userType")==='Patient') {navigate('/patient')}
          }}
        />
       <Link to={"/"} style={{ textDecoration: 'none' }}>
  <h2>
    health<font color="#6eab36">care</font>
  </h2>
</Link>
      </div>
      <div className="navLinks">
        <Link to={"/"}>
          <a className="Home">HOME</a>
        </Link>
        <Link to={"/service"}>
          <a className="Service" href="">
            Service
          </a>
        </Link>
        <Link to={"/contact"}>
          <a className="Contact" href="">
            Contact Us
          </a>
        </Link>
        <Link to={"/bloglist"}>
          <a className="Contact" href="">
            Blogs
          </a>
        </Link>
        <Link to={"/Pharmacy"}>
          <a className="Contact" href="">
            Pharmacy
          </a>
        </Link>
        <Link to={"/doctorlist"}>
          <a className="Contact" href="">
            Doctors
          </a>
        </Link>
      
        <Link to={temp}>
          <a className="Contact" href="">
            Profile
          </a>
        </Link>

        {isLogged ? (
          <div className="dropdown">
            <a className="Profile" onClick={toggleDropdown}>
              <img
                className="profileIcon"
                src="https://s3-alpha-sig.figma.com/img/efb1/3ff6/87f33e562a35e98a4b2866ad981588b7?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pNsCo6gSwajGhMArLnkzchWJ5F9xwvZDQH9p3EcC9xdhLn6VIhjM64xCh1rPdNMXVltTUAaQbCTrOwgHDza5Fb2V6XDtxhGdmQZnHl~1F4j~ovOIIEo2MiUWwVZ4H1Vb6FnmVofNZVZ4DXWjdrJnDbAUVgZ1042bqZYWGg7lRZoFyZFKNR834T0P5maRuW-sdgZh4L3306qQ7BsODW34QnanQgpG2mE-E2Ml1bu2-dJPx80a0U42xLTfd3t6uixITTIgsOqiSmObVqc8lMRT5A67UWec8CUdy8LWANYxWLBgPFsoMG-5~YLwJk4896iT5iqiyHK8HHWvimwqtcLAAg__"
                alt="Profile Icon"
                style={{ borderRadius: "50%", width: "50px", height: "50px" }}
              />
            </a>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <a onClick={handleLogout}>Logout</a>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to={"/signup"}>
              <a className="Sign" href="">
                Sign Up
              </a>
            </Link>
            <Link to={"/login"}>
              <button className="Log">Log In</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
