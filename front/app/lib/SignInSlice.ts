import { createSlice, PayloadAction,createAsyncThunk} from '@reduxjs/toolkit';
import { AppThunk } from '../lib/store';
import axios from 'axios'
import {SignInState} from '../types/types'



const initialState: SignInState = {
  loading: false,
  error: null,
  success: false,
  
};

export const signIn = createAsyncThunk(
  'signIn',
  async (body:any) => {
 
      const response = await axios.post('http://localhost:3002/api/auth/login', body);
      if (response.status === 200) {
        localStorage.setItem('token',response.data.token)
        console.log(response.data);
        return response.data;
     }
     else if (response.status===404) {
      console.log('error')
     }
  }
  
)
const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    signInStart(state) {
      state.loading = true
      state.error = null
      state.success = false
    },
    signInSuccess(state) {
      state.loading = false
      state.error = null;
      state.success = true;
    },
    signInFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  }
});

export const { signInStart, signInSuccess, signInFailure } = signInSlice.actions;

export default signInSlice.reducer;


