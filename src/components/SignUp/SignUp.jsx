import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Grid,
  ThemeProvider,
  createTheme,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import Swal from "sweetalert2";
import "./SignUp.css";
import {
  Visibility,
  VisibilityOff,
  Lock,
  Person,
  Business,
  LocationOn,
  Phone,
  Email,
  Badge,
  FlightTakeoff,
  CheckCircle,
  UploadFile,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../LandingPage/Footer";
import LandingHeader from "../LandingPage/LandingHeader";
import whiteLogo from "../../images/aatrips_logo.png";
import AccCreated from "../../images/undraw/undraw_happy_announcement_re_tsm0.svg";

const theme = createTheme({
  palette: {
    primary: { main: "#1A3A6E" },
  },
});

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const [registerData, setRegisterData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    cPassword: "",
    company: "",
    address: "",
    civilaviationno: "",
  });
  const [nidFile, setNidFile] = useState(null);
  const [tlFile, setTlFile] = useState(null);

  const onChangeFile = (e, fileType) => {
    const selectedFile = e.target.files[0];
    if (fileType === "nid") setNidFile(selectedFile);
    else if (fileType === "tl") setTlFile(selectedFile);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      const body = {
        name: `${registerData.firstname} ${registerData.lastname}`,
        phone: registerData.phone,
        email: registerData.email,
        password: registerData.password,
        company: registerData.company,
        address: registerData.address,
        civilaviationno: registerData.civilaviationno,
        nid: nidFile,
        tl: tlFile,
      };
      Object.entries(body).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(
        `${import.meta.env.REACT_APP_API_URL}/agent/signup`,
        { method: "POST", body: formData }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! Status: ${response.status}`);
      }

      navigate("/");
      Swal.fire({
        imageUrl: AccCreated,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Account Created",
        title: "Account Created Successfully!",
        html: `<div>Dear: <strong>${registerData.firstname} ${registerData.lastname}</strong> — Your account <strong>${registerData.company}</strong> is successfully created. It will be active within 24 hours.</div>
          <strong>For any query contact support@aatrips.pk or call <strong>+8801409965900</strong>`,
        confirmButtonColor: "#0A2647",
        confirmButtonText: "OK, Got It!",
      }).then(() => {
        setIsLoading(false);
      });
    } catch (err) {
      await Swal.fire({
        title: err.message || "Server Error",
        html: `<strong>For any query contact support@aatrips.pk or call <strong>+8801409965900.</strong>`,
        confirmButtonColor: "#0A2647",
        confirmButtonText: "Please Try Again!",
      });
      setIsLoading(false);
    }
  };

  const pwLengthOk = registerData.password.length >= 8;
  const pwMatch = registerData.password === registerData.cPassword;

  return (
    <Box className="signup-root">
      <LandingHeader />
      <ThemeProvider theme={theme}>
        <Box className="signup-grid-container">

          {/* ── LEFT BRAND PANEL ──────────────────────────────── */}
          <Box className="signup-brand-panel">
            {/* Animated SVG Flight Paths */}
            <svg className="signup-brand-svg" viewBox="0 0 500 800" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M-30,150 C100,50 250,350 400,100 C450,50 520,200 560,80"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />
              <path
                className="signup-flight-glow"
                d="M-30,150 C100,50 250,350 400,100 C450,50 520,200 560,80"
                stroke="url(#sgGrad1)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M60,700 C180,500 300,250 440,100 C500,-30 580,80 620,-20"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1.5"
                strokeDasharray="8 8"
              />
              <path
                className="signup-flight-glow"
                d="M60,700 C180,500 300,250 440,100 C500,-30 580,80 620,-20"
                stroke="url(#sgGrad2)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ animationDelay: "-4s", animationDuration: "10s" }}
              />
              <defs>
                <linearGradient id="sgGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="30%"  stopColor="#00f2fe" stopOpacity="0.8" />
                  <stop offset="70%"  stopColor="#4facfe" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="sgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="40%"  stopColor="#38bdf8" stopOpacity="0.9" />
                  <stop offset="80%"  stopColor="#0284c7" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            <Box className="signup-brand-content">


              {/* Center Section */}
              <Box className="signup-brand-center">
                <Typography className="signup-brand-title">
                  Join the <br /> Agent Network
                </Typography>
                <Typography className="signup-brand-subtitle">
                  Register today and unlock access to premium flight inventory, competitive fares, and a powerful B2B booking engine.
                </Typography>

                {/* Features checklist */}
                <ul className="signup-feature-list">
                  {[
                    "Instant flight search & booking",
                    "Real-time ticket issuance",
                    "Dedicated agent support",
                    "Competitive commission rates",
                  ].map((item) => (
                    <li key={item}>
                      <span className="signup-feature-icon">
                        <CheckCircle style={{ fontSize: 12, color: "#7dd3fc" }} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link to="/signin" style={{ textDecoration: "none" }}>
                  <Button className="signup-signin-btn">
                    Already an Agent? Sign In
                  </Button>
                </Link>
              </Box>

            </Box>
          </Box>

          {/* ── RIGHT FORM PANEL ──────────────────────────────── */}
          <Box className="signup-form-panel">
            <div className="signup-glow-1" />
            <div className="signup-glow-2" />

            <Box className="signup-glass-card">
              {/* Card Header */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
                <Box sx={{
                  width: 44, height: 44, borderRadius: "12px",
                  background: "linear-gradient(135deg, #0A2647, #1d5b96)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 14px rgba(10,38,71,0.25)",
                  flexShrink: 0,
                }}>
                  <FlightTakeoff style={{ color: "#fff", fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography className="signup-form-title">
                    Agent Registration
                  </Typography>
                </Box>
              </Box>
              <Typography className="signup-form-subtitle">
                Fill in your details below to create your B2B agent account.
              </Typography>

              <form onSubmit={handleSubmit} autoComplete="off">

                {/* ── Personal Info ─────────────────────────── */}
                <Typography className="signup-section-label">
                  Personal Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      placeholder="First Name"
                      variant="outlined"
                      name="firstname"
                      value={registerData.firstname}
                      onChange={handleOnChange}
                      inputProps={{ maxLength: 20, autoComplete: "off" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"><Person /></InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      placeholder="Last Name"
                      variant="outlined"
                      name="lastname"
                      value={registerData.lastname}
                      onChange={handleOnChange}
                      inputProps={{ maxLength: 20, autoComplete: "off" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"><Person /></InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      placeholder="Phone Number"
                      variant="outlined"
                      name="phone"
                      value={registerData.phone}
                      onChange={handleOnChange}
                      inputProps={{ maxLength: 11 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"><Phone /></InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      placeholder="Email Address"
                      variant="outlined"
                      type="email"
                      name="email"
                      value={registerData.email}
                      onChange={handleOnChange}
                      inputProps={{ maxLength: 50 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"><Email /></InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                {/* ── Company Info ──────────────────────────── */}
                <Typography className="signup-section-label">
                  Company Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      placeholder="Company Name"
                      variant="outlined"
                      name="company"
                      value={registerData.company}
                      onChange={handleOnChange}
                      inputProps={{ maxLength: 50, autoComplete: "off" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"><Business /></InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      placeholder="Company Address"
                      variant="outlined"
                      name="address"
                      value={registerData.address}
                      onChange={handleOnChange}
                      inputProps={{ autoComplete: "off" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"><LocationOn /></InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      placeholder="Civil Aviation No. (optional)"
                      variant="outlined"
                      name="civilaviationno"
                      value={registerData.civilaviationno}
                      onChange={handleOnChange}
                      inputProps={{ autoComplete: "off" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"><Badge /></InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                {/* ── Security ──────────────────────────────── */}
                <Typography className="signup-section-label">
                  Security
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      placeholder="Choose Password"
                      variant="outlined"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={registerData.password}
                      onChange={handleOnChange}
                      inputProps={{ maxLength: 20, autoComplete: "new-password" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"><Lock /></InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword((p) => !p)} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      placeholder="Confirm Password"
                      variant="outlined"
                      name="cPassword"
                      type={showPassword ? "text" : "password"}
                      value={registerData.cPassword}
                      onChange={handleOnChange}
                      inputProps={{ maxLength: 20, autoComplete: "new-password" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"><Lock /></InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword((p) => !p)} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                {/* Password validation hints */}
                {registerData.password.length > 0 && !pwLengthOk && (
                  <p className="signup-pw-hint">⚠ Password must be at least 8 characters</p>
                )}
                {registerData.cPassword.length > 0 && !pwMatch && (
                  <p className="signup-pw-hint">⚠ Passwords do not match</p>
                )}

                {/* ── Documents ────────────────────────────── */}
                <Typography className="signup-section-label">
                  Documents
                </Typography>
                <Box className="signup-file-zone">
                  {/* NID Upload */}
                  <Box className="signup-file-box">
                    <label>
                      <Box className="signup-file-icon">
                        <UploadFile style={{ fontSize: 20 }} />
                      </Box>
                      <span className="signup-file-title">NID Copy *</span>
                      <span className="signup-file-hint">PNG, JPG accepted</span>
                      {nidFile && (
                        <span className="signup-file-chosen">✓ {nidFile.name}</span>
                      )}
                      <input
                        required
                        type="file"
                        accept="image/*"
                        onChange={(e) => onChangeFile(e, "nid")}
                      />
                    </label>
                  </Box>

                  {/* Trade License Upload */}
                  <Box className="signup-file-box">
                    <label>
                      <Box className="signup-file-icon">
                        <UploadFile style={{ fontSize: 20 }} />
                      </Box>
                      <span className="signup-file-title">Trade License</span>
                      <span className="signup-file-hint">Optional · PNG, JPG</span>
                      {tlFile && (
                        <span className="signup-file-chosen">✓ {tlFile.name}</span>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onChangeFile(e, "tl")}
                      />
                    </label>
                  </Box>
                </Box>

                {/* ── Terms & Submit ───────────────────────── */}
                <FormControlLabel
                  className="signup-terms-row"
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={() => setChecked((p) => !p)}
                      sx={{ color: "#0A2647", "&.Mui-checked": { color: "#0A2647" } }}
                    />
                  }
                  label={
                    <a
                      href="https://aatrips.pk/terms&condition"
                      target="_blank"
                      rel="noreferrer"
                      className="signup-terms-link"
                    >
                      I agree to the Terms and Conditions
                    </a>
                  }
                  sx={{ mt: 1 }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="signup-submit-btn"
                  disabled={
                    !checked ||
                    !pwMatch ||
                    !pwLengthOk ||
                    isLoading
                  }
                >
                  {isLoading ? (
                    <CircularProgress style={{ height: "22px", width: "22px", color: "#fff" }} />
                  ) : (
                    "Create Agent Account →"
                  )}
                </Button>

                <Typography className="signup-login-hint">
                  Already registered?{" "}
                  <Link to="/signin">
                    <span className="signup-login-link-span">Sign In</span>
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
};

export default SignUp;
