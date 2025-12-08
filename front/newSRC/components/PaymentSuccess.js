import React from 'react';

const PaymentSuccess = () => {
  const svgStyle = {
    width: '24px', // Adjust as needed
    height: '24px', // Adjust as needed
    fill: '#007E85',
    justifyContent: 'center', 
    marginLeft:"170px"// Using palette color
     // Using palette color
  };

  return (
    <div style={{ backgroundColor: '#F3F4F6', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px' }}>
        <svg viewBox="0 0 24 24" style={svgStyle}>
          <path
            fill={svgStyle.fill}
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#007E85', marginTop: '0.75rem' }}>Payment Done!</h3>
          <p style={{ color: '#007E85', margin: '0.5rem 0' }}>Thank you for completing your secure online payment.</p>
          <p style={{ color: '#007E85' }}>Have a great day!</p>
          <div style={{ paddingTop: '1.5rem', textAlign: 'center' }}>
            <a
              href="/"
              style={{ backgroundColor: '#007E85', color: 'white', fontWeight: '600', padding: '0.75rem 1.5rem', borderRadius: '0.375rem', textDecoration: 'none' }}
            >
                BACK TO HOME            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
