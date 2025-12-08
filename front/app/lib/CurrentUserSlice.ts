import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
 import { RootState } from './store';
import { CurrentUserState, User} from '../types/types';



const initialState: CurrentUserState = {
  loading: false,
  user: null,
  error: null,
  
};

export const fetchCurrentUser = createAsyncThunk(
  'currentUser/fetchCurrentUser',
  async (token:string) => {
    const response = await axios.get('http://localhost:3002/api/auth/getuser',
    {headers:{Authorization:token}
      });
    return response.data;
  }
);

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.user = null;
      });
  },
});


export default currentUserSlice.reducer;
