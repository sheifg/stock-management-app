import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import config from "../../config/config";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordIcon from "@mui/icons-material/Password";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../store/auth";

const drawerWidth = config.drawerWidth;

// Header is the Navbar (in mui is App bar)
// customize AppBar
//? styled(AppBar)(({ theme, open }) => ({ ... }))`:
//* This line creates a styled version of the AppBar component. The styling is based on a function that receives the theme object and the open prop.
//* theme provides access to the Material-UI theme object, which includes values like colors, spacing, zIndex and transition settings.
//* open is a boolean prop that indicates whether the drawer (sidebar) is open or not.

const MyAppBar = styled(AppBar)(({ theme, open }) => ({
  // header it will over the drawer, so we will need
  // zIndex = 101;
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // conditional for the open

  // Ternary operator
  // width: open ? `calc(100% - ${drawerWidth}px)` : '100%',

  // Using destructring ...
  // The previous values remain and transition it will be overwrite when the open is true
  // If open is true the width will be automatically calculate
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// When it is being done desctrucing of the object here, it is being extarcted width and transition and assigned new values to them

//? transition: theme.transitions.create('width'),
//* This line sets up a transition effect for the width property. It uses the default transition settings from the Material-UI theme, which allows for a smooth resizing of the AppBar

//? ...(open && { ... }):
//* This spread operator conditionally applies additional styles when the open prop is true. This is where the customization for when the drawer is open happens

//! When open is true:
//? width: calc(100% - ${drawerWidth}px):
//* This calculates the width of the AppBar to be the full width of the viewport minus the width of the open drawer (drawerWidth).
//? transition: theme.transitions.create('width', { easing, duration }):
//* This customizes the transition effect specifically for the width change
//* easing: theme.transitions.easing.sharp: Specifies the easing function for the transition, making it more or less abrupt
//* duration: theme.transitions.duration.enteringScreen: Sets the duration for the transition to the one defined for elements entering the screen

const Header = () => {
  //! The useSelector hook is a feature provided by the React-Redux library that allows React components to access the state stored in a Redux store
  //! Allows you to extract data from the Redux store state for use in this component, using a selector function
  const { sidebarOpen } = useSelector((state) => state.ui);

  // To update the state, it is necessary to use the reducers, using dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = sessionStorage.getItem("username");

  // State for anchor element, whenever it is clicked, the state is updated
  const [anchorEl, setAnchorEl] = useState(null);

  // open = {true} means the sidebar is opened

  return (
    <MyAppBar open={sidebarOpen}>
      <Toolbar>
        <IconButton
          color="inherit"
          size="large"
          edge="start" // edge to push to the left is using start, start from the left
          sx={{ mr: 2 }}
          onClick={() => dispatch(uiActions.toggleMenu())}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h5" noWrap sx={{ flexGrow: 1 }}>
          Item Stock Management
        </Typography>

        {/* ! Toolbar is called Menu in mui https://mui.com/material-ui/react-menu/*/}

        <Box
          sx={{ cursor: "pointer" }}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          {/* The API doesnt provide any images for the users */}
          {/* alt={currentUser.toUpperCase(): this avatar it will use the first letter of the user 
                  alt="John" it would take J as avatar
                  src="it can be written whatever"
                  If the image is broken, it will use the alt part*/}
          <Avatar src="broken-image" alt={currentUser.toUpperCase()} />
        </Box>
        <Menu
          // Inside the menu https://mui.com/material-ui/react-menu/
          // There is positioned popover
          //? https://mui.com/material-ui/react-menu/#positioned-menu  next link inside the previous one
          //? https://mui.com/material-ui/react-popover/#anchor-playground*
          // There are different props and classes available to use
          //! Here it is being used Popover features
          // anchorEl, open onClose, they can be found inside the popper and inside popover
          // onClose it can be found inside of popover
          //? A Popper can be used to display some content on top of another. It's an alternative to react-popper ( https://mui.com/material-ui/react-popper/)
          //? A Popover can be used to display some content on top of another (https://mui.com/material-ui/react-popover/)
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          // To close the menu when it is clicked
          onClose={() => setAnchorEl(null)}
          // Position
          // anchorOrigin and trnasformOrigin come from popover
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Avatar
                src="broken-image"
                alt={currentUser.toUpperCase()}
                variant="square"
              />
              <Stack direction="column" textAlign="center">
                <Typography
                  ml="50px"
                  variant="h6"
                  sx={{ textTransform: "capitalize" }}
                >
                  {currentUser}
                </Typography>
                <Typography
                  ml="50px"
                  variant="subtitle2"
                  sx={{
                    color: "gray",
                  }}
                >
                  {/* To store everything inside the sessionstorage or localstorage it will be a string. So it is necessary to check if the isAdmin is true with comparisson */}
                  {/* By default the user and isAdmin are flase, it can be changed directly inside:the application in session storage
                  inspect -> application -> session storage -> expand the menu and inside of isAdmin write true and then click again in the avatar and it will show as Admin*/}
                  {sessionStorage.getItem("isAdmin") === "true"
                    ? "Admin"
                    : "User"}
                </Typography>
              </Stack>
            </Stack>
          </MenuItem>
          {/* Divider make a line */}
          <Divider />
          {/* Whenever it is clicked, the change password and it is wanted to navigate the user to profile page, so it is necessary to use navigate and setAnchorEl(null) to remove the dropdown menu */}
          <MenuItem
            onClick={() => {
              navigate("/stock/profile");
              setAnchorEl(null);
            }}
          >
            <PasswordIcon sx={{ mr: 2 }} />
            Change Password
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => dispatch(logout(navigate))}>
            <LogoutIcon sx={{ mr: 2 }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </MyAppBar>
  );
};

export default Header;

//https://mui.com/material-ui/react-app-bar/#app-bar-with-menu
// mui initially started using styled components
// It will be used differente things/styles, but similar

// https://mui.com/material-ui/customization/z-index/
//! default values of zIndez in mui
// app bar: 1100
// drawer: 1200
//! So it is necessary to change that because it is wanted the appbar over the drawer

// https://mui.com/material-ui/customization/default-theme/
// There are default values of theme
