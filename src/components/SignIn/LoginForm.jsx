import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  Alert,
  AlertTitle,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import useAuthentication from "../../hooks/useAuthentication";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
export default function LoginForm({ setSignUpMode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = useParams();
  const { loginUser, isLoading, error } = useAuthentication();

  const rememberUser = secureLocalStorage.getItem("remember");
  const [loginData, setLoginData] = useState({
    email: email || rememberUser?.email || "",
    password: password || rememberUser?.password || "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    // 
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(loginData, location, navigate);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sign-in-form"
      autoComplete="off"
      style={{
        zIndex: "2000",
      }}
    >
      <h2 className="title">Sign in</h2>
      <div
        className="input-field"
        style={{
          display: "flex",
          justifyItems: "center",
          gap: "10px",
        }}
      >
        <EmailIcon color="action" style={{ marginTop: "15px" }} />
        <input
          required
          name="email"
          type="email"
          maxLength={23}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          value={loginData.email}
          onChange={handleOnChange}
          placeholder="Email"
          className="mobile-imput"
        />
      </div>
      <div
        className="input-field"
        style={{
          display: "flex",
          justifyItems: "center",
          gap: "10px",
        }}
      >
        {showPassword ? (
          <LockOpenIcon style={{ marginTop: "15px" }} color="action" />
        ) : (
          <LockIcon style={{ marginTop: "15px" }} color="action" />
        )}

        <input
          required
          name="password"
          value={loginData.password}
          maxLength={12}
          onChange={handleOnChange}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
        />
        <IconButton
          sx={{ position: "absolute", right: 13, top: 7 }}
          onClick={() => setShowPassword(!showPassword)}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </div>
      <Link to="/resetpassword" style={{ textDecoration: "none" }}>
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            color: "var(--primary-color)",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          Forgot Password?
        </Typography>
      </Link>
      <Button
        type="submit"
        disabled={isLoading ? true : false}
        style={{
          backgroundColor: "var(--primary-color)",
          color: "white",
          marginTop: "1rem",
        }}
      >
        {!isLoading ? `Sign In →` : <CircularProgress size={"1.5rem"} />}
      </Button>
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: "600",
          backgroundColor: "white",
          border: "none",
          cursor: "pointer",
          margin: "8px  2px",
        }}
      >
        New here?{" "}
        <NavLink
          onClick={() => setSignUpMode(true)}
          style={{
            textDecoration: "none",
            color:"black",
            fontSize: "14px",
            fontWeight: "600",
            backgroundColor: "white",
            border: "none",
            cursor: "pointer",
            margin: "8px  2px",
          }}
        >
          Register
        </NavLink>
      </Typography>

      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
    </form>
  );
}
