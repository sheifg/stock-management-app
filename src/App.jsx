import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import {
  Categories,
  Dashboard,
  Firms,
  Login,
  Products,
  Profile,
  Purchases,
  Register,
  Sales,
} from "./pages";
import PrivateRoutes from "./PrivateRoutes";
import Layout from "./components/Layout/Layout";
import Brands from "./pages/Brands";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* The path it can be left it empty and access when user directly to /dashboard, but in that case it is wanted to created /stock before */}
      <Route path="/stock" element={<PrivateRoutes />}>
        {/* Way-2 it is necessary to wrap the entire routes with the Layout component */}
        <Route path="/stock" element={<Layout />}>
          {" "}
          {/* The path can also be: path="" */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="sales" element={<Sales />} />
          <Route path="purchases" element={<Purchases />} />
          <Route path="firms" element={<Firms />} />
          <Route path="brands" element={<Brands />} />
          <Route path="categories" element={<Categories />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
    // In case there is no a path in privates routes, it is had to include before the path that the user wants to go, the "/"
    //     <Route element={<PrivateRoutes />}>
    //       <Route path="/dashboard" element={<Dashboard />} />
    //     </Route>
  );
};

export default App;
