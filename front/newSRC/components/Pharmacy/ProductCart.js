import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../footer/Footer';
import './ProductCart.css';
import { useNavigate } from 'react-router-dom';

const ProductCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  const handleRemoveFromCart = (indexToRemove) => {
    const newCartItems = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  };

  const calculateTotal = () => cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2);

  return (
    <div className="product-cart-page">
      <Navbar />
      <div className="cart-container">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.ImageUrl || 'placeholder-image-url'} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <span>{item.name} - ${item.price}</span>
              <button onClick={() => handleRemoveFromCart(index)} className="remove-item-btn">Remove</button>
            </div>
            
          </div>
          
        ))}
        <div className="cart-total">Total: ${calculateTotal()}</div>
        <button className="checkout-btn" onClick={()=>{
          navigate(`/paymentcomponent/${calculateTotal()}`)
        }}  >Checkout</button>
      </div>
      <Footer />
    </div>
  );
};

export default ProductCart;
