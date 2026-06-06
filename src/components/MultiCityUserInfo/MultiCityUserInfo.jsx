import {
  Checkbox,
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
import { useLocation, useNavigate } from "react-router-dom";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import Swal from "sweetalert2";
import noFareFound from "../../images/undraw/undraw_not_found_re_bh2e.svg";
import serverError from "../../images/undraw/undraw_server_down_s-4-lk.svg";
import bookingSuccess from "../../images/undraw/undraw_travel_booking_re_6umu.svg";
import CountryList from "../Shared/CountryList";
import SearchableDropDown from "../Shared/SearchableDropDown/SearchableDropDown";

const MultiCityUserInfo = ({ userData, flightData, setIsLoaded }) => {
  //todo: location and navigation
  const location = useLocation();
  const navigate = useNavigate();
  //todo: end of location and navigation

  //todo: copy of userData
  const userDataCopy = JSON.parse(
    JSON.stringify({
      ...flightData,
      segments: [],
      segment: flightData?.segments?.flatMap((data) => data),
    })
  );
  //todo:end of copy of userData

  //todo: user information
  const user = secureLocalStorage.getItem("user-info");
  //todo: end of user information

  const [userPhoneNumber, setUserPhoneNumber] = useState(
    user?.user?.phone || "92"
  );
  const [email, setEmail] = useState(user?.user?.email || "");
  const { adultCount, childCount, infant } = userData;

  let lastObj = userData.flightData?.segments
    ?.flatMap((data) => data)
    .slice(-1);

  // todo: date validation
  function addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
  }
  let dateAfterSixMonths = addMonths(new Date(lastObj[0]?.arrivalTime), 6);
  let dateAfterSixMonthsFromToday = (() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 6);
    return d;
  })();
  let dateBeforeTwelveYears = addMonths(
    new Date(lastObj[0]?.arrivalTime),
    -144
  );
  let dateBeforeTwoYears = addMonths(new Date(lastObj[0]?.arrivalTime), -24);
  // todo:end

  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };

  //todo: select traveler section
  const [travellers, setTravellers] = useState([]);
  let agentId = user?.user?.agentId || "TFA1000";
  let subagentId = "";

  useEffect(() => {
    // let url = `https://api.flyjatt.com/v1/Traveller/index.php?allagentId=${agentId}`;
    let url = `${import.meta.env.REACT_APP_API_URL}/passenger/${agentId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let uniqueTravelers = [
          ...new Map(data?.map((item) => [item["passNo"], item])).values(),
        ];
        setTravellers(uniqueTravelers);
      });
  }, [agentId]);

  const [flightPassengerData, setFlightPassengerData] = useState({
    adult: [...new Array(adultCount)].map((item, index) => {
      return {
        type: "ADT",
        afName: "",
        alName: "",
        agender: "",
        adob: format(new Date(), "dd MMM yyyy"),
        apassNation: "",
        apassNo: "",
        apassEx: format(dateAfterSixMonthsFromToday, "dd MMM yyyy"),
        openDate: false,
        openPassExDate: false,
      };
    }),
    child: [...new Array(childCount)].map((item, index) => {
      return {
        type: "C09",
        cfName: "",
        clName: "",
        cgender: "",
        cdob: format(new Date(), "dd MMM yyyy"),
        cpassNation: "SA",
        cpassNo: "",
        cpassEx: format(dateAfterSixMonthsFromToday, "dd MMM yyyy"),
        openDate: false,
        openPassExDate: false,
      };
    }),
    infant: [...new Array(infant)].map((item, index) => {
      return {
        type: "INF",
        ifName: "",
        ilName: "",
        igender: "",
        idob: format(new Date(), "dd MMM yyyy"),
        ipassNation: "SA",
        ipassNo: "",
        ipassEx: format(dateAfterSixMonthsFromToday, "dd MMM yyyy"),
        openDate: false,
        openPassExDate: false,
      };
    }),
    adultCount: adultCount,
    childCount: childCount,
    infantCount: infant,
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

  let sabreOneway = {
    flightPassengerData: { ...flightPassengerData },
    saveBooking: { ...userDataCopy },
    system: userData.flightData.system,
    agentId: agentId,
    tripType: userData.tripType,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoaded(false);
    e.target.reset();

    let url = "demo";
    // let url = 'https://api.flyjatt.com/v1/AirBooking/index.php';
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: JSON.stringify(sabreOneway),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          Swal.fire({
            imageUrl: bookingSuccess,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Success",
            html: `Thank you so much for booking a flight ticket. Please issue your booking ticket within the time limit specified, otherwise your booking request will be automatically cancelled. For any query.Please contact us at <strong> support@aatrips.pk</strong> or Call <strong> +8801409965900 </strong>`,

            confirmButtonColor: "var(--p1)",
            confirmButtonText: "Ok",
          }).then(function () {
            setIsLoaded(true);
            navigate("/agent/congratulation", {
              state: {
                agentId,
                BookingId: `${data.BookingRef}`,
                tripType: "multicity",
              },
            });
          });
        } else {
          Swal.fire({
            imageUrl: noFareFound,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "No Fare Available",
            html: `For any query.Please contact us at or Call <strong></strong>`,
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Please Try Another Flights.",
          }).then(function () {
            setIsLoaded(true);
            navigate(-1);
          });
        }
      })

      .catch((err) => {
        Swal.fire({
          // icon: "error",
          imageUrl: serverError,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "Server Error",
          // html: `For any query.Please contact us at <strong>${siteConfig?.email}</strong> or Call <strong>${siteConfig?.phone}</strong>`,
          confirmButtonColor: "var(--primary-color)",
          confirmButtonText: "Please Try Another Flights.",
        }).then(function () {
          setIsLoaded(true);
          navigate(-1);
        });
      });
  };

  const handleAutoFill = (obj, index) => {
    const { dob, fName, gender, lName, passEx, passNation, passNo, type } = obj;
    if (obj.type === "ADT") {
      const tempFlightData = [...flightPassengerData.adult];
      if (index !== -1) {
        tempFlightData[index] = {
          ...tempFlightData[index],
          type,
          afName: fName,
          alName: lName,
          agender: gender,
          adob: new Date(dob).toLocaleDateString("sv"),
          apassNation: passNation,
          apassNo: passNo,
          apassEx: new Date(passEx).toLocaleDateString("sv"),
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
          cfName: fName,
          clName: lName,
          cgender: gender,
          cdob: new Date(dob).toLocaleDateString("sv"),
          cpassNation: passNation,
          cpassNo: passNo,
          cpassEx: new Date(passEx).toLocaleDateString("sv"),
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
          ifName: fName,
          ilName: lName,
          igender: gender,
          idob: new Date(dob).toLocaleDateString("sv"),
          ipassNation: passNation,
          ipassNo: passNo,
          ipassEx: new Date(passEx).toLocaleDateString("sv"),
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
  const isPassportExpired = (passEx) => {
    if (!passEx) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expDate = new Date(passEx);
    if (isNaN(expDate.getTime())) return false;
    return expDate < today;
  };
  const adultTravelers = travellers.filter((item) => item.type === "ADT" && !isPassportExpired(item.passEx));
  const childTravelers = travellers.filter((item) => item.type === "C09" && !isPassportExpired(item.passEx));
  const infantTravelers = travellers.filter((item) => item.type === "INF" && !isPassportExpired(item.passEx));
  const optionAdults = adultTravelers.map((x, index) => {
    if (x.type === "ADT") {
      return {
        value: x,
        label: `Name:${x.fName} ${x.lName} Type:${x.type} Gender:${x.gender} Nation:${x.passNation} Dob:${x.dob} PassNo:${x.passNo} PassEx${x.passEx}`,
      };
    }
  });
  const optionChilds = childTravelers.map((x, index) => {
    if (x.type === "C09") {
      return {
        value: x,
        label: `Name:${x.fName} ${x.lName} Type:${x.type} Gender:${x.gender} Nation:${x.passNation} Dob:${x.dob} PassNo:${x.passNo} PassEx${x.passEx}`,
      };
    }
  });
  const optionInfants = infantTravelers.map((x, index) => {
    if (x.type === "INF") {
      return {
        value: x,
        label: `Name:${x.fName} ${x.lName} Type:${x.type} Gender:${x.gender} Nation:${x.passNation} Dob:${x.dob} PassNo:${x.passNo} PassEx${x.passEx}`,
      };
    }
  });
  //todo: end of add traveler states
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box my={3} sx={{ position: "relative" }}>
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
              <Typography
                sx={{
                  fontSize: "22px",
                  color: "var(--secondary-color)",
                  fontWeight: 500,
                  my: 2,
                }}
              >
                Passenger Details
              </Typography>

              <form onSubmit={handleSubmit}>
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
                                  bgcolor: "var(--btn-bg)",
                                  borderRadius: "20px",
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
                            <label htmlFor="afName">
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
                              name="afName"
                              id="afName"
                              value={item.afName}
                              placeholder="Given Name / First Name"
                              pattern="[a-zA-Z\s]+"
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
                            <label htmlFor="alName">Surname / Last Name</label>
                            <input
                              required
                              focused={focused.toString()}
                              onBlur={handleFocus}
                              onChange={(e) =>
                                handleOnChange(e, item.type, index)
                              }
                              type="text"
                              name="alName"
                              id="alName"
                              pattern="[a-zA-Z\s]+"
                              value={item.alName}
                              placeholder="Surname / Last Name"
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
                            <label htmlFor="agender">Select Gender</label>
                            <select
                              className="user-info-select"
                              required
                              name="agender"
                              id="agender"
                              autoFocus="true"
                              value={item.agender}
                              onChange={(e) =>
                                handleOnChange(e, item.type, index)
                              }
                            >
                              <option value="">Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            md={6}
                            lg={4}
                            style={{ position: "relative" }}
                          >
                            <label htmlFor="adob">Date of Birth</label>

                            <input
                              required
                              type="text"
                              name="adob"
                              id="adob"
                              value={format(new Date(item.adob), "dd MMM yyyy")}
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
                                    adob: new Date(date).toLocaleDateString(
                                      "sv"
                                    ),
                                    openDate: false,
                                  };
                                  setFlightPassengerData({
                                    ...flightPassengerData,
                                    adult: tempFlightData,
                                  });
                                }}
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

                          {userData?.flightData?.docsrequire ? (
                            <>
                              <Grid item xs={12} md={6} lg={4}>
                                <label htmlFor="apassNation">
                                  Select Nationality
                                </label>
                                <select
                                  className="user-info-select"
                                  required
                                  name="apassNation"
                                  id="apassNation"
                                  selected={item.apassNation}
                                  onChange={(e) =>
                                    handleOnChange(e, item.type, index)
                                  }
                                  value={item.apassNation}
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
                                {/* <CountryDropdown
                                  id="UNIQUE_ID"
                                  name="apassNation"
                                  preferredCountries={["bd", "in"]}
                                  value={item.apassNation}
                                  handleChange={(e) =>
                                    handleOnChange(e, item.type, index)
                                  }
                                /> */}
                              </Grid>
                              <Grid item xs={12} md={6} lg={4}>
                                <label htmlFor="apassNo">Passport Number</label>
                                <input
                                  // required
                                  focused={focused.toString()}
                                  onBlur={handleFocus}
                                  type="text"
                                  name="apassNo"
                                  id="apassNo"
                                  placeholder="xx-xxxxxxx"
                                  pattern="^[a-zA-Z0-9]*$"
                                  value={item.apassNo}
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
                                  *Only Uppercase and number
                                </span>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                md={6}
                                lg={4}
                                sx={{ position: "relative" }}
                              >
                                <label htmlFor="apassEx">
                                  Passport Expire Date
                                </label>
                                {/* <input
                                    required
                                    type="date"
                                    name="apassEx"
                                    id="apassEx"
                                    value={item.apassEx}
                                    min={`${new Date(
                                      dateAfterSixMonths
                                    ).toLocaleDateString("sv")}"}
                                    onChange={(e) =>
                                      handleOnChange(e, item.type, index)
                                    }
                                  /> */}
                                <input
                                  // required
                                  type="text"
                                  name="apassEx"
                                  id="apassEx"
                                  value={format(
                                    new Date(item.apassEx),
                                    "dd MMM yyyy"
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
                                        apassEx: new Date(
                                          date
                                        ).toLocaleDateString("sv"),
                                        openPassExDate: false,
                                      };
                                      setFlightPassengerData({
                                        ...flightPassengerData,
                                        adult: tempFlightData,
                                      });
                                    }}
                                    months={1}
                                    minDate={new Date()}
                                    className="user-info-calendar"
                                  />
                                )}
                              </Grid>
                            </>
                          ) : null}
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
                              bgcolor: "var(--btn-bg)",
                              borderRadius: "20px",
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
                      <Grid container spacing={2} sx={{ padding: "26px 0px" }}>
                        {/*//todo: auto fil travelers */}

                        <Grid item xs={12} md={6} lg={4}>
                          <label htmlFor="cfName">
                            Given Name / First Name
                          </label>
                          <input
                            required
                            focused={focused.toString()}
                            onBlur={handleFocus}
                            type="text"
                            name="cfName"
                            id="cfName"
                            value={item.cfName}
                            placeholder="Given Name / First Name"
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
                          <label htmlFor="clName">Surname / Last Name</label>
                          <input
                            required
                            focused={focused.toString()}
                            onBlur={handleFocus}
                            type="text"
                            name="clName"
                            id="clName"
                            pattern="[a-zA-Z\s]+"
                            value={item.clName}
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
                          <label htmlFor="cgender">Select Gender</label>
                          <select
                            className="user-info-select"
                            required
                            onBlur={handleFocus}
                            onChange={(e) =>
                              handleOnChange(e, item.type, index)
                            }
                            name="cgender"
                            id="cgender"
                            value={item.cgender}
                          >
                            <option value="">Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          md={6}
                          lg={4}
                          style={{ position: "relative" }}
                        >
                          <label htmlFor="cdob">Date of Birth</label>

                          <input
                            required
                            type="text"
                            id="cdob"
                            value={format(new Date(item.cdob), "dd MMM yyyy")}
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
                                  cdob: new Date(date).toLocaleDateString("sv"),
                                  openDate: false,
                                };
                                setFlightPassengerData({
                                  ...flightPassengerData,
                                  child: tempFlightData,
                                });
                              }}
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
                        {userData.flightData.docsrequire ? (
                          <>
                            <Grid item xs={12} md={6} lg={4}>
                              <label htmlFor="cpassNation">
                                Select Nationality
                              </label>
                              <select
                                className="user-info-select"
                                required
                                name="cpassNation"
                                id="cpassNation"
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                                value={item.cpassNation}
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

                            <Grid item xs={12} md={6} lg={4}>
                              <label htmlFor="cpassNo">Passport Number</label>
                              <input
                                // required
                                onBlur={handleFocus}
                                focused={focused.toString()}
                                onChange={(e) =>
                                  handleOnChange(e, item.type, index)
                                }
                                type="text"
                                name="cpassNo"
                                id="cpassNo"
                                pattern="^[a-zA-Z0-9]*$"
                                placeholder="xx-xxxxxxx"
                                value={item.cpassNo}
                                style={{ textTransform: "uppercase" }}
                              />
                              <span
                                className="form-validation-span"
                                style={{ color: "red", fontSize: "14px" }}
                              >
                                *Only Uppercase and number
                              </span>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              md={6}
                              lg={4}
                              sx={{ position: "relative" }}
                            >
                              <label htmlFor="cpassEx">
                                Passport Expire Date
                              </label>

                              <input
                                // required
                                type="text"
                                name="cpassEx"
                                id="cpassEx"
                                value={format(
                                  new Date(item.cpassEx),
                                  "dd MMM yyyy"
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
                                      cpassEx: new Date(
                                        date
                                      ).toLocaleDateString("sv"),
                                      openPassExDate: false,
                                    };
                                    setFlightPassengerData({
                                      ...flightPassengerData,
                                      child: tempFlightData,
                                    });
                                  }}
                                  months={1}
                                  className="user-info-calendar"
                                  minDate={new Date()}
                                />
                              )}
                            </Grid>
                          </>
                        ) : null}
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
                              bgcolor: "var(--btn-bg)",
                              borderRadius: "20px",
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
                      <Grid container spacing={2} sx={{ padding: "26px 0px" }}>
                        {/*//todo: auto fil travelers */}

                        <Grid item xs={12} md={6} lg={4}>
                          <label htmlFor="ifName">
                            Given Name / First Name
                          </label>
                          <input
                            required
                            focused={focused.toString()}
                            onBlur={handleFocus}
                            type="text"
                            name="ifName"
                            id="ifName"
                            value={item.ifName}
                            placeholder="Given Name / First Name"
                            pattern="[a-zA-Z\s]+"
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
                          <label htmlFor="ilName">Surname / Last Name</label>
                          <input
                            required
                            focused={focused.toString()}
                            onBlur={handleFocus}
                            type="text"
                            name="ilName"
                            id="ilName"
                            pattern="[a-zA-Z\s]+"
                            value={item.ilName}
                            placeholder="Surname / Last Name"
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
                          <label htmlFor="igender">Select Gender</label>
                          <select
                            className="user-info-select"
                            required
                            name="igender"
                            id="igender"
                            onChange={(e) =>
                              handleOnChange(e, item.type, index)
                            }
                            value={item.igender}
                          >
                            <option value="">Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          md={6}
                          lg={4}
                          style={{ position: "relative" }}
                        >
                          <label htmlFor="idob">Date of Birth</label>

                          <input
                            required
                            type="text"
                            id="idob"
                            value={format(new Date(item.idob), "dd MMM yyyy")}
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
                                  idob: new Date(date).toLocaleDateString("sv"),
                                  openDate: false,
                                };
                                setFlightPassengerData({
                                  ...flightPassengerData,
                                  infant: tempFlightData,
                                });
                              }}
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
                        {userData.flightData.docsrequire ? (
                          <>
                            <Grid item xs={12} md={6} lg={4}>
                              <label htmlFor="ipassNation">
                                Select Nationality
                              </label>
                              <select
                                className="user-info-select"
                                required
                                name="ipassNation"
                                id="ipassNation"
                                value={item.ipassNation}
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

                            <Grid item xs={12} md={6} lg={4}>
                              <label htmlFor="ipassNo">Passport Number</label>
                              <input
                                // required
                                focused={focused.toString()}
                                onBlur={handleFocus}
                                type="text"
                                name="ipassNo"
                                id="ipassNo"
                                pattern="^[a-zA-Z0-9]*$"
                                placeholder="xx-xxxxxxx"
                                value={item.ipassNo}
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
                            <Grid
                              item
                              xs={12}
                              md={6}
                              lg={4}
                              sx={{ position: "relative" }}
                            >
                              <label htmlFor="ipassEx">
                                Passport Expire Date
                              </label>

                              <input
                                // required
                                type="text"
                                id="ipassEx"
                                value={format(
                                  new Date(item.ipassEx),
                                  "dd MMM yyyy"
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
                                      ipassEx: new Date(
                                        date
                                      ).toLocaleDateString("sv"),
                                      openPassExDate: false,
                                    };
                                    setFlightPassengerData({
                                      ...flightPassengerData,
                                      infant: tempFlightData,
                                    });
                                  }}
                                  months={1}
                                  className="user-info-calendar"
                                  minDate={new Date()}
                                />
                              )}
                            </Grid>
                          </>
                        ) : null}
                      </Grid>
                    </Box>
                  </Box>
                ))}
                {/* infant details end  */}

                <Box className="conatct-detail">
                  <p>
                    Contact Details (Airlines will send updates to this contact)
                  </p>
                  <Box className="adult-info" sx={{ mt: 2 }}>
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
                          placeholder="example@example.com"
                          onChange={(e) => {
                            setFlightPassengerData({
                              ...flightPassengerData,
                              email: e.target.value,
                            });
                            setEmail(e.target.value);
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
                          required
                          country={"pk"}
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
                          style={{
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
                          label="By Booking/Issuing this Ticket I agree to Terms & Conditions"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box
                    className="booking-btn"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "var(--primary-color)",
                        color: "#fff",
                        fontSize: "14px",
                        height: "40px",
                      }}
                    >
                      Book & Hold
                    </button>
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

export default MultiCityUserInfo;
