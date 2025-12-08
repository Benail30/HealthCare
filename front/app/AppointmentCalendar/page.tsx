
import React from 'react';
 
import AppointmentCalendar from '../components/AppointmentCalendar'; // Make sure this path points to your component
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const CalendarPage: React.FC = () => {
  return (
    <div className="calendar-page">
       <main className="flex min-h flex-col items-center ">
        <Navbar />
      </main>
      <AppointmentCalendar />
      <Footer />
    </div>
  );
};

// Wrap the page component with the Redux wrapper to connect the Redux store
export default CalendarPage