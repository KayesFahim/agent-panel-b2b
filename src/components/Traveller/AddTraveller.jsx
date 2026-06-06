import {
  Box,
  Button,
  Container,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import { Calendar } from "react-date-range";
import _PhoneInput from "react-phone-input-2";
import { useNavigate, useLocation } from "react-router-dom";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import Swal from "sweetalert2";
import Loader from "../../images/loader/Render.gif";
import AddTraveler from "../../images/undraw/undraw_airport_re_oqk1.svg";
import ServerError from "../../images/undraw/undraw_server_down_s-4-lk.svg";
import CountryList from "../Shared/CountryList";
import Header from "../Header/Header";
import "./AddTraveller.css";
import getAuthToken from "../../Token/getAuthToken";

const PhoneInput = _PhoneInput.default || _PhoneInput;

const AddTraveller = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = getAuthToken();
  const editData = location.state?.editData;

  const [travelerData, setTravelerData] = useState({
    fname: "",
    lname: "",
    dob: "",
    type: "",
    nationality: "BD",
    passportno: "",
    passexpireDate: "",
    phone: "",
    email: "",
    gender: "",
  });
  const [userPhoneNumber, setUserPhoneNumber] = useState("92");
  const [openDob, setOpenDob] = useState(false);
  const [openPassEx, setOpenPassEx] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setTravelerData({
        fname: editData.givenname || "",
        lname: editData.surname || "",
        dob: editData.dob || "",
        type: editData.type || "",
        nationality: editData.nationality || "BD",
        passportno: editData.document || "",
        passexpireDate: editData.expiredate || "",
        phone: editData.phone || "",
        email: editData.email || "",
        gender: editData.gender || "",
      });
      if (editData.phone) {
        setUserPhoneNumber(editData.phone);
      }
    }
  }, [editData]);

  // todo: date validation
  function addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
  }
  let dateAfterSixMonths = addMonths(new Date(), 6);
  let dateBeforeTwelveYears = addMonths(new Date(), -144);
  let dateBeforeTwoYears = addMonths(new Date(), -24);
  // todo:end

  //  form submit function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = editData
      ? `${import.meta.env.REACT_APP_API_URL}/agent/traveller/${editData.uid}`
      : `${import.meta.env.REACT_APP_API_URL}/agent/traveller`;

    const method = editData ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          givenname: travelerData.fname,
          surname: travelerData.lname,
          dob: travelerData.dob,
          type: travelerData.type,
          nationality: travelerData.nationality || "BD",
          document: travelerData.passportno,
          expiredate: travelerData.passexpireDate,
          phone: travelerData.phone,
          email: travelerData.email,
          gender: travelerData.gender,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      Swal.fire({
        imageUrl: AddTraveler,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        title: "Success",
        html: editData
          ? "<strong>Traveller Updated Successfully</strong>"
          : "<strong>A New Traveller Added</strong>",
        confirmButtonColor: "#dc143c",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/agent/traveller");
      });
    } catch (err) {
      Swal.fire({
        imageUrl: ServerError,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        title: "Error",
        html: err.message,
        confirmButtonColor: "#dc143c",
        confirmButtonText: "Ok",
      });
    } finally {
      e.target.reset();
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const field = e.target.name;
    let value;
    if (field === "passportCopy" || field === "visaCopy") {
      value = URL.createObjectURL(e.target.files[0]);
    } else if (
      field === "gender" ||
      field === "nationality" ||
      field === "type"
    ) {
      value = e.target.value;
    } else {
      value = e.target.value.toUpperCase();
    }
    const newTravelerData = { ...travelerData };
    newTravelerData[field] = value;
    setTravelerData(newTravelerData);
  };

  const deleteImage = (field) => {
    setTravelerData({ ...travelerData, [field]: "" });
  };

  // if (loading) {
  //   return (
  //     <Box
  //       style={{
  //         display: 'flex',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         height: '70vh',
  //         width: '70vw',
  //         marginInline: 'auto',
  //       }}
  //     >
  //       <Box
  //         style={{
  //           width: '50%',
  //           height: '50%',
  //           display: 'flex',
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //         }}
  //       >
  //         <img
  //           src={Loader}
  //           alt="loader"
  //           style={{
  //             width: '100%',
  //             objectFit: 'center',
  //           }}
  //         />
  //       </Box>
  //     </Box>
  //   );
  // }

  return (
    <Box>
      <Header />
      <Box sx={{ bgcolor: "#FFFFFF", py: { md: 2 } }}>
        <Container>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "poppins",
                fontWeight: "500",
                fontSize: "22px",
                color: "#444542",

                my: { md: 2 },
                mt: { xs: 14 },
              }}
            >
              {editData ? "Edit TRAVELER" : "Add TRAVELER"}
            </Typography>
            {/* <Typography
              sx={{ fontWeight: "500px", fontSize: "16px", color: "#2564B8" }}
              mb={5}
            >
              You can add your favorites Traveller here
            </Typography> */}
          </Box>
        </Container>
      </Box>
      <Box sx={{ bgcolor: "#EEF2F5", height: { md: "100vh" } }}>
        <Container sx={{ mt: { xs: 8, sm: 10, md: 2 } }}>
          <form onSubmit={handleSubmit}>
            <Box className="passengerInput1">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
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
                      First Name
                    </Typography>
                    <Box>
                      <input
                        required
                        type="text"
                        name="fname"
                        value={travelerData.fname}
                        placeholder="Enter First Name"
                        onFocus={() => {
                          setOpenDob(false);
                          setOpenPassEx(false);
                        }}
                        onChange={(e) => handleChange(e)}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
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
                      Last Name
                    </Typography>
                    <Box>
                      <input
                        required
                        type="text"
                        name="lname"
                        value={travelerData.lname}
                        placeholder="Enter Last Name"
                        onChange={(e) => handleChange(e)}
                        onFocus={() => {
                          setOpenDob(false);
                          setOpenPassEx(false);
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={4}>
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
                      Gender
                    </Typography>
                    <Box>
                      <select
                        required
                        name="gender"
                        value={travelerData.gender}
                        onChange={(e) => handleChange(e)}
                        onFocus={() => {
                          setOpenDob(false);
                          setOpenPassEx(false);
                        }}
                      >
                        <option value="">Select Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                      </select>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={4}>
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
                      Nationality
                    </Typography>
                    <Box>
                      <select
                        required
                        type="text"
                        name="nationality"
                        value={travelerData.nationality || "BD"}
                        onChange={(e) => handleChange(e)}
                        onFocus={() => {
                          setOpenDob(false);
                          setOpenPassEx(false);
                        }}
                      >
                        <option value="">Select Nationality</option>
                        {CountryList.map((country) => {
                          return (
                            <option value={country.code}>{country.name}</option>
                          );
                        })}
                      </select>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
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
                      Passenger Type
                    </Typography>
                    <Box>
                      <select
                        required
                        name="type"
                        value={travelerData.type}
                        onChange={(e) => handleChange(e)}
                        onFocus={() => {
                          setOpenDob(false);
                          setOpenPassEx(false);
                        }}
                      >
                        <option value="">Passenger Type</option>
                        <option value="ADT">Adult</option>
                        <option value="CNN">Child</option>
                        <option value="C09">Child</option>
                        <option value="INF">Infant</option>
                      </select>
                    </Box>
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                  style={{ position: "relative" }}
                >
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
                      Date of birth
                    </Typography>
                    <Box>
                      <Tooltip
                        title={
                          travelerData.type
                            ? ""
                            : "Please Select Passenger first"
                        }
                      >
                        <input
                          disabled={travelerData.type ? false : true}
                          required
                          readOnly
                          type="text"
                          name="dob"
                          value={
                            travelerData.dob
                              ? format(
                                new Date(travelerData.dob),
                                "dd MMM yyyy"
                              )
                              : ""
                          }
                          placeholder="Select Date Of Birth"
                          onClick={() => {
                            setOpenDob((prev) => !prev);
                            setOpenPassEx(false);
                          }}
                        />
                      </Tooltip>
                    </Box>
                  </Box>

                  {openDob ? (
                    <Box
                      sx={{
                        position: { xs: "relative", sm: "unset" },
                        left: { xs: "20px", sm: "0" },
                      }}
                    >
                      <Calendar
                        color="#003566"
                        months={1}
                        className="new-dashboard-calendar"
                        onChange={(data) => {
                          setTravelerData({
                            ...travelerData,
                            dob: new Date(data).toLocaleDateString("sv"),
                          });
                          setOpenPassEx(false);
                          setOpenDob(false);
                        }}
                        minDate={
                          travelerData.type === "ADT"
                            ? new Date("1800-01-01")
                            : travelerData.type === "C09"
                              ? new Date(dateBeforeTwelveYears)
                              : new Date(dateBeforeTwoYears)
                        }
                        maxDate={
                          travelerData.type === "ADT"
                            ? new Date(dateBeforeTwelveYears)
                            : travelerData.type === "C09"
                              ? new Date(dateBeforeTwoYears)
                              : new Date()
                        }
                      />
                    </Box>
                  ) : null}
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={4}>
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
                      Passport Number
                    </Typography>
                    <Box>
                      <input
                        required
                        type="text"
                        name="passportno"
                        value={travelerData.passportno}
                        placeholder="Passport Number"
                        onChange={(e) => handleChange(e)}
                        onFocus={() => {
                          setOpenDob(false);
                          setOpenPassEx(false);
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                  style={{ position: "relative" }}
                >
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
                      Passport Expire Date
                    </Typography>
                    <Box>
                      <input
                        autoComplete="off"
                        required
                        readOnly
                        type="text"
                        name="passexpireDate"
                        value={
                          travelerData.passexpireDate
                            ? format(
                              new Date(travelerData.passexpireDate),
                              "dd MMM yyy"
                            )
                            : ""
                        }
                        placeholder="Expire Date"
                        onClick={() => {
                          setOpenPassEx((prev) => !prev);
                          setOpenDob(false);
                        }}
                      />
                    </Box>
                  </Box>

                  {openPassEx ? (
                    <Box
                      sx={{
                        position: { xs: "relative", sm: "unset" },
                        left: { xs: "20px", sm: "0" },
                      }}
                    >
                      <Calendar
                        color="#003566"
                        months={1}
                        className="new-dashboard-calendar"
                        onChange={(data) => {
                          setTravelerData({
                            ...travelerData,
                            passexpireDate: new Date(data).toLocaleDateString(
                              "sv"
                            ),
                          });
                          setOpenPassEx(false);
                          setOpenDob(false);
                        }}
                        minDate={new Date()}
                      />
                    </Box>
                  ) : null}
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={4}>
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
                    <input
                      required
                      type="email"
                      name="email"
                      value={travelerData.email}
                      placeholder="Enter Email"
                      onChange={(e) => handleChange(e)}
                      onFocus={() => {
                        setOpenDob(false);
                        setOpenPassEx(false);
                      }}
                    />
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                // style={{ marginBottom: "20px" }}
                >
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
                      Contact Number
                    </Typography>
                    <Box className="passengerInput1">
                      <PhoneInput
                        className="phoneIn"
                        sx={{
                          width: "100%",
                        }}
                        required
                        country={"pk"}
                        name="phone"
                        value={userPhoneNumber}
                        onFocus={() => {
                          setOpenDob(false);
                          setOpenPassEx(false);
                        }}
                        onChange={(phone) => {
                          setTravelerData({
                            ...travelerData,
                            phone: phone,
                          });
                          setUserPhoneNumber(phone);
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={12}>
                  <Box
                    mb={5}
                    sx={{
                      display: "flex",
                      justifyContent: { md: "left", xs: "center" },
                      width: "100%",
                      mx: "auto",
                    }}
                  >
                    <Button
                      type="submit"
                      sx={{
                        fontFamily: "poppins",
                        fontWeight: "400",
                        fontSize: "14px",
                        textTransform: "capitalize",

                        background: "var(--primary-color)",
                        color: "#FFFFFF",
                        width: { xs: "100%", md: "370px" },
                        borderRadius: "24px",

                        "&:hover": {
                          background: "var(--primary-color)",
                        },

                        // disabled: !loading ? true : false,
                      }}
                    >
                      {loading
                        ? "Loading..."
                        : editData
                        ? "Update Traveler Information"
                        : "Add This Traveler"}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Container>
      </Box>
    </Box>
  );
};

export default AddTraveller;
