import {
  Checkbox,
  CircularProgress,
  ClickAwayListener,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-date-range";
import _PhoneInput from "react-phone-input-2";
const PhoneInput = _PhoneInput.default || _PhoneInput;
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import Swal from "sweetalert2";
import noFareFound from "../../images/undraw/undraw_not_found_re_bh2e.svg";
import bookingSuccess from "../../images/undraw/undraw_travel_booking_re_6umu.svg";
import CountryList from "../Shared/CountryList";
import SearchableDropDown from "../Shared/SearchableDropDown/SearchableDropDown";
import "./FlightUserInfo.css";
import getAuthToken from "../../Token/getAuthToken";
import TokenDecrypt from "../../Token/TokenDecrypt";
function generateRandomNumber() {
  const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
  return randomNumber;
}
const FlightUserInfo = ({
  flightData,
  adultCount,
  childCount,
  infantCount,
}) => {
  const token = getAuthToken();
  const tokenise = TokenDecrypt();
  const [isLoading, setIsLoading] = useState(false);
  //todo: location and navigation
  const navigate = useNavigate();
  //todo: end of location and navigation

  //todo: copy of userData
  const userDataCopy = JSON.parse(JSON.stringify(flightData));

  const [userPhoneNumber, setUserPhoneNumber] = useState(
    tokenise?.phone || "880"
  );
  const [email, setEmail] = useState(tokenise?.email || "");
  function addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
  }
  let dateAfterSixMonths = addMonths(
    new Date(flightData?.AllLegsInfo[0]?.DepDate),
    6
  );
  let dateBeforeTwelveYears = addMonths(
    new Date(flightData?.AllLegsInfo[0]?.DepDate),
    -144
  );
  let dateBeforeTwoYears = addMonths(
    new Date(flightData?.AllLegsInfo[0]?.DepDate),
    -24
  );
  // todo:end

  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };

  //todo: select traveler section
  const [travellers, setTravellers] = useState([]);
  // let agentId = users?.agentId;
  // let uid = users?.uid;

  useEffect(() => {
    let url = `${import.meta.env.REACT_APP_API_URL}/agent/traveller`;

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        let uniqueTravelers = [
          ...new Map(data?.map((item) => [item["document"], item])).values(),
        ];
        setTravellers(uniqueTravelers);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error, show a message, or perform other actions
      });
  }, []);

  const checkDomestic = flightData?.FarePolicy === "domestic";
  const [flightPassengerData, setFlightPassengerData] = useState({
    adult: [...new Array(adultCount)].map((item, index) => {
      return {
        type: "ADT",
        givenname: "",
        surname: "",
        gender: "",
        dob: "",
        nationality: "BD",
        document: checkDomestic ? `${generateRandomNumber()}` : "",
        expiredate: checkDomestic
          ? format(new Date(dateAfterSixMonths), "yyyy-MM-dd")
          : format(new Date(dateAfterSixMonths), "yyyy-MM-dd"),
        openDate: false,
        openPassExDate: false,
      };
    }),
    child: [...new Array(childCount)].map((item, index) => {
      return {
        type: "C09",
        // type: "C09",
        givenname: "",
        surname: "",
        gender: "",
        dob: "",
        nationality: "BD",
        document: checkDomestic ? `${generateRandomNumber()}` : "",
        expiredate: checkDomestic
          ? format(new Date(dateAfterSixMonths), "yyyy-MM-dd")
          : format(new Date(dateAfterSixMonths), "yyyy-MM-dd"),
        openDate: false,
        openPassExDate: false,
      };
    }),
    infant: [...new Array(infantCount)].map((item, index) => {
      return {
        type: "INF",
        givenname: "",
        surname: "",
        gender: "",
        dob: "",
        nationality: "BD",
        document: checkDomestic ? `${generateRandomNumber()}` : "",
        expiredate: format(new Date(), "yyyy-MM-dd"),
        openDate: false,
        openPassExDate: false,
      };
    }),
    // adultCount: adultCount,
    // childCount: childCount,
    // infantCount: infantCount,
    email: email,
    phone: userPhoneNumber,
  });

  const handleOnChange = (e, type, index) => {
    if (type === "ADT") {
      const value = e.target.value;
      const field = e.target.name;
      //copying data to temp variable so that we do not directly mutate original state
      const tempFlightData = [...flightPassengerData.adult];
      // -1 check to see if we found that object in working hours
      if (index !== -1) {
        tempFlightData[index] = {
          ...tempFlightData[index], //keeping existing values in object
          [field]: value, //here property can be "price" or "description"
        };
      }
      setFlightPassengerData({
        ...flightPassengerData,
        adult: tempFlightData,
      });
    }
    if (type === "C09") {
      const value = e.target.value;
      const field = e.target.name;
      //copying data to temp variable so that we do not directly mutate original state
      const tempFlightData = [...flightPassengerData.child];
      // -1 check to see if we found that object in working hours
      if (index !== -1) {
        tempFlightData[index] = {
          ...tempFlightData[index], //keeping existing values in object
          [field]: value, //here property can be "price" or "description"
        };
      }
      setFlightPassengerData({
        ...flightPassengerData,
        child: tempFlightData,
      });
    }
    if (type === "INF") {
      const value = e.target.value;
      const field = e.target.name;
      //todo:copying data to temp variable so that we do not directly mutate original state
      const tempFlightData = [...flightPassengerData.infant];
      //todo: -1 check to see if we found that object in working hours
      if (index !== -1) {
        tempFlightData[index] = {
          ...tempFlightData[index], //todo:keeping existing values in object
          [field]: value, //todo:here property can be "price" or "description"
        };
      }
      setFlightPassengerData({
        ...flightPassengerData,
        infant: tempFlightData,
      });
    }
    e.preventDefault();
  };

  const bookingJson = {
    PassengerInfo: {
      adult: flightPassengerData.adult,
      child: flightPassengerData.child,
      infant: flightPassengerData.infant,
    },
    ContactInfo: {
      email: flightPassengerData.email,
      phone: flightPassengerData?.phone || "",
    },
    FlightInfo: { ...userDataCopy },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    e.target.reset();

    const url = `${import.meta.env.REACT_APP_API_URL}/agent/flight/booking`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingJson),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data?.status !== "error") {
        Swal.fire({
          imageUrl: bookingSuccess,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "Success",
          html: `Thank you so much for booking a flight ticket. Please issue your booking ticket within the time limit specified, otherwise your booking request will be automatically cancelled. For any query, please contact us at <strong>support@aatrips.pk</strong> or Call <strong>+8801409965900</strong>`,
          confirmButtonColor: "var(--p1)",
          confirmButtonText: "Ok",
        }).then(() => {
          setIsLoading(false);
          navigate(
            `/agent/bookingdetails/${data?.uid}/${data.bookingId}/${data?.triptype}`,
            {
              state: {
                data: data,
                pnr: data.pnr,
              },
            }
          );
        });
      } else {
        throw new Error("Booking error: " + data?.message); // Add a specific error message
      }
    } catch (error) {
      console.error("Error submitting data:", error);

      Swal.fire({
        imageUrl: noFareFound,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        title: "No Fare Available",
        html: `For any query, please contact us at <strong>support@aatrips.pk</strong> or Call <strong>+8801409965900</strong>`,
        confirmButtonColor: "var(--primary-color)",
        confirmButtonText: "Please Try Another Flights.",
      }).then(() => {
        setIsLoading(false);
        navigate(-1);
      });
    }
  };

  const handleAutoFill = (obj, index) => {
    const {
      dob,
      givenname,
      gender,
      surname,
      expiredate,
      nationality,
      document,
      type,
    } = obj;
    if (obj.type === "ADT") {
      const tempFlightData = [...flightPassengerData.adult];
      if (index !== -1) {
        tempFlightData[index] = {
          ...tempFlightData[index],
          type,
          givenname: givenname,
          surname: surname,
          gender: gender,
          dob: new Date(dob).toLocaleDateString("sv"),
          nationality: nationality,
          document: document,
          expiredate: new Date(expiredate).toLocaleDateString("sv"),
        };
      }
      setFlightPassengerData({
        ...flightPassengerData,
        adult: tempFlightData,
      });
    } else if (obj.type === "C09") {
      const tempFlightData = [...flightPassengerData.child];
      if (index !== -1) {
        tempFlightData[index] = {
          ...tempFlightData[index],
          type,
          givenname: givenname,
          surname: surname,
          gender: gender,
          dob: new Date(dob).toLocaleDateString("sv"),
          nationality: nationality,
          document: document,
          expiredate: new Date(expiredate).toLocaleDateString("sv"),
        };
      }
      setFlightPassengerData({
        ...flightPassengerData,
        child: tempFlightData,
      });
    } else {
      const tempFlightData = [...flightPassengerData.infant];
      if (index !== -1) {
        tempFlightData[index] = {
          ...tempFlightData[index],
          type,
          givenname: givenname,
          surname: surname,
          gender: gender,
          dob: new Date(dob).toLocaleDateString("sv"),
          nationality: nationality,
          document: document,
          expiredate: new Date(expiredate).toLocaleDateString("sv"),
        };
      }
      setFlightPassengerData({
        ...flightPassengerData,
        infant: tempFlightData,
      });
    }
  };

  const handleOpenDateState = (type, index, item) => {
    if (type === "ADT") {
      const tempFlightData = [...flightPassengerData.adult];
      tempFlightData[index] = {
        ...tempFlightData[index],
        openDate: !item.openDate,
        openPassExDate: false,
      };
      setFlightPassengerData({
        ...flightPassengerData,
        adult: tempFlightData,
      });
    } else if (type === "C09") {
      const tempFlightData = [...flightPassengerData.child];
      tempFlightData[index] = {
        ...tempFlightData[index],
        openDate: !item.openDate,
        openPassExDate: false,
      };
      setFlightPassengerData({
        ...flightPassengerData,
        child: tempFlightData,
      });
    } else {
      const tempFlightData = [...flightPassengerData.infant];
      tempFlightData[index] = {
        ...tempFlightData[index],
        openDate: !item.openDate,
        openPassExDate: false,
      };
      setFlightPassengerData({
        ...flightPassengerData,
        infant: tempFlightData,
      });
    }
  };
  const handleOpenPassDateState = (type, index, item) => {
    if (type === "ADT") {
      const tempFlightData = [...flightPassengerData.adult];
      tempFlightData[index] = {
        ...tempFlightData[index],
        openDate: false,
        openPassExDate: !item.openPassExDate,
      };
      setFlightPassengerData({
        ...flightPassengerData,
        adult: tempFlightData,
      });
    } else if (type === "C09") {
      const tempFlightData = [...flightPassengerData.child];
      tempFlightData[index] = {
        ...tempFlightData[index],
        openDate: false,
        openPassExDate: !item.openPassExDate,
      };
      setFlightPassengerData({
        ...flightPassengerData,
        child: tempFlightData,
      });
    } else {
      const tempFlightData = [...flightPassengerData.infant];
      tempFlightData[index] = {
        ...tempFlightData[index],
        openDate: false,
        openPassExDate: !item.openPassExDate,
      };
      setFlightPassengerData({
        ...flightPassengerData,
        infant: tempFlightData,
      });
    }
  };

  const handleClickAway = () => { };
  //todo: add traveler states
  const adultTravelers = travellers.filter((item) => item.type === "ADT");
  const childTravelers = travellers.filter((item) => item.type === "C09");
  const infantTravelers = travellers.filter((item) => item.type === "INF");
  const optionAdults = adultTravelers.map((x, index) => {
    if (x.type === "ADT") {
      return {
        value: x,
        label: `Name:${x.givenname} ${x.surname} Gender:${x.gender}  Dob:${x.dob}`,
      };
    }
  });
  const optionChilds = childTravelers.map((x, index) => {
    if (x.type === "C09") {
      return {
        value: x,
        label: `Name:${x.givenname} ${x.surname}  Gender:${x.gender}  Dob:${x.dob}`,
      };
    }
  });
  const optionInfants = infantTravelers.map((x, index) => {
    if (x.type === "INF") {
      return {
        value: x,
        label: `Name:${x.givenname} ${x.surname} Gender:${x.gender}  Dob:${x.dob}`,
      };
    }
  });
  //todo: end of add traveler states
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box my={2} sx={{ position: "relative" }}>
        <Grid container>
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className="right-overflow1"
          >
            <Box>
              {/* <Typography
                sx={{
                  fontSize: { xs: 16, sm: 22 },
                  color: "var(--secondary-color)",
                  fontWeight: 500,
                  my: 2,
                }}
              >
                Passenger Information Details
              </Typography> */}

              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "#FFFFFF",
                    boxShadow:
                      "-0.452679px 4.97947px 36px rgba(0, 0, 0, 0.09), -0.0905357px 0.995893px 5.85px rgba(0, 0, 0, 0.045)",

                    borderRadius: "10px",

                    mb: 3,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: 16, sm: 22 },
                      color: "var(--secondary-color)",
                      fontWeight: 500,
                      my: 2,
                    }}
                  >
                    Passenger Information Details
                  </Typography>
                  {flightPassengerData.adult.map((item, index) => {
                    return (
                      <Box key={index}>
                        <Box className="adult-info">
                          <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                          >
                            <Grid item xs={12} sm={8}>
                              {travellers.length !== 0 && (
                                <Box>
                                  <label htmlFor="selectTravelerADT">
                                    Select Traveller
                                  </label>
                                  <SearchableDropDown
                                    index={index}
                                    handler={handleAutoFill}
                                    options={optionAdults}
                                  />
                                </Box>
                              )}
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={4}
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <Box mt={2}>
                                <Typography
                                  sx={{
                                    p: "5px 40px",
                                    bgcolor: "#0487C7",
                                    borderRadius: "4px",
                                    width: "fit-content",
                                    color: "var(--white)",
                                  }}
                                >
                                  Adult-{index + 1}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            spacing={2}
                            sx={{ padding: "26px 0px" }}
                          >
                            {/*//todo: auto fil travelers */}
                            <Grid item xs={12} md={6} lg={4}>
                              <label htmlFor="givenname">
                                Given Name / First Name
                              </label>
                              <input
                                required
                                onBlur={handleFocus}
                                focused={focused.toString()}
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                                type="text"
                                name="givenname"
                                id="givenname"
                                value={item.givenname}
                                // placeholder="Given Name / First Name"
                                pattern="[a-zA-Z\s]+"
                                style={{
                                  backgroundColor: "transparent",
                                  border: "1px solid gray",
                                  borderRadius: "4px",
                                  padding: "8px",
                                  width: "100%",
                                  textTransform: "uppercase",
                                }}
                              />
                              <span
                                className="form-validation-span"
                                style={{
                                  color: "red",
                                  fontSize: "14px",
                                }}
                              >
                                *No Special Character
                              </span>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                              <label htmlFor="surname">
                                Surname / Last Name
                              </label>
                              <input
                                required
                                focused={focused.toString()}
                                onBlur={handleFocus}
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                                type="text"
                                name="surname"
                                id="surname"
                                pattern="[a-zA-Z\s]+"
                                value={item.surname}
                                // placeholder="Surname / Last Name"
                                style={{
                                  backgroundColor: "transparent",
                                  border: "1px solid gray",
                                  borderRadius: "4px",
                                  padding: "8px",
                                  width: "100%",
                                  textTransform: "uppercase",
                                }}
                              />
                              <span
                                className="form-validation-span"
                                style={{
                                  color: "red",
                                  fontSize: "14px",
                                }}
                              >
                                *No Special Character
                              </span>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                              <label htmlFor="gender">Select Gender</label>
                              <select
                                className="user-info-select"
                                required
                                name="gender"
                                id="gender"
                                autoFocus="true"
                                value={item.gender}
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                              >
                                <option value="">Gender</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                              </select>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              md={6}
                              lg={4}
                              style={{ position: "relative" }}
                            >
                              <label htmlFor="dob">Date of Birth</label>

                              <input
                                required
                                focused={focused.toString()}
                                onBlur={handleFocus}
                                type="text"
                                name="dob"
                                id="dob"
                                value={
                                  item?.dob
                                    ? format(new Date(item.dob), "yyyy-MMM-dd")
                                    : ""
                                }
                                placeholder="Date of Birth"
                                autoComplete="off"
                                onClick={() =>
                                  handleOpenDateState(item.type, index, item)
                                }
                              />
                              {item.openDate && (
                                <Calendar
                                  color={"#003566"}
                                  // date={new Date(item.adob)}
                                  onChange={(date) => {
                                    const tempFlightData = [
                                      ...flightPassengerData.adult,
                                    ];
                                    tempFlightData[index] = {
                                      ...tempFlightData[index],
                                      dob: new Date(date).toLocaleDateString(
                                        "sv"
                                      ),
                                      openDate: false,
                                    };
                                    setFlightPassengerData({
                                      ...flightPassengerData,
                                      adult: tempFlightData,
                                    });
                                  }}
                                  date={item?.dob ? new Date(item.dob) : null}
                                  months={1}
                                  maxDate={new Date(dateBeforeTwelveYears)}
                                  className="user-info-calendar"
                                />
                              )}
                              <span
                                style={{
                                  color: "red",
                                  fontSize: "14px",
                                }}
                              >
                                *Age Should be 12+
                              </span>
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                              <label htmlFor="nationality">
                                Select Nationality
                              </label>
                              <select
                                className="user-info-select"
                                required
                                name="nationality"
                                id="nationality"
                                selected={item.nationality}
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                                value={item.nationality}
                              >
                                <option value="">Select Nationality</option>
                                {CountryList.map((country) => {
                                  return (
                                    <option value={country.code}>
                                      {country.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </Grid>
                            {!checkDomestic && (
                              <Grid item xs={12} md={6} lg={4}>
                                <label htmlFor="document">
                                  Passport Number
                                </label>
                                <input
                                  required
                                  focused={focused.toString()}
                                  onBlur={handleFocus}
                                  type="text"
                                  name="document"
                                  id="document"
                                  // placeholder="xx-xxxxxxx"
                                  pattern="^[a-zA-Z0-9]*$"
                                  value={item.document}
                                  onChange={(e) =>
                                    handleOnChange(e, item.type, index)
                                  }
                                  style={{
                                    backgroundColor: "transparent",
                                    border: "1px solid gray",
                                    borderRadius: "4px",
                                    padding: "8px",
                                    width: "100%",
                                    textTransform: "uppercase",
                                  }}
                                />
                                <span
                                  className="form-validation-span"
                                  style={{
                                    color: "red",
                                    fontSize: "14px",
                                  }}
                                >
                                  *Only Uppercase and number
                                </span>
                              </Grid>
                            )}

                            {!checkDomestic && (
                              <Grid
                                item
                                xs={12}
                                md={6}
                                lg={4}
                                sx={{ position: "relative" }}
                              >
                                <label htmlFor="expiredate">
                                  Passport Expire Date
                                </label>
                                <input
                                  // required
                                  type="text"
                                  name="expiredate"
                                  readOnly
                                  id="expiredate"
                                  value={format(
                                    new Date(item.expiredate),
                                    "yyyy-MMM-dd"
                                  )}
                                  onClick={() =>
                                    handleOpenPassDateState(
                                      item.type,
                                      index,
                                      item
                                    )
                                  }
                                />
                                {item.openPassExDate && (
                                  <Calendar
                                    color={"#003566"}
                                    onChange={(date) => {
                                      const tempFlightData = [
                                        ...flightPassengerData.adult,
                                      ];
                                      tempFlightData[index] = {
                                        ...tempFlightData[index],
                                        expiredate: new Date(
                                          date
                                        ).toLocaleDateString("sv"),

                                        openPassExDate: false,
                                      };
                                      setFlightPassengerData({
                                        ...flightPassengerData,
                                        adult: tempFlightData,
                                      });
                                    }}
                                    date={
                                      item.expiredate
                                        ? new Date(item.expiredate)
                                        : null
                                    }
                                    months={1}
                                    minDate={new Date(dateAfterSixMonths)}
                                    className="user-info-calendar"
                                  />
                                )}
                              </Grid>
                            )}
                          </Grid>
                        </Box>
                      </Box>
                    );
                  })}
                  {/* //todo:Child details */}
                  {flightPassengerData.child.map((item, index) => (
                    <Box>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item xs={12} sm={8}>
                          {travellers.length !== 0 && (
                            <Grid item xs={12} md={12} lg={12}>
                              <label htmlFor="selectTravelerADT">
                                Select Traveller
                              </label>
                              <SearchableDropDown
                                index={index}
                                handler={handleAutoFill}
                                options={optionChilds}
                              />
                            </Grid>
                          )}
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                          <Box mt={2}>
                            <Typography
                              sx={{
                                p: "5px 40px",
                                bgcolor: "#0487C7",
                                borderRadius: "4px",
                                width: "fit-content",
                                color: "var(--white)",
                              }}
                            >
                              Child-{index + 1}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      <Box className="adult-info">
                        <Grid
                          container
                          spacing={2}
                          sx={{
                            padding: "26px 0px",
                          }}
                        >
                          {/*//todo: auto fil travelers */}

                          <Grid item xs={12} md={6} lg={4}>
                            <label htmlFor="givenname">
                              Given Name / First Name
                            </label>
                            <input
                              required
                              focused={focused.toString()}
                              onBlur={handleFocus}
                              type="text"
                              name="givenname"
                              id="givenname"
                              value={item.givenname}
                              // placeholder="Given Name / First Name"
                              pattern="[a-zA-Z\s]+"
                              onChange={(e) =>
                                handleOnChange(e, item.type, index)
                              }
                              style={{ textTransform: "uppercase" }}
                            />
                            <span
                              className="form-validation-span"
                              style={{
                                color: "red",
                                fontSize: "14px",
                              }}
                            >
                              *No Special Character
                            </span>
                          </Grid>
                          <Grid item xs={12} md={6} lg={4}>
                            <label htmlFor="surname">Surname / Last Name</label>
                            <input
                              required
                              focused={focused.toString()}
                              onBlur={handleFocus}
                              type="text"
                              name="surname"
                              id="surname"
                              pattern="[a-zA-Z\s]+"
                              value={item.surname}
                              placeholder="Surname / Last Name"
                              onChange={(e) =>
                                handleOnChange(e, item.type, index)
                              }
                              style={{ textTransform: "uppercase" }}
                            />
                            <span
                              className="form-validation-span"
                              style={{
                                color: "red",
                                fontSize: "14px",
                              }}
                            >
                              *No Special Character
                            </span>
                          </Grid>
                          <Grid item xs={12} md={6} lg={4}>
                            <label htmlFor="gender">Select Gender</label>
                            <select
                              className="user-info-select"
                              required
                              onBlur={handleFocus}
                              onChange={(e) =>
                                handleOnChange(e, item.type, index)
                              }
                              name="gender"
                              id="gender"
                              value={item.gender}
                            >
                              <option value="">Gender</option>
                              <option value="MALE">Male</option>
                              <option value="FEMALE">Female</option>
                            </select>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            md={6}
                            lg={4}
                            style={{ position: "relative" }}
                          >
                            <label htmlFor="dob">Date of Birth</label>

                            <input
                              required
                              type="text"
                              id="dob"
                              // value={
                              //   item?.dob === ''
                              //     ? 'Date of Birth'
                              //     : format(new Date(item?.dob), 'yyyy-MMM-dd')
                              // }
                              value={
                                item?.dob
                                  ? format(new Date(item.dob), "yyyy-MMM-dd")
                                  : ""
                              }
                              placeholder="Date of Birth"
                              autoComplete="off"
                              onClick={() =>
                                handleOpenDateState(item.type, index, item)
                              }
                            />
                            {item.openDate && (
                              <Calendar
                                color={"#003566"}
                                // date={new Date(item.adob)}
                                onChange={(date) => {
                                  const tempFlightData = [
                                    ...flightPassengerData.child,
                                  ];
                                  tempFlightData[index] = {
                                    ...tempFlightData[index],
                                    dob: new Date(date).toLocaleDateString(
                                      "sv"
                                    ),
                                    openDate: false,
                                  };
                                  setFlightPassengerData({
                                    ...flightPassengerData,
                                    child: tempFlightData,
                                  });
                                }}
                                date={item.dob ? new Date(item.dob) : null}
                                months={1}
                                minDate={new Date(dateBeforeTwelveYears)}
                                maxDate={new Date(dateBeforeTwoYears)}
                                className="user-info-calendar"
                              />
                            )}

                            <span
                              style={{
                                color: "red",
                                fontSize: "14px",
                              }}
                            >
                              *Age must be 2 to 12 years
                            </span>
                          </Grid>

                          <Grid item xs={12} md={6} lg={4}>
                            <label htmlFor="nationality">
                              Select Nationality
                            </label>
                            <select
                              className="user-info-select"
                              required
                              name="nationality"
                              id="nationality"
                              onChange={(e) =>
                                handleOnChange(e, item.type, index)
                              }
                              value={item.nationality}
                            >
                              <option value="">Select Nationality</option>

                              {CountryList.map((country) => {
                                return (
                                  <option value={country.code}>
                                    {country.name}
                                  </option>
                                );
                              })}
                            </select>
                          </Grid>
                          {!checkDomestic && (
                            <Grid item xs={12} md={6} lg={4}>
                              <label htmlFor="document">Passport Number</label>
                              <input
                                // required
                                onBlur={handleFocus}
                                focused={focused.toString()}
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                                type="text"
                                name="document"
                                id="document"
                                pattern="^[a-zA-Z0-9]*$"
                                // placeholder="xx-xxxxxxx"
                                value={item.document}
                                style={{ textTransform: "uppercase" }}
                              />
                              <span
                                className="form-validation-span"
                                style={{ color: "red", fontSize: "14px" }}
                              >
                                *Only Uppercase and number
                              </span>
                            </Grid>
                          )}
                          {!checkDomestic && (
                            <Grid
                              item
                              xs={12}
                              md={6}
                              lg={4}
                              sx={{ position: "relative" }}
                            >
                              <label htmlFor="expiredate">
                                Passport Expire Date
                              </label>

                              <input
                                // required
                                type="text"
                                name="expiredate"
                                id="expiredate"
                                value={format(
                                  new Date(item.expiredate),
                                  "yyyy-MMM-dd"
                                )}
                                onClick={() =>
                                  handleOpenPassDateState(
                                    item.type,
                                    index,
                                    item
                                  )
                                }
                              />
                              {item.openPassExDate && (
                                <Calendar
                                  color={"#003566"}
                                  onChange={(date) => {
                                    const tempFlightData = [
                                      ...flightPassengerData.child,
                                    ];
                                    tempFlightData[index] = {
                                      ...tempFlightData[index],
                                      expiredate: new Date(
                                        date
                                      ).toLocaleDateString("sv"),
                                      openPassExDate: false,
                                    };
                                    setFlightPassengerData({
                                      ...flightPassengerData,
                                      child: tempFlightData,
                                    });
                                  }}
                                  date={
                                    item.expiredate
                                      ? new Date(item.expiredate)
                                      : null
                                  }
                                  months={1}
                                  className="user-info-calendar"
                                  minDate={new Date()}
                                />
                              )}
                            </Grid>
                          )}
                        </Grid>
                      </Box>
                    </Box>
                  ))}
                  {/* //todo:infant details start  */}
                  {flightPassengerData.infant.map((item, index) => (
                    <Box>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item xs={12} sm={8}>
                          {travellers.length !== 0 && (
                            <Grid item xs={12} md={12} lg={12}>
                              <label htmlFor="selectTravelerADT">
                                Select Traveller
                              </label>
                              <SearchableDropDown
                                index={index}
                                handler={handleAutoFill}
                                options={optionInfants}
                              />
                            </Grid>
                          )}
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                          <Box mt={2}>
                            <Typography
                              sx={{
                                p: "5px 40px",
                                bgcolor: "#0487C7",
                                borderRadius: "4px",
                                width: "fit-content",
                                color: "var(--white)",
                              }}
                            >
                              Infant-{index + 1}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      <Box className="adult-info">
                        <Grid
                          container
                          spacing={2}
                          sx={{ padding: "26px 0px" }}
                        >
                          {/*//todo: auto fil travelers */}

                          <Grid item xs={12} md={6} lg={4}>
                            <label htmlFor="givenname">
                              Given Name / First Name
                            </label>
                            <input
                              required
                              focused={focused.toString()}
                              onBlur={handleFocus}
                              type="text"
                              name="givenname"
                              id="givenname"
                              value={item.givenname}
                              // placeholder="Given Name / First Name"
                              pattern="[a-zA-Z\s]+"
                              onChange={(e) =>
                                handleOnChange(e, item.type, index)
                              }
                              style={{
                                textTransform: "uppercase",
                              }}
                            />
                            <span
                              className="form-validation-span"
                              style={{ color: "red", fontSize: "14px" }}
                            >
                              *No Special Character
                            </span>
                          </Grid>
                          <Grid item xs={12} md={6} lg={4}>
                            <label htmlFor="surname">Surname / Last Name</label>
                            <input
                              required
                              focused={focused.toString()}
                              onBlur={handleFocus}
                              type="text"
                              name="surname"
                              id="surname"
                              pattern="[a-zA-Z\s]+"
                              value={item.surname}
                              // placeholder="Surname / Last Name"
                              onChange={(e) =>
                                handleOnChange(e, item.type, index)
                              }
                              style={{ textTransform: "uppercase" }}
                            />
                            <span
                              className="form-validation-span"
                              style={{ color: "red", fontSize: "14px" }}
                            >
                              *No Special Character
                            </span>
                          </Grid>
                          <Grid item xs={12} md={6} lg={4}>
                            <label htmlFor="gender">Select Gender</label>
                            <select
                              className="user-info-select"
                              required
                              name="gender"
                              id="gender"
                              onChange={(e) =>
                                handleOnChange(e, item.type, index)
                              }
                              value={item.gender}
                            >
                              <option value="">Gender</option>
                              <option value="MALE">Male</option>
                              <option value="FEMALE">Female</option>
                            </select>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            md={6}
                            lg={4}
                            style={{ position: "relative" }}
                          >
                            <label htmlFor="dob">Date of Birth</label>

                            <input
                              required
                              type="text"
                              id="dob"
                              value={
                                item?.dob
                                  ? format(new Date(item.dob), "yyyy-MMM-dd")
                                  : ""
                              }
                              placeholder="Date of Birth"
                              autoComplete="off"
                              onClick={() =>
                                handleOpenDateState(item.type, index, item)
                              }
                            />
                            {item.openDate && (
                              <Calendar
                                color={"#003566"}
                                onChange={(date) => {
                                  const tempFlightData = [
                                    ...flightPassengerData.infant,
                                  ];
                                  tempFlightData[index] = {
                                    ...tempFlightData[index],
                                    dob: new Date(date).toLocaleDateString(
                                      "sv"
                                    ),
                                    openDate: false,
                                  };
                                  setFlightPassengerData({
                                    ...flightPassengerData,
                                    infant: tempFlightData,
                                  });
                                }}
                                date={item.dob ? new Date(item.dob) : null}
                                months={1}
                                minDate={new Date(dateBeforeTwoYears)}
                                maxDate={new Date()}
                                className="user-info-calendar"
                              />
                            )}
                            <span style={{ color: "red", fontSize: "14px" }}>
                              *Age should be less then 2 years
                            </span>
                          </Grid>

                          <Grid item xs={12} md={6} lg={4}>
                            <label htmlFor="nationality">
                              Select Nationality
                            </label>
                            <select
                              className="user-info-select"
                              required
                              name="nationality"
                              id="nationality"
                              value={item.nationality}
                              onChange={(e) =>
                                handleOnChange(e, item.type, index)
                              }
                            >
                              <option value="">Select Nationality</option>
                              {/* <option value="BD">Bangladesh</option> */}
                              {CountryList.map((country) => {
                                return (
                                  <option value={country.code}>
                                    {country.name}
                                  </option>
                                );
                              })}
                            </select>
                          </Grid>
                          {!checkDomestic && (
                            <Grid item xs={12} md={6} lg={4}>
                              <label htmlFor="document">Passport Number</label>
                              <input
                                // required
                                focused={focused.toString()}
                                onBlur={handleFocus}
                                type="text"
                                name="document"
                                id="document"
                                pattern="^[a-zA-Z0-9]*$"
                                // placeholder="xx-xxxxxxx"
                                value={item.document}
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                                style={{ textTransform: "uppercase" }}
                              />
                              <span
                                className="form-validation-span"
                                style={{ color: "red", fontSize: "14px" }}
                              >
                                *Only Uppercase and number
                              </span>
                            </Grid>
                          )}
                          {!checkDomestic && (
                            <Grid
                              item
                              xs={12}
                              md={6}
                              lg={4}
                              sx={{ position: "relative" }}
                            >
                              <label htmlFor="expiredate">
                                Passport Expire Date
                              </label>

                              <input
                                // required
                                type="text"
                                id="expiredate"
                                value={format(
                                  new Date(item.expiredate),
                                  "yyyy-MMM-dd"
                                )}
                                onClick={() =>
                                  handleOpenPassDateState(
                                    item.type,
                                    index,
                                    item
                                  )
                                }
                              />
                              {item.openPassExDate && (
                                <Calendar
                                  color={"#003566"}
                                  onChange={(date) => {
                                    const tempFlightData = [
                                      ...flightPassengerData.infant,
                                    ];
                                    tempFlightData[index] = {
                                      ...tempFlightData[index],
                                      expiredate: new Date(
                                        date
                                      ).toLocaleDateString("sv"),
                                      openPassExDate: false,
                                    };
                                    setFlightPassengerData({
                                      ...flightPassengerData,
                                      infant: tempFlightData,
                                    });
                                  }}
                                  date={
                                    item.expiredate
                                      ? new Date(item.expiredate)
                                      : null
                                  }
                                  months={1}
                                  className="user-info-calendar"
                                  minDate={new Date()}
                                />
                              )}
                            </Grid>
                          )}
                        </Grid>
                      </Box>
                    </Box>
                  ))}
                </Box>
                {/* infant details end  */}

                <Box className="conatct-detail">
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "#FFFFFF",
                      boxShadow:
                        "-0.452679px 4.97947px 36px rgba(0, 0, 0, 0.09), -0.0905357px 0.995893px 5.85px rgba(0, 0, 0, 0.045)",

                      borderRadius: "10px",
                      mt: -2,
                      mb: 3,
                    }}
                  >
                    <Typography fontSize={{ xs: 12, sm: 14 }} fontWeight="500">
                      Contact Details (Airlines will send updates to this
                      contact)
                    </Typography>
                    <Box className="adult-info" sx={{ mt: 1 }}>
                      <Grid container spacing={5}>
                        <Grid item xs={12} md={6} lg={4}>
                          <label htmlFor="passengerEmail">Your Email</label>
                          <input
                            required
                            focused={focused.toString()}
                            onBlur={handleFocus}
                            type="email"
                            name="passengerEmail"
                            id="passengerEmail"
                            value={email}
                            // placeholder="example@example.com"
                            onChange={(e) => {
                              setFlightPassengerData({
                                ...flightPassengerData,
                                email: e.target.value,
                              });
                              setEmail(e.target.value);
                            }}
                            style={{
                              backgroundColor: "transparent",
                              border: "1px solid #B0AFAF",
                              borderRadius: "4px",
                              padding: "8px",
                              width: "100%",
                            }}
                          />
                          <span
                            className="form-validation-span"
                            style={{ color: "red", fontSize: "14px" }}
                          >
                            *Enter a valid email
                          </span>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                          <label htmlFor="contactpersonphonenumber">
                            Phone Number
                          </label>
                          <PhoneInput
                            // required
                            country={"bd"}
                            name="contactpersonphonenumber"
                            id="contactpersonphonenumber"
                            value={userPhoneNumber}
                            onChange={(phone) => {
                              setFlightPassengerData({
                                ...flightPassengerData,
                                phone: phone,
                              });
                              setUserPhoneNumber(phone);
                            }}
                            inputStyle={{
                              backgroundColor: "transparent",
                              border: "1px solid #B0AFAF",
                              borderRadius: "4px",
                              width: "100%",
                            }}
                          />
                          <span
                            className="form-validation-span"
                            style={{ color: "red", fontSize: "14px" }}
                          >
                            *Enter a valid phone number
                          </span>
                        </Grid>{" "}
                        <Grid item xs={12} md={12} lg={12}>
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label={
                              <Typography fontSize={{ xs: "9px", sm: "12px" }}>
                                <a
                                  style={{ fontSize: 14 }}
                                  href="https://aatrips.pk/terms&condition"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  By Booking/Issuing this Ticket I agree to
                                  AATrips Terms & Conditions
                                </a>
                              </Typography>
                            }
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                  <Box
                    className="booking-btn"
                    style={{
                      width: "100%",
                      display: "flex",
                      // justifyContent: "flex-end",
                    }}
                  >
                    {!isLoading ? (
                      <button
                        type="submit"
                        style={{
                          backgroundColor: "#ED5A2B",
                          color: "#fff",
                          fontSize: "14px",
                          width: "100%",
                          height: "40px",
                        }}
                      >
                        {flightData?.System === "GroupFare" ||
                          flightData?.InstantPayment
                          ? "Book And Hold"
                          : "Book & Hold"}
                      </button>
                    ) : (
                      <Box
                        style={{
                          backgroundColor: "#ED5A2B",
                          color: "#fff",
                          fontSize: "14px",
                          width: "100%",
                          height: "40px",
                          display: "flex"
                        }}
                      >
                        <CircularProgress
                          style={{
                            height: "20px",
                            width: "20px",
                            color: "#fff",
                            margin: "auto",
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ClickAwayListener>
  );
};

export default FlightUserInfo;
