import axios from "axios";
export const FETCH_REVIEWS = 'FETCH_REVIEWS';
export const SET_REVIEWS = 'SET_REVIEWS';
export const fetchReviews = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:3000/api/ratingComments/all');
        const reviews = await response.data;
        console.log('dd',reviews);
        dispatch({
            type: SET_REVIEWS,
            payload: reviews,
        });
    } catch (error) {
        // Handle error
        console.error('Error fetching reviews:', error);
    }
};