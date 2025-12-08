'use client'


function ServicesPage() {
    
  const data =  [
        {
          "name": "Dental Care",
          "description": "Oral health services and treatments for teeth",
          "photo": "https://s3-alpha-sig.figma.com/img/677a/6c98/db5390244b9ea5e277c963bbf9e38d25?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TX05Zl7n3GhDEvnhq~34XZ3z7Bbcf-lbQMz2oT8TCjZ5TWV1ppHaPi-vPSoYKXftdXc~GpeHOHzEqjx4QIz44eA198xjb-FEAiqr~NQ64UURLj4kJbthnirKl1RmH7A-qC4rL3NMr-qDenRshjLyar66hNvCkwt59lmdaNaUftaYLvginOShOYBk177kflFrtgmufkxVyodS-lxVsFynuDdx8nSC3lfpjFiq~x8oNmuzlmMHBpp-O6EEeUfuJ14MuK~~s0lqzXnNrcjleQRB1cKA2OMSbGJCJQauyLYu02AD-b6ul5pp~VBQoNgYdos3YxYJNTSBsuLOaq6LqQOOfg__"
        },
        {
          "name": "Orthopedics",
          "description": "Specialized care for musculoskeletal system and bones",
          "photo":"https://s3-alpha-sig.figma.com/img/94fd/2be0/4ec597277df53ed2e9f44b4f86abe508?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oJ51r51fVKLLFjrb-VLDnF9CT-G1OKJ-bG427xEBFlSc0OxtSIWo-xlaApZd3G5XrGUSRfKBwMHa1nlzqTUk5cRUzhgcrahfObj7xDeFHkl4--VP6~a-6l7lGl5Amf2Yln86aq~QU4F4FKwIWTuTVXDH3W7OOyAqVkBHS8d3n6MLCfOhZiRlc2coD4IqqpDFWBx5pLALm9gWOCWAJIy1xCjni51GUahvBkQWJY3B96J8jGi96r-S79JInNl1TmfXP7pJpMT8AxxbHwQnxQOgAWVIKEcqraO8KpJlJ42Gwr7pZx3dIsgpW9l0sqJk0EwZC~Kuc3~M5tKMeaB9vZtAew__",
        },
        {
          "name": "Eye Care",
          "description": "Vision-related services and treatments for eyes",
          "photo": "https://s3-alpha-sig.figma.com/img/d0e6/9f62/17237efcf984aa7b57434cbb05313cac?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kXlY88BD4~pf0IbxqlojHJIvqvo9Zxf4i6D13Bq2pH3DtiKC8EizCOmuqunLtGDs-hyPC3ULqA1WqqLp10wsOEiazxVcufDx-7DGRU-3pZNjgt3oXzA0T2YLrfqMAgjinPjTkKFBddXXCcUdRKN4I8Av8oAe4Ath4IRb5xqx3~JUSgPBsvXH~yszyCdW28OabvJ9ls-btqkYldV3fYf28zWwGgOoyrQUXkG7xzXqMIsbEjtDPG6DBIWi6kOVEcwW98YXUWljLH9-avCQ-PORnlFoydBc9KAKVXvTq-wzoaXJOJ9kso-f0TZSOXxOUqGQ9c8LVBSaeI6bnNmb40XXDA__"
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
          "photo": "https://s3-alpha-sig.figma.com/img/eb6a/abf7/45b970661ef876264f0eaf8d07c6a557?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=q92X7VoFUUx4FMtmrjqD4LyLatuD0RDTIL-dAa4t-tTKvOfMCjTv-9H4nd8Qqp1J-YyWKViTd-9CJuQKqE8ZC-fFmkmheEWVmsHFYqONHgEDqEe6C9ioL7lWTz5AdTjkkgIli3kXXLMdoaLAv~xh30hwiVyxxeJTHyku-5NKGfzoft4mpZBroq-rKnlf8XPioGLI4Zsetu8xn67-H1bSjNhCNt8R-hHHoQIWAPjdxLKqUPksWy3t4xSPkQT0EfCbtqph4kJKsUiySsdOtlc-E5Whw3xlJ8ffPZ241hszMII~nyM8fWY3Zu4ma2QgDhmhmVTXdXSqxIS3FvK1F1rfEw__"
        }
      ]
  
    
    return (
        <div style={{ backgroundColor: '#ECECEC', margin: 0, padding: 0 }}>
        <h1 style={{ color: '#007E85', textAlign: 'center' }}>Services We Provide</h1>
        <h3 style={{ color:'#5D5D5D', textAlign: 'center', fontSize: '15px',marginBottom:'4em'}}>Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan. </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', justifyContent: 'center',alignItems: 'center', marginLeft:'170px'}}>
          {data.map((item, index) => (
            <div key={index} style={{ width: '230px', height: 'auto', backgroundColor: '#FFFFFF', padding: '10px', borderRadius: '20px', fontFamily: 'Arial, sans-serif' }}>
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