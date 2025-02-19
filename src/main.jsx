import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { ToastContainer } from "react-toastify";
import { CssBaseline } from "@mui/material";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <CssBaseline />
      <App />
      {/* ToastContainer can be inisde or outside the provider */}
      <ToastContainer />
    </Provider>
  </BrowserRouter>
);
