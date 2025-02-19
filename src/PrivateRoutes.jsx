import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoutes = () => {
  const currentUser = sessionStorage.getItem("username") || null;

  // It is necessary to check if there is a user or not:
  // - If there is no user(the user is not logged) navigate to the login
  // - If there is user (user is logged in), navigate to outlet, everything inside the nested private routes
  if (!currentUser) {
    toast.error("You need to login first");
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoutes;

//! localStorage: keep your data after closing the page
//! sessionStorage: automatically clear your storage when the page is closed (securer)
