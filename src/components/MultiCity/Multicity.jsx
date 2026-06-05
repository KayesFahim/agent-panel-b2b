import {
  Box,
  ClickAwayListener,
  Grid,
  Typography,
  Button,
  Collapse,
  Tooltip,
  Stack,
  Grow,
} from "@mui/material";
import React, { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import GroupsIcon from "@mui/icons-material/Groups";
import flightData from "../flightData";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import { format } from "date-fns";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import TelegramIcon from "@mui/icons-material/Telegram";

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
    outline: "2px auto var(--secondary-color)",
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
    backgroundImage:
      "radial-gradient(var(--white),var(--white) 28%,transparent 32%)",
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
const Multicity = ({
  tripType,
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
  setClassName,
  handleClassName,
  from,
  setFrom,
  to,
  setTo,
  setChangeState,
  changeState,
  changeFrom,
  setChangeFrom,
  searchData,
  setSearchData,
  directFlightOnly,
  setDirectFlightOnly,
  handleSearch,
}) => {
  const data = flightData; // json data from flight Data
  const navigate = useNavigate();
  // todo: multiCity search Body

  const addCity = () => {
    const tempSearchData = [...searchData.segments];
    tempSearchData.push({
      id: tempSearchData.length,
      depfrom: tempSearchData[tempSearchData.length - 1].arrto,
      depFromText: tempSearchData[tempSearchData.length - 1].arrToText,
      arrto: "",
      arrToText: "",
      openTo: false,
      depdate: new Date().toLocaleDateString("sv"),
      openDate: false,
      open: false,
    });
    setSearchData({
      ...searchData,
      segments: tempSearchData,
    });
  };
  const removeCity = (id) => {
    const tempSearchData = searchData.segments.filter((item) => item.id !== id);
    setSearchData({
      ...searchData,
      segments: tempSearchData,
    });
  };
  // todo: end multiCity search Body

  const initialData = [
    {
      code: "RUH",
      name: "King Khaled Intl ",
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

  //todo: is Click state
  const [click, setClick] = useState(false);
  //todo: end of click state
  const [fromSuggest, setFromSuggest] = useState(initialData);
  const [toSuggest, setToSuggest] = useState(initialData);

  // Opens the dialog when the user clicks.
  const handleClickOpen = (index, segment) => {
    const tempSearchData = [...searchData.segments];
    tempSearchData[index] = {
      ...tempSearchData[index],
      openTo: false,
      openDate: false,
      open: !segment.open,
    };
    setSearchData({ ...searchData, segments: tempSearchData });
  };

  // Closes the child process.
  const handleClose = (index) => {
    const tempSearchData = [...searchData.segments];
    tempSearchData[index] = {
      ...tempSearchData[index],
      openTo: false,
      openDate: false,
      open: false,
    };
    setSearchData({ ...searchData, segments: tempSearchData });
    // setResult(adultCount + childCount + infant);
  };

  // Sets the number of children.
  function adultInclement(e) {
    e.preventDefault();
    if (adultCount < 9 - (childCount + infant)) {
      setAdultCount(adultCount + 1);
      setSearchData({ ...searchData, adultCount: adultCount + 1 });
    }
  }

  // Decrement the count of children.
  function adultDecrement(e) {
    e.preventDefault();
    if (adultCount > 1) {
      setAdultCount(adultCount - 1);
      setSearchData({ ...searchData, adultCount: adultCount - 1 });
      if (infant === adultCount) {
        if (infant > 1) {
          setInfant(infant - 1);
          setSearchData({ ...searchData, infant: infant - 1 });
        }
      }
    }
  }

  function childInclement(e) {
    e.preventDefault();
    if (childCount < 9 - (adultCount + infant)) {
      setChildCount(childCount + 1);
      setSearchData({ ...searchData, childCount: childCount + 1 });
    }
  }

  function childDecrement(e) {
    e.preventDefault();
    if (childCount > 0) {
      setChildCount(childCount - 1);
      setSearchData({ ...searchData, childCount: childCount - 1 });
    }
  }

  // Increment the default value if the value is not a child.
  function infantIncrement(e) {
    e.preventDefault();
    if (infant < 9 - (adultCount + childCount)) {
      if (infant < adultCount) {
        setInfant(infant + 1);
        setSearchData({ ...searchData, infantCount: infant + 1 });
      }
    }
  }

  // Decrement the infant by 1.
  function infantDecrement(e) {
    e.preventDefault();
    if (infant > 0) {
      setInfant(infant - 1);
      setSearchData({ ...searchData, infantCount: infant - 1 });
    }
  }

  const formOnChange = (e) => {
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

  const fromGetSuggetion = (index) => {
    const fromSuggestedText = (name, code, address) => {
      const tempSearchData = [...searchData.segments];

      tempSearchData[index] = {
        ...tempSearchData[index],
        depfrom: code.trim(),
        depFromText: `${name} (${code.trim()})`,
        openFrom: false,
        openTo: true,
      };
      setSearchData({
        ...searchData,
        segments: tempSearchData,
      });
      setFromSendData(code);
      setFromSearchText(`${name} (${code})`);
      setFromSuggest([]);
      setfaddress(address);
    };

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
                        style={{
                          fontSize: "11px",
                          display: "block",
                          textAlign: "left",
                          color: "#64748b",
                        }}
                      >
                        {item.name}
                      </Typography>
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
                variant="subtitle-2"
                style={{
                  color: "var(--primary-color)",
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

  const toGetSuggetion = (index) => {
    const toSuggestedText = (name, code, address) => {
      const tempSearchData = [...searchData.segments];
      if (index === tempSearchData.length - 1) {
        tempSearchData[index] = {
          ...tempSearchData[index],
          arrto: code.trim(),
          arrToText: `${name} (${code.trim()})`,
          openFrom: false,
          openTo: false,
          openDate: true,
        };
      } else {
        tempSearchData[index] = {
          ...tempSearchData[index],
          arrto: code.trim(),
          arrToText: `${name} (${code.trim()})`,
          openFrom: false,
          openTo: false,
          openDate: true,
        };
        tempSearchData[index + 1] = {
          ...tempSearchData[index + 1],
          depfrom: code.trim(),
          depFromText: `${name} (${code.trim()})`,
        };
      }
      setSearchData({ ...searchData, segments: tempSearchData });
      setToSendData(code);
      setToSearchText(`${name} (${code})`);
      setToSuggest([]);
      setToAddress(address);
    };
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
                        style={{
                          fontSize: "11px",
                          display: "block",
                          textAlign: "left",
                          color: "#64748b",
                        }}
                      >
                        {item.name}
                      </Typography>
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
                  color: "var(--primary-color)",
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

  const handleSelect = (date, index) => {
    const tempSearchData = [...searchData.segments];
    tempSearchData[index] = {
      ...tempSearchData[index],
      depdate: new Date(date).toLocaleDateString("sv"),
      openDate: false,
      openFrom: false,
      openTo: false,
    };
    setSearchData({ ...searchData, segments: tempSearchData });
  };
  setResult(adultCount + childCount + infant);
  const handleClickAway = (index) => {
    const tempSegment = [...searchData.segments];
    tempSegment[index] = {
      ...tempSegment[index],
      openFrom: false,
      openTo: false,
      openDate: false,
      open: false,
    };
    setSearchData({
      ...searchData,
      cabinclass: className,
      segments: tempSegment,
    });
  };

  return (
    <Box sx={{ position: "relative" }}>
      <form
        style={{
          paddingLeft: "0px",
        }}
      >
        <Box
          // sx={{
          //   overflowY: { xs: "scroll", sm: "" },
          //   height: { xs: 300, sm: "" },
          // }}
          sx={{
            p: "0px",
            height: "auto",
          }}
        >
          {searchData.segments.map((segment, index, arr) => (
            <Box key={index} sx={{ mb: 1 }}>
              <ClickAwayListener onClickAway={() => handleClickAway(index)}>
                <Grid
                  key={index}
                  sx={{
                    height: "fit-content",
                    width: { xs: "100%", sm: "550px", md: "600px", lg: "1155px" },
                  }}
                  container
                  spacing={1}
                >
                  {/* //todo destination section */}
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={2.9}
                    style={{
                      position: "relative",
                      // border: "1px solid var(--gray)",
                      // borderRadius: "10px 10px 0px 0px",
                      height: "80px",
                      // backgroundColor: "var(--white)",
                    }}
                  >
                    {/* //todo: Departure City section */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        height: "100%",
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
                        const tempSegment = [...searchData.segments];
                        tempSegment[index] = {
                          ...tempSegment[index],
                          openFrom: !segment.openFrom,
                          openTo: false,
                          openDate: false,
                        };
                        setSearchData({
                          ...searchData,
                          segments: tempSegment,
                        });
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
                            color: segment.depFromText ? "var(--primary-color)" : "#94a3b8",
                            mt: 0.2,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {segment.depFromText || ""}
                        </Typography>
                      </Box>
                    </Box>
                    {segment.openFrom && (
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
                          Departure From
                        </Typography>
                        <Box
                          sx={{
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
                            onChange={formOnChange}
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
                        <Box>{fromGetSuggetion(index)}</Box>
                      </Box>
                    )}
                  </Grid>

                  {/* //todo: Arrival City section */}
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={2.9}
                    style={{
                      position: "relative",
                      // border: "1px solid var(--gray)",
                      // borderRadius: "10px 10px 0px 0px",
                      height: "80px",
                      // backgroundColor: "var(--white)",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        height: "100%",
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
                        const tempSegment = [...searchData.segments];
                        tempSegment[index] = {
                          ...tempSegment[index],
                          openFrom: false,
                          openTo: !segment.openTo,
                          openDate: false,
                        };
                        setSearchData({
                          ...searchData,
                          segments: tempSegment,
                        });
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
                            color: segment.arrToText ? "var(--primary-color)" : "#94a3b8",
                            mt: 0.2,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {segment.arrToText || ""}
                        </Typography>
                      </Box>
                    </Box>
                    {segment.openTo && (
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
                          sx={{
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
                        <Box>{toGetSuggetion(index)}</Box>
                      </Box>
                    )}
                  </Grid>
                  {/* //todo:Travel Date */}
                  <Grid
                    item
                    xs={12}
                    lg={3.8}
                    sx={{
                      position: "relative",
                      mt: { xs: 1, md: 1.5, lg: 0 },
                    }}
                  >
                    <Box
                      sx={{
                        background: "var(--white)",
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "8px",
                        border: "1px solid rgba(0,0,0,0.06)",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          borderColor: "var(--primary-color)",
                          boxShadow: "0 4px 12px rgba(26,58,110,0.08)",
                        }
                      }}
                    >
                      <Box
                        style={{
                          borderRight: "1px solid var(--gray)",
                          width: "50%",
                        }}
                      >
                        <Typography
                          sx={{
                            // color: "var(--gray)",
                            // fontSize: 12,
                            // fontWeight: "500",
                            // px: 1.5,
                            // pt: 0.5,
                            // borderRadius: "10px 0px 0px 0px",
                            pb: 0.5,
                            pt:0,
                            mt:0,
                            px: 1.5,
                            // bgcolor: "var(--primary-color)",
                            // width: "72px",
                            // color: "var(--white)",
                            fontSize: "12px",
                            fontWeight: 500,
                            textAlign: { xs: "left" },
                            color: "var(--primary-color)",
                          }}
                        >
                          Departure Date
                        </Typography>
                        <Stack
                          sx={{ px: 1.5, pb: 1 }}
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          onClick={() => {
                            const tempSearchData = [...searchData.segments];
                            tempSearchData[index] = {
                              ...tempSearchData[index],
                              openFrom: false,
                              openTo: false,
                              openDate: !segment.openDate,
                            };
                            setSearchData({
                              ...searchData,
                              segments: tempSearchData,
                            });
                          }}
                        >
                          <Typography
                            sx={{
                              color: "var(--primary-color)",
                              fontSize: 12,
                              fontWeight: "500",
                            }}
                          >
                            {`${format(
                              new Date(segment?.depdate),
                              "dd MMMM yy"
                            )}`}
                          </Typography>{" "}
                          <CalendarMonthIcon
                            sx={{
                              fontSize: 25,
                              color: "var(--primary-color)",
                            }}
                          />
                        </Stack>

                        <Grow in={segment.openDate} style={{ zIndex: 9999 }}>
                          <Box
                            sx={{
                              position: "absolute",
                              left: 0,
                              top: 28,
                              zIndex: 9999,
                            }}
                          >
                            <Calendar
                              color="#112e55"
                              className={"dashboard-calendar"}
                              // date={new Date(from)}
                              onChange={(date) => handleSelect(date, index)}
                              months={1}
                              minDate={
                                index === 0
                                  ? new Date()
                                  : new Date(arr[index - 1].depdate)
                              }
                            />
                          </Box>
                        </Grow>
                      </Box>
                      <Box
                        style={{
                          width: "50%",
                        }}
                      >
                        <Stack
                          sx={{ px:{xs:.5,lg:1.5}, 
                            py: 1 }}
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Button
                            size="small"
                            title="Remove City"
                            disabled={arr.length === 1 ? true : false}
                            sx={{
                              py: 0,
                              visibility: index === 0 ? "hidden" : "visible",
                              backgroundColor: "var(--tomato-color)",
                              color: "var(--white)",
                              "&:hover": {
                                backgroundColor: "var(--tomato-color)",
                                color: "var(--white)",
                                cursor: "pointer",
                              },
                              zIndex: "1",
                            }}
                            onClick={() => removeCity(segment.id)}
                          >
                            <RemoveIcon sx={{ zIndex: "1" }} />
                          </Button>
                          <Button
                            size="small"
                            title="Add City"
                            disabled={arr.length > 3 ? true : false}
                            sx={{
                              py: 0,
                              backgroundColor: "var(--primary-color)",
                              color: "var(--white)",
                              "&:hover": {
                                backgroundColor: "var(--primary-color)",
                                color: "var(--white)",
                                cursor: "pointer",
                              },
                              zIndex: "1",
                            }}
                            onClick={addCity}
                          >
                            <AddIcon sx={{ zIndex: "1" }} />
                          </Button>
                        </Stack>
                      </Box>
                    </Box>
                  </Grid>

                  {/* //todo: Passenger Box section */}
                  {arr.length - 1 === index ? (
                    <Grid
                      item
                      xs={12}
                      lg={2.4}
                      sx={{
                        position: "relative",
                        mt: { xs: 1, md: 1.5, lg: 0 },
                        zIndex: 200,
                        height: "80px",
                      }}
                    >
                      <Box
                        style={{
                          position: "relative",
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        <Box
                          style={{
                            // display: "flex",
                            flexDirection: { xs: "row", lg: "column" },
                            justifyContent: "center",
                            alignItems: "center",
                            // width: "100%",
                            height: "72px",
                            // borderRadius: "10px",
                            background: "var(--white)",
                            // border: "1px solid var(--gray)",
                            borderRadius: "3px",
                          }}
                          onClick={() => handleClickOpen(index, segment)}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              py: 0.5,
                            }}
                          >
                            <Typography
                              sx={{
                                // color: "var(--gray)",
                                // fontSize: 12,
                                // fontWeight: "500",
                                // px: 1.5,
                                // pt: 0.5,
                                // borderRadius: "10px 0px 0px 0px",
                                // py: 0.2,
                                px: 1,
                                // bgcolor: "var(--primary-color)",
                                // width: "72px",
                                // color: "var(--white)",
                                fontSize: "12px",
                                fontWeight: 500,
                                textAlign: { xs: "left", lg: "center" },
                                color: "var(--primary-color)",
                              }}
                            >
                              Passenger & Class
                            </Typography>
                            <EventSeatIcon
                              sx={{
                                color: "var(--primary-color)",
                                // width:"15px",
                                // height:"20px",

                                fontSize: "20px",
                                // pt:1.5
                              }}
                            />
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              px: 1,
                              gap: 0,
                            }}
                          >
                            {/* //todo: Traveler Section */}
                            <Box
                              sx={{
                                width: { xs: "50%", lg: "52%" },
                                // display: "flex",
                                alignItems: "center",
                                py: { xs: 1, lg: 0 },
                                // px: 1.5,
                              }}
                            >
                              {/* <GroupsIcon
                              sx={{
                                fontSize: "25px",
                                color: "var(--primary-color)",
                              }}
                            />
                            &nbsp;&nbsp; */}
                              <Typography
                                sx={{
                                  color: "var(--primary-color)",
                                  fontSize: "12px",
                                  fontWeight: "500",
                                }}
                              >
                                {result} Passenger
                              </Typography>
                            </Box>
                            {/* //todo: Class section */}
                            <Box
                              sx={{
                                width: { xs: "50%", lg: "48%" },
                                // borderRight: "1px solid var(--gray)",
                                // display: "flex",
                                alignItems: "center",
                                px: { xs: 1.5, lg: 0 },
                                py: { xs: 1, lg: 0 },
                                // py: 1,
                              }}
                            >
                              {/* <AirlineSeatReclineNormalIcon
                              sx={{
                                fontSize: "25px",
                                color: "var(--primary-color)",
                              }}
                            /> */}
                              <Typography
                                sx={{
                                  color: "var(--primary-color)",
                                  fontSize: "12px",
                                  fontWeight: "500",
                                }}
                                // noWrap
                              >
                                {`${
                                  className === "S"
                                    ? "Premium Economy"
                                    : className === "C"
                                    ? "Business"
                                    : className === "J"
                                    ? "Premium Business"
                                    : className === "P"
                                    ? "First Class"
                                    : "Economy"
                                }`}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        {/* //todo: Passenger Box */}
                        {segment.open && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: {
                                lg: "110%",
                                md: "110%",
                                sm: "100%",
                                xs: "100%",
                              },
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
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "start",
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
                                    sx={{
                                      color: "#475569",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                    }}
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
                                    sx={{
                                      color: "#475569",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                    }}
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
                                    sx={{
                                      color: "#475569",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                    }}
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
                                    // onClick={handleClose}
                                    className="shine-effect"
                                    style={{
                                      backgroundColor: "var(--primary-color)",
                                      color: "var(--white)",
                                    }}
                                    onClick={() =>
                                      handleClickOpen(index, segment)
                                    }
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
                  ) : null}
                </Grid>
              </ClickAwayListener>
            </Box>
          ))}
          {/* //todo: Search Button */}
          <Grid item sx={{ mt: { xs: 1, md: 1.5, lg: 2 } }} xs={12}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onClick={handleSearch}
                disabled={
                  searchData.segments.some(seg => !seg.depFromText || !seg.arrToText || seg.depFromText?.trim() === seg.arrToText?.trim())
                }
                sx={{
                  width: "100%",
                  height: "40px",
                  mt: { md: "0px", sm: "10px", xs: "10px", lg: "0px" },
                  backgroundColor: "var(--white)",
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 8px 0px",
                  color: "var(--primary-color)",
                  fontWeight: 700,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#f8fafc",
                    color: "var(--primary-color)",
                    cursor: "pointer",
                    boxShadow: "rgba(0, 0, 0, 0.15) 0px 4px 12px 0px",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    color: "rgba(26, 58, 110, 0.5)",
                  }
                }}
              >
                <TelegramIcon sx={{ fontSize: 25, mr: 0.5 }} />
                {click ? "Wait..." : "Search"}
              </Button>
            </Box>
          </Grid>
        </Box>
      </form>
    </Box>
  );
};

export default Multicity;
