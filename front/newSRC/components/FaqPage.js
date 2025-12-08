import React from "react";
import { useNavigate } from 'react-router-dom';
function faqPage() {
  let data = []
  data.length = 9
  data.fill(0)

  return (
    <div>
      <div style={{ backgroundColor: "#ECECEC", margin: 0, padding: 0 }}>
        <h1 style={{ color: "#007E85", textAlign: "center" }}>FAQ</h1>
        <h3
          style={{
            color: "#5D5D5D",
            textAlign: "center",
            fontSize: "15px",
            marginBottom: "4em",
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar
          elementum tempus hac tellus libero accumsan.
        </h3>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "180px",
          marginRight: "70px",
          backgroundColor: "#ECECEC",
          padding: "20px",
          borderRadius: "14px",
        }}
      >
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            style={{
              width: "200px",
              backgroundColor: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              borderRadius: "14px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              fontSize: "10px",
              height: "fit-content", // Adjusted height property
              width: "280px", // Adjusted width property
            }}
          >
            <h3 style={{ color: "#282F45", textAlign: "center" }}>
              <span style={{ marginRight: "15px", color: "#007E85" }}>
                &rarr;
              </span>
              the quick fox jumps over the lazy dog.
            </h3>
            <p style={{ color: "#787878", fontSize: "18px", textAlign: "center" }}>
              Things on a very small scale behave like
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default faqPage;
