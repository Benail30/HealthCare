import React, { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchReviews } from './redux/actions/reviewsactions';
import ReactStars from 'react-stars';

function Reviews() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.reviews.reviews);
    const userId =localStorage.getItem('userId'); 

    useEffect(() => {
        dispatch(fetchReviews());
        console.log(userId);
    }, [dispatch]);

    // const filteredData = data.filter(item => item.userId === userId);
    
    const filteredData = [
        {
            "rating": 5,
            "review": "Excellent service and product quality!",
            "imageSrc": "https://s3-alpha-sig.figma.com/img/d5f2/1937/ad49fc2334099365f69e6374ccebef65?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jjW5qwkvGoSauZjRWe3K-E9~45N56oh-iYtLtMDm4tQzpXYXLQ0dYCXp2EhpCYZIU4uJBkelSClx8KIyNbZSZxFGzTcissEKrdlmOikQpwSMhb~NV3ubuOJey3m1M0OBiStdEB2dE9uCk8X1FtGEdw7LB9jgBkg6TbrfZug2uGVa7kR68ymOOtqGJclv-AYW7rnVBozkVuO6ccNjnYcZxZE1hlgdiOe89BWh2yOIRql7lMLm6mHxu42F35Oh0l9baLvD9e3tGySk32bjaOE2uJdmymDISLLtxA39AkrcokCO7-vF~btRAnto7RRW4YQoH3pvsy2MeJgTVNag82hOow__",
            "name": "John Doe"
          },
          {
            "rating": 4,
            "review": "Excellent service and product quality!",
            "imageSrc": "https://s3-alpha-sig.figma.com/img/63b2/8d8f/00c58641067a23c773c149f7209e1ea0?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i4kYmfAjwm0FWqEtXPMbg3hdaJy~x7kMlG2MseF28sKSPTgD8PA1GMjEYJtbEkj9W3PNv5k578v8y~038A~dPdW2~jvfiZqyJYSpkxjjzoGG1qPkW3J92panCwY-DWVGTkmG5ffHcuXZrMSCcNJgBMbLECm63BHsOkKoK-v1NxM~Z1r3NZ5RY5HfjMuK08E6Ula4HeYY1BmrZkWhJJq7MYG120LJtCsL8h9biczZqUXrv63~dY5ePKq5yzRep-jeEOSgvD93zaguk~qVPE6c3EOwa5xgEDGNJ1gQ4tUAvBODt5CChQtGNpjm4np7j-ANBEtFoTu0nnmpzc2x6PnPTg__",
            "name": "Jane Smith"
          },
          {
            "rating": 3,
            "review": "Excellent service and product quality!",
            "imageSrc": "https://s3-alpha-sig.figma.com/img/b7b0/f38c/8ca6f556416228a4cc67ed0edff86d35?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Av9OCeJk0h6mBMYWC~AuzPxCbCkgI28sjsBNWKqrqn-z2oFYwfZ5PSFPmhAZMKaY5W3SHFAV9X4EEChCOwXUiqF0nA4V0Vg-KHHJYxZm38n12cEbhpsp~lFe-JxMShPpvRSAQTsfUqf8srOeyjxYtCBUwP7zavS6Flpnkqii7nD3vDmn8UrgeBg2lPmt1B8U8HhWfgWYQYS0oXth7oAps386m900KICyPw9ambjqKprY5XSsfq2F3Mzxir6sL62mAr5JN3pO1cUz4HHe6lIasV-zVWo6jNAKtVX9ODRS2JavEKkRpiccoxmNF4ZoQKC-GatwF31QqEtd33n3gbMefw__",
            "name": "Alice Johnson"
          },
          {
            "rating": 5,
            "review": "Excellent service and product quality!",
            "imageSrc": "https://s3-alpha-sig.figma.com/img/d5f2/1937/ad49fc2334099365f69e6374ccebef65?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jjW5qwkvGoSauZjRWe3K-E9~45N56oh-iYtLtMDm4tQzpXYXLQ0dYCXp2EhpCYZIU4uJBkelSClx8KIyNbZSZxFGzTcissEKrdlmOikQpwSMhb~NV3ubuOJey3m1M0OBiStdEB2dE9uCk8X1FtGEdw7LB9jgBkg6TbrfZug2uGVa7kR68ymOOtqGJclv-AYW7rnVBozkVuO6ccNjnYcZxZE1hlgdiOe89BWh2yOIRql7lMLm6mHxu42F35Oh0l9baLvD9e3tGySk32bjaOE2uJdmymDISLLtxA39AkrcokCO7-vF~btRAnto7RRW4YQoH3pvsy2MeJgTVNag82hOow__",
            "name": "John Doe"
          },
          {
            "rating": 4,
            "review": "Excellent service and product quality!",
            "imageSrc": "https://s3-alpha-sig.figma.com/img/63b2/8d8f/00c58641067a23c773c149f7209e1ea0?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i4kYmfAjwm0FWqEtXPMbg3hdaJy~x7kMlG2MseF28sKSPTgD8PA1GMjEYJtbEkj9W3PNv5k578v8y~038A~dPdW2~jvfiZqyJYSpkxjjzoGG1qPkW3J92panCwY-DWVGTkmG5ffHcuXZrMSCcNJgBMbLECm63BHsOkKoK-v1NxM~Z1r3NZ5RY5HfjMuK08E6Ula4HeYY1BmrZkWhJJq7MYG120LJtCsL8h9biczZqUXrv63~dY5ePKq5yzRep-jeEOSgvD93zaguk~qVPE6c3EOwa5xgEDGNJ1gQ4tUAvBODt5CChQtGNpjm4np7j-ANBEtFoTu0nnmpzc2x6PnPTg__",
            "name": "Jane Smith"
          },
          {
            "rating": 3,
            "review": "Excellent service and product quality!",
            "imageSrc": "https://s3-alpha-sig.figma.com/img/b7b0/f38c/8ca6f556416228a4cc67ed0edff86d35?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Av9OCeJk0h6mBMYWC~AuzPxCbCkgI28sjsBNWKqrqn-z2oFYwfZ5PSFPmhAZMKaY5W3SHFAV9X4EEChCOwXUiqF0nA4V0Vg-KHHJYxZm38n12cEbhpsp~lFe-JxMShPpvRSAQTsfUqf8srOeyjxYtCBUwP7zavS6Flpnkqii7nD3vDmn8UrgeBg2lPmt1B8U8HhWfgWYQYS0oXth7oAps386m900KICyPw9ambjqKprY5XSsfq2F3Mzxir6sL62mAr5JN3pO1cUz4HHe6lIasV-zVWo6jNAKtVX9ODRS2JavEKkRpiccoxmNF4ZoQKC-GatwF31QqEtd33n3gbMefw__",
            "name": "Alice Johnson"
          },
          
       
       
      ]
    
    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
        
            {console.log(filteredData)}
            {filteredData.map((item, index) => (
                <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.15)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <img src={item.imageSrc} alt="Reviewer" style={{ width: '70px', height: '70px', borderRadius: '50%', marginRight: '20px', objectFit: 'cover' }} />
                        <div>
                            <h3 style={{ marginBottom: '5px', fontSize: '20px', color: '#333' }}>{item.name}</h3>
                            <ReactStars count={item.rating} value={item.rating} size={24} color1="#CCCCCC" color2="#FFD700" edit={false} />
                        </div>
                    </div>
                    <p style={{ fontSize: '16px', color: '#666' }}>{item.review}</p>
                </div>
            ))}
        </div>
    );
}

export default Reviews;
