import {
  Box,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  styled,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import StarsIcon from "@mui/icons-material/Stars";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CategoryIcon from "@mui/icons-material/Category";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/auth";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;
const drawerHeight = "100vh";

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // Necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    height: drawerHeight,
    background: "linear-gradient(#3f63e0, #b26bbb)",
    boxSizing: "border-box",
    transition: theme.transitions.create("width"),
    ...(!open && {
      width: theme.spacing(7),
      overflowX: "hidden",
      transition: theme.transitions.create("width"),
    }),
  },
}));

const NavbarTry = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // To select something from the store, it i necessary to use useSelector
  const { email, currentUser } = useSelector((state) => state.auth);

  const sidebarMenu = [
    { list: "Admin Panel", icon: <AdminPanelSettingsIcon /> },
    { list: "Dashboard", icon: <DashboardIcon /> },
    { list: "Products", icon: <InventoryIcon /> },
    { list: "Sales", icon: <ReceiptIcon /> },
    { list: "Purchases", icon: <ShoppingCartIcon /> },
    { list: "Firms", icon: <AccountBalanceIcon /> },
    { list: "Brands", icon: <StarsIcon /> },
    { list: "Categories", icon: <CategoryIcon /> },
  ];

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleOpenMenu = (e) => {
    // Avatar
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // dispatch is used for firing functions from the store, to get the actions() inside the store
    dispatch(logout(navigate));
  };

  return (
    <div>
      {/* // Using material UI components
        //flexGrow grow as possible, for the whole screen */}
      <Box sx={{ flexGrow: 1, display: "flex" }}>
        <AppBar position="fixed" color="primary" open={open}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={[
                {
                  marginRight: 5,
                },
                open && { display: "none" },
              ]}
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Stock Management App
            </Typography>
            {currentUser ? (
              <IconButton
                variant="circular"
                opacity="0.1"
                sx={{ bgcolor: "gray" }}
                onClick={handleOpenMenu}
              >
                <Typography>{currentUser.substring(0, 1)}</Typography>
              </IconButton>
            ) : (
              <Avatar alt="profilepicture" src="" onClick={handleOpenMenu} />
            )}

            <Menu open={menuOpen} anchorEl={anchorEl} onClose={handleCloseMenu}>
              <MenuItem>{email}</MenuItem>
              <MenuItem>Admin</MenuItem>
              <MenuItem onClick={() => navigate("/profile")}>
                Change Password
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <List>
            {sidebarMenu.map((text) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={[
                    {
                      minHeight: 48,
                      px: 2.5,
                    },
                    open
                      ? {
                          justifyContent: "initial",
                        }
                      : {
                          justifyContent: "center",
                        },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: "center",
                      },
                      open
                        ? {
                            mr: 3,
                          }
                        : {
                            mr: "auto",
                          },
                    ]}
                  >
                    {text.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={text.list}
                    sx={[
                      open
                        ? {
                            opacity: 1,
                          }
                        : {
                            opacity: 0,
                          },
                    ]}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </div>
  );
};

export default NavbarTry;
