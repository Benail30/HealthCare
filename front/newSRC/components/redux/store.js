import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import authReducer from './reducers/authreducer';
import emailReducer from './reducers/emailReducer';
import reviews from './reducers/reviews';
import blogReducer from './reducers/blogReducer';
import productReducer from './reducers/productReducer';

const rootReducer = {
  auth: authReducer,
  reviews: reviews,
  email: emailReducer,
  blog: blogReducer,
  product: productReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Correct usage
});

export default store;
