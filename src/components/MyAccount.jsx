import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Typography,
  Chip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Swal from "sweetalert2";
import { useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

import Loader from "../Common/Loader";
import TokenDecrypt from "../Token/TokenDecrypt";
import getAuthToken from "../Token/getAuthToken";
import noImage from "../images/Icon/photo.png";
import uploadimage from "../images/Icon/upload.svg";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vh",
  height: "fit-content",
  background: "white",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};
const MyAccount = () => {
  const navigate = useNavigate();

  const tokenise = TokenDecrypt();
  const token = getAuthToken();
  const [account, setAccount] = useState(null);
  const [updateAcc, setUpdateAcc] = useState(null);
  const [reFetch, setRefetch] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (Object.keys(tokenise?.staffdata).length > 0) {
      navigate("/agent/dashboard");
    }
  }, [tokenise]); // Only user as dependency

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${import.meta.env.REACT_APP_API_URL}/agent/myaccount`;
        const config = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await fetch(url, config);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Failed to fetch account data: ${errorData.message || response.statusText
            }`
          );
        }
        const data = await response.json();
        setAccount(data);
        setUpdateAcc(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, reFetch]);

  const handleOpenModal = () => {
    setUpdateAcc(account);
    setOpen(true);
  };

  const handleChange = (e) => {
    setUpdateAcc({ ...updateAcc, [e.target.name]: e.target.value });
  };

  const handleOnChange = async (e) => {
    // handleFileRemove();
    const file = e.target.files[0];
    setFileUpload(file);
    if (file) {
      try {
        const dataUrl = await readDataUrl(file);
        setFile(dataUrl);
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
  };

  // preview image  function
  const readDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e, logo) => {
    let body = {
      company: updateAcc?.company,
      name: updateAcc?.name,
      phone: updateAcc?.phone,
      address: updateAcc?.address,
      markuptype: updateAcc?.markuptype,
      markup: updateAcc?.markup,
      logo: logo ? logo : account?.logo,
    };

    window.event.preventDefault();
    setIsSubmitting(true);
    let url = `${import.meta.env.REACT_APP_API_URL}/agent/myaccount`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setOpen(false);
        e.target.reset();
        Swal.fire({
          title: "Account Updated",
          confirmButtonColor: "var(--primary-color)",
          confirmButtonText: "Ok",
        }).then(() => {
          setRefetch(!reFetch);
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      setIsSubmitting(false);
    } catch (err) {
      setOpen(false);
      e.target.reset();
      Swal.fire({
        title: err.message,
        confirmButtonColor: "var(--primary-color)",
        confirmButtonText: "Try Again",
      }).then(() => {
        setRefetch(!reFetch);
      });
      setIsSubmitting(false);
    }
  };

  const handleLogoSubmit = async (e) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("file", fileUpload);

    const url = `${import.meta.env.REACT_APP_API_URL}/agent/upload/logo`;

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    axios.post(url, formData, config).then((res) => {
      if (res?.data?.status === "success") {
        Swal.fire({
          icon: "success",
          title: res?.data?.status,
          html: res?.data?.message,
          confirmButtonText: "ok",
          confirmButtonColor: "var(--primary-color)",
        }).then(() => {
          navigate(0);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: res?.data?.status,
          html: res?.data?.message,
          confirmButtonText: "ok",
          confirmButtonColor: "var(--primary-color)",
        }).then(() => {
          navigate(0);
        });
      }
    });
  };

  // 
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <Loader
          visible={true}
          height="200"
          width="500"
          color="var(--primary-color)"
          borderColor="var(--gray)"
          barColor="var(--primary-color)"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </Box>
    );
  }

  // 
  return (
    <Box>
      <Header />
      <Container sx={{ mt: { xs: 13, sm: 12, md: 5 } }}>
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={4}>
            {/* Account Information */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 4,
                  boxShadow: 4,
                  border: "none",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: "var(--primary-color)",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Company Information
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  <Box
                    sx={{
                      boxShadow: 3,
                      p: 1,
                      borderRadius: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      position: "relative",
                      border: "1px solid",
                      borderColor: "divider",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={
                        file ||
                        `${account?.logo || uploadimage
                        }?t=${new Date().getTime()}`
                      }
                      alt="Logo Preview"
                      style={{
                        maxWidth: "250px",
                        maxHeight: "250px",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <strong>Company:</strong> {account?.company}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <strong>Agent Id:</strong> {account?.agentId}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <strong>Name:</strong> {account?.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <strong>Email:</strong> {account?.email}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <strong>Phone:</strong> {account?.phone}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <strong>Address:</strong> {account?.address}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <strong>Main Balance:</strong>{" "}
                    {account?.balance === null ||
                      account?.balance === 0 ||
                      account?.balance === "0" ||
                      account?.balance === undefined
                      ? 0
                      : parseFloat(account?.balance)?.toFixed(2) || 0}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <strong>Credit Balance:</strong>{" "}
                    {account?.credit === null ||
                      account?.credit === 0 ||
                      account?.credit === "0" ||
                      account?.credit === undefined
                      ? 0
                      : parseFloat(account?.credit)?.toFixed(2) || 0}
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Button
                    onClick={() => handleOpenModal()}
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: "capitalize", width: "100%" }}
                  >
                    Update Information
                  </Button>
                </Box>
              </Box>
            </Grid>

            {/* Trade License and NID */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", gap: 2 }}>
                {/* Trade License */}
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    bgcolor: "background.paper",
                    flex: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      fontWeight: 500,
                      color: "var(--primary-color)",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Trade License
                  </Typography>
                  <Box
                    sx={{
                      boxShadow: 3,
                      p: 1,
                      borderRadius: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      border: "1px solid",
                      borderColor: "divider",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={account?.tradelicense || noImage}
                      alt="Trade License"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </Box>

                {/* NID */}
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    bgcolor: "background.paper",
                    flex: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      fontWeight: 500,
                      color: "var(--primary-color)",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    NID
                  </Typography>
                  <Box
                    sx={{
                      boxShadow: 3,
                      p: 1,
                      borderRadius: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      border: "1px solid",
                      borderColor: "divider",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={account?.nid || noImage}
                      alt="NID"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Profile Information */}
          <Grid container mt={4} mb={4}>
            <Grid item xs={12}>
              <Box
                sx={{
                  mt: "5px",
                  overflowY: "auto",
                  table: {
                    width: "100%",
                    borderCollapse: "collapse",
                  },
                  th: {
                    backgroundColor: "var(--primary-color)",
                    color: "white",
                    border: "1px solid #ddd",
                    padding: "12px 16px",
                    fontSize: "15px",
                    fontWeight: 500,
                    textAlign: "center",
                  },
                  td: {
                    textAlign: "center",
                    verticalAlign: "middle",
                    border: "1px solid #ddd",
                    padding: "10px 16px",
                    fontSize: "14px",
                    backgroundColor: "#fafafa",
                  },
                  "tr:nth-of-type(even)": {
                    backgroundColor: "#f7f7f7",
                  },
                  "tr:hover": {
                    backgroundColor: "#ececec",
                  },
                }}
              >
                <table>
                  <thead>
                    <tr>
                      <th>Partial Eligibility</th>
                      <th>Account Key Manager</th>
                      <th>Civil Aviation</th>
                      <th>Search Limit</th>
                      <th>Is Verified</th>
                      <th>IP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Chip
                          label={
                            account?.partial_eligibility
                              ? "Eligible"
                              : "Not Eligible"
                          }
                          color={
                            account?.partial_eligibility ? "success" : "error"
                          }
                          size="small"
                        />
                      </td>
                      <td>{account?.acc_key_manager || 0}</td>
                      <td>{account?.civilaviationno || 0}</td>
                      <td>{account?.searchlimit || 0}</td>
                      <td>
                        <Chip
                          label={
                            account?.is_verified ? "Verified" : "Not Verified"
                          }
                          color={account?.is_verified ? "success" : "error"}
                          size="small"
                        />
                      </td>
                      <td>{account?.ip || "N/A"}</td>
                    </tr>
                  </tbody>
                </table>
              </Box>
            </Grid>
          </Grid>



          <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={style}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 5,
                  }}
                >
                  <Typography
                    sx={{
                      color: "var(--white)",
                      fontSize: "20px",
                      textAlign: "center",
                      bgcolor: "var(--primary-color)",
                      width: "100%",
                      py: 0.5,
                    }}
                  >
                    Update My Profile
                  </Typography>
                </Box>
                {/* Logo Upload */}
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      boxShadow: 3,
                      bgcolor: "background.paper",
                    }}
                  >
                    <Box
                      sx={{
                        boxShadow: 3,
                        p: 1,
                        mb: 2,
                        borderRadius: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        position: "relative",
                        border: "1px solid",
                        borderColor: "divider",
                        overflow: "hidden",
                      }}
                      onClick={handleButtonClick}
                    >
                      <img
                        src={
                          file ||
                          `${account?.logo || uploadimage
                          }?t=${new Date().getTime()}`
                        }
                        alt="Logo Preview"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }}
                      />

                      <Box
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          bgcolor: "background.paper",
                          borderRadius: "50%",
                          p: 0.5,
                          border: "2px solid",
                          borderColor: "primary.main",
                        }}
                      >
                        <EditIcon color="primary" />
                      </Box>
                      <input
                        id="fileInput"
                        type="file"
                        required
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleOnChange}
                        accept=".png, .jpg, .jpeg"
                      />
                    </Box>
                    <Typography
                      variant="p"
                      sx={{ fontSize: "10px", fontWeight: 500, color: "red" }}
                    >
                      Logo (Max 2MB, JPG/PNG, 200X80px)
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Button
                        onClick={() => handleLogoSubmit()}
                        variant="contained"
                        color="primary"
                        sx={{ textTransform: "capitalize", width: "100%" }}
                      >
                        Update Logo
                      </Button>
                    </Box>
                  </Box>
                </Grid>
                <form onSubmit={handleSubmit}>
                  <Box
                    sx={{
                      label: {
                        fontSize: "14px",
                        color: "var(--secondary-color)",
                        fontWeight: "500",
                      },
                      input: {
                        outline: "none",
                        width: "100%",
                        border: "1px solid var(--secondary-color)",
                        color: "var(secondary-color)",
                        fontSize: "14px",
                        borderRadius: "4px",
                        padding: "5px 10px",
                      },
                      select: {
                        outline: "none",
                        width: "100%",
                        border: "1px solid var(--secondary-color)",
                        color: "var(secondary-color)",
                        fontSize: "14px",
                        borderRadius: "4px",
                        padding: "5px 10px",
                      },
                      ".MuiTypography-root": {
                        fontSize: "14px ",
                        color: "var(--primary-color)",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    <Grid container spacing={1}>
                      <Grid item md={4}>
                        <label htmlFor="company">
                          <span style={{ color: "red" }}>*</span>Company
                        </label>
                        <input
                          required
                          id="company"
                          name="company"
                          type="text"
                          value={updateAcc?.company}
                          placeholder="Account Name"
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <label htmlFor="Name">
                          <span style={{ color: "red" }}>*</span>Name
                        </label>
                        <input
                          required
                          id="name"
                          name="name"
                          type="text"
                          value={updateAcc?.name}
                          placeholder="Account Name"
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item md={4}>
                        <label htmlFor="Phone">
                          <span style={{ color: "red" }}>*</span>Staff Phone
                        </label>
                        <input
                          required
                          id="phone"
                          name="phone"
                          placeholder="Phone Number"
                          value={updateAcc?.phone}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item md={4}>
                        <label htmlFor="Email">
                          <span style={{ color: "red" }}>*</span>Email
                        </label>
                        <input
                          required
                          autoComplete="off"
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Your Email"
                          value={updateAcc?.email}
                          readOnly
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <label htmlFor="address">
                          <span style={{ color: "red" }}>*</span>Address
                        </label>
                        <input
                          required
                          autoComplete="off"
                          id="address"
                          name="address"
                          type="address"
                          placeholder="Your address"
                          value={updateAcc?.address}
                          readOnly
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid container item justifyContent={"space-between"}>
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
                        <Button
                          variant="contained"
                          style={{
                            color: "#fff",
                            backgroundColor: "black",
                            outline: "none",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            padding: "5px 20px",
                            fontSize: "14px",
                            marginLeft: "20px",
                          }}
                          onClick={() => setOpen(false)}
                        >
                          Close
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </form>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Container>
    </Box>
  );
};

export default MyAccount;
