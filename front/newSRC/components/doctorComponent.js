import React from 'react';
import { MdOutlineWork } from "react-icons/md";
import { MdAirplay } from "react-icons/md";
import { GiHealthNormal } from "react-icons/gi";

function DoctorComponent() {
    return (
        <div className='section' style={{ backgroundImage: "url('https://doctris-landing-next.vercel.app/images/cta.jpg')", backgroundSize:"cover", height: "600px" }}>
            <div className="container">
                <div className='row'>
                    <div className='col-lg-5 offset-lg-7 col-md-7 offset-md-5' style={{marginTop:'20px',marginRight:'200px'}}>
            <div  className="features feature-bg-primary d-flex card flex-row p-4 rounded-md shadow position-relative overflow-hidden mt-4" style={{borderRadius:'20px', marginRight:'70px',backgroundColor:'#F5F5F5'}}>

                    <MdOutlineWork className='icons mb-0 text-primary display-2' style={{ marginRight: "10px" }} />
                    <i className="fa fa-stethoscope" style={{ marginRight: "10px" }}></i>
                    <br/>
                    <div>
                        <h5 className='ms-3'>Find a Doctor</h5>
                        <p className='text-muted para mb-0'>The most well-known dummy text is the Lorem Ipsum, which is said to have originated in the 16th century.

</p>
                    </div>
                   
                </div>
            <div className="features feature-bg-primary d-flex card flex-row p-4 rounded-md shadow position-relative overflow-hidden mt-4" style={{borderRadius:'20px', marginRight:'70px'}}>

                    <MdAirplay className='icons mb-0 text-primary display-2' style={{ marginRight: "10px" }} />
                    <i className="fa fa-stethoscope" style={{ marginRight: "10px" }}></i>
                    <br/>
                    <div>
                        <h5 className='ms-3'>Find a Doctor</h5>
                        <p className='text-muted para mb-0'>The most well-known dummy text is the Lorem Ipsum, which is said to have originated in the 16th century.

</p>
                    </div>
                   
                </div>
            <div className="features feature-bg-primary d-flex card flex-row p-4 rounded-md shadow position-relative overflow-hidden mt-4" style={{borderRadius:'20px', marginRight:'70px'}}>

                    <GiHealthNormal className='icons mb-0 text-primary display-2' style={{ marginRight: "10px" }} />
                    <i className="fa fa-stethoscope" style={{ marginRight: "10px" }}></i>
                    <br/>
                    <div>
                        <h5 className='ms-3'>Find a Doctor</h5>
                        <p className='text-muted para mb-0'>The most well-known dummy text is the Lorem Ipsum, which is said to have originated in the 16th century.

</p>
                    </div>
                   
                </div>
                </div>
              
            </div>
        </div>
        </div>
    );
}

export default DoctorComponent;
