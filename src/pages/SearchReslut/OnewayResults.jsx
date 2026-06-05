import React, { useState, useEffect, useRef } from "react";
import { Container } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import {
  Box,
  Grid,
  Button,
  Typography,
  Stack,
  Pagination,
  Skeleton,
} from "@mui/material";
import Swal from "sweetalert2";
import { addDays } from "date-fns";
import { format } from "date-fns";
import Tooltip from "@mui/material/Tooltip";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import Search from "../../images/undraw/undraw_web_search_re_efla.svg";
import SingleFlight from "../../components/SingleFlight/SingleFlight";
import OneWayFilter from "../../components/OneWayFilter";
// import FlightSearchBox from "../../components/FlightSearchBox/FlightSearchBox";
import Commission from "../../components/Commission";
import Preloader from "../../components/Preloader/Preloader";
import SessionTimer from "../../components/Shared/SessionTimer/SessionTimer";
import styled from "@emotion/styled";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightSearchBox from "../../components/FlightSearchBox/FlightSearchBox";
import Header from "../../components/Header/Header";
import { AirlineSlider } from "../../components/AirlineSlider/AirlineSlider";
import PriceSlider from "../../components/PriceSlider/PriceSlider";
import "../SearchReslut/SearchResult.css";

const modalStyle = {
  position: "relative",
  margin: "auto",
  width: { lg: "75vw", md: "85vw", sm: "90vw", xs: "95vw" },
  maxWidth: "1200px",
  padding: { xs: "10px", sm: "15px", md: "25px" },
  background: "var(--primary-color)",
  borderRadius: "8px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};

const OnewayResults = () => {
  const [noData, setNoData] = useState("No Data");
  const searchData = secureLocalStorage.getItem("search-data");
  const user = secureLocalStorage.getItem("user-info");
  const navigate = useNavigate();
  const location = useLocation();
  const requiredSearchData =
    location.state !== null
      ? location.state
      : secureLocalStorage.getItem("search-data");

  const {
    toSendData,
    adultCount,
    childCount,
    departureDate,
    returningDate,
    infant,
    tripType,
    faddress,
    toAddress,
    fromSearchText,
    toSearchText,
    fromSendData,
    className,
    directFlightOnly,
  } = requiredSearchData;

  const [changeFrom, setChangeFrom] = useState(false);
  //todo: End state for from date change

  const [options, setOptions] = useState({
    showCalendarAvailability: false,
    directFlightOnly: false,
    includeCheckedBaggage: false,
  });

  const [type, setType] = React.useState("flight");
  const [value, setValue] = React.useState(tripType);
  const [oneWayFromSearchText, setOneWayFromSearchText] =
    useState(fromSearchText);
  const [oneWayToSearchText, setOneWayToSearchText] = useState(toSearchText);

  const now = useRef(new Date(departureDate));
  const [from, setFrom] = useState(now.current);
  const [to, setTo] = useState(addDays(now.current, 3));
  const [fromSearchDate, setFromSearchDate] = useState(new Date(departureDate));
  const [toSearchDate, setToSearchDate] = useState(returningDate);
  const [oneWayFaddress, setOneWayFaddress] = useState(faddress);
  const [oneWayToAddress, setOneWayToAddress] = useState(toAddress);
  const [oneWayFromSendData, setOneWayFromSendData] = useState(fromSendData);
  const [oneWayToSendData, setOneWayToSendData] = useState(toSendData);
  const [oneWayAdultCount, setOneWayAdultCount] = useState(adultCount);
  const [oneWayChildCount, setOneWayChildCount] = useState(childCount);
  const [oneWayInfant, setOneWayInfant] = useState(infant);
  const [result, setResult] = useState(adultCount + childCount + infant);
  const [oneWayClassName, setOneWayClassName] = useState(className);
  const [isPrevClicked, setIsPrevCliked] = useState(false);
  const [isNextClicked, setIsNextCliked] = useState(false);
  const [searchDate, setSearchDate] = useState(
    new Date(from).toLocaleDateString("sv")
  );

  const multicity = secureLocalStorage.getItem("multi-city");
  const [multiCitySearchData, setMultiCitySearchData] = useState(
    multicity !== null
      ? multicity.searchData
      : {
          agentId: user?.user?.agentId || "TFA1001",
          adultCount: adultCount,
          childCount: childCount,
          infantCount: infant,
          CityCount: 1,
          segments: [
            {
              id: 0,
              openFrom: false,
              DepFrom: fromSendData.trim(),
              depFromText: fromSearchText.trim(),
              ArrTo: "DXB",
              arrToText: "Dubai Intl Airport [DXB]",
              openTo: false,
              Date: new Date().toLocaleDateString("sv"),
              openDate: false,
              open: false,
            },
          ],
        }
  );

  //end
  const [modifyOpen, setModifyOpen] = useState(false);
  const modifyHandleOpen = () => setModifyOpen(true);
  const modifyHandleClose = () => setModifyOpen(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  // Sets the state of the const for the given page and state.
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  let size = 30;

  // Handle a page change.
  const handlePageChange = (event, value) => {
    setPage(value);
    setData2(data?.slice((value - 1) * size, value * size));
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  //todo Searches for flights today's date.
  useEffect(() => {
    let unSubscribed = false;
    setIsLoaded(false);
    modifyHandleClose();
    // let url = "https://api.flyjatt.com/v1/Flight/airsearch.php";
    let body = {
      agentId: user?.user?.agentId || "",
      adultCount: adultCount,
      childCount: childCount,
      infantCount: infant,
      connection: 2,
      cabinclass: className || "Y",
      segments: [
        {
          id: 0,
          openFrom: false,
          depAddress: faddress || "",
          depFromText: toAddress || "",
          arrAddress: faddress || "",
          arrToText: toAddress || "",
          openTo: false,
          openDate: false,
          open: false,
          DepFrom: `${fromSendData?.replace(/\s+/g, "")}",
          ArrTo: toSendData,
          Date: `${new Date(departureDate).toLocaleDateString("sv")}",
        },
      ],
    };

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })

      .then((data) => {
        if (!unSubscribed) {
          if (data.length !== 0) {
            setIsLoaded(true);
            const uniqueData = data;
            const count = uniqueData.length;
            const pageNumber = Math.ceil(count / size);
            setPageCount(pageNumber);
            setData(uniqueData);
            setData2(uniqueData);
          } else {
            throw new Error();
          }
        }
      })
      .catch(async (err) => {
        await Swal.fire({
          imageUrl: Search,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "No Flights Found",
          confirmButtonText: "Search Again...",
          confirmButtonColor: "var(--primary-color)",
        }).then(function () {
          navigate("/agent/product");
        });
      });
    return () => {
      unSubscribed = true;
    };
  }, [
    size,
    departureDate,
    fromSendData,
    toSendData,
    adultCount,
    childCount,
    infant,
    tripType,
    navigate,
  ]);

  return (
    <Box>
      <Header />
      <Box mt={2}>
        <Container sx={{ position: "relative" }}>
          <Grid container justifyContent="space-between" columnSpacing={2}>
            <Grid item xs={12} sm={12} md={9.3}>
              <Grid container>
                {/* //todo: show search result section*/}
                <Grid container className="modify-search" columnSpacing={2}>
                  <Grid item md={8} lg={8} mb={2}>
                    <Stack direaction="row">
                      <Typography>Flight Results</Typography>
                      <Box>
                        <Button
                          onClick={() => modifyHandleOpen()}
                          style={{
                            backgroundColor: "var(--secondary-color)",
                            color: "var(--white)",
                            padding: "5px 10px",
                            cursor: "pointer",
                          }}
                        >
                          Modify Search
                        </Button>
                      </Box>
                    </Stack>
                  </Grid>

                  <Grid item md={12} sm={12} xs={12} sx={{ mt: 0.5, mb: 1.5 }}>
                    <PriceSlider
                      agentId={user?.user?.agentId}
                      tripType={tripType}
                      depFrom={`${fromSendData?.replace(/\s+/g, "")}"}
                      depDate={`${new Date(departureDate).toLocaleDateString(
                        "sv"
                      )}`}
                      arrTo={`${toSendData?.replace(/\s+/g, "")}"}
                      arrDate={`${new Date(returningDate).toLocaleDateString(
                        "sv"
                      )}`}
                      adultCount={adultCount}
                      childCount={childCount}
                      infantCount={infant}
                      data={data}
                      setData={setData}
                      data2={data2}
                      setData2={setData2}
                      setPageCount={setPageCount}
                      setIsLoaded={setIsLoaded}
                      //   setFromSearchDate={setFromSearchDate}
                      //   setToSearchDate={setToSearchDate}
                    />
                  </Grid>
                </Grid>

                {/* //todo:main search result */}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  sx={{
                    height: "fit-content",
                  }}
                >
                  {isLoaded
                    ? data2?.slice(0, size).map((data, index) => {
                        return (
                          <SingleFlight
                            key={index}
                            flightData={data}
                            tripType={tripType}
                            adultCount={adultCount}
                            childCount={childCount}
                            infant={infant}
                            from={fromSendData}
                            to={toSendData}
                            fromAddress={faddress}
                            toAddress={toAddress}
                            dDate={searchDate}
                          />
                        );
                      })
                    : [...new Array(5)].map((data, index) => (
                        <Box
                          key={index}
                          style={{
                            width: "100%",
                            height: "150px",
                            margin: "10px 0px",
                            borderRadius: "5px",
                            overFlow: "hidden",
                          }}
                        >
                          <Skeleton
                            variant="rectangular"
                            width={"100%"}
                            height={"100%"}
                          />
                        </Box>
                      ))}
                </Grid>
                {/* //todo: pagination*/}
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Box
                    sx={{
                      width: "100%",
                      my: 3,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Stack spacing={2}>
                      <Pagination
                        count={pageCount}
                        onChange={handlePageChange}
                        shape="rounded"
                        color="primary"
                      />
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>

        <Modal
          open={modifyOpen}
          onClose={() => modifyHandleClose()}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "auto",
          }}
        >
          <Container sx={{ outline: "none", my: 2 }}>
            <Box sx={modalStyle}>
              <FlightSearchBox
                options={options}
                setOptions={setOptions}
                type={type}
                setType={setType}
                value={value}
                setValue={setValue}
                fromSearchText={oneWayFromSearchText}
                setFromSearchText={setOneWayFromSearchText}
                toSearchText={oneWayToSearchText}
                setToSearchText={setOneWayToSearchText}
                from={from}
                setFrom={setFrom}
                to={to}
                setTo={setTo}
                faddress={oneWayFaddress}
                setfaddress={setOneWayFaddress}
                toAddress={oneWayToAddress}
                setToAddress={setOneWayToAddress}
                fromSendData={oneWayFromSendData}
                setFromSendData={setOneWayFromSendData}
                toSendData={oneWayToSendData}
                setToSendData={setOneWayToSendData}
                adultCount={oneWayAdultCount}
                setAdultCount={setOneWayAdultCount}
                childCount={oneWayChildCount}
                setChildCount={setOneWayChildCount}
                infant={oneWayInfant}
                setInfant={setOneWayInfant}
                result={result}
                setResult={setResult}
                className={oneWayClassName}
                setClassName={setOneWayClassName}
                changeFrom={changeFrom}
                setChangeFrom={setChangeFrom}
                searchData={multiCitySearchData}
                setSearchData={setMultiCitySearchData}
                directFlightOnly={directFlightOnly}
              />
            </Box>
          </Container>
        </Modal>
      </Box>
    </Box>
  );
};

export default OnewayResults;
