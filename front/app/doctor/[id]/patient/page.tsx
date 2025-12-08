"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios'; 
import "../../../styles/Patie.css";

type Patient = {
  id: string;
  date: string;
  name: string;
  gender: string;
  disease: string;
  status: string;
  image: string;
};

const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]); 

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/patients/'); 
        if (response.status !== 200) {
          throw new Error('Failed to fetch data');
        }
        const data = response.data;
        setPatients(data as Patient[]); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

  return (
    <div>
      <h2 className="recent-patients-title">Recent Patients</h2>
      <br />
      <br />
      <table className="patient-table">
        <thead>
          <tr className="header-row">
            <th className="cell-header">Patient Name</th>
            <th className="cell-header">Visit Id</th>
            <th className="cell-header">Date</th>
            <th className="cell-header">Gender</th>
            <th className="cell-header">Diseases</th>
            <th className="cell-header">Status</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td className="cell patient-name-cell">
                <Link href={`/doctor/${patient.id}/patient`}>
                  <b className="patient-name">{patient.name}</b>
                </Link>
                <div className="patient-image-container">
                  <img src={patient.image} className="patient-image" alt={`Image of ${patient.name}`} />
                </div>
              </td>
              <td className="cell">{patient.id}</td>
              <td className="cell">{patient.date}</td>
              <td className="cell">{patient.gender}</td>
              <td className="cell">{patient.disease}</td>
              <td className="cell">{patient.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
