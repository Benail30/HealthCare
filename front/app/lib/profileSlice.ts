import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Doctor {
  name: string;
  specialty: string;
  imageUrl: string;
  ratings: number;
  reviews: { author: string; comment: string; rating: number }[];
  appointments: { name: string; date: string; description: string; rating: number }[];
}

const initialState: Doctor = {
  name: 'Dr. Zven Den',
  specialty: 'Cardiology',
  imageUrl: 'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
  ratings: 4.2,
  reviews: [
    { author: 'Jane Smith', comment: 'Very thorough and kind.', rating: 5 },
    { author: 'Doe John', comment: 'Helpful and informative.', rating: 4 },
  ],
  appointments: [
    { name: 'Alice Wonderland', date: '2024-04-15, 10:00 AM', description: 'Routine check-up', rating: 4 },
    { name: 'Charlie Bucket', date: '2024-04-16, 11:00 AM', description: 'Consultation', rating: 5 },
    { name: 'Peter Pan', date: '2024-04-17, 09:00 AM', description: 'Follow-up', rating: 4 },
    { name: 'Wendy Darling', date: '2024-04-18, 01:00 PM', description: 'Vaccination', rating: 5 },
    { name: 'Captain Hook', date: '2024-04-19, 02:00 PM', description: 'Surgery consultation', rating: 3 },
  ],
};

const profileSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    updateDoctorData(state, action: PayloadAction<Doctor>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateDoctorData } = profileSlice.actions;

export default profileSlice.reducer;
