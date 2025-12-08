import React from 'react'
import Navbar from './Navbar'
import Footer from './footer/Footer'
import Reviews from './Reviews'
import ReactStars from 'react-stars'

function doctorRates() {
    return (
        <div>
            <Navbar />

            <div className="container">
                <h1 style={{ textAlign: 'center' }}>Doctor Rates</h1>
                <Reviews />
                <h1 style={{ textAlign: 'center' }}>Write a Review</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Email address:</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="" />
                        <label htmlFor="exampleFormControlInput1">Name:</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="" />
                        <label htmlFor="exampleFormControlInput1">Comment:</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="" />
                       
                        <label htmlFor="exampleFormControlInput1">Rate:</label>
                        <div style={{marginBottom:'20px'}}>
                        <ReactStars count={5} size={24} color2={'#ffd700'} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
            <br/>
            <Footer />
        </div>
    );
}

export default doctorRates
