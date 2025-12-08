import React from 'react'
// import Switch from '@mui/material/Switch';
import Navbar from "./Navbar" ;
import ServicesPage  from './ServicesPage';
import TeamMembers from './TeamMembers';
import Testimonial from './Testimonial';
import Footer from "./footer/Footer"
import "../css/home.css"
import img1 from './img/img1.png'
import { FaPlayCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Home() {
// const label = { inputProps: { 'aria-label': 'Switch demo' } };
  return (
    <div className='body'>
      <Navbar />
    <div className="DoctorImg">
        <img className='doctorImg' src={img1} alt="" />
    </div>
       <div className="title">
      <h1  id='h1'>Providing Quality <font color="#007e85">Healthcare</font> for A <br/> <font color="#6eab36">Brighter</font> and <font color="#6eab36">Healthy</font> Future</h1>
<br/>
      <p  style={{color:'#5D5D5D'}} id='p1'>At our hospital, we are dedicated to providing exceptional <br/> medical care to our patients and their families. Our <br/> experienced team of medical professionals, cutting-edge<br/> technology, and compassionate approach make us a leader <br/> in the healthcare industry</p>
<br/>
    </div>
<div id='divplay'>
<button type="button" className="bt">appointments</button>
<FaPlayCircle id='play' />
<h4>watch now </h4>
</div>
   <div className="divSearch" style={{background:'white'}}>
        <h3>Find A Doctor </h3>
        <div className='search'> 
        <input className='input' type="text" placeholder="Name"/>
        <input  className='input' type="text" placeholder="speciality"/>
      
      
        <div className='ButtonSearch'> 
        <button type="button" className="ButtonSearch">Search</button>

        </div>  
        </div>
    </div>
    <div className='divResult' style={{textAlign: 'center' ,}}>
         <h2 style={{color:'rgba(0, 126, 133, 1)'}}>Our results in numbers</h2>
         <br/>
         <br/>
    <div style={{color:'rgba(0, 126, 133, 1)'}}>   
    <h2 id='numbers'> 99%  15k 12k 240%</h2>
    </div>
    <div id='words'>
     <p id='words1'>Customer satisfaction    </p>  <p id='words2'>Online Patients</p> <p id='words3'>Patients Recovered</p> <p id='words4'>Company growth</p> 
    </div>
    </div>

    <div className="divStart">
       <img className='img2' src='https://s3-alpha-sig.figma.com/img/ecde/e03a/8c87bbb9dbd9ce4757dcccfa5e15b856?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yxo7qcBoVhRyL5T0ocwKsqE4wQg-~53WsAMq3poUOZNgkhNrWscHsyGi2EV4a6PxP7bJpw6c4GYlDdE~aEcuKj4o2nL-W5ltxVHOJQkStUSuH3qhn5F3nF02R1cF~lKe00HrsVLLccZgMCq9igwz95~u86Ruw4Meyitd4J-be1Bw49lnPduAt27e~pk2TukF9KMXkbKKh6GVNvxN1reig3dEuCujgb-UbUogm0ETuTQ~CspmxiLOGHhWu224Jv0bxDVmNHqZnLzTOgbx4AvSU44ai07Rb~UNifwgQXkUE0Uya8h4lYiMSltaActlyIbWVJ3KTmj~5Rogsuwg6~pdzA__'/>
       <br/>
       <br/>
    
      <h1 style={{color:'rgba(0, 126, 133, 1)'}}>You have lots of reasons <br/>to choose us</h1>
      <br/>
      <p>Lorem ipsum dolor sit amet consectetur adipiscing eli <br/>mattis sit phasellus mollis sit aliquam sit nullam.</p>
     <br/>
      <button type="button" className="get-Started">get Started</button>
      <button type="button" className="Talk-To-Sales">Talk To Sales</button>
    </div>
    <div className="service" style={{textAlign: 'center' ,}}>
    <ServicesPage />
       <br/>
       <br/>
    </div>
    <TeamMembers/>
    <br/>
    <br/>
    <br/>
  
    <Testimonial/>
    <br/>
    <br/>

    <Footer />
    </div>
  )
}

export default Home