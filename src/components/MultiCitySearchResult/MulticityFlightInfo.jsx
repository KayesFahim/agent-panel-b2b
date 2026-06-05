import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Box, Typography, Container, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../images/loader/Render.gif";
import NotFound from "../../images/undraw/undraw_not_found_re_bh2e.svg";
import FlightIcon from "@mui/icons-material/Flight";
import { format } from "date-fns";
import Header from "../../components/Header/Header";
import { MultiCityFlightInfoDetails } from "../MultiCityFlightInfoDetails/MultiCityFlightInfoDetails";
import MultiCityUserInfo from "../MultiCityUserInfo/MultiCityUserInfo";
import CircleIcon from "@mui/icons-material/Circle";

const MulticityFlightInfo = () => {
  const location = useLocation();
  const [loadData, setLoadData] = useState([]);
  const { adultCount, childCount, infant } = location.state;
  const [isLoaded, setIsLoaded] = useState(true);
  const navigate = useNavigate();
  const totalFares = parseInt(location?.state?.flightData?.clientPrice);

  //todo: Baggage Information
  const [adultBaggage, setAdultBaggage] = useState(0);
  const [childBaggage, setChildBaggage] = useState(0);
  const [infantBaggage, setInfantBaggage] = useState(0);
  //todo: End Baggage Information end

  let url;
  let body;
  let segments = [];
  location.state?.flightData?.segments
    ?.flatMap((data) => data)
    .map((data) =>
      segments.push({
        departure: data.departure,
        arrival: data.arrival,
        dpTime: data.departureTime,
        arrTime: data.arrivalTime,
        bCode: data.bookingcode,
        mCarrier: data.marketingcareer,
        mCarrierFN: data.marketingflight,
        oCarrier: data.marketingcareer,
        oCarrierFN: data.operatingflight,
      })
    );

  // url = "https://api.flyjatt.com/v1/AirBooking/AirPrice.php";
  body = {
    adultCount: adultCount,
    childCount: childCount,
    infantCount: infant,
    segment: location.state.flightData.segment,
    tripType: location.state.tripType,
    segments: segments,
  };

  useEffect(() => {
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
        if (data?.status !== "error" || data?.Error === null) {
          setLoadData(data);
        } else {
          throw new Error(data);
        }
      })
      .catch((err) => {
        Swal.fire({
          imageUrl: NotFound,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "No Data Found",
          confirmButtonText: "Search Another Flights...",
          confirmButtonColor: "var(--primary-color)",
        }).then(function () {
          navigate(-1);
        });
      });
  }, [
    body.adultCount,
    body.childCount,
    body.infant,
    body.segment,
    body.tripType,
    navigate,
  ]);

  let adultPrice = 0,
    adultTaxPrice = 0,
    childPrice = 0,
    childTaxPrice = 0,
    infTaxPrice = 0,
    infPrice = 0,
    inTotalBaseFare = 0,
    totalTax = 0,
    totalFare = 0,
    totalBaseFare = 0,
    serviceFeeAdult = 0,
    serviceFeeChild = 0,
    serviceFeeInfant = 0,
    discount = 0,
    agentTotal = 0,
    otherCharges = 0,
    limitTime;

  if (!isLoaded) {
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
      {Object.keys(loadData).length !== 0 ? (
        <Container sx={{ mt: 2 }}>
          <Grid container mt={5}>
            <Grid item xs={12} sm={9} md={12} lg={12}>
              <Grid container>
                <Grid item xs={12} sm={3} md={6} lg={6}>
                  <Box>
                    <Box style={{ padding: "5px 0" }}>
                      <Typography
                        style={{
                          fontFamily: "Poppins",
                          fontSize: "22px",
                          fontWeight: "500",
                          color: "#222222",
                        }}
                      >
                        Flight Information Details
                      </Typography>
                    </Box>
                    <Box>
                      {location?.state?.flightData?.segments
                        .flatMap((data) => data)
                        ?.map((segment, index, arr) => (
                          <Box my={2}>
                            <Grid container spacing={2}>
                              <Grid item sm={6} md={2.5}>
                                <Box
                                  width="50px"
                                  height="50px"
                                  borderRadius="50%"
                                  boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
                                  overflow="hidden"
                                >
                                  <img
                                    src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segment?.marketingcareer}.png`}
                                    alt="flight logo"
                                    width="50px"
                                    height="50px"
                                  />
                                </Box>
                                <Typography
                                  sx={{
                                    color: "var(--primary-color)",
                                    fontWeight: 500,
                                    fontSize: "12px",
                                  }}
                                >
                                  {segment?.marketingcareerName}
                                  <br />
                                  <span
                                    style={{
                                      color: "var(--fontcolor)",
                                    }}
                                  >
                                    {segment?.marketingcareer}{" "}
                                    {segment?.marketingflight} &{" "}
                                    {segment?.bookingcode}
                                  </span>
                                </Typography>
                              </Grid>
                              <Grid item sm={6} md={3.5}>
                                <Typography>
                                  <span
                                    style={{
                                      color: "var(--primary-color)",
                                      fontSize: "20px",
                                    }}
                                  >
                                    {segment?.departureLocation?.split(" ,")[0]}
                                    ,{" "}
                                  </span>
                                  <span
                                    style={{
                                      color: "var(--primary-color)",
                                      fontSize: "13px",
                                    }}
                                  >
                                    {segment?.departure}
                                  </span>
                                  <br />
                                  <Tooltip
                                    title={`${segment?.departureAirport}`}
                                  >
                                    <Typography
                                      style={{
                                        color: "var(--secondary-color)",
                                        fontSize: "13px",
                                      }}
                                      noWrap
                                    >
                                      {segment?.departureAirport}
                                    </Typography>
                                  </Tooltip>

                                  <span
                                    style={{
                                      color: "var(--fontcolor)",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {format(
                                      new Date(
                                        segment?.departureTime?.toString()
                                      ),
                                      "dd MMM yyyy hh:mm a"
                                    )}
                                  </span>
                                </Typography>
                              </Grid>
                              <Grid item sm={6} md={2.5} margin="auto">
                                <Box textAlign="center">
                                  <Typography
                                    sx={{
                                      color: "var(--primary-color)",
                                      fontWeight: 500,
                                      fontSize: {
                                        xs: "12px",
                                        sm: "10px",
                                        md: "12px",
                                      },
                                    }}
                                  >
                                    {segment?.flightduration}
                                  </Typography>
                                  <Box className="stop-bar-parent">
                                    <CircleIcon
                                      sx={{
                                        color: "var(--transit)",
                                        fontSize: "15px",
                                      }}
                                    />
                                    <Box className="stop-bar-line-details"></Box>
                                    <CircleIcon
                                      sx={{
                                        color: "var(--transit)",
                                        fontSize: "15px",
                                      }}
                                    />
                                  </Box>
                                </Box>
                              </Grid>
                              <Grid item sm={6} md={3.5} textAlign="end">
                                <Typography>
                                  <span
                                    style={{
                                      color: "var(--primary-color)",
                                      fontSize: "20px",
                                    }}
                                  >
                                    {segment?.arrivalLocation?.split(" ,")[0]},{" "}
                                  </span>
                                  <span
                                    style={{
                                      color: "var(--primary-color)",
                                      fontSize: "13px",
                                    }}
                                  >
                                    {segment?.arrival}
                                  </span>
                                  <br />

                                  <Tooltip title={`${segment?.arrivalAirport}`}>
                                    <Typography
                                      style={{
                                        color: "var(--secondary-color)",
                                        fontSize: "13px",
                                      }}
                                      noWrap
                                    >
                                      {segment?.arrivalAirport}
                                    </Typography>
                                  </Tooltip>

                                  <span
                                    style={{
                                      color: "var(--fontcolor)",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {format(
                                      new Date(
                                        segment?.arrivalTime?.toString()
                                      ),
                                      "dd MMM yyyy hh:mm a"
                                    )}
                                  </span>
                                </Typography>
                              </Grid>
                            </Grid>
                            {/* <Box textAlign="center">
                              <Typography
                                style={{
                                  fontWeight: "500",
                                  fontSize: "12px",
                                  textAlign: "center",
                                  color: "var(--secondary-color)",
                                  display:
                                    index === arr.length - 1 ? "none" : "block",
                                }}
                              >
                                <Box
                                  sx={{
                                    width: "50%",
                                    margin: "auto",
                                    bgcolor: "var(--transit)",
                                    py: "3px",
                                    textAlign: "center",
                                    borderRadius: "25px",
                                  }}
                                >
                                  Transit Time:{" "}
                                  {
                                    location?.state?.flightData?.transit[0]
                                      ?.transit1
                                  }
                                </Box>
                              </Typography>
                            </Box> */}
                          </Box>
                        ))}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={3} md={6} lg={6}>
                  {/*// todo: price breakdown section */}
                  <MultiCityFlightInfoDetails
                    loadData={loadData}
                    totalFares={totalFares}
                    searchData={location?.state?.flightData}
                    adultCount={location?.state?.adultCount}
                    childCount={location?.state?.childCount}
                    infant={location?.state?.infant}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={9} md={12} lg={12}>
              <Box mt={3}>
                <MultiCityUserInfo
                  loadData={loadData}
                  flightData={location.state.flightData}
                  userData={location.state}
                  otherCharges={otherCharges}
                  searchResult={loadData}
                  adultPrice={adultPrice}
                  childPrice={childPrice}
                  infPrice={infPrice}
                  adultTaxPrice={adultTaxPrice}
                  childTaxPrice={childTaxPrice}
                  infTaxPrice={infTaxPrice}
                  serviceFeeAdult={serviceFeeAdult}
                  serviceFeeChild={serviceFeeChild}
                  serviceFeeInfant={serviceFeeInfant}
                  inTotalBaseFare={inTotalBaseFare}
                  totalBaseFare={totalBaseFare}
                  totalTax={totalTax}
                  totalFare={totalFare}
                  limitTime={limitTime}
                  isLoaded={isLoaded}
                  setIsLoaded={setIsLoaded}
                  clientFare={location.state.clientFare}
                  adultBaggage={adultBaggage}
                  setAdultBaggage={setAdultBaggage}
                  childBaggage={childBaggage}
                  setChildBaggage={setChildBaggage}
                  infantBaggage={infantBaggage}
                  setInfantBaggage={setInfantBaggage}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      ) : (
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
      )}
    </Box>
  );
};

export default MulticityFlightInfo;
