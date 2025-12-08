'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Doctor, DoctorState } from '../types/types';  // Assuming types.ts is in the same directory

export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async () => {
  const response = await axios.get('http://localhost:3001/api/doctors/all');
  console.log(response.data,'test');
  
  return response.data;
});

const initialState: DoctorState = {
  entities: [],
  loading: false,
  error: null
};

const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.entities = action.payload; 
        state.loading = false;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.error = action.error.message || "Something went wrong";
        state.loading = false;
      });
},
});

export default doctorSlice.reducer;
