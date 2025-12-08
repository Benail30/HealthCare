const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BLOGS_SUCCESS':
      return {
        ...state,
        blogs: action.payload,
        loading: false,
      };
    case 'FETCH_BLOGS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'ADD_BLOG':
      return {
        ...state,
        blogs: [...state.blogs, action.payload],
      };
    default:
      return state;
  }
};

export default blogReducer;
