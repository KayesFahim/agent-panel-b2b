import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReConfirm from "../../images/undraw/undraw_confirmation_re_b6q5.svg";
import Success from "../../images/undraw/undraw_completed_tasks_vs6q.svg";
import Invalid from "../../images/undraw/undraw_warning_re_eoyh.svg";
import ServerDown from "../../images/undraw/undraw_server_down_s-4-lk.svg";
import Delete from "../../images/undraw/undraw_throw_away_re_x60k.svg";
import Loader from "../../images/loader/Render.gif";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import CustomTable from "../CommonTable/CustomTable";
import getAuthToken from "../../Token/getAuthToken";
import TokenDecrypt from "../../Token/TokenDecrypt";

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

const Staff = () => {
  const navigate = useNavigate();
  // const user = secureLocalStorage.getItem('user-info');
  const token = getAuthToken();
  const tokenise = TokenDecrypt();
  const [isLoading, setIsLoading] = useState(false);
  const [reFetch, setRefetch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allStaff, setAllStaff] = useState([]);
  const [formInfo, setFormInfo] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const [allData, setAllData] = useState([]);
  const [error, setError] = useState(null);

  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Role",
      accessor: "role",
    },
    {
      Header: "Phone",
      accessor: "phone",
    },
    {
      Header: "Status",
      accessor: "status",
    },

    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              justifyContent: "center",
            }}
          >
            <Tooltip title={"Edit Staff"}>
              <EditIcon onClick={() => handleOpenModal(row.original)} />
            </Tooltip>
            {/* <Tooltip title={'Delete Staff'}>
              <DeleteForeverIcon
                sx={{ color: 'red' }}
                onClick={() => deleteStaff(row.original?.uid)}
              />
            </Tooltip> */}
            <Box onClick={() => handleStatus(row.original)}>
              <Tooltip
                title={
                  row.original?.status === "active" ? "DeActive" : "Active"
                }
              >
                <Switch checked={row.original?.status === "active"} />
              </Tooltip>
            </Box>
          </Box>
        );
      },
    },
  ];

  const staff = tokenise?.staffdata;
  useEffect(() => {
    if (Object.keys(staff || {}).length !== 0) {
      navigate("/agent/product");
    }
  }, [staff]); // Only user as dependency

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.REACT_APP_API_URL}/agent/staff`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllData(response?.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [reFetch]); // Make sure to add any dependencies if needed

  const handleOpenModal = (data) => {
    setFormInfo({
      staffId: data.id,
      Name: data?.name,
      Email: data?.email,
      Phone: data?.phone,
      Role: data?.role,
      Password: data?.password,
      Status: data?.status,
      uid: data?.uid,
    });
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
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
    let url = `${import.meta.env.REACT_APP_API_URL}/agent/staff/${formInfo?.uid}`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setIsSubmitting(false);
        handleCloseModal();
        e.target.reset();
        Swal.fire({
          imageUrl: Success,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "Staff Edit successfully",
          html: `For any query.Please contact us at <strong>support@aatrips.pk</strong> or Call <strong>+8801409965900</strong>`,
          confirmButtonColor: "var(--primary-color)",
          confirmButtonText: "Ok",
        }).then(() => {
          setRefetch(!reFetch);
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (err) {
      setIsSubmitting(false);
      handleCloseModal();
      e.target.reset();
      Swal.fire({
        imageUrl: Invalid,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        title: err.message,
        confirmButtonColor: "var(--primary-color)",
        confirmButtonText: "Try Again",
      });
    }
  };

  //todo: delete Staff functionality
  const deleteStaff = (staffId) => {
    Swal.fire({
      imageUrl: ReConfirm,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      title: "Are you sure?",
      text: "You want to delete this staff?",
      showCancelButton: true,
      confirmButtonColor: "var(--secondary-color)",
      confirmButtonText: "Delete",
      cancelButtonColor: "var(--primary-color)",
      cancelButtonText: "Cancel",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        let url = `${import.meta.env.REACT_APP_API_URL}/agent/staff/${staffId}`;

        fetch(url, {
          method: "DELETE",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to delete");
            }
            return res.json();
          })
          .then((data) => {
            Swal.fire({
              imageUrl: Delete,
              imageWidth: 400,
              imageHeight: 200,
              title: "Your staff is deleted!",
              html: `For any query, please contact us at <strong>support@aatrips.pk</strong> or Call <strong>+8801409965900</strong>`,
              confirmButtonText: "OK",
              confirmButtonColor: "var(--primary-color)",
            }).then(() => {
              navigate("/agent/staff");
              setRefetch((prev) => !prev);
            });
          })
          .catch((err) => {
            console.error(err.message);
            Swal.fire({
              imageUrl: ServerDown,
              imageWidth: 400,
              imageHeight: 200,
              title: "Failed to delete",
              html: `For any query, please contact us at <strong>support@aatrips.pk</strong> `,
              confirmButtonText: "Try Again",
              cancelButtonColor: "var(--primary-color)",
            }).then(() => {
              navigate("/agent/staff");
            });
          });
      }
    });
  };

  const handleStatus = (data) => {
    const url = `${import.meta.env.REACT_APP_API_URL}/agent/staff/${data?.uid}`;
    fetch(url, {
      method: "PATCH", // or "PUT" depending on your server implementation
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        password: data?.password,
        role: data?.role,
        status: data?.status === "active" ? "deactive" : "active",
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update status");
        }
        return res.json();
      })
      .then((updatedData) => {
        if (updatedData) {
          setRefetch((prev) => !prev);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Status updated successfully!",
          });
        }
      })
      .catch((err) => {
        // 
        setRefetch((prev) => !prev);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.message,
        });
      });
  };

  if (isLoading) {
    return (
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
          width: "70vw",
          marginInline: "auto",
        }}
      >
        <Box
          style={{
            width: "50%",
            height: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={Loader}
            alt="loader"
            style={{
              width: "100%",
              objectFit: "center",
            }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Header />
      <Box sx={{ mt: { xs: 10, md: 2 }, p: { xs: 1, md: 2 } }}>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "5px",
            }}
          >
            <Typography
              sx={{ color: "var(--secondary-color)", fontSize: "24px" }}
            >
              My Staffs
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "5px",
                justifyContent: "end",
                alignItem: "center",
              }}
            >
              <Box
                onClick={() => navigate("/agent/addstaff")}
                sx={{
                  cursor: "pointer",
                  textTransform: "capitalize",
                  padding: "5px 10px",
                  background: "var(--primary-color)",
                  color: "#FFFFFF",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                Add Staff
              </Box>
            </Box>
          </Box>
          <Box>
            <CustomTable
              columns={columns}
              data={allData || []}
              pageList={15}
              textAlign="center"
            />
          </Box>
        </Box>
      </Box>
      {/* //todo Update staff modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                mb: "5px",
              }}
            >
              <Typography
                sx={{ color: "var(--secondary-color)", fontSize: "24px" }}
              >
                Update Staff
              </Typography>
            </Box>
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
                  <Grid item md={12}>
                    <Typography>Staff Information</Typography>
                  </Grid>
                  <Grid item md={4}>
                    <label htmlFor="Name">
                      <span style={{ color: "red" }}>*</span>Staff Name
                    </label>
                    <input
                      required
                      id="Name"
                      name="Name"
                      type="text"
                      value={formInfo?.Name}
                      placeholder="Staff Name"
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item md={4}>
                    <label htmlFor="Phone">
                      <span style={{ color: "red" }}>*</span>Staff Phone
                      <span style={{ color: "red", fontSize: "10px" }}>
                        (enter valid number)
                      </span>
                    </label>
                    <input
                      required
                      id="Phone"
                      name="Phone"
                      placeholder="Phone Number"
                      value={formInfo?.Phone}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item md={12}>
                    <Typography>Login Information</Typography>
                  </Grid>
                  <Grid item md={4}>
                    <label htmlFor="Email">
                      <span style={{ color: "red" }}>*</span>Email
                    </label>
                    <input
                      required
                      autoComplete="off"
                      id="Email"
                      name="Email"
                      type="email"
                      placeholder="Your Email"
                      value={formInfo?.Email}
                      readOnly
                      onChange={handleChange}
                    />
                  </Grid>
                  {/* <Grid item md={4}>
                    <label htmlFor="Password">
                      <span style={{ color: `red' }}>*</span>Password
                    </label>
                    <Box position={'relative'}>
                      <input
                        required
                        id="Password"
                        name="Password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder=" Enter Your Password "
                        value={formInfo?.Password}
                        onChange={handleChange}
                      />

                      {showPassword ? (
                        <Visibility
                          onClick={() => setShowPassword((prev) => !prev)}
                          sx={{
                            color: 'var(--primary-color)',
                            position: 'absolute',
                            top: '50%',
                            right: '5px',
                            transform: 'translate(-5px,-50%)',
                          }}
                        />
                      ) : (
                        <VisibilityOff
                          onClick={() => setShowPassword((prev) => !prev)}
                          sx={{
                            color: 'var(--primary-color)',
                            position: 'absolute',
                            top: '50%',
                            right: '5px',
                            transform: 'translate(-5px,-50%)',
                          }}
                        />
                      )}
                    </Box>
                  </Grid> */}
                  <Grid item md={4}>
                    <label htmlFor="Role">
                      <span style={{ color: "red" }}>*</span>Select Role
                    </label>

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
        </Box>
      </Modal>
    </Box>
  );
};

export default Staff;
