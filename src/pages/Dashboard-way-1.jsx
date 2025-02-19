import NavbarTry from "../components/NavbarTry";
import Layout from "../components/Layout/Layout";

const Dashboard = () => {
  return (
    //Implementation of way 1: wit is necessary to wrap each time with Layout each page to pass the children prop
    // wrapping the dashboard with Layout component
    <Layout>
      <div>
        <NavbarTry />
      </div>
    </Layout>
  );
};

export default Dashboard;
