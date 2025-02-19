import { Box, Toolbar } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    // https://mui.com/material-ui/customization/default-theme/
    // Default color background is #fff in mui
    <Box sx={{ display: "flex", backgroundColor: "#EFEFEF" }}>
      <Header />
      <Sidebar />

      <Box
        component="main"
        sx={{ flexGrow: 1, height: "100vh", overflow: "auto", width: "100%" }}
      >
        {/* This is the part that it is wanted to display the content */}
        {/* Way-1: using children props and each time wrap your components */}
        {/* {children} */}

        {/* Way-2: using Routes */}
        {/* It will push the content down, because it is wanted to push the Layout down, so using Toolbar it will do it */}
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
