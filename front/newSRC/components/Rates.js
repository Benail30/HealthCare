import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from './redux/actions/reviewsactions';
import ReactStars from 'react-stars';

function Rates() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.reviews.reviews);
    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch]);

    function getTopRatedComments(data) {
        // Sort the data by rating in descending order
        const sortedData = data.sort((a, b) => b.rating - a.rating);
        // Get the top 3 rated comments
        const topRatedComments = sortedData.slice(0, 3);

        return topRatedComments;
    }

    let filtred = [
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
      
    console.log('filter', filtred);
    console.log(data);
    return (
        <div>
            <h1 style={{ color: '#007E85', textAlign: 'center' }}>Leading Medicine</h1>
            <h3 style={{ color: '#5D5D5D', textAlign: 'center', fontSize: '15px', marginBottom: '4em' }}>
                Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan.
            </h3>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '20px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: '130px',
                    marginRight: '40px',
                    height: 'fit-content',
                }}
            >
                {filtred.map((item) => (
                    <div
                        style={{
                            width: '300px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            margin: '20px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <div style={{ textAlign: 'center' }}>
                            <img
                                src={item.imageSrc}
                                alt=""
                                className="round-image"
                                style={{ width: '100px', height: '100px', borderRadius: '50%', marginTop: '20px', marginRight: '140px' }}
                            />
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '10px',
                                }}
                            >
                                <h3 style={{ fontSize: '17px', color: '#007E85', marginRight: '30px' }}>{item.name}</h3>
                                <div style={{ whiteSpace: 'nowrap' }}>
                                    <ReactStars  count={item.rating} value={item.rating} size={17} color1="#CCCCCC" color2="#FFD700" edit={false}  />
                                </div>
                            </div>
                            <h2 style={{ fontSize: '20px', marginBottom: '10px', color: '#333333' }}>“{item.review}”</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Rates;
