import { Container, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { addDays, format } from "date-fns";
import { useRef } from "react";
import FlightSearchBox from "../FlightSearchBox/FlightSearchBox";
import "./HomeSearchBox.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "var(--light-gray)",
  borderRadius: "20px",
  boxShadow: 24,
  px: { xs: 2, sm: 4 },
  py: 2,
};

const HomeSearchBox = () => {
  //todo: state for from date change
  const [changeFrom, setChangeFrom] = useState(null);
  const [changeState, setChangeState] = useState(null);

  const [fromSearchText, setFromSearchText] = useState("");
  const [toSearchText, setToSearchText] = useState("");

  const [departureDate, setDepartureDate] = useState(
    format(addDays(new Date(), 1), "dd MMM yy")
  );
  const [returningDate, setReturningDate] = useState(
    format(addDays(new Date(departureDate), 3), "dd MMM yy")
  );
  const [travelDate, setTravelDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: "selection",
    },
  ]);
  // for multiCity
  const now = useRef(new Date());
  const [value, setValue] = React.useState("oneway");
  const [className, setClassName] = useState("Y");
  const [from, setFrom] = useState(addDays(now.current, 1));
  const [to, setTo] = useState(addDays(now.current, 3));
  const [faddress, setfaddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [fromSendData, setFromSendData] = useState("");
  const [toSendData, setToSendData] = useState("");
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infant, setInfant] = useState(0);
  const [result, setResult] = useState(1);
  const [directFlightOnly, setDirectFlightOnly] = useState(false);

  const [searchData, setSearchData] = useState({
    adultcount: adultCount,
    childcount: childCount,
    infantcount: infant,
    connection: 2,
    cabinclass: "Y",
    segments: [
      {
        id: 0,
        openFrom: false,
        depfrom: fromSendData.trim(),
        depFromText: fromSearchText.trim(),
        arrto: toSendData.trim(),
        arrToText: toSearchText.trim(),
        openTo: false,
        depdate: new Date().toLocaleDateString("sv"),
        openDate: false,
        open: false,
      },
    ],
  });

  const [options, setOptions] = useState({
    showCalendarAvailability: false,
    directFlightOnly: false,
    includeCheckedBaggage: false,
  });

  // ------------------------

  const [openLicense, setOpenLicense] = useState(false);
  const handleCloseLicense = () => setOpenLicense(false);

  const [openVisa, setOpenVisa] = useState(false);
  const handleCloseVisa = () => setOpenVisa(false);

  return (
    <Box>
      <Box
        sx={{
          p: { xs: 1, sm: 3, md: 3, lg: 1 },
          my: { xs: 3, lg: 0 },
          borderRadius: "10px",
          width: "100%",
        }}
      >
        <FlightSearchBox
          options={options}
          setOptions={setOptions}
          value={value}
          setValue={setValue}
          fromSearchText={fromSearchText}
          setFromSearchText={setFromSearchText}
          toSearchText={toSearchText}
          setToSearchText={setToSearchText}
          departureDate={departureDate}
          setDepartureDate={setDepartureDate}
          returningDate={returningDate}
          setReturningDate={setReturningDate}
          travelDate={travelDate}
          setTravelDate={setTravelDate}
          from={from}
          setFrom={setFrom}
          to={to}
          setTo={setTo}
          faddress={faddress}
          setfaddress={setfaddress}
          toAddress={toAddress}
          setToAddress={setToAddress}
          fromSendData={fromSendData}
          setFromSendData={setFromSendData}
          toSendData={toSendData}
          setToSendData={setToSendData}
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
          changeFrom={changeFrom}
          setChangeState={setChangeState}
          changeState={changeState}
          setChangeFrom={setChangeFrom}
          directFlightOnly={directFlightOnly}
          setDirectFlightOnly={setDirectFlightOnly}
          searchData={searchData}
          setSearchData={setSearchData}
        />
      </Box>
      {/* //todo: Visa Modal */}
      <Modal open={openVisa} onClose={handleCloseVisa}>
        <Box
          sx={{
            ...style,
            width: { xs: "90%", sm: "80%", md: "50%" },
            height: { xs: 400, sm: 400, md: "auto" },
            overflowY: { xs: "scroll", sm: "scroll", md: "auto" },
          }}
        ></Box>
      </Modal>
      {/* //todo: License Modal */}
      <Modal open={openLicense} onClose={handleCloseLicense}>
        <Box
          sx={{
            ...style,
            width: { xs: "90%", sm: "80%", md: "50%" },
            height: { xs: 400, sm: 400, md: "auto" },
            overflowY: { xs: "scroll", sm: "scroll", md: "auto" },
          }}
        ></Box>
      </Modal>
    </Box>
  );
};

export default HomeSearchBox;
