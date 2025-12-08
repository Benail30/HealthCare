import { SET_DOCTOR_PROFILE } from '../actions/doctorActions';

const initialState = {
  profile: null,
};

const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DOCTOR_PROFILE:
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};

export default doctorReducer;
