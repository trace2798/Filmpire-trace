import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useState, useEffect, useContext } from "react";
import { Sidebar, Search } from "..";
import { fetchToken, createSessionID, moviesApi } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { ColorModeContext } from "../../utils/ToggleColorMode";
import { setUser, userSelector } from "../../features/auth";
 

const NavBar = () => {
  const { isAuthenticated, user } = useSelector(userSelector)
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  //is something is larger than 600px it is not going to be mobile.
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const dispatch = useDispatch(); 
  const colorMode = useContext(ColorModeContext);
  // const isAuthenticated = false;
  console.log('Navbar User',user);

  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStorage = localStorage.getItem("session_id");

  //we only want to recall this useEffect whenever our token changes.
  useEffect(() => {
    const logInUser = async () => {
      //see if token exist.
      if (token) {
        console.log('token', token);
        //see if localStorage session_id exist(we defined the term above)
        if (sessionIdFromLocalStorage) {
          
          //if both the above items exist we need to get the user data.
          const { data: userData } = await moviesApi.get(
            `account?session_id=${sessionIdFromLocalStorage}`
          );
          dispatch(setUser(userData));
          console.log('Navbar here from NavBar:',userData.id, userData.username);
        } else {
          const sessionId = await createSessionID();
          const { data: userData } = await moviesApi.get(
            `account?session_id=${sessionId}`
          );
          //we then have to dispatch the user data to keep it in the redux state.
            //so we need to create a new features. we create a new slice called auth.
          dispatch(setUser(userData));
        }
      }
    };

    logInUser();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>{user.username} &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar?.avatar_path}`}
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {/* Line below translates to if on Mobile show this else something else */}
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
