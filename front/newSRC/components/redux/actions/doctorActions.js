// src/components/redux/actions/doctorActions.js
export const SET_DOCTOR_PROFILE = 'SET_DOCTOR_PROFILE';

export const fetchDoctorProfile = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3000/api/doctors/all');
    const profile = await response.json();
    dispatch({
      type: SET_DOCTOR_PROFILE,
      payload: profile,
    });
  } catch (error) {
    console.error('Failed to fetch doctor profile:', error);
  }
};

export const setDoctorProfile = (profile) => ({
  type: SET_DOCTOR_PROFILE,
  payload: profile,
});
