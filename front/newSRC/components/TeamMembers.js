import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';


function TeamMembers() {
    let data = [
        {
          "name": "Dr. Sarah Johnson",
          "job": "Dentist",
          "photo": "https://s3-alpha-sig.figma.com/img/b7b0/f38c/8ca6f556416228a4cc67ed0edff86d35?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=S-zu4tTWFmFFN-B5t0ze~8~cxMbfd67twoF0KnvTsiqd2QbhVYE87U-tJxhZBw4E1WV5z~Pnw59Gw4YexobIlLt3orLTueM0znoARkbkFXBom8U7rj1kyGnPQ2e5u5vJl~n9UvbcHW0G-0h-TXSUIpPc~Lpi~uWjQRK5z9c7WQKIKTkXzsEiDtMOuxuwoFsWldQp176HUDxEpqgqlti10WRbCcrHM7gweIfkbEEude33j9v2ivNWHO5adzgfhz-70Cm14U9HWQ32rz4-X04ER4k-MSqeM55zJKAH~Fg78wId06LSafCrKNhTQgFAsyq-0cD4mSH5dpXw8kK~V3XaXw__"
        },
        {
          "name": "Dr. Michael Thompson",
          "job": "Orthopedic Surgeon",
          "photo": "https://s3-alpha-sig.figma.com/img/63b2/8d8f/00c58641067a23c773c149f7209e1ea0?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XgCiOctqmKz5vnUxeAYxWvfhGa0w6gvQ2m7oxcwCuzjVtinjnOA98kNqrtZDKM6VGywxErwtA2ysmX2DL6-DuIpzFz0BPatwwEy78ia0jTpYxLn~mss0dDwdL~~DObvLhQq3cjxMcVzLv9ml0xDGMEqq~tut4iaR8K0leg9Sb0MS3M82IoOnuzF3FpAaLvqew9YiwrXm3-~h7be7g7per7CN9SJJaWiigz7T~r6yO7axRBAbh3u~8S~D7YkpHt0Zm0q2cdaKNpHrup1xSX5ESHGqP8~wRecRrX2NCxZSWlrkKMM7J9TUs6D-VBYEiMsYEjZgFk8P~YE-nYqJBnaYMw__"
        },
        {
          "name": "Dr. Emily Clark",
          "job": "Ophthalmologist",
          "photo": "https://s3-alpha-sig.figma.com/img/d5f2/1937/ad49fc2334099365f69e6374ccebef65?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Nxcq9vTSRupnJAlqRnK9AOMrXvREUFLm47fo2jvtZxvLXFb2Lc2A82B1bwhSjRDJsb403OcCh1T8TqJrOYfyhUGuCaLTKkNpKKLKsDDxgyChHaqVR9nUb3NFc4A-qxEvFl9h5U4Bg3vwMGN7MLBXKlgpzevZnVTXu38~mDpUviuXGAbfa9WW~02xUEtKh80hD8uGdGV0438ObV7fRqtuwDYAcuYe7RudT-kykgj28tkGfn6f~H~fpJ3f22H3TqrR6UBTxRqtqLw8NPdY70bRrrEYPH4n786xTIkVLqxJ2DoKxhWNWAwPfE2hg~NfbjqFUNLnYB57wUiwCIcbj5EXLw__"
        },
        {
          "name": "Dr. James Miller",
          "job": "General Surgeon",
          "photo": "https://s3-alpha-sig.figma.com/img/1765/61c6/3f030a09fbb84ac8a983d77280617f7f?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gFKFgTlVHZjDo~NOkfPTcY7tLazJ8Nkzzg5ZbHkjB~gzQU8nz0ik91EvNIk53HQcwHUq5JuW~JVCSamA8e5vBEBgx3rpn9AaL7SApuKT4qVQFrSpSYyfMqnZjYG5wd7yigqpP4JB4VqFkE5RF1YiZJFt5BV3-ky65gSAWYty1XcaoR74cL00Ygw2VU~7lqETeFDPS2Xi3rEPuWFrHO-Qbz3SPv7I2UZsseIAwuxATwqWYRMAhKG3zNpXmU3xV4dfAALg15HC1x16JO5clz0rbPu7zYxl7eSsL1ZfW2aIC~H0fgEsJw6GYPuO~4YeXG97DHWbDAmaNvU6j74vjOR1jA__"
        },
        {
          "name": "Dr. Jennifer Lee",
          "job": "Cardiologist",
          "photo": "https://s3-alpha-sig.figma.com/img/76d3/3676/c15a71cd6047c22e92ed9732bcaabf71?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lDNKbeNOiSyR5W7f7pBdricA5-IMo6pO1NaasnKMljS2s0Q7CYGmImrGp9PSQbd5Oq1l8S~zDnzf1jaI9ktJ6mjxnQQWY-2xiqEKAPzwDFyk8-dR5IjpghjMQ9KNXSJt8afvhwpuPQHxVyk2vvXcIbCPEgAqtxpo84wLPBR-A1CkTTLxSCeGGWyvRNxzUs0hznUCQl8Z-10kjRaU1WA3-xORqD9vY10wBupm~BLPbumFKQmaFVFgi0VdyQwNzwzN4MkbZqjLToupcBELhxu-M67UnPCfZbzTVPYkus0eXJP-vu5ZflqPbx1bCs3gYYe-wHgPzYaBk3sFnouUyOfhHA__"
        },
        {
          "name": "Dr. Jennifer Lee",
          "job": "Cardiologist",
          "photo": "https://s3-alpha-sig.figma.com/img/5135/ccac/f297db7eeaa9feac5411de549568e0c1?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PAOzPL3Eytt0RHJCaxiw6vfFypxTrUiVOg~vvsYJWxhmeg46sdGa-1CjA8lzIgItrJgcMPrFo8vLFByah-7uiYzRg-La~D9jPo6i8EIxZALxbmOK-vjumzsvigPUBFZUOJVm7xGwrKLnZlbBvGxM5TKSiKONgK44lstiAVa4JV~lSshiea-PD48WZLdW4d-vgEBbyhNG-ZmcXWBa0UFMzQYTj4~3Oc9xIeh5vrS0XAUKA79-TNc2qbtc9GgfYM~vPNgQ337nfI6zJpaNFd6yzm4ZkDMzMlNiCBkdyua5rzA3JSKDfsKVtit9dC2aLOIDat~dI5wNOOwAPJp4oi0pJg__"
        }
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
             {data.map((item) => (
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '20px', textAlign: 'center', width:'230px' }}>
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
