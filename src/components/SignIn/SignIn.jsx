import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  ThemeProvider,
  createTheme,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;

import Footer from "../LandingPage/Footer";
import LandingHeader from "../LandingPage/LandingHeader";
import useAuthentication from "../../hooks/useAuthentication";
import whiteLogo from "../../images/aatrips_logo.png";
import "./SignIn.css";

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1A3A6E",
    },
  },
});

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, isLoading, error } = useAuthentication();

  const rememberUser = secureLocalStorage.getItem("remember");
  const [loginData, setLoginData] = useState({
    email: rememberUser?.email || "",
    password: rememberUser?.password || "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(loginData, location, navigate);
  };

  return (
    <Box className="signin-root">
      <LandingHeader />
      <ThemeProvider theme={theme}>
        <Box className="signin-grid-container">
          
          {/* LEFT BRAND PANEL */}
          <Box className="brand-panel">
            {/* Native Inline Animated SVG Flight Lines */}
            <svg className="brand-svg-overlay" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Path 1 */}
              <path 
                d="M-50,200 C200,50 400,450 650,150 C750,50 850,250 900,100" 
                stroke="rgba(255,255,255,0.08)" 
                strokeWidth="1.5" 
                strokeDasharray="6 6" 
              />
              <path 
                className="flight-path-glow"
                d="M-50,200 C200,50 400,450 650,150 C750,50 850,250 900,100" 
                stroke="url(#gradient-glow-1)" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />
              
              {/* Path 2 */}
              <path 
                d="M100,650 C250,450 450,250 600,50 C700,-50 800,100 900,-50" 
                stroke="rgba(255,255,255,0.06)" 
                strokeWidth="1.5" 
                strokeDasharray="8 8" 
              />
              <path 
                className="flight-path-glow"
                d="M100,650 C250,450 450,250 600,50 C700,-50 800,100 900,-50" 
                stroke="url(#gradient-glow-2)" 
                strokeWidth="2" 
                strokeLinecap="round" 
                style={{ animationDelay: "-4s", animationDuration: "10s" }}
              />

              <defs>
                <linearGradient id="gradient-glow-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="30%" stopColor="#00f2fe" stopOpacity="0.8" />
                  <stop offset="70%" stopColor="#4facfe" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="gradient-glow-2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.9" />
                  <stop offset="80%" stopColor="#0284c7" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            <Box className="brand-panel-content">


              {/* Central Slogan Area */}
              <Box className="brand-center-section">
                <Typography className="brand-title">
                  Your Premium B2B <br /> Travel Partner
                </Typography>
                <Typography className="brand-subtitle">
                  Maximize your business potential with high-speed flight ticketing, instant booking controls, and comprehensive inventory resources all inside a unified agent platform.
                </Typography>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Button className="register-outline-btn">
                    Register as Agent
                  </Button>
                </Link>
              </Box>

            </Box>
          </Box>

          {/* RIGHT FORM PANEL */}
          <Box className="form-panel">
            {/* Ambient Background Glow Elements */}
            <div className="ambient-glow-circle-1"></div>
            <div className="ambient-glow-circle-2"></div>

            {/* Glassmorphic Login Card */}
            <Box className="glass-card">
              <Typography className="form-title">
                Sign In
              </Typography>
              <Typography className="form-subtitle">
                Access your B2B dashboard and start booking.
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  margin="normal"
                  placeholder="Email"
                  name="email"
                  value={loginData.email}
                  onChange={handleOnChange}
                  autoComplete="username"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={loginData.password}
                  onChange={handleOnChange}
                  autoComplete="current-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Link to="/resetpassword" className="forgot-password-link">
                  Forgot Password?
                </Link>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="signin-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "SIGN IN"}
                </Button>

                {error && (
                  <Box sx={{ mt: 3 }}>
                    <Alert
                      severity="error"
                      className="custom-alert"
                    >
                      <AlertTitle className="custom-alert-title">
                        Authentication Failed
                      </AlertTitle>
                      <strong>{error}</strong>
                    </Alert>
                  </Box>
                )}

                <Typography className="register-hint-text">
                  New User?{" "}
                  <Link to="/signup">
                    <span className="register-link-span">
                      Register Now
                    </span>
                  </Link>
                </Typography>
              </form>
            </Box>
          </Box>

        </Box>
      </ThemeProvider>
      <Footer />
    </Box>
  );
}
