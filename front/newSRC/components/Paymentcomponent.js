import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentFail from './PaymentFail';
import PaymentSuccess from './PaymentSuccess';
import { useParams } from 'react-router';
const Paymentcomponent = () => {
  const [paymentStatus, setPaymentStatus] = useState('error');
  const [link, setLink] = useState('');
  const { amount } = useParams();
  const body = {
    amount: JSON.parse(amount) * 100,
  };
  useEffect(() => {
    axios.post('http://localhost:3000/api/add', body)
      .then((response) => {
        setLink(response.data.result.link);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [])

  const handleTryAgain = async (e) => {
    try {
      const response = await axios.post('http://localhost:3000/api/add', body);
      console.log(response.data);

    } catch (error) {
      console.error(error);
      setPaymentStatus('error');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8/12 text-center">
          <div style={{ marginBottom: '20px', marginTop: '50px' }}>
            <img 
              src="https://www.pngmart.com/files/7/Payment-PNG-Transparent.png" 
              alt="Payment Avatar" 
              style={{ width: '400px' }} 
            />
          </div>
          {link && (
            <div 
              className="border border-solid border-customColor rounded-md px-2 py-1 inline-block"
              style={{
                backgroundColor: '#007E85',
                color: 'white',
                borderRadius: '5px',
                textAlign: 'center',
                fontSize: '25px',
                // marginRight: '20px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'inline-block'
              }}
            >
              <div style={{ marginTop: '10px' }}>
                <a 
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                  }}
                >
                  Click Here to Pay
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Paymentcomponent ;
