import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config/config";
import { toast } from "react-toastify";

//! Web storage objects localStorage and sessionStorage allow to store key/value pairs in the browser. Both key and value must be strings
//! localStorage is similar to sessionStorage, except that while localStorage data has no expiration time, sessionStorage data gets cleared when the page session ends — that is, when the page is closed
const initialState = {
  currentUser: sessionStorage.getItem("username") || null, // the value is written as string, because localStorage and sessionStorage
  token: sessionStorage.getItem("token") || null,
  firstName: sessionStorage.getItem("firstName") || null,
  lastName: sessionStorage.getItem("lastName") || null,
  email: sessionStorage.getItem("email") || null,
  isAdmin: sessionStorage.getItem("isAdmin") || null,
  id: sessionStorage.getItem("id") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // It is necessary an action to update the state with the user's data
    auth(state, action) {
      // !  Usually login and register should be used the same syntax, not like here because change user for data
      state.token = action.payload.token;
      state.currentUser =
        action.payload?.user?.username || action.payload?.data?.username;
      state.firstName =
        action.payload?.user?.firstName || action.payload?.data?.firstName;
      state.lastName =
        action.payload?.user?.lastName || action.payload?.data?.lastName;
      state.email = action.payload?.user?.email || action.payload?.data?.email;
      state.isAdmin =
        action.payload?.user?.isAdmin || action.payload?.data?.isAdmin;
      state.id = action.payload?.user?._id || action.payload?.data?._id;
    },
    // username, token, firstName, lastName and email will come from the API
    // Accessing API requires an async process
    // It can't be done async process in reducer
    // It is had to use the auth when it is had the auth from API
  },
});

// Async actions to access the API
export const login = (userInfo, navigate) => {
  return async (dispatch) => {
    // It is just wanted to navigate to dashboard, if the login is successful
    // It can be only used hooks in functional components
    // const navigate = useNavigate();
    // It is necessary to pass as argument and the hook navigate comes from Login functional components
    try {
      const url = `${config.BASE_URL}/auth/login`;

      const { data } = await axios({
        url,
        method: "POST",
        data: userInfo,
      });

      // With fetch is always hard to catch an eror, yoU need to catch manually writting
      //! 4xx it is not error for fetch, so you need to recognize and show it. Axios recogenizes automatically. With fetch you need manually
      // because 401 is not an error for fetch for example --> 401 (Unauthorized)
      //! With axios doesn't need, it is just needed using fetch
      //   if (!data?.token) {
      //     throw new Error("Something went wrong");
      //   }

      const { token, username, firstName, lastName, email } = data;
      // The const payload can be created
        // const payload = { token, username, firstName, lastName, email };
      // Here as there is a response from the API, the state can be updated
      // To update the state, it is needed to dispatch an action
        //   dispatch(authSlice.actions.auth(payload));
        // dispatch(
        //     authSlice.actions.auth({ token, username, firstName, lastName, email })
        // );
      dispatch(authSlice.actions.auth(data));

      // The token can also be saved in the session storage
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("username", data.user.username);
      sessionStorage.setItem("firstName", data.user.firstName);
      sessionStorage.setItem("lastName", data.user.lastName);
      sessionStorage.setItem("email", data.user.email);
      sessionStorage.setItem("isAdmin", data.user.isAdmin);
      sessionStorage.setItem("id", data.user._id);

      toast.success("Login successful");
      navigate("/stock/dashboard");

      //! It is had to use navigate here because if it is just used in Login.jsx, even if the login is not successful, somehow it starts the process to reach the page. But privte routes not allow that, so it will take the user again to the Login page. For that reason it is necessary to do it in the asyn function, because that is the unique place where can be assured that the login is successful
    } catch (error) {
      // error.message is a generic message, so it is needed to check the message to show
      // toast.error(error.message);
      // If the documentation is good it can be checked it in the API, but the best way it is -> go to console and then to network, try login with wrong password or email and check the error. Then click in the response and then it is possible to see the message that it is wanted to include it and the path to indicate where
      console.log(error);
      toast.error(
        error.response.data?.details ||
          error.response.data?.message ||
          error.message
      );
    }
  };
};
export const register = (userInfo, navigate) => {
  return async (dispatch) => {
    try {
      const url = `${config.BASE_URL}/users`;

      const { data } = await axios({
        url,
        method: "POST",
        data: userInfo,
      });

      dispatch(authSlice.actions.auth(data));

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("username", data.data.username);
      sessionStorage.setItem("firstName", data.data.firstName);
      sessionStorage.setItem("lastName", data.data.lastName);
      sessionStorage.setItem("email", data.data.email);
      sessionStorage.setItem("isAdmin", data.data.isAdmin);
      sessionStorage.setItem("id", data.data._id);

      toast.success("Register successful");
      navigate("/stock/dashboard");
    } catch(error) {
      console.log(error);
      toast.error(
        error.response.data?.details ||
          error.response.data?.message ||
          error.message
      );
    }
  };
};

export const logout = (navigate) => {
  return async (dispatch) => {
    try {
      const url = `${config.BASE_URL}/auth/logout`;

      const { data } = await axios({
        url,
        method: "GET",
        //!  It si not necessary to send any data,but  it is neeeded to introduce that it is going to headers with authorization and token. Headers is communication with API, each request has headers and body, it doesn't matters if there are not defined. Axios names for the body as "data"
        // Headers part is used to communicate with the API. Inside the headers, there is communication structure. It is not related to the method
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      });

      // Creating this const to avoid writing directly in dispatch, can be messy
      const info = {
        token: null,
        user: {
          username: null,
          firstName: null,
          lastName: null,
          email: null,
          isAdmin: null,
          id: null,
        },
      };

      dispatch(authSlice.actions.auth(info));
      // Clear the whole session storage
      sessionStorage.clear();
      toast.success("Logout successful");

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data?.details ||
          error.response.data?.message ||
          error.message
      );
    }
  };
};
//It isnot necessary to navigate here, because it is just being changed the password
export const changePassword = (newPassword) => {
  return async () => {
    try {
      const id = sessionStorage.getItem("id");
      const url = `${config.BASE_URL}/users/${id}`;

      const { data } = await axios({
        url,
        method: "PUT", //'PATCH' it exists the both methods to update the password in the documentation. In that case it would be better patch because it something specific
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
        data: { password: newPassword },
      });

      toast.success("Password changed successful");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data?.details ||
          error.response.data?.message ||
          error.message
      );
    }
  };
};

// It is only had one action, it is not necessary to export it, because it is just used it for the async functions
export const authReducer = authSlice.reducer;
