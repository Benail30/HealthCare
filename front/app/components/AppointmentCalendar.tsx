'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { fetchAppointments, selectAppointments, selectStatus } from '../lib/AppointmentSlice';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AppointmentCalendar: React.FC = () => {
  const dispatch = useAppDispatch();
  const appointments = useAppSelector(selectAppointments);
  const status = useAppSelector(selectStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAppointments());
    }
  }, [dispatch, status]);

  return (
    <div>
    
      <Calendar />
      
    </div>
  );
};

export default AppointmentCalendar;
