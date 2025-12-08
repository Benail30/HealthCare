import React from 'react'

function Testimonial() {
    let data = [
        {
          "name": "Dr. Sarah Johnson",
          "job": "Dentist",
          "photo": "https://s3-alpha-sig.figma.com/img/5135/ccac/f297db7eeaa9feac5411de549568e0c1?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PAOzPL3Eytt0RHJCaxiw6vfFypxTrUiVOg~vvsYJWxhmeg46sdGa-1CjA8lzIgItrJgcMPrFo8vLFByah-7uiYzRg-La~D9jPo6i8EIxZALxbmOK-vjumzsvigPUBFZUOJVm7xGwrKLnZlbBvGxM5TKSiKONgK44lstiAVa4JV~lSshiea-PD48WZLdW4d-vgEBbyhNG-ZmcXWBa0UFMzQYTj4~3Oc9xIeh5vrS0XAUKA79-TNc2qbtc9GgfYM~vPNgQ337nfI6zJpaNFd6yzm4ZkDMzMlNiCBkdyua5rzA3JSKDfsKVtit9dC2aLOIDat~dI5wNOOwAPJp4oi0pJg__",
          "review": "Highly skilled and professional"
        },
        {
          "name": "Dr. Michael Thompson",
          "job": "Orthopedic Surgeon",
          "review": "Great bedside manner",
          "photo": "https://www.figma.com/file/xIUQ3SMgaySFldsMv8JZmi/image/8fe7ad6b85c053224d98bfd7e680608c07f3c239",
        },
        {
          "name": "Dr. Emily Clark",
          "job": "Ophthalmologist",
          "review": "Excellent care and expertise",

          "photo": "https://s3-alpha-sig.figma.com/img/0577/f0e9/b7fca2f32639871454da0de95f951709?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JNqy~MgzfTYiIFcizL-nr-Wr6ojSHe5uLBKQ1mvSOq71xqvn5SZa0JnKg4PqsxU3OyopZW3D797~muYI6V3nfsJusTlzfVJb7~dTmI3JTR43RFEFD-8LrRIhvSQnuMzD6Si7Z75gDgN6q6S8qNKoFbnbxloe-QIGIy-VmyUAgCDFfeMUlnO5olljOaKAYissbOtELqaFbwrJjoQfxwYmVnNjC7qKEQSmhyExt2VRnKeLEJiWE2e1IsdMJjW1U7PtWkXUACSEa9jIvKcy-AGsrUpT~0YqNYMkNQMNGYe5mWVyqSMox0-I4XfCjYOWKDhcF~neWYMkjQgy7tjmKgoaZg__"
        }
      ]
    return (
        <div style={{ backgroundColor: '#ECECEC', margin: 0, padding: 0 }}>
            <h1 style={{ color: '#007E85', textAlign: 'center' }}>Testimonial</h1>
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
                    marginRight:'40px'
                }}
            >
            
                 {data.map((item) => (  
                 <div style={{ width: '300px', backgroundColor: '#FFFFFF', border: '1px solid #ccc', borderRadius: '10px', overflow: 'hidden', margin: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                 <div style={{ textAlign: 'center' }}>
        <img src={item.photo} alt="Doctor's" className="round-image" style={{ width: '100px', height: '100px', borderRadius: '50%', marginTop: '20px',marginRight:'140px' }} />
      </div>
      <div style={{ padding: '20px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px', color:'#333333' }}>“{item.review}”</h2>
        <p style={{ fontSize: '14px', lineHeight: '1.5', marginBottom: '10px', color:'#555555' }}>Lorem ipsum dolor sit ametolil col consectetur adipiscing lectus a nunc mauris scelerisque sed egestas.</p>
        <p><strong style={{ fontWeight: 'bold' , color:'#007E85' }}>{item.name}</strong></p>
        <p><strong style={{ fontSize: '13px', color:'#555555' }}>{item.job}</strong></p>
      </div>
    </div>
    ))}
            </div>
            <div>
              <br/>
              <br/>
            <h1 style={{ color: '#007E85', textAlign: 'center' }}>Trusted by 10,000+ companies around the world</h1>
               < img src="https://i.ibb.co/FJqLdXY/Screen-Shot-2024-03-27-at-20-10-15.png" alt="Company Logos" style={{ width: '100%', height: 'auto', display: 'block', margin: '0 auto', marginTop: '20px' }} />
            </div>
       
          
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
            <h1 style={{ color: '#333333', textAlign: 'center',fontSize:'24px' }}>Subscribe to our newsletter</h1>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
         <input type="email" placeholder="enter your email" style={{ marginRight: '10px', padding: '10px', border: 'none',fontSize: '16px', width: '400px', borderRadius:'11px' }} />
         <button style={{ padding: '10px 20px', backgroundColor: '#007E85', color: '#fff', border: 'none', cursor: 'pointer' ,  borderRadius:'11px'}}>Subscribe</button>
        </div>
        </div>
        </div>
    )
}

export default Testimonial

