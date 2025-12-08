'use client'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';


function TeamMembers() {
    let data = [
        {
          "name": "Dr. Sarah Johnson",
          "job": "Dentist",
          "photo": "https://s3-alpha-sig.figma.com/img/63b2/8d8f/00c58641067a23c773c149f7209e1ea0?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WEe3BFQkzOpFhJT6fbARSle3yDzoIsyWp-Pzvui~bKuzImtK9uQlwdYBm0RqYJDRmhs3RUsvvn8W1ZozviERHMXmWxAdr6LTvhc5oXTlGVobltlVFhAMB~kxi5QYFf23Jxk9mk2kvPBfxgnzB3IaT5fK98198wfVSQrjjqzyxex3D~4l18XJF1~EGt4IWtPSWu0dBDb7cnA~OehkMlJBJwfcDSK0bjVYIVG7qg9qdeSz9a-VtEraqNZN082MEf5bAjyVbzY8gJ6nl0RWJi19RvDFQk1FdPxv-7KVr0VAfMGuQLdnxB0Irt7ZyE9HMM-2nD8V3q~K0V9E0YUWfxJBaA__"
        },
        {
          "name": "Dr. Michael Thompson",
          "job": "Orthopedic Surgeon",
          "photo": "https://s3-alpha-sig.figma.com/img/1765/61c6/3f030a09fbb84ac8a983d77280617f7f?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aP2TNS0ThiTiHyhDyE8LyQuVx7xhmhYQ4669E2uvgVvtm9H2oY9Go6pv1uV6pu4VByI96KucCnBohjUMG~jrB~A58E-QTVU1OrKXF1ypia6z7Hin8nzt11bSJOUAaPU9AOXxp1hNzjdfaWL1QT07VRxaLGU1dEtOcUMq0is4D2b3QdqU-PNY7lWR9BnGKagWzO9xdQ0Dgq6GE8U5a5-7N74wWV4kwdfcvFYV5wSduP-egQ4eX-mbZ1jn-ck~5THhDULmQ3K-tOhXc1SAbMzIlKuBrhBhS3E7XLIt2C47wFJbfEDObyo6-e31cjELklY4kqeR8JOyKDgnoS2~BihmbQ__"
        },
        {
          "name": "Dr. Emily Clark",
          "job": "Ophthalmologist",
          "photo": "https://s3-alpha-sig.figma.com/img/5135/ccac/f297db7eeaa9feac5411de549568e0c1?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y7oJr-hg4LW6EcsfKLEVn0f6zJycHtsgLFiQOZZrZ4VkyiyGmU1PdX76rlegpCMgTY3j5BpsZAcG-dyAbk8hyJyaiO2-ErZ-aLRY8mAnmwU3jdwf-m-xH3gNyPFRau7ABNN-ZFCOAyxH8hxmhZE~QetBjNiu2f3qwEArxrhwRS4nJqEGKfP-aI7GvPuDn0tYFC3tDsyNPpShDeIDX1Ya79tEB86Z5e3TdokqxSYI-E1o389Hj~JKByMJmY8-9KDZlm0Kz0GVzvuy4dWUcrzC4exXO5YcERrgFqBe09wpv5a2SoXvKDmi6ApjQquTdc2TSVwcagkGln76Aii30oIXow__"
        },
       
    ]
    
    
    return (
        <div style={{ backgroundColor: '#ECECEC', margin: 0, padding: 0  }}>
            <h1 style={{ color: '#007E85', textAlign: 'center' }}>Meet our Team Members</h1>
            <h3 style={{ color: '#5D5D5D', textAlign: 'center', fontSize: '15px', marginBottom: '4em' }}>
                Culpa reprehenderit tempor aliqua velit Culpa reprehenderit tempor aliqua velit
            </h3>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '20px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: '170px',
                    
                }}
            >
             {data.map((item, index) => (
                    <div key={index} style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '20px', textAlign: 'center', width:'230px' }}>
                    <img
                        src={item.photo}
                        alt="Team Member"
                        style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '10px' }}
                    />
                    <h2 style={{ color: '#007E85' ,fontSize:"15px"} }>{item.name}</h2>
                    <h3 style={{ color: '#000',fontSize:"15px" }}>{item.job}</h3>
                    <p style={{ color: '#5D5D5D' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>

{/*                     
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                            <FontAwesomeIcon icon={faFacebook} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                            <FontAwesomeIcon icon={faTwitter} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                            <FontAwesomeIcon icon={faInstagram} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                        </div> */}
                    </div>
                </div>
                  ))}
            </div>
        </div>
    );
}

export default TeamMembers