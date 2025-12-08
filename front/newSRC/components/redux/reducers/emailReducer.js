const initialState = {
    emailResponse: null,
    error: null,
  };
  
  const emailReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SEND_EMAIL_SUCCESS':
        return {
          ...state,
          emailResponse: action.payload,
          error: null,
        };
      case 'SEND_EMAIL_FAILURE':
        return {
          ...state,
          emailResponse: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default emailReducer;