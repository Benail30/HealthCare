import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../footer/Footer';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const { category } = useParams(); 

  useEffect(() => {
    axios.get('http://localhost:3000/api/products/all')
      .then(response => {
        const fetchedProducts = response.data;
        setProducts(fetchedProducts);
  
        const normalizedUrlCategory = category.replace('-', ' ').toLowerCase(); // Transform "skincare" to "skin care"
        const filteredProducts = fetchedProducts.filter(product => 
          product.Category.toLowerCase() === normalizedUrlCategory
        );
  
        setFiltered(filteredProducts);
      })
      .catch(error => console.log(error));
  }, [category]); 
console.log(products);
const handleAddToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to cart!');
};
  return (
    <div className="pharmacy-page">
      <Navbar />
      <div className="product-grid">
        {filtered.length > 0 ? (
          filtered.map((product, index) => (
            <div key={index} className="product-card">
              <img src={product.ImageUrl || 'placeholder-image-url'} alt={product.name} className="product-image" />
              <div className="product-content">
                <h5>{product.name}</h5>
                <p>${parseFloat(product.price).toFixed(2)}</p>
                <button style={{
  backgroundColor: '#007E85',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '25px',
}} onClick={() => handleAddToCart(product)} className="add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
          ))
        ) : (
          <div>No products found in this category.</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;
