import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Header from "../Header/Header";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AddStaffImg from "../../images/undraw/undraw_hire_re_gn5j.svg";
import getAuthToken from "../../Token/getAuthToken";

const AddStaff = () => {
  const navigate = useNavigate();
  const token = getAuthToken();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formInfo, setFormInfo] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Role: "",
    Password: "",
  });
  const handleChange = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };
  let body = {
    name: formInfo.Name,
    email: formInfo.Email,
    phone: formInfo.Phone,
    password: formInfo.Password,
    role: formInfo.Role,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let url = `${import.meta.env.REACT_APP_API_URL}/agent/staff`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setIsSubmitting(false);
        e.target.reset();
        Swal.fire({
          imageUrl: AddStaffImg,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "Staff added successfully",
          html: `For any query.Please contact us at <strong>support@aatrips.pk</strong> or Call <strong>+8801409965900</strong>`,
          confirmButtonColor: "var(--primary-color)",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("/agent/staff");
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (err) {
      setIsSubmitting(false);
      Swal.fire({
        title: err.message,
        confirmButtonColor: "var(--primary-color)",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <Box>
      <Header />
      <Box sx={{ bgcolor: "#FFFFFF", mt: { xs: 12, md: 2 } }}>
        <Container>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: { xs: 20, sm: 24 },
              color: "#222222",
            }}
          >
            Add New Staff
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: { xs: 14, sm: 16 },
              color: "#B0AFAF",
              mb: { xs: 1, sm: "18px" },
            }}
          >
            Staff Information
          </Typography>
        </Container>
      </Box>
      <Box sx={{ bgcolor: "#EEF2F5", height: "100vh", pt: 2 }}>
        <Container sx={{ mt: { xs: 4, md: 2 } }}>
          <Box>
            <form onSubmit={handleSubmit}>
              <Box className="passengerInput1">
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Box
                      sx={{
                        border: "1px solid #122E55",
                        padding: 1,
                        borderRadius: "4.75px",
                      }}
                    >
                      <Typography
                        variant="p"
                        sx={{ color: "#B0AFAF", fontSize: "14px" }}
                      >
                        Staff Name
                      </Typography>
                      <Box>
                        <input
                          required
                          id="Name"
                          name="Name"
                          type="text"
                          placeholder="Staff Name"
                          value={formInfo?.Name}
                          onChange={handleChange}
                        />
                      </Box>
                    </Box>
                    {/* <label htmlFor="Name">
                      <span style={{ color: "red" }}>*</span>Staff Name
                    </label> */}
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Box
                      sx={{
                        border: "1px solid #122E55",
                        padding: 1,
                        borderRadius: "4.75px",
                      }}
                    >
                      <Typography
                        variant="p"
                        sx={{ color: "#B0AFAF", fontSize: "14px" }}
                      >
                        Staff Phone
                      </Typography>
                      <Box>
                        <input
                          required
                          id="Phone"
                          name="Phone"
                          placeholder="Phone Number"
                          value={formInfo?.Phone}
                          onChange={handleChange}
                        />
                      </Box>
                    </Box>
                    {/* <label htmlFor="Phone">
                      <span style={{ color: "red" }}>*</span>Staff Phone
                      <span style={{ color: "red", fontSize: "10px" }}>
                        (enter valid number)
                      </span>
                    </label> */}
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Box
                      sx={{
                        border: "1px solid #122E55",
                        padding: 1,
                        borderRadius: "4.75px",
                      }}
                    >
                      <Typography
                        variant="p"
                        sx={{ color: "#B0AFAF", fontSize: "14px" }}
                      >
                        Select Role
                      </Typography>
                      <Box>
                        <select
                          required
                          id="Role"
                          name="Role"
                          value={formInfo?.Role}
                          onChange={handleChange}
                        >
                          <option value="">Select Role</option>
                          <option value="admin">admin</option>
                          <option value="staff">Staff</option>
                          <option value="manager">Manager</option>
                          <option value="accountant">Accountant</option>
                        </select>
                      </Box>
                    </Box>
                    {/* <label htmlFor="Role">
                      <span style={{ color: "red" }}>*</span>Select Role
                    </label> */}
                  </Grid>

                  <Grid item xs={12} mt={2}>
                    <Typography
                      variant="p"
                      sx={{ color: "#B0AFAF", fontSize: "14px" }}
                    >
                      Login Information
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Box
                      sx={{
                        border: "1px solid #122E55",
                        padding: 1,
                        borderRadius: "4.75px",
                      }}
                    >
                      <Typography
                        variant="p"
                        sx={{ color: "#B0AFAF", fontSize: "14px" }}
                      >
                        Email
                      </Typography>
                      <Box>
                        <input
                          required
                          id="Email"
                          name="Email"
                          type="email"
                          placeholder="Your Email"
                          value={formInfo?.Email}
                          autoComplete="new-email"
                          onChange={handleChange}
                        />
                      </Box>
                    </Box>
                    {/* <label htmlFor="Email">
                      <span style={{ color: "red" }}>*</span>Email
                    </label> */}
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    {/* <label htmlFor="Password">
                      <span style={{ color: "red" }}>*</span>Password
                    </label> */}
                    <Box
                      sx={{
                        border: "1px solid #122E55",
                        padding: 1,
                        borderRadius: "4.75px",
                      }}
                    >
                      <Typography
                        variant="p"
                        sx={{ color: "#B0AFAF", fontSize: "14px" }}
                      >
                        Password
                      </Typography>
                      <Box position={"relative"}>
                        <input
                          required
                          id="Password"
                          name="Password"
                          type={showPassword ? "text" : "password"}
                          placeholder=" Enter Your Password "
                          value={formInfo?.Password}
                          onChange={handleChange}
                          autoComplete="new-password"
                        />

                        {showPassword ? (
                          <Visibility
                            onClick={() => setShowPassword((prev) => !prev)}
                            sx={{
                              color: "var(--primary-color)",
                              position: "absolute",
                              top: "50%",
                              right: "5px",
                              transform: "translate(-5px,-50%)",
                            }}
                          />
                        ) : (
                          <VisibilityOff
                            onClick={() => setShowPassword((prev) => !prev)}
                            sx={{
                              color: "var(--primary-color)",
                              position: "absolute",
                              top: "50%",
                              right: "5px",
                              transform: "translate(-5px,-50%)",
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  </Grid>

                  <Grid container item justifyContent={"start"}>
                    <Button
                      variant="contained"
                      style={{
                        color: "#fff",
                        backgroundColor: "var(--primary-color)",
                        outline: "none",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        padding: "5px 20px",
                        fontSize: "14px",
                      }}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AddStaff;
