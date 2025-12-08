import axios from "axios";
import { json } from "react-router-dom";

export const login = (Email, Password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { Email, Password }
      );
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userType", user.UserType);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("user", JSON.stringify(user)); // Store user object as a string
      
      dispatch({ type: "LOGIN_SUCCESS", payload: { user, token } });
      console.log(response.data);
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.error });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };
};
