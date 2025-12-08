import { SET_REVIEWS } from '../actions/reviewsactions';

const initialState = {
  reviews: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
