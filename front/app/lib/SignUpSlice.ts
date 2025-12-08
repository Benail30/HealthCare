
'use client'

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { useAppDispatch } from './hooks'; // Assuming you've exported useAppDispatch and useAppSelector from the provided hooks file
import axios from 'axios'
import {SignUpState,User} from '../types/types';



const initialState: SignUpState = {
  loading: false,
  error: null,
  success: false,
};

export const signup = createAsyncThunk(
  'signup/signup',
  async (userData:User) => {
 
      const response = await axios.post('http://localhost:3002/api/auth/register', userData);
        console.log(response.data);
        
    return response.data;
  }
  
);

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(signup.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message||"somthing wrong";
      state.success = false;
    });
  },
});

export default signupSlice.reducer;

// Exporting actions for external use


// Example of how to use these actions with the useDispatch hook

