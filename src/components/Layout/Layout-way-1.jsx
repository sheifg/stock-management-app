import { Box } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, height: "100vh", overflow: "auto", width: "100%" }}
      >
        {/* It is wanted to display the content in this part */}
        {/* Approach/Way 1: using children and each time wrap the components */}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;

// It can be used children as props and then content use children
// or it can be wrapped in App.jsx the privates pages, where it is wanted to apply the layout in all of these pages
// It is just for using layout in all the pages

// {/* Approach/Way-2: it is necessary to wrap the entire routes with our Layout component */}
{
  /* <Route path="/stock" element={<Layout />}> */
}
// ....
// </Route>
