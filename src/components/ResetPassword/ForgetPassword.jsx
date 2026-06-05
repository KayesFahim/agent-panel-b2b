import { Box } from "@mui/system";
import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import Reset from "../../images/undraw/undraw_forgot_password_re_hxwm.svg";
import Invalid from "../../images/undraw/undraw_warning_re_eoyh.svg";
import Logo from "../../images/aatrips_logo.png";
import axios from "axios";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({});
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = `${import.meta.env.REACT_APP_API_URL}/auth/agent/forgetpassword/${loginData.email}`;
      const response = await axios.post(url);
      Swal.fire({
        title: "Reset Password",
        html: `
          <h2>${response?.data?.message}</h2>
          <input type="text" id="otp" class="swal2-input" placeholder="Enter OTP">
          <input type="password" id="password" class="swal2-input" placeholder="Enter new password">
        `,
        showCancelButton: true,
        confirmButtonText: "Submit",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          const otp = Swal.getPopup().querySelector("#otp").value;
          const password = Swal.getPopup().querySelector("#password").value;
          if (!otp || !password) {
            Swal.showValidationMessage(
              "Please enter both OTP and new password"
            );
            return false;
          }
          try {
            const githubUrl = `${import.meta.env.REACT_APP_API_URL}/auth/agent/verify/${otp}/${password}`;
            const response = await axios.post(githubUrl);
            if (response.status !== 201) {
              throw new Error(response?.data?.message || "Verification failed");
            }
            return response.data;
          } catch (error) {
            // 
            Swal.showValidationMessage(`${error?.response.data.message}`);
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Success",
            text: "Password has been reset successfully",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/");
          });
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error?.response?.data?.message);
      const errorMessage =
        error?.response?.data?.message || "An error occurred";
      Swal.fire({
        imageUrl: Invalid,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        title: "Error",
        text: errorMessage,
        confirmButtonText: "OK",
        confirmButtonColor: "var(--primary-color)",
      }).then(() => {
        navigate("/");
      });
    } finally {
      setIsLoading(false);
      e.target.reset();
    }
  };
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "var(--primary-color)",
      }}
    >
      <Box
        sx={{
          background: "var(--white)",
          width: "fit-content",
          height: "fit-content",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            background: "var(--white)",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            marginBottom: "10px",
          }}
          onClick={() => navigate("/")}
        >
          <Box
            sx={{
              height: "80px",
              display: "flex",
              alignItems: "center",
              p: 2,
            }}
          >
            <img
              src={Logo}
              alt="logo"
              style={{
                height: "100%",
              }}
            />
          </Box>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box className="regiter-content" mb={2}>
            <Typography
              sx={{
                fontSize: "18px",
                color: "var(--black)",
                fontWeight: "500px",
                width: "100%",
                textAlign: "center",
                marginBottom: "5px",
              }}
            >
              Forgot Password
            </Typography>

            <Typography
              sx={{
                fontSize: "13px",
                color: "var(--black)",
                fontWeight: "500px",
                width: "100%",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              Enter your registered email to reset your password.
            </Typography>
          </Box>

          <input
            required
            style={{
              width: "calc(100% - 10px)",
              height: "50px",
              border: "none",
              paddingLeft: "10px",
              outline: "none",
              background: "var(--input-bgcolor)",
              fontSize: "14px",
              borderRadius: "10px",
            }}
            placeholder="Enter Your Email"
            id="email"
            name="email"
            type="email"
            onChange={handleOnChange}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              background: "var(--primary-color)",
              width: "100%",
              marginTop: "10px",
              "&:hover": {
                background: "var(--primary-color)",
              },
            }}
          >
            {!isLoading ? (
              "Reset Password"
            ) : (
              <CircularProgress style={{ width: "20px", height: "20px" }} />
            )}
          </Button>
          <Typography
            sx={{
              margin: "10px 0px",
              fontSize: "14px",
              color: "var(--black)",
              fontWeight: "500px",
              width: "100%",
              textAlign: "center",
            }}
          >
            New here?{" "}
            <NavLink to="/signup" style={{ textDecoration: "none" }}>
              Sign Up
            </NavLink>
          </Typography>
          <Typography
            sx={{
              margin: "10px 0px",
              fontSize: "14px",
              color: "var(--black)",
              fontWeight: "500px",
              width: "100%",
              textAlign: "center",
            }}
          >
            Already have an account?{" "}
            <NavLink to="/signin" style={{ textDecoration: "none" }}>
              Sign In
            </NavLink>
          </Typography>
        </form>
      </Box>
    </Box>
  );
};

export default ForgetPassword;
