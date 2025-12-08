import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../Navbar"; 
import Footer from "../footer/Footer"; 
import './PharmacyPage.css'; 
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from '../redux/actions/productActions'; 
import pharmacy from './pharmacy.png';
function PharmacyPage() {
  // const dispatch = useDispatch();
  // const { items: products, loading, error } = useSelector((state) => state.product);
 
  const categories = [
    { id: 1, name: "Skin Care", imageUrl: "https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fpharmacy%2Fskin.jpg&w=1920&q=75", path: "Skin Care" },
    { id: 2, name: " Wellness", imageUrl: "https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fpharmacy%2Fheart.jpg&w=3840&q=75", path: "wellness" },
    { id: 3, name: "Weight Management", imageUrl: "https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fpharmacy%2Fweight.jpg&w=1920&q=75", path: "weight-management" },
    { id: 4, name: "Pain Relief", imageUrl: "https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fpharmacy%2Fpain.jpg&w=1920&q=75", path: "pain-relief" },
    { id: 5, name: "Heart Health", imageUrl: "https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fpharmacy%2Fheart.jpg&w=1920&q=75", path: "heart-health" },
    { id: 6, name: "Cough & Cold", imageUrl: "https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fpharmacy%2Fcough.jpg&w=1920&q=75", path: "cough-cold" },
    { id: 7, name: "Diabetes", imageUrl: "https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fpharmacy%2Fdiabetes.jpg&w=1920&q=75", path: "diabetes" },
    { id: 8, name: "Cancer", imageUrl: "https://doctris-landing-next.vercel.app/_next/image?url=%2Fimages%2Fpharmacy%2Fcancer.jpg&w=1920&q=75", path: "cancer" }
  ];

  return (
    <div className="pharmacy-page">
      <Navbar />
      <div className="pharmacy-banner">
        <img src={pharmacy} alt="Cosmetics Body Lotion" className="img-fluid" />
      </div>
      <div className="container mt-5">
        <div className="category-header">
          <h2 className="text-center mb-4">Our Pharmacy Categories</h2>
          <Link to="/productcart" className="check-cart-btn">
            Check Your Cart 🛒
          </Link>
        </div>
        <div className="row">
          {categories.map((category, index) => (
            <div key={index} className="col-xl-3 col-lg-3 col-md-6 mt-4">
              <Link to={`/pharmacy/${category.path}`} className="text-decoration-none">
                <div className="card team border-0 rounded shadow overflow-hidden clickable">
                  <img src={category.imageUrl} alt={category.name} className="img-fluid" />
                  <div className="card-body">
                    <h5 className="title text-dark">{category.name}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PharmacyPage;
