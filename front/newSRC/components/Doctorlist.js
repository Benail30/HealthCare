import React from 'react'

function Doctorlist() {
    return (
        <div>
           <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '1200px', // Increase the width to make the card bigger
            padding: '20px',
            // border: '1px solid #ccc',
            borderRadius: '10px',
            margin: 'auto',
          }}>
            <div style={{marginTop:'150px'}}>
              <h2 style={{ textAlign: 'left' }}>
              Find Best Doctor

              </h2>
              <br />
              <p style={{ textAlign: 'left', color: '#8492A6', fontSize: '16px' }}>Great doctor if you need your family member to get immediate assistance, emergency treatment or a simple consultation.</p>

            <div style={{  display: 'inline',
            // flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center', }}>
                <input
                    type="text"
                    placeholder="Doctor Name"
                    style={{
                        width: '300px',
                        height: '40px',
                        borderRadius: '10px',
                        border: '1px solid #ccc',
                        padding: '5px',
                        marginBottom: '10px',
                        marginRight: '10px',
                       
                    }}
                />
                <button
                    style={{
                        width: '100px',
                        height: '40px',
                        borderRadius: '10px',
                        border: 'none',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        cursor: 'pointer',
                    }}
                >
                    Search
                </button>
            </div>
            <div style={{  display: 'inline',
            alignItems: 'center',
            justifyContent: 'center', 
           
         }}>
            <p style={{ textAlign: 'left', color: '#8492A6', fontSize: '16px',fontWeight:'bold' }}>Note : </p>
            <p style={{ marginBottom:'200px', color: '#8492A6', fontSize: '16px' }}>Please enter the doctor's name to find the best doctor for </p>
                    </div>
          </div>

            <img src="https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fhero.png&w=3840&q=75" alt="description_here" style={{ width: '700px', height: '700px' }} />
  
        </div>
        <div >
            <div  >
                <img src="https://i.ibb.co/YbTYPyL/Screenshot-2-4-2024-121214-doctris-landing-next-vercel-app.jpg" alt="description_here"
             style={{ fontSize:"25px", width: '1400px',height:"100px", padding: '20px', borderRadius: '10px', margin: 'auto', marginTop: '50px' }}/>
            </div>
        </div> 
        </div>
    )
}

export default Doctorlist
