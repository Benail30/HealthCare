'use client'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';
import {Appointment} from '../types/types'


interface AppointmentsState {
    appointments: Appointment[];
    status: 'idle' | 'loading' | 'failed';
  }
  
  const initialState: AppointmentsState = {
    appointments: [],
    status: 'idle',
  };

export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Appointment[]>('http://localhost:3001/api/Appointment/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.appointments.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchAppointments.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { addAppointment } = appointmentsSlice.actions;
export const selectAppointments = (state: RootState) => state.appointments.appointments;
export const selectStatus = (state: RootState) => state.appointments.status;

export default appointmentsSlice.reducer;
