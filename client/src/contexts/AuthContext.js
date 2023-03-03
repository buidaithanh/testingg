import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducer/authReducer";
import axios from "axios";
import { LOCAL_STORAGE_TOKEN_KEY } from "./constains";
import setAuthToken from "../utils/setAuthToken";
import { apiUrl } from "./constains";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  //authenticate user
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_KEY]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_KEY]);
    }

    try {
      const response = await axios.get(`${apiUrl}/auth`);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  loadUser();

  //register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userForm);
      if (response.data.success)
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, response.data.acessToken);

      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  //login
  const LoginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success)
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, response.data.acessToken);
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const authContextData = { LoginUser, registerUser, authState };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
