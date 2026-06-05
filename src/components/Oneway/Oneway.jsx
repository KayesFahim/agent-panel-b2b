import {
  Box,
  ClickAwayListener,
  Grid,
  Typography,
  Button,
  Collapse,
  Tooltip,
  Grow,
} from "@mui/material";
import React, { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import { useEffect } from "react";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import GroupsIcon from "@mui/icons-material/Groups";
import flightData from "../flightData";
import TelegramIcon from "@mui/icons-material/Telegram";
import EventSeatIcon from "@mui/icons-material/EventSeat";
// import { BiSolidPlaneAlt } from "react-icons/bi";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { WrapText } from "@mui/icons-material";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import zIndex from "@mui/material/styles/zIndex";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto #003566",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "var(--primary-color)",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "var(--secondary-color)",
  },
});

// Inspired by blueprintjs
function BpRadio(props) {
  return (
    <Radio
      sx={{
        "&:hover": {
          bgcolor: "transparent",
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

const Oneway = ({
  tripType,
  iconColor,
  bgColor,
  borderColor,
  faddress,
  setfaddress,
  toAddress,
  setToAddress,
  fromSearchText,
  setFromSearchText,
  fromSendData,
  setFromSendData,
  toSendData,
  setToSendData,
  toSearchText,
  setToSearchText,
  departureDate,
  setDepartureDate,
  setValue,
  adultCount,
  setAdultCount,
  childCount,
  setChildCount,
  infant,
  setInfant,
  result,
  setResult,
  className,
  handleClassName,
  travelDate,
  setTravelDate,
  to,
  setTo,
  from,
  setFrom,
  directFlightOnly,
  changeFrom,
  setChangeFrom,
  handleSearch,
}) => {
  const data = flightData; // json data from flight Data

  const initialData = [
    {
      code: "RUH",
      name: "King Khaled Intl Airport",
      Address: "Riyadh,SAUDI ARABIA",
    },
    { code: "JED", name: "Jeddah Intl ", Address: "Jeddah,SAUDI ARABIA" },
    {
      code: "ABT",
      name: "Al Aqiq Airport",
      Address: "Al Baha,SAUDI ARABIA",
    },
    {
      code: "AHB",
      name: "Abha Intl Airport",
      Address: "Abha,SAUDI ARABIA",
    },
    { code: "AJF", name: "JOUF Airport", Address: "Al Jouf,SAUDI ARABIA" },
    {
      code: "AQI",
      name: "Qaisumah Intl Airport",
      Address: "Qaisumah,SAUDI ARABIA",
    },
    { code: "DHA", name: "Dhahran Intl ", Address: "Dhahran,SAUDI ARABIA" },
    {
      code: "DMM",
      name: "King Fahad Intl Airport",
      Address: "Dammam,SAUDI ARABIA",
    },
    {
      code: "DWD",
      name: "Dawadmi Intl Airport",
      Address: "Dawadmi Intl Airport,SAUDI ARABIA",
    },
  ];
  //todo: users section
  const [users, setUsers] = useState("");
  useEffect(() => {
    const users = secureLocalStorage.getItem("user-info");
    if (users) {
      setUsers(users);
    }
  }, []);
  // todo: end of users section
  //todo: is Click state
  const [click, setClick] = useState(false);
  //todo: end of click state
  const [fromSuggest, setFromSuggest] = useState(initialData);
  const [toSuggest, setToSuggest] = useState(initialData);

  const [open, setOpen] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openReturnDate, setOpenReturnDate] = useState(false);

  const navigate = useNavigate();

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  setResult(adultCount + childCount + infant);
  const handleClickAway = () => {
    setOpenFrom(false);
    setOpenTo(false);
    setOpenDate(false);
    setOpenReturnDate(false);
    setOpen(false);
  };

  const formOnChange = (e) => {
    setOpen(false);
    const searchvalue = e.target.value;

    if (searchvalue.length > 2) {
      const suggestion = data.filter((item) =>
        item.code.toLowerCase().includes(searchvalue.toLowerCase())
      );
      setFromSuggest(suggestion);
      if (suggestion.length === 0) {
        const suggestion = data.filter(
          (item) =>
            item.code.toLowerCase().includes(searchvalue.toLowerCase()) ||
            item.Address.toLowerCase().includes(searchvalue.toLowerCase())
        );
        setFromSuggest(suggestion);
      }
    } else {
      setFromSuggest(initialData);
    }
  };

  const fromSuggestedText = (name, code, address) => {
    setFromSendData(code);
    setFromSearchText(`${name} [${code}]`);
    setFromSuggest([]);
    setfaddress(address);
    setOpen(false);
    setOpenFrom(false);
    setOpenTo(true);
  };

  const toOnChange = (e) => {
    const searchvalue = e.target.value;
    if (searchvalue.length > 2) {
      const suggestion = data.filter((item) =>
        item.code.toLowerCase().includes(searchvalue.toLowerCase())
      );
      setToSuggest(suggestion);
      if (suggestion.length === 0) {
        const suggestion = data.filter(
          (item) =>
            item.code.toLowerCase().includes(searchvalue.toLowerCase()) ||
            item.Address.toLowerCase().includes(searchvalue.toLowerCase())
        );
        setToSuggest(suggestion);
      }
    } else {
      setToSuggest(initialData);
    }
  };
  const toSuggestedText = (name, code, address) => {
    setToSendData(code);
    setToSearchText(`${name} [${code}]`);
    setToSuggest([]);
    setToAddress(address);
    setOpenTo(false);
    setOpenReturnDate(false);
    setTimeout(() => setOpenDate(true), 200);
  };

  const fromGetSuggetion = () => {
    return (
      <Box
        style={{
          height: "fit-content",
          position: "relative",
          width: "100%",
          zIndex: "100",
        }}
      >
        <Box
          sx={{
            maxHeight: "230px",
            overflowY: "auto",
            background: "#fff",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            "&::-webkit-scrollbar": { width: "5px" },
          }}
        >
          {fromSuggest.length !== 0 ? (
            fromSuggest.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    paddingLeft: "20px",
                    paddingRight: "10px",
                    backgroundColor: "var(--white)",
                    transition: "all .3s ease-in-out",
                    "&:hover": {
                      backgroundColor: "rgba(26, 58, 110, 0.08)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      margin: "0px 0px",
                      padding: "5px 0px",
                      cursor: "pointer",
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                    onClick={() => {
                      fromSuggestedText(
                        ` ${item.name}`,
                        ` ${item.code} `,
                        `${item.Address}`
                      );
                    }} //suggest to display name select with multiple data pass parameter
                  >
                    <Box>
                      <Typography
                        className="address"
                        sx={{
                          fontSize: "12px",
                          color: "var(--primary-color)",
                          display: "block",
                          textAlign: "left",
                          fontWeight: "650",
                        }}
                      >
                        {item.Address}
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "11px",
                          display: "block",
                          textAlign: "left",
                          color: "#64748b",
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "13px",
                          display: "block",
                          textAlign: "left",
                          paddingRight: "5px",
                          color: "var(--primary-color)",
                          fontWeight: "700",
                        }}
                      >
                        {item.code}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Box sx={{ p: 2 }}>
              <Typography
                variant="subtitle2"
                style={{
                  color: "#DC143C",
                  fontWeight: "bold",
                }}
              >
                Not found
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  const toGetSuggetion = () => {
    return (
      <Box
        style={{
          height: "fit-content",
          position: "relative",
          width: "100%",
          zIndex: "100",
        }}
      >
        <Box
          sx={{
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            maxHeight: "230px",
            overflowY: "auto",
            background: "#fff",
            "&::-webkit-scrollbar": { width: "5px" },
          }}
        >
          {toSuggest.length !== 0 ? (
            toSuggest.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    paddingLeft: "20px",
                    paddingRight: "5px",
                    backgroundColor: "var(--white)",
                    transition: "all .3s ease-in-out",
                    "&:hover": {
                      backgroundColor: "rgba(26, 58, 110, 0.08)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      margin: "0px 0px",
                      padding: "5px 0px",
                      cursor: "pointer",
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                    onClick={() =>
                      toSuggestedText(
                        ` ${item.name}`,
                        `${item.code}`,
                        `${item.Address}`
                      )
                    } //suggest to display name select with multiple data pass parameter
                  >
                    <Box>
                      <Typography
                        className="address"
                        sx={{
                          fontSize: "12px",
                          color: "var(--primary-color)",
                          display: "block",
                          textAlign: "left",
                          fontWeight: "650",
                        }}
                      >
                        {item.Address}
                      </Typography>
                      <span
                        style={{
                          fontSize: "11px",
                          display: "block",
                          color: "#64748b",
                          textAlign: "left",
                        }}
                      >
                        {item.name}
                      </span>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          paddingRight: "10px",
                          display: "block",
                          textAlign: "left",
                          color: "var(--primary-color)",
                          fontWeight: "700",
                        }}
                      >
                        {item.code}
                      </span>
                    </Box>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Box sx={{ p: 2 }}>
              <Typography
                variant="subtitle2"
                style={{
                  color: "#DC143C",
                  fontWeight: "bold",
                }}
              >
                Not found
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    );
  };
  // SearchingField End

  // Opens the dialog when the user clicks.
  const handleClickOpen = () => {
    setOpen((prev) => !prev);
    setOpenFrom(false);
    setOpenTo(false);
    setOpenDate(false);
    setOpenReturnDate(false);
  };

  // Closes the child process.
  const handleClose = () => {
    setOpen(false);
    setOpenFrom(false);
    setOpenTo(false);
    setOpenDate(false);
    setOpenReturnDate(false);
    setResult(adultCount + childCount + infant);
  };

  // Sets the number of children.
  function adultInclement(e) {
    e.preventDefault();
    if (adultCount < 9 - (childCount + infant)) {
      setAdultCount(adultCount + 1);
    }
  }

  // Decrement the count of children.
  function adultDecrement(e) {
    e.preventDefault();
    if (adultCount > 1) {
      setAdultCount(adultCount - 1);
      if (infant === adultCount) {
        if (infant > 1) {
          setInfant(infant - 1);
        }
      }
    }
  }

  function childInclement(e) {
    e.preventDefault();
    if (childCount < 9 - (adultCount + infant)) {
      setChildCount(childCount + 1);
    }
  }

  function childDecrement(e) {
    e.preventDefault();
    if (childCount > 0) {
      setChildCount(childCount - 1);
    }
  }

  // Increment the default value if the value is not a child.
  function infantIncrement(e) {
    e.preventDefault();
    if (infant < 9 - (adultCount + childCount)) {
      if (infant < adultCount) {
        setInfant(infant + 1);
      }
    }
  }

  // Decrement the infant by 1.
  function infantDecrement(e) {
    e.preventDefault();
    if (infant > 0) {
      setInfant(infant - 1);
    }
  }
  //todo: form Submit function
  // async function handleSearch(e) {
  //   e.preventDefault();
  //   // todo: setClick to true to start loader
  //   setClick(true);
  //   secureLocalStorage.setItem("search-data", {
  //     faddress,
  //     toAddress,
  //     fromSearchText,
  //     toSearchText,
  //     departureDate: format(new Date(from), "dd MMM yy"),
  //     adultCount,
  //     childCount,
  //     infant,
  //     tripType,
  //     fromSendData,
  //     toSendData,
  //     className,
  //     directFlightOnly,
  //   });

  //   if (click === false) {
  //     //todo: setClick false to stop loading
  //     setClick(false);
  //     navigate("/agent/searchresult", {
  //       state: {
  //         faddress,
  //         toAddress,
  //         fromSearchText,
  //         toSearchText,
  //         departureDate: format(new Date(from), "dd MMM yy"),
  //         adultCount,
  //         childCount,
  //         infant,
  //         tripType,
  //         fromSendData,
  //         toSendData,
  //         className,
  //         directFlightOnly,
  //       },
  //     });
  //   } else {
  //     Swal.fire({
  //       imageUrl: ServerDown,
  //       imageWidth: 400,
  //       imageHeight: 200,
  //       imageAlt: "Custom image",
  //       html: `For any query.Please contact us at <strong> support@aatrips.pk</strong> or Call <strong> +8801409965900 </strong>`,
  //       confirmButtonText: "Search Again...",
  //       confirmButtonColor: "var(--primary-color)",
  //     }).then(() => {
  //       setClick(false);
  //       navigate(0);
  //     });
  //   }
  // }
  //todo: end of form Submit section
  const handleSelect = (date) => {
    setFrom(date);
    setChangeFrom(true);
    setOpenDate(false);
    if (tripType === "oneway") {
      setTimeout(() => setOpen(true), 200);
    }
    if (tripType === "return") {
      setTimeout(() => setOpenReturnDate(true), 200);
    }
  };
  const handleSelectTo = (date) => {
    setTo(date);
    setChangeFrom(true);
    setOpenReturnDate(false);
    setTimeout(() => setOpen(true), 200);
  };

  {
    /* Swap */
  }
  const [swap, setSwap] = useState(false);
  const togglerSwap = () => {
    setSwap((prevSwap) => !prevSwap);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box style={{ position: "relative" }}>
        <Grid
          sx={{
            height: "fit-content",
            width: "100%",
          }}
          container
          spacing={1}
          alignItems="stretch"
        >
          {/* //todo destination section */}
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={2.5}
            style={{
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                height: "100%",
                minHeight: "80px",
                backgroundColor: "var(--white)",
                borderRadius: "8px",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                p: 1.5,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  borderColor: "var(--primary-color)",
                  boxShadow: "0 4px 12px rgba(26,58,110,0.08)",
                }
              }}
              onClick={() => {
                setOpenFrom((prev) => !prev);
                setOpenTo(false);
                setOpenDate(false);
                setOpen(false);
                setOpenReturnDate(false);
              }}
            >
              <FlightTakeoffIcon
                sx={{
                  color: "var(--primary-color)",
                  mr: 1.5,
                  fontSize: "24px",
                }}
              />
              <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
                <Typography
                  sx={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Departure From
                </Typography>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: (swap ? toSearchText : fromSearchText) ? "var(--primary-color)" : "#94a3b8",
                    mt: 0.2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {(swap ? toSearchText : fromSearchText) || ""}
                </Typography>
              </Box>
            </Box>

            <SwapHorizontalCircleIcon
              onClick={togglerSwap}
              sx={{
                bgcolor: "white",
                color: "#122E55",
                display: "block",
                position: "absolute",
                right: { lg: 0, md: "auto", sm: "auto", xs: "auto" },
                left: { lg: "auto", md: "50%", sm: "50%", xs: "50%" },
                top: { lg: "50%", md: "auto", sm: "auto", xs: "auto" },
                bottom: { lg: "auto", md: 0, sm: 0, xs: 0 },
                transform: {
                  lg: "translate(50%, -50%)",
                  md: "translate(-50%, 50%) rotate(90deg)",
                  sm: "translate(-50%, 50%) rotate(90deg)",
                  xs: "translate(-50%, 50%) rotate(90deg)",
                },
                borderRadius: "50%",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                zIndex: 10,
                cursor: "pointer",
                fontSize: "28px",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: {
                    lg: "translate(50%, -50%) rotate(180deg) scale(1.15)",
                    md: "translate(-50%, 50%) rotate(270deg) scale(1.15)",
                    sm: "translate(-50%, 50%) rotate(270deg) scale(1.15)",
                    xs: "translate(-50%, 50%) rotate(270deg) scale(1.15)",
                  },
                  color: "var(--primary-color)",
                }
              }}
            />
            {openFrom && (
              <Box
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  right: "0",
                  width: "100%",
                  backgroundColor: "var(--white)",
                  height: "fit-content",
                  borderRadius: "0 0 10px 10px",
                  zIndex: 9999,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  padding: "6px 6px 0px",
                  overflow: "hidden",
                }}
              >
                <Typography
                  sx={{
                    px: 1.5,
                    pt: 1,
                    pb: 0.5,
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--primary-color)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Departure From
                </Typography>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 10,
                    borderRadius: "6px",
                    overflow: "hidden",
                    border: "1px solid rgba(0, 0, 0, 0.12)",
                    margin: "4px",
                  }}
                  backgroundColor="#fff"
                >
                  <input
                    autoComplete="off"
                    autoFocus
                    onChange={formOnChange}
                    placeholder="Search airport..."
                    className="customPlaceholder"
                    style={{
                      color: "#122E55",
                      fontWeight: 500,
                      paddingLeft: "20px",
                      width: "100%",
                      height: "40px",
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      fontSize: "13px",
                    }}
                  />
                </Box>
                <Box>{fromGetSuggetion()}</Box>
              </Box>
            )}
          </Grid>
          {/* //todo: Arrival City section */}
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={2.5}
            style={{
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                height: "100%",
                minHeight: "80px",
                backgroundColor: "var(--white)",
                borderRadius: "8px",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                p: 1.5,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  borderColor: "var(--primary-color)",
                  boxShadow: "0 4px 12px rgba(26,58,110,0.08)",
                }
              }}
              onClick={() => {
                setOpenFrom(false);
                setOpenTo((prev) => !prev);
                setOpenDate(false);
                setOpen(false);
                setOpenReturnDate(false);
              }}
            >
              <FlightLandIcon
                sx={{
                  color: "var(--primary-color)",
                  mr: 1.5,
                  fontSize: "24px",
                }}
              />
              <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
                <Typography
                  sx={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Arrival To
                </Typography>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: (swap ? fromSearchText : toSearchText) ? "var(--primary-color)" : "#94a3b8",
                    mt: 0.2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {(swap ? fromSearchText : toSearchText) || ""}
                </Typography>
              </Box>
            </Box>
            {openTo && (
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  width: "100%",
                  backgroundColor: "var(--white)",
                  height: "fit-content",
                  borderRadius: "0 0 10px 10px",
                  zIndex: 9999,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  padding: "6px 6px 0px",
                  overflow: "hidden",
                }}
              >
                <Typography
                  sx={{
                    px: 1.5,
                    pt: 1,
                    pb: 0.5,
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--primary-color)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Arrival To
                </Typography>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "6px",
                    overflow: "hidden",
                    border: "1px solid rgba(0, 0, 0, 0.12)",
                    margin: "4px",
                  }}
                  backgroundColor="var(--white)"
                >
                  <input
                    autoComplete="off"
                    autoFocus
                    onChange={toOnChange}
                    className="customPlaceholder"
                    placeholder="Search airport..."
                    style={{
                      color: "#122E55",
                      fontWeight: 500,
                      paddingLeft: "20px",
                      width: "100%",
                      height: "40px",
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      fontSize: "13px",
                    }}
                  />
                </Box>
                <Box>{toGetSuggetion()}</Box>
              </Box>
            )}
          </Grid>
          {/* //todo:Travel Date */}
          <Grid
            item
            xs={12}
            lg={3.5}
            sx={{
              position: "relative",
              mt: { xs: 1, md: 1.5, lg: 0 },
            }}
          >
            <Box
              sx={{
                background: "var(--white)",
                width: "100%",
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                height: "100%",
                minHeight: "80px",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  borderColor: "var(--primary-color)",
                  boxShadow: "0 4px 12px rgba(26,58,110,0.08)",
                }
              }}
            >
              <Box
                sx={{
                  borderRight: "1px solid rgba(0,0,0,0.08)",
                  width: "50%",
                  height: "100%",
                  p: 1.5,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
                onClick={() => {
                  setTimeout(() => setOpenDate((prev) => !prev), 200);
                  setOpenFrom(false);
                  setOpenTo(false);
                  setOpen(false);
                  setOpenReturnDate(false);
                }}
              >
                <Typography
                  sx={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Departure Date
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mt: 0.5 }}
                >
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 700,
                    }}
                  >
                    {format(new Date(from), "dd MMM yy")}
                  </Typography>
                  <CalendarMonthIcon
                    sx={{
                      fontSize: 18,
                      color: "var(--primary-color)",
                    }}
                  />
                </Stack>
              </Box>
              <Box
                sx={{
                  width: "50%",
                  height: "100%",
                  p: 1.5,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
                onClick={() => {
                  setOpenDate(false);
                  setOpenFrom(false);
                  setOpenTo(false);
                  setOpen(false);
                  setTimeout(() => setOpenReturnDate((prev) => !prev), 200);
                  setValue("return");
                }}
              >
                <Typography
                  sx={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Return Date
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mt: 0.5 }}
                >
                  <Typography
                    sx={{
                      color: tripType === "oneway" ? "#94a3b8" : "var(--primary-color)",
                      fontSize: "13px",
                      fontWeight: 700,
                    }}
                  >
                    {tripType === "oneway"
                      ? "Add Return"
                      : format(new Date(to), "dd MMM yy")}
                  </Typography>
                  <CalendarMonthIcon
                    sx={{
                      fontSize: 18,
                      color: tripType === "oneway" ? "#cbd5e1" : "var(--primary-color)",
                    }}
                  />
                </Stack>
              </Box>
              <Grow in={openDate}>
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: "100%",
                    zIndex: 9999,
                    mt: 0.5,
                  }}
                >
                  <Calendar
                    color="#112e55"
                    date={new Date(from)}
                    onChange={handleSelect}
                    months={1}
                    minDate={new Date()}
                    className={"dashboard-calendar"}
                  />
                </Box>
              </Grow>
              <Grow in={openReturnDate}>
                <Box
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: "100%",
                    zIndex: 9999,
                    mt: 0.5,
                  }}
                >
                  <Calendar
                    color="#112e55"
                    date={to}
                    onChange={handleSelectTo}
                    months={1}
                    minDate={new Date(from)}
                    className={"dashboard-calendar"}
                  />
                </Box>
              </Grow>
            </Box>
          </Grid>
          {/* //todo: Passenger Box section */}
          <Grid
            item
            xs={12}
            lg={2}
            sx={{
              position: "relative",
              mt: { xs: 1, md: 1.5, lg: 0 },
              zIndex: 200,
            }}
          >
            <Box
              sx={{
                position: "relative",
                height: "100%",
                minHeight: "80px",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  minHeight: "80px",
                  backgroundColor: "var(--white)",
                  borderRadius: "8px",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                  p: 1.5,
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    borderColor: "var(--primary-color)",
                    boxShadow: "0 4px 12px rgba(26,58,110,0.08)",
                  }
                }}
                onClick={handleClickOpen}
              >
                <EventSeatIcon sx={{ color: "var(--primary-color)", mr: 1.5, fontSize: "24px" }} />
                <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
                  <Typography
                    sx={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Passengers & Class
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--primary-color)",
                      mt: 0.2,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {result} Pass, {className === "S" ? "Premium Econ" : className === "C" ? "Business" : className === "J" ? "Prem Bus" : className === "P" ? "First Class" : "Economy"}
                  </Typography>
                </Box>
              </Box>
              {open && (
                <Box
                  sx={{
                    position: "absolute",
                    top: { lg: "110%", md: "110%", sm: "100%", xs: "100%" },
                    right: "0px",
                    zIndex: 100000,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "var(--white)",
                      padding: "20px",
                      overflow: "hidden",
                      width: "320px",
                      borderRadius: "10px",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                      border: "1px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    <Box>
                      <Box>
                        <Typography
                          style={{
                            textAlign: "left",
                            marginBottom: "10px",
                            color: "var(--primary-color)",
                            fontFamily: "poppins",
                            fontWeight: "600",
                            fontSize: "14px",
                          }}
                        >
                          Passenger
                        </Typography>
                      </Box>
                      <Box>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Box
                            sx={{
                              backgroundColor: "var(--primary-color)",
                              color: "var(--white)",
                              borderRadius: "4px",
                              width: "26px",
                              height: "26px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              fontWeight: 700,
                            }}
                            onClick={adultDecrement}
                          >
                            -
                          </Box>
                          <Box
                            sx={{
                              color: "var(--primary-color)",
                              borderRadius: "4px",
                              width: "20px",
                              textAlign: "center",
                              fontWeight: "600",
                            }}
                          >
                            {adultCount}
                          </Box>
                          <Box
                            onClick={adultInclement}
                            sx={{
                              backgroundColor: "var(--primary-color)",
                              color: "var(--white)",
                              borderRadius: "4px",
                              width: "26px",
                              height: "26px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              fontWeight: 700,
                            }}
                          >
                            +
                          </Box>

                          <Typography
                            sx={{ color: "#475569", fontSize: "13px", fontWeight: 500 }}
                          >
                            Adult (12+ Years)
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1.5} mt={1.5} alignItems="center">
                          <Box
                            sx={{
                              backgroundColor: "var(--primary-color)",
                              color: "var(--white)",
                              borderRadius: "4px",
                              width: "26px",
                              height: "26px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              fontWeight: 700,
                            }}
                            onClick={childDecrement}
                          >
                            -
                          </Box>
                          <Box
                            sx={{
                              color: "var(--primary-color)",
                              borderRadius: "4px",
                              width: "20px",
                              textAlign: "center",
                              fontWeight: "600",
                            }}
                          >
                            {childCount}
                          </Box>
                          <Box
                            onClick={childInclement}
                            sx={{
                              backgroundColor: "var(--primary-color)",
                              color: "var(--white)",
                              borderRadius: "4px",
                              width: "26px",
                              height: "26px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              fontWeight: 700,
                            }}
                          >
                            +
                          </Box>

                          <Typography
                            sx={{ color: "#475569", fontSize: "13px", fontWeight: 500 }}
                          >
                            Children (2 - 11 years)
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1.5} mt={1.5} alignItems="center">
                          <Box
                            sx={{
                              backgroundColor: "var(--primary-color)",
                              color: "var(--white)",
                              borderRadius: "4px",
                              width: "26px",
                              height: "26px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              fontWeight: 700,
                            }}
                            onClick={infantDecrement}
                          >
                            -
                          </Box>
                          <Box
                            sx={{
                              color: "var(--primary-color)",
                              borderRadius: "4px",
                              width: "20px",
                              textAlign: "center",
                              fontWeight: "600",
                            }}
                          >
                            {infant}
                          </Box>
                          <Box
                            onClick={infantIncrement}
                            sx={{
                              backgroundColor: "var(--primary-color)",
                              color: "var(--white)",
                              borderRadius: "4px",
                              width: "26px",
                              height: "26px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              fontWeight: 700,
                            }}
                          >
                            +
                          </Box>

                          <Typography
                            sx={{ color: "#475569", fontSize: "13px", fontWeight: 500 }}
                          >
                            Infant (Under 2 years)
                          </Typography>
                        </Stack>
                      </Box>
                    </Box>
                    <Box my={2} sx={{ width: "100%" }}>
                      <hr style={{ border: "0", borderTop: "1px solid rgba(0,0,0,0.08)" }} />
                    </Box>
                    <Box>
                      <Box
                        sx={{
                          span: {
                            fontSize: 12,
                          },
                        }}
                      >
                        <FormControl>
                          <RadioGroup
                            value={className}
                            row
                            onChange={handleClassName}
                          >
                            <FormControlLabel
                              value="Y"
                              control={<BpRadio />}
                              label="Economy"
                              sx={{
                                color: "#475569",
                              }}
                            />
                            <FormControlLabel
                              value="S"
                              control={<BpRadio />}
                              label="Premium Economy"
                              sx={{
                                color: "#475569",
                              }}
                            />
                            <FormControlLabel
                              value="C"
                              control={<BpRadio />}
                              label="Business"
                              sx={{
                                mr: 2.5,
                                color: "#475569",
                              }}
                            />
                            <FormControlLabel
                              value="J"
                              control={<BpRadio />}
                              label="Premium Business"
                              sx={{
                                color: "#475569",
                              }}
                            />
                            <FormControlLabel
                              value="P"
                              control={<BpRadio />}
                              label="First Class"
                              sx={{
                                color: "#475569",
                              }}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                      <Box mt={2} style={{ textAlign: "right" }}>
                        <Button
                          size="small"
                          onClick={handleClose}
                          className="shine-effect"
                          style={{
                            backgroundColor: "var(--primary-color)",
                            color: "var(--white)",
                          }}
                        >
                          DONE
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
          {/* //todo: Search Button */}
          <Grid item sx={{ mt: { xs: 1, md: 1.5, lg: 0 } }} xs={12} lg={1.5}>
            <Box
              sx={{
                zIndex: 1,
                width: "100%",
                height: "100%",
              }}
            >
              <Tooltip title="Click To Search">
                <Button
                  // type="submit"
                  onClick={handleSearch}
                  disabled={
                    (!faddress || !toAddress || faddress?.split(",")[0] === toAddress?.split(",")[0]) &&
                      !click
                      ? true
                      : faddress?.split(",")[0] !== toAddress?.split(",")[0] &&
                        click
                        ? true
                        : false
                  }
                  sx={{
                    width: "100%",
                    height: "100%",
                    minHeight: "80px",
                    borderRadius: "8px",
                    backgroundColor: "var(--white)",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
                    color: "var(--primary-color)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#f8fafc",
                      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
                      transform: "translateY(-1px)",
                      "& svg": {
                        transform: "translateX(3px) translateY(-2px)",
                      }
                    },
                    "&:active": {
                      transform: "translateY(1px)",
                    },
                    "&.Mui-disabled": {
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      color: "rgba(26, 58, 110, 0.5)",
                    }
                  }}
                >
                  {click ? (
                    "Wait..."
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        gap: 0.5,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: 700,
                          color: "var(--primary-color)",
                        }}
                      >
                        Search
                      </Typography>
                      <TelegramIcon sx={{ fontSize: 24, transition: "transform 0.2s ease" }} />
                    </Box>
                  )}
                </Button>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ClickAwayListener>
  );
};

export default Oneway;
