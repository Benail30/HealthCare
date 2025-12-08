'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import '../../../styles/Today.css';

interface Appointment {
  id: number;
  name: string;
  date: string;
  time: string;
  type: string;
  image: string;
}

const TodaysAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    axios.get<Appointment[]>('http://localhost:3001/api/todayapp/') 
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('Error fetching today&apos;s appointments:', error);
      });
  }, []);

  return (
    <div>
      <h2 className="appointments-title">Today&apos;s Appointments</h2>
      <br />
      <br />
      <table className="appointments-table">
        <thead>
          <tr className="header-roww">
            <th className="header-cell">Patient Name</th>
            <th className="header-cell">Date</th>
            <th className="header-cell">Time</th>
            <th className="header-cell">Type</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="data-cell patient-name-cell">
                <div className="patient-image-container">
                  <Link href={`/doctor/${appointment.id}/today`}>
                    <img src={appointment.image} alt={appointment.name} className="patient-image" />
                  </Link>
                </div>
                <span className="patient-name">{appointment.name}</span>
              </td>
              <td className="data-cell">{appointment.date}</td>
              <td className="data-cell">{appointment.time}</td>
              <td className="data-cell">{appointment.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodaysAppointments;
