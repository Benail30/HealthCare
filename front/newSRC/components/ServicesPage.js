import React from 'react'

function ServicesPage() {
    
  const data =  [
        {
          "name": "Dental Care",
          "description": "Oral health services and treatments for teeth",
          "photo": "https://s3-alpha-sig.figma.com/img/677a/6c98/db5390244b9ea5e277c963bbf9e38d25?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AVFKlQEgg-hwf33aM3ZmariQR0v2D7o6DQhjebro23buwGcKatNiZ2hhge9lV2o-sflt70jdu5EuVM-CKfjcNA~jw9OIz-P-5GraeqcT9qiHIdIdTnKYWfcT8Upg-2BqCBuTzDJm7RHWfMZ6Myqcz32OeLf2bVyFQLDcBG0BC1b9OvwQZPcjahfR-~e-haEHTbwT7c8uw3tNBMZoN-BHXe3FiyKa9yNl1Bs9lDgTKcEIiRumLhJMVlEL8GLjwwVj-~tGQ41PMv9m~VF9dbzxA2F0CnT2gkMo~xOe4aIJMCwwgz~1LNK13Ho9OJ-rnZ9XEv-HcNj2pTtkebCP86OzOA__"
        },
        {
          "name": "Orthopedics",
          "description": "Specialized care for musculoskeletal system and bones",
          "photo":"https://s3-alpha-sig.figma.com/img/94fd/2be0/4ec597277df53ed2e9f44b4f86abe508?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eJ6wTkRa698Xhgqv0uwSZeGsUNpSYqznNPrpiV1WRZdGCp2MpbLBjICXDrFL6TFOe0W517VzSZ1tZhfcMKOcpRGymPuAnQfiWWBms7T6V3cfe233mm-LTibEIVsHiC59qiMhn2d4uih-4Dj1jm8~CvPNVAyS~ecwXj5M8QhUR3wffMFeMQiem5kZ2ukNRPmCSsKkMwif7LG8SXuZGXkS6~5keZKohL59flrWkRHOaIxaFUcKunaHbYBRz5uGvChkOxh2vSecOpgSPsUtK19mLmDzWm4okUY57iE~F9lLZKi8dzT0FiNVmNovKAMoll3BZfbmYMf4294xPFQze8pDaQ__",
        },
        {
          "name": "Eye Care",
          "description": "Vision-related services and treatments for eyes",
          "photo": "https://s3-alpha-sig.figma.com/img/eb6a/abf7/45b970661ef876264f0eaf8d07c6a557?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oHO3kxqmmpzd8ej8qQgyE4tbkU-wDG-iiBtU06skBG9V4AjFeUO5jOSRGjlbVB42f8BkjrhNWy-v8SWwsiEaX5~SfokkhbJUb5JROxN3VFC6u8~291QPcaXjldBdCjS4pkyaR4240Ys1V6D06NbCMRChgDwjh1N2oJFBYKGlgoOLVrdkRzIALfKjq-ylJvGDRkFIhFa6HakOT6ZOKsRcEWt4qt2u0UcasWlapIxD7K8T4t5tQNfj1QkjzQwBFVgGHH~jDeYLUM4aPqPKevZ6qi1oJFucLbXB-PD~6JMx~PGNGh7jYa~-J3ltPpJ3ZQD9ja5pBw~s13Nodst2q56Big__"
        },
        {
          "name": "Surgery",
          "description": "Medical procedures for various conditions and ailments",
          "photo": "https://www.figma.com/file/xIUQ3SMgaySFldsMv8JZmi/image/6021b2973888caded75511828c02372b724163e3"
        },
        {
          "name": "Cardiology",
          "description": "Heart-related medical services and treatments",
          "photo": "https://www.figma.com/file/xIUQ3SMgaySFldsMv8JZmi/image/2df00ddaab39ba7d7cf3c90f3f813b583341f20e"
        },
        {
          "name": "Diagnosis",
          "description": "Identifying medical conditions through tests and examinations",
          "photo": "https://s3-alpha-sig.figma.com/img/d0e6/9f62/17237efcf984aa7b57434cbb05313cac?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KFNUSZRyBa0LJ1~2uqAi~FMY~ibp8SqZtwcq~007Syj~jcsz76LLfsJvBzN8P3uj6PNZlPmUb0XpZKxyG4mW9XwTkBIsfrLPrq4ato1ZbF0d8KkFJQYzSqyDWEn9Ha3SN09b5a9CxU6tyYJ1gaOxJ7psukcmEYKJF~J0Bo-2144iaZTi2NRCqkqLmjNF5Zo1E4o6QkV8VOSheGLA75LHuQI3q83DrGyO2o6ADVbde1s2ejmXcN6iL~NkfijRS5cFjtX~jNysb9cMXXT4C2Rgo6hHdzb2XR37hO-dEZGKdy9UF2gJj2UhpTuocsf08UDeymJO3x7ICRWiEQWbS2fLYA__"
        }
      ]
  
    
    return (
        <div style={{ backgroundColor: '#ECECEC', margin: 0, padding: 0 }}>
        <h1 style={{ color: '#007E85', textAlign: 'center' }}>Services We Provide</h1>
        <h3 style={{ color:'#5D5D5D', textAlign: 'center', fontSize: '15px',marginBottom:'4em'}}>Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan. </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', justifyContent: 'center',alignItems: 'center', marginLeft:'170px'}}>
          {data.map((item) => (
            <div style={{ width: '230px', height: 'auto', backgroundColor: '#FFFFFF', padding: '10px', borderRadius: '20px', fontFamily: 'Arial, sans-serif' }}>
              <img src={item.photo} alt="Service Image" style={{ width: '100%', height: '170px', objectFit: 'cover', marginBottom: '10px', borderRadius: '20px' }} />
              <h2 style={{ color: '#007E85', fontSize: '20px', fontWeight: 'bold' }}>{item.name}</h2>
              <p style={{ color: '#5D5D5D', fontSize: '13px' }}>Nisi quis aliquip amet officia officia velit magna enim cupidatat pariatur minim esse nisi pariatur. Sit ullamco anim velit est dolor.</p>
              <a href="#" style={{ color: '#007E85', textDecoration: 'none' }}>Learn More &#10132;</a>
            </div>
          ))}
        </div>
      </div>
    )
}
export default ServicesPage
