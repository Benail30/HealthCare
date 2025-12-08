import { configureStore,ThunkAction, Action } from '@reduxjs/toolkit'
import signUpReducer from './SignUpSlice';
import signInReducer from './SignInSlice';
import SpecialtyReducer from './SpecialtySlice';
import doctorReducer from './DoctorSlice';
import CurrentUserReducer from './CurrentUserSlice';
import appointmentsReducer from './AppointmentSlice';
export const makeStore = () => {
  return configureStore({
    reducer: {
      currentUser:CurrentUserReducer ,
        signUp: signUpReducer,
        signIn: signInReducer,
        Specialty: SpecialtyReducer,
        doctors: doctorReducer,
        appointments: appointmentsReducer,

    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;