import React from "react";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Logo from "../../images/aatrips_logo.png";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import getAuthToken from "../../Token/getAuthToken";
import useAuthentication from "../../hooks/useAuthentication";
import "./LandingHeader.css";

const drawerWidth = 260;
const navItems = ["Home", "About Us", "Contact Us"];

// Create a custom theme with a breakpoint
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1024,
    },
  },
});

const LandingHeader = (props) => {
  const token = getAuthToken();
  const { logout } = useAuthentication();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box className="drawer-logo-container">
        <Link to="/">
          <img src={Logo} alt="AATrips logo" style={{ width: "160px" }} />
        </Link>
      </Box>
      <Divider sx={{ opacity: 0.6 }} />
      <Box className="drawer-links-wrapper">
        {navItems.map((item) => (
          <Link
            to={
              item === "Home"
                ? "/"
                : item === "About Us"
                ? "/aboutUs"
                : item === "Contact Us"
                ? "/contactUs"
                : `/${item}`
            }
            key={item}
            style={{ textDecoration: "none" }}
          >
            <Button fullWidth className="drawer-nav-item">
              {item}
            </Button>
          </Link>
        ))}
        {token ? (
          <Button
            fullWidth
            onClick={logout}
            className="header-btn drawer-action-btn"
          >
            Log Out
          </Button>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1.5, px: 2 }}>
            <Link to="/signin" style={{ textDecoration: "none", width: "100%" }}>
              <Button
                fullWidth
                className="header-btn drawer-action-btn"
                sx={{ mt: "0 !important" }}
              >
                Sign In
              </Button>
            </Link>
            <Link to="/signup" style={{ textDecoration: "none", width: "100%" }}>
              <Button
                fullWidth
                className="header-btn drawer-action-btn"
                sx={{
                  mt: "0 !important",
                  background: "var(--primary-color) !important",
                  color: "#fff !important",
                  "&:hover": {
                    background: "var(--primary-color) !important",
                    opacity: 0.9
                  }
                }}
              >
                Sign Up
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box className="header-root">
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            component="nav"
            className="floating-appbar"
          >
            <Toolbar sx={{ margin: { xl: "8px 200px", md: "8px 100px" }, justifyContent: "space-between" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              
              <Typography
                variant="h6"
                component="div"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Link to="/">
                  <Box
                    component="img"
                    sx={{ width: { xs: "110px", sm: "140px", md: "196px" } }}
                    src={Logo}
                    alt="AATrips logo"
                  />
                </Link>
              </Typography>

              {/* Mobile CTA Buttons (Sign In and Sign Up) */}
              <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 0.5, ml: "auto", mr: 1 }}>
                {token ? (
                  <Link to="/agent/dashboard" style={{ textDecoration: "none" }}>
                    <Button 
                      size="small" 
                      className="header-btn"
                      sx={{ 
                        fontSize: "10px", 
                        padding: "3px 8px", 
                        minWidth: "fit-content",
                        textTransform: "capitalize",
                        height: "28px"
                      }}
                    >
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/signin" style={{ textDecoration: "none" }}>
                      <Button 
                        size="small" 
                        sx={{ 
                          fontSize: "10px", 
                          padding: "3px 8px", 
                          minWidth: "fit-content",
                          textTransform: "capitalize",
                          color: "var(--primary-color)",
                          fontWeight: 700,
                          height: "28px",
                          mr: 0.5
                        }}
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" style={{ textDecoration: "none" }}>
                      <Button 
                        size="small" 
                        className="header-btn"
                        sx={{ 
                          fontSize: "10px", 
                          padding: "3px 8px", 
                          minWidth: "fit-content",
                          textTransform: "capitalize",
                          height: "28px",
                          bgcolor: "var(--primary-color) !important",
                          color: "#fff !important",
                          "&:hover": {
                            bgcolor: "var(--primary-color) !important",
                            opacity: 0.9
                          }
                        }}
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </Box>

              <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
                {navItems.map((item) => (
                  <Link
                    to={
                      item === "Home"
                        ? "/"
                        : item === "About Us"
                        ? "/aboutUs"
                        : item === "Contact Us"
                        ? "/contactUs"
                        : `/${item}`
                    }
                    key={item}
                    style={{ textDecoration: "none" }}
                  >
                    <Button className="nav-link-item">
                      {item}
                    </Button>
                  </Link>
                ))}
                
                {token ? (
                  <Link to="/agent/dashboard" style={{ textDecoration: "none" }}>
                    <Button className="header-btn">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link to="/signin" style={{ textDecoration: "none" }}>
                    <Button className="header-btn">
                      Sign In
                    </Button>
                  </Link>
                )}
              </Box>
            </Toolbar>
          </AppBar>
          
          <nav>
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              classes={{ paper: "mobile-drawer-paper" }}
            >
              {drawer}
            </Drawer>
          </nav>
        </Box>
      </ThemeProvider>
    </Box>
  );
};

LandingHeader.propTypes = {
  window: PropTypes.func,
};

export default LandingHeader;
