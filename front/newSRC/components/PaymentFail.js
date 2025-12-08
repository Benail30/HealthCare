import React from 'react';
import Paymentcomponent from './Paymentcomponent';
import { useNavigate } from 'react-router';

const PaymentFail = () => {
    const navigate = useNavigate();
  return (
    <form className="ui large-form">
      <div className="ui icon negative message">
        <i className="warning icon" />
        <div className="content">
            <p>Payment failed. Please try again.</p>
        </div>
      </div>
      <button
  onClick={
    () => navigate('/')
  }
     >
        Back home
      </button>
    </form>
  );
};

export default PaymentFail;
