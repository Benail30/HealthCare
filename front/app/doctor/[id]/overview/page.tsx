'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { CgProfile } from "react-icons/cg";
import { FaRegCalendarAlt } from "react-icons/fa";
import { SiConsul } from "react-icons/si";
import { IoIosVideocam } from "react-icons/io";
import { GrOverview } from "react-icons/gr";
import { CiCalendar } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { SlEnvolopeLetter } from "react-icons/sl";
import { FaBlogger } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdReviews } from "react-icons/md";






import '../../../styles/Prof.css';

const AppointmentTable = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())

 const data = [
        {
            name: 'Bogdan Kriv',
            id:5556,
            gender: 'Male',
            age: 45,
            date: '12 April',
            time: '9:30',
            status: 'Declined',
            image: 'https://img.freepik.com/free-photo/medium-shot-smiley-man-posing_23-2148243624.jpg',
        },
        {
            name: 'Jenny Wilson',
            id:5856,
            gender: 'Female',
            age: 25,
            date: '25 April',
            time: '10:30 AM',
            status: 'Confirmed',
            image: 'https://img.freepik.com/free-photo/intriguing-mysterious-handsome-young-european-man-looks-curiously_273609-17036.jpg',
        },
        {
            name: 'Dianne Russel',
            id:45654,
            gender: 'Male',
            age: 45,
            date: 'Today',
            time: '14:30 PM',
            status: 'Confirmed',
            image: 'https://img.freepik.com/free-photo/woman-with-wet-dark-hair-combed-back-wearing-silk-oversize-shirt-with-one-shoulder-nude_343059-1331.jpg',
        },
        {
            name: 'Annette Black',
            id:8556,
            gender: 'Male',
            age: 45,
            date: 'Today',
            time: '14:30 PM',
            status: 'Confirmed',
            image: 'https://img.freepik.com/premium-photo/portrait-young-man-against-blue-background_1048944-17038912.jpg',
        },
        {
            name: 'Angelina Jully',
            id:54556,
            gender: 'Male',
            age: 45,
            date: 'Today',
            time: '14:30 PM',
            status: 'Confirmed',
            image: 'https://img.freepik.com/free-photo/close-up-brunette-woman-looking-camera-gray_171337-1000.jpg',
        },
        {
            name: 'Esther Howard',
            id:7844,
            gender: 'Male',
            age: 45,
            date: 'Today',
            time: '14:30 PM',
            status: 'Confirmed',
            image: 'https://img.freepik.com/free-photo/young-female-model-portrait_23-2149084910.jpg',
        },
        {
            name: 'Robert Fox',
            id:5251,
            gender: 'Male',
            age: 45,
            date: 'Today',
            time: '14:30 PM',
            status: 'Declined',
            image: 'https://img.freepik.com/premium-photo/portrait-young-man-against-blue-background_1048944-17038912.jpg',
        },
    ];


    const handleDateChange = (value: Date | Date[]) => {
        setSelectedDate(value as Date);
    };

    return (
        <div>
        <div className="containerrr">
            <div className="bar-side-component">
                <ul>
                    <li className="button-like"><GrOverview />Overview</li>
                    <Link href="today">
                       <li className="button-like"><CiCalendar />Appointment</li>
                        </Link>                   
                         <Link href="patient">
                    <li className="button-like"><CgProfile />My Patients</li>
                    <Link href={`review`}>
                    <li className="button-like"><MdReviews />Reviews</li>

</Link>
                    </Link> <li className="button-like"><FaRegClock />Schedule Timings</li>
                    <li className="button-like"><MdOutlinePayment />Payments</li>
                    <li className="button-like"><SlEnvolopeLetter />Message</li>
                    <li className="button-like"><FaBlogger />Blog</li>
                    <li className="button-like"><IoMdSettings />Settings</li>
                </ul>
            </div>
        </div>
            <div className="containerr">
                <div className="welcome-message">
                    <p className="welcome-text">Welcome, Dr. Stephen</p>
                    <p className="have-a-nice-day">Have a nice day at great work</p>
                </div>
                <div className="patient-info-container">
                    <div className="patient-info-content">
                        <CgProfile />
                        <p className="patient-info-text">24.4k</p>
                        <p className="patient-info-label">Total Patients</p>
                    </div>
                </div>
                <div>
                    <div className="patient-appointments-container">
                        <div className="patient-info-content-appointments">
                            <FaRegCalendarAlt />
                            <p className="patient-info-text-appointments">166.3k</p>
                            <p className="patient-info-label-appointments">Appointments</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="patient-clinic-container">
                        <div className="patient-info-content-clinic">
                            <SiConsul />
                            <p className="patient-info-text-clinic">53.5k</p>
                            <p className="patient-info-label-clinic">Clinic Consulting</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="patient-video-container">
                        <div className="patient-info-content-video">
                            <IoIosVideocam />
                            <p className="patient-info-text-video">28.0k</p>
                            <p className="patient-info-label-video">Video Consulting</p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="appointment-request">
                        <h1>Appointment Request</h1>
                        <table className="appointment-table">
                            <thead>
                                <tr>
                                    <th className="table-header table-name">Name</th>
                                    <th className="table-header table-gender">Gender</th>
                                    <th className="table-header table-age">Age</th>
                                    <th className="table-header table-date">Date</th>
                                    <th className="table-header table-time">Time</th>
                                    <th className="table-header table-status">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, index) => (
                                    <tr key={index} className="table-row">
                                        <td className="table-data">
                                            <img src={row.image} alt={row.name} className="appointment-image" />
                                            <br />
                                            <span>{row.name}</span>
                                        </td>
                                        <td className="table-data">{row.gender}</td>
                                        <td className="table-data">{row.age}</td>
                                        <td className="table-data">{row.date}</td>
                                        <td className="table-data">{row.time}</td>
                                        <td className="table-data">
                                            <button className={`status-button ${row.status.toLowerCase()}`}>
                                                {row.status}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="calendar-container">
                    <Calendar
        onChange={handleDateChange}
        value={selectedDate}
    />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentTable;
