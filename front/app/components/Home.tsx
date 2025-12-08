'use client';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import ServicesPage from './ServicesPage';
import TeamMembers from './TeamMembers';
import Testimonial from './Testimonial';
import Footer from './Footer';
import '../styles/Home.css';
import img1 from '../img/img1.png';
import { FaPlayCircle } from 'react-icons/fa';
import Image from 'next/image';
import { PaginationProps,User ,Specialty} from '../types/types';
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import { fetchDoctors } from '../lib/DoctorSlice';
import { fetchSpecialty } from '../lib/SpecialtySlice';


import axios from 'axios';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const specialties = useAppSelector((state) => state.Specialty.specialties);
  const doctors = useAppSelector((state) => state.doctors.entities);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [data, setData] = useState(doctors);

  const [firstName, setFirstName] = useState('');
  const [filtred, setFiltred] = useState([]);

  useEffect(() => {
    dispatch(fetchSpecialty());
    dispatch(fetchDoctors());
  }, [dispatch]);

  useEffect(() => {
    setData(doctors); // Update data whenever doctors change
  }, [doctors]);

  const handleSpecialtyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecialty(event.target.value);
  };

  const FilterDoc = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/doctors/', {
        params: {
          firstName: firstName,
          speciality: selectedSpecialty,
        },
      });
      setFiltred(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleSearch = () => {
    if (firstName || selectedSpecialty) {
      FilterDoc();
    } else {
      setFiltred([]);
    }
  };
  const handleClick = () => {
    window.location.href = "/AppointmentCalendar";
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtred.length ? filtred.slice(indexOfFirstItem, indexOfLastItem) : data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='body'>
      <main className="flex min-h flex-col items-center ">
        <Navbar />
      </main>

      <div className="DoctorImg">
        <Image src={img1} alt="" layout='responsive' />
      </div>

      <div className="title">
        <h1 id='h1'>Providing Quality Healthcare for A Brighter and Healthy Future</h1>
        <p style={{ color: '#5D5D5D' }} id='p1'>At our hospital, we are dedicated to providing exceptional medical care to our patients and their families. Our experienced team of medical professionals, cutting-edge technology, and compassionate approach make us a leader in the healthcare industry</p>
      </div>

      <div id='divplay'>
        <button type="button" className="bt">appointments</button>
        <FaPlayCircle id='play' />
        <h4>watch now</h4>
      </div>

      <div className="divSearch" style={{ background: 'white' }}>
        <h3>Find A Doctor</h3>
        <div className='search'>
          <input className='input' type="text" placeholder="Name" onChange={(e) => setFirstName(e.target.value)} />
          <select className='input' value={selectedSpecialty} onChange={handleSpecialtyChange}>
            <option value="">Select Specialty</option>
            {specialties.map((specialty :Specialty) => (
              <option key={specialty.id} value={specialty.speciality}>
                {specialty.speciality}
              </option>
            ))}
          </select>
          <button type="button" className="ButtonSearch" onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="doctor-grid">
        {currentItems.map((doctor:User) => (
          <div key={doctor.doctorId} className="doctor-card">
            <Image
              src={doctor.imageUrl}
              alt={`Image of ${doctor.firstName}`}
              width={200}
              height={200}
              style={{ width: '100%', height: 'auto', aspectRatio: '1' }}
            />
            <div className="card-body">
              <h2>{doctor.firstName}</h2>
              <p>{doctor.speciality.speciality}</p>
              <button className="ButtonSearch" onClick={()=>{handleClick()}}>
                contact
              </button>
            </div>
          </div>
        ))}
      </div>

      <Pagination itemsPerPage={itemsPerPage} totalItems={filtred.length ? filtred.length : data.length} paginate={paginate} />

      <div className='divResult' style={{ textAlign: 'center' }}>
        <h2 style={{ color: 'rgba(0, 126, 133, 1)' }}>Our results in numbers</h2>
        <div style={{ color: 'rgba(0, 126, 133, 1)' }}>
          <h2 id='numbers'> 99%  15k 12k 240%</h2>
        </div>
        <div id='words'>
          <p id='words1'>Customer satisfaction </p>
          <p id='words2'>Online Patients</p>
          <p id='words3'>Patients Recovered</p>
          <p id='words4'>Company growth</p>
        </div>
      </div>

      <div className="divStart">
        <img className='img2' src='https://s3-alpha-sig.figma.com/img/ecde/e03a/8c87bbb9dbd9ce4757dcccfa5e15b856?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yxo7qcBoVhRyL5T0ocwKsqE4wQg-~53WsAMq3poUOZNgkhNrWscHsyGi2EV4a6PxP7bJpw6c4GYlDdE~aEcuKj4o2nL-W5ltxVHOJQkStUSuH3qhn5F3nF02R1cF~lKe00HrsVLLccZgMCq9igwz95~u86Ruw4Meyitd4J-be1Bw49lnPduAt27e~pk2TukF9KMXkbKKh6GVNvxN1reig3dEuCujgb-UbUogm0ETuTQ~CspmxiLOGHhWu224Jv0bxDVmNHqZnLzTOgbx4AvSU44ai07Rb~UNifwgQXkUE0Uya8h4lYiMSltaActlyIbWVJ3KTmj~5Rogsuwg6~pdzA__' />
        <h1 style={{ color: 'rgba(0, 126, 133, 1)' }}>You have lots of reasons <br />to choose us</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit</p>
        <button type="button" className="get-Started">get Started</button>
        <button type="button" className="Talk-To-Sales">Talk To Sales</button>
      </div>

      <ServicesPage />
      <TeamMembers />
      <Testimonial />
      <Footer />
      
    </div>
  );
};

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <button onClick={() => paginate(number)} className='page-link'>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Home;
