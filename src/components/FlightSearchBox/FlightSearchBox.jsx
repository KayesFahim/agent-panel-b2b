import React from "react";
import { Box } from "@mui/system";
import Oneway from "../Oneway/Oneway";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Multicity from "../MultiCity/Multicity";
import { Radio, Tab } from "@mui/material";
import "./FlightSearchBox.css";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Swal from "sweetalert2";
import ServerDown from "../../images/undraw/undraw_server_down_s-4-lk.svg";
import getAuthToken from "../../Token/getAuthToken";

const FlightSearchBox = ({
  options,
  setOptions,
  value,
  setValue,
  fromSearchText,
  setFromSearchText,
  toSearchText,
  setToSearchText,
  from,
  setFrom,
  to,
  setTo,
  faddress,
  setfaddress,
  toAddress,
  setToAddress,
  fromSendData,
  setFromSendData,
  toSendData,
  setToSendData,
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
  changeFrom,
  setChangeFrom,
  changeState,
  directFlightOnly,
  setDirectFlightOnly,
  searchData,
  setSearchData,
  setChangeState,
}) => {
  const user = secureLocalStorage.getItem("user-info");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeOptions = (event) => {
    setDirectFlightOnly(event.target.checked);
  };
  const handleClassName = (event) => {
    setClassName(event.target.value);
    setSearchData({ ...searchData, cabinclass: event.target.value });
  };

  const navigate = useNavigate();

  // --------------------New Search Function Start --------------------
  async function handleSearch() {
    const token = getAuthToken();
    if (!token) {
      navigate("/signin");
      return;
    }
    if (value === "oneway") {
      navigate("/agent/searchresult", {
        state: {
          faddress,
          toAddress,
          fromSearchText,
          toSearchText,
          departureDate: format(new Date(from), "dd MMM yy"),
          adultCount,
          childCount,
          infant,
          tripType: value,
          fromSendData,
          toSendData,
          className,
          changeState,
          directFlightOnly,
        },
      });
    } else if (value === "return") {
      navigate("/agent/roundsearchresult", {
        state: {
          faddress,
          toAddress,
          departureDate: format(new Date(from), "dd MMM yy"),
          returningDate: format(new Date(to), "dd MMM yy"),
          adultCount,
          childCount,
          infant,
          tripType: value,
          fromSendData,
          toSendData,
          fromSearchText,
          toSearchText,
          className,
          changeState,
          directFlightOnly,
        },
      });
    } else if (value === "multicity") {
      navigate("/agent/multicityaftersearch", {
        state: {
          faddress,
          toAddress,
          fromSearchText,
          toSearchText,
          departureDate: format(new Date(from), "dd MMM yy"),
          adultCount,
          childCount,
          infant,
          tripType: value,
          fromSendData,
          toSendData,
          className,
          searchData,
          changeState,
          directFlightOnly,
        },
      });
    } else {
      Swal.fire({
        imageUrl: ServerDown,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        html: `For any query.Please contact us at <strong> info@aatrips.pk</strong> or Call <strong> +8801409965900 </strong>`,
        confirmButtonText: "Search Again...",
        confirmButtonColor: "var(--primary-color)",
        imageAlt: "Custom image",
        html: `For any query.Please contact us at <strong> support@aatrips.pk</strong> or Call <strong> +8801409965900 </strong>`,
        confirmButtonText: "Search Again...",
        confirmButtonColor: "var(--primary-color)",
      }).then(() => {
        // setClick(false);
        navigate("/agent/product");
        // navigate("/signin");
      });
    }
  }

  return (
    <Box sx={{ width: "100%", padding: "10px 0px 20px 0px" }}>
      <TabContext value={value}>
        <Box
          sx={{
            width: "100%",
            height: { md: "fit-content", sm: "100%", xs: "100%" },
            display: "flex",
            justifyContent: {
              md: "space-between",
              sm: "center",
              xs: "center",
            },
            alignItems: "center",
            opacity: "1",
            ".MuiTabs-root": {
              minHeight: "fit-content",
            },
            "& button": {
              opacity: "1",
              borderRadius: "5px",
              background: "transparent",
              color: "white",
              marginRight: "2px",
              width: "fit-content",
              minHeight: "fit-content",
              // padding: "10px",
              fontSize: { xs: 12, md: 13 },
              height: "28px",
            },
            "& button.Mui-selected,& button.Mui-selected >svg": {
              // background: "var(--primary-color)",
              // color: "var(--white) !important",
              // boxShadow:"rgba(0, 0, 0, 0.24)  0px 3px 8px"

              // borderRadius: " 27px",
              // background: "linear-gradient(145deg, #047ab3, #0490d5)",
              // boxShadow: "21px 21px 42px #0371a7 -21px -21px 42px #059de7",

              background: "#ffff",
              borderRadius: "3px",
              boxShadow: "rgba(0, 0, 0, 0.24)  0px 3px 8px",
              color: "var(--primary-color)",
              height: "28px",
            },
          }}
        >
          <TabList
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{
              style: { display: "none" },
            }}
          >
            <Tab label="One Way" value="oneway" />
            <Tab label="Round Way" value="return" />
            <Tab label="Multi City" value="multicity" />
          </TabList>
        </Box>
        <TabPanel value="oneway" style={{ padding: "10px 0px 0px" }}>
          <Oneway
            tripType={value}
            iconColor={"#DC143C"}
            bgColor={"#fff"}
            bordercolor={"#003566"}
            faddress={faddress}
            fromSendData={fromSendData}
            setFromSendData={setFromSendData}
            toSendData={toSendData}
            setToSendData={setToSendData}
            setfaddress={setfaddress}
            toAddress={toAddress}
            setToAddress={setToAddress}
            fromSearchText={fromSearchText}
            setFromSearchText={setFromSearchText}
            toSearchText={toSearchText}
            setToSearchText={setToSearchText}
            setValue={setValue}
            adultCount={adultCount}
            setAdultCount={setAdultCount}
            childCount={childCount}
            setChildCount={setChildCount}
            infant={infant}
            setInfant={setInfant}
            result={result}
            setResult={setResult}
            className={className}
            handleClassName={handleClassName}
            to={to}
            setTo={setTo}
            from={from}
            setFrom={setFrom}
            changeFrom={changeFrom}
            setChangeFrom={setChangeFrom}
            directFlightOnly={directFlightOnly}
            setChangeState={setChangeState}
            changeState={changeState}
            // setDirectFlightOnly={setDirectFlightOnly}
            handleSearch={handleSearch}
          />
        </TabPanel>
        <TabPanel value="return" style={{ padding: "10px 0px 0px" }}>
          <Oneway
            tripType={value}
            iconColor={"#DC143C"}
            bgColor={"#fff"}
            bordercolor={"#003566"}
            faddress={faddress}
            fromSendData={fromSendData}
            setFromSendData={setFromSendData}
            toSendData={toSendData}
            setToSendData={setToSendData}
            setfaddress={setfaddress}
            toAddress={toAddress}
            setToAddress={setToAddress}
            fromSearchText={fromSearchText}
            setFromSearchText={setFromSearchText}
            toSearchText={toSearchText}
            setToSearchText={setToSearchText}
            setValue={setValue}
            adultCount={adultCount}
            setAdultCount={setAdultCount}
            childCount={childCount}
            setChildCount={setChildCount}
            infant={infant}
            setInfant={setInfant}
            result={result}
            setResult={setResult}
            className={className}
            handleClassName={handleClassName}
            to={to}
            setTo={setTo}
            from={from}
            setFrom={setFrom}
            changeFrom={changeFrom}
            setChangeFrom={setChangeFrom}
            directFlightOnly={directFlightOnly}
            setChangeState={setChangeState}
            changeState={changeState}
            // setDirectFlightOnly={setDirectFlightOnly}
            handleSearch={handleSearch}
          />
        </TabPanel>

        <TabPanel value="multicity" style={{ padding: "10px 0px 0px" }}>
          <Multicity
            tripType={value}
            iconColor={"#DC143C"}
            bgColor={"#fff"}
            bordercolor={"#003566"}
            faddress={faddress}
            setfaddress={setfaddress}
            toAddress={toAddress}
            setToAddress={setToAddress}
            fromSendData={fromSendData}
            setFromSendData={setFromSendData}
            toSendData={toSendData}
            setToSendData={setToSendData}
            fromSearchText={fromSearchText}
            setFromSearchText={setFromSearchText}
            toSearchText={toSearchText}
            setToSearchText={setToSearchText}
            setValue={setValue}
            adultCount={adultCount}
            setAdultCount={setAdultCount}
            childCount={childCount}
            setChildCount={setChildCount}
            infant={infant}
            setInfant={setInfant}
            result={result}
            setResult={setResult}
            className={className}
            setClassName={setClassName}
            handleClassName={handleClassName}
            to={to}
            setTo={setTo}
            from={from}
            setFrom={setFrom}
            changeFrom={changeFrom}
            setChangeFrom={setChangeFrom}
            searchData={searchData}
            setSearchData={setSearchData}
            directFlightOnly={directFlightOnly}
            setDirectFlightOnly={setDirectFlightOnly}
            handleSearch={handleSearch}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default FlightSearchBox;
