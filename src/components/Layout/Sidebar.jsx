import config from "../../config/config";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
} from "@mui/material";
import { useSelector } from "react-redux";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import StarsIcon from "@mui/icons-material/Stars";
import CategoryIcon from "@mui/icons-material/Category";
import { NavLink } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const drawerWidth = config.drawerWidth;
const MyDrawer = styled(Drawer)(({ theme, open }) => ({
  // https://mui.com/material-ui/api/drawer/#:~:text=.MuiDrawer%2Dpaper,the%20Paper%20component.
  // paper means content for mui
  //! Using ternary operator to check is the open is true or not
  //! No using destructuring, it is needed to use/check the open is true or not multiple times() in all of the key that it is wanted. This way is cleaner code than using destruturing, because it is more human readable
  // It is used something similar to mini variant drawer in mui
  // https://mui.com/material-ui/react-drawer/#:~:text=Show%20code-,Mini%20variant%20drawer,-In%20this%20variation
  // but more understandable this code in terms of styling

  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: open ? `${drawerWidth}px` : theme.spacing(7), // spacing(7): 7 times default space,
    backgroundColor: "#1976D2",
    boxSizing: "border-box",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: open
        ? theme.transitions.duration.enteringScreen
        : theme.transitions.duration.leavingScreen,
    }),
    overflowX: open ? "visible" : "hidden", //overflow the content
  },
}));

const menuItems = [
  { title: "Dashboard", icon: <DashboardIcon />, path: "/stock/dashboard" },
  { title: "Products", icon: <InventoryIcon />, path: "/stock/products" },
  { title: "Sales", icon: <ReceiptIcon />, path: "/stock/sales" },
  { title: "Purchases", icon: <ShoppingCartIcon />, path: "/stock/purchases" },
  { title: "Firms", icon: <AccountBalanceIcon />, path: "/stock/firms" },
  { title: "Brands", icon: <StarsIcon />, path: "/stock/brands" },
  { title: "Categories", icon: <CategoryIcon />, path: "/stock/categories" },
];

const Sidebar = () => {
  const { sidebarOpen } = useSelector((state) => state.ui);
  return (
    // true: expand the sidebar | false: collapse the sidebar
    // permanent: it will always display the collapsed sidebar -> width: spacing(7)
    // width: open ? `${drawerWidth}px` : theme.spacing(7),
    <MyDrawer variant="permanent" open={sidebarOpen}>
      <Toolbar />
      <List component="nav">
        {sessionStorage.getItem("isAdmin") === "true" && (
          <ListItem
            // https://reactrouter.com/en/main/components/nav-link
            // A <NavLink> is a special kind of <Link> that knows whether or not it is "active", "pending" or "transitioning"
            component={NavLink}
            to={config.BASE_URL + "/admin"}
            title="Admin Dashboard"
            sx={{ color: "white" }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Admin Dashboard" />
          </ListItem>
        )}
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            component={NavLink}
            to={item.path}
            title={item.title}
            sx={{ color: "white" }}
          >
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </MyDrawer>
  );
};

export default Sidebar;
