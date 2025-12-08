import React from "react";
// import NavBar from "../navBar/NavBar";
// import pictureContactUs from "../../assets/Rectangle 1548.png";
import "./contactUs.css";
import Footer from "../footer/Footer";
import Navbar from "../Navbar";
// type props ={
//   setIsLoggedIn:(value: boolean) => void;
// };
const ContactUs= () => {
  return (
    <>
        <Navbar />
      <div className="picture-container-contactus">
          <img src='https://s3-alpha-sig.figma.com/img/29a1/83e9/4cfaa1c70f9923b9dff53e831733a031?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BPb4iKFpTXsTfzPGJ1UT0k7s5GcYe70I9fmj0E1ha539XGmpRHJu50Wxv-Ecscl~VMqej~MTo8vlyDFUK0mfVD~RWIgy~uZAN8IMAemXPEjBmAQgQgxhlS4fde5YX5sxmc1HtdTeuAgdENZlQ3JbUxf-KHsF~r-Yi1oUl2vWrP-AZ1oPGCEqE3CFh9BGRVCXIphLDTM1WZMDTINSU2AtNJmDCxx4kpF4qeN7w7UyPJSPKq-S6sVwn494l~ftSFtuvPcw4-XeDl-mGOFpjjfo2VCSX1ANAjQh-JuLPsKK97j3All0emM03tnmferVVu3JSWd1tCJetOVk0qUSTr6~pQ__' style={{ height: '800px' }} />
        </div>
      <div className="get-in-us-contactus">
        <p
          style={{ fontSize: "16px", fontFamily: "sans-serif", opacity: "0.7",color:"#007E85" }}
        >
          Get in Touch
        </p>
        <h1 style={{ fontSize: "42px", fontFamily: "sans-serif", opacity: "0.7",color:"#007E85" }}>Contact Us</h1>
        <p
          style={{ fontSize: "16px", fontFamily: "sans-serif", opacity: "0.7",color:"#007E85" }}
        >
          Lorem ipsum dolor sit amat, consecteur adipiscing elit .
        </p>
      </div>

      <div className="form-container-contact-us">
        <div className="input-cooo">
          <div className="firs-last-name-contact">
          <div className="one-input">
            <label>First Name</label>
            <input type="text" placeholder="Enter your first Name" style={{width:"31rem"}}  className="all-input-contactus" />
          </div>
          <div className="one-input">
            <label>Last Name</label>
            <input type="text" placeholder="Enter your last Name" style={{width:"31rem"}}  className="all-input-contactus" />
          </div>
        </div>

        <div className="email-phone-number-contact">
          <div className="one-input">
            <label>E-mail</label>
            <input type="text" placeholder="Enter your Email" style={{width:"31rem"}}   className="all-input-contactus"/>
          </div>
          <div className="one-input">
            <label>Phone Number</label>
            <input type="text" placeholder="Enter you phone Number" style={{width:"31rem"}}  className="all-input-contactus" />
          </div>
        </div>

        <div className="choose-contact">
          <div className="one-input">
          <label>Choose a topic</label>
         
          <select name="" id="" style={{width:"68rem"}}  className="all-input-contactus" >
            <option value="">choukou</option>
          </select>
          </div>
        </div>


        <div className="message-contact">
            <div className="one-input">
            <label>Message</label>
            <textarea  placeholder="Type your message" style={{width:"66rem" ,height:"15rem",fontSize:"20px"}}  className="all-input-contactus" ></textarea>{" "}
          </div>
        </div>


        {/* <div className="one-checkbox">
          <input type="checkbox"  className="one-checkbox" />
          <label>I accept the terms</label>
        </div> */}
        <div className="button-contact one-input">
          <button className="submit-button-contact">Submit</button>
        </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '299px' }}>
            <h1 style={{ color: '#333333', textAlign: 'center',fontSize:'24px' }}>Subscribe to our newsletter</h1>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
         <input type="email" placeholder="enter your email" style={{ marginRight: '10px', padding: '10px', border: 'none',fontSize: '16px', width: '400px', borderRadius:'11px' }} />
         <button style={{ padding: '10px 20px', backgroundColor: '#007E85', color: '#fff', border: 'none', cursor: 'pointer' ,  borderRadius:'11px'}}>Subscribe</button>
        </div>
        </div>
        <br/>
        <br/>
      <Footer/>
    </>
  );
};

export default ContactUs;