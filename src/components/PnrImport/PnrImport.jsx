import { Box, Button, Container, Grid, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../Header/Header";
import Loader from "../../images/loader/Render.gif";
import Address from "../Congratulation/Address/Address";
import { format } from "date-fns";
import axios from "axios";
import TokenDecrypt from "../../Token/TokenDecrypt";
import getAuthToken from "../../Token/getAuthToken";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: "10PX",
  boxShadow: 24,
};

const PnrImport = () => {
  const tokenise = TokenDecrypt();
  const token = getAuthToken();
  const location = useLocation();
  const navigate = useNavigate();
  const [importDetails, setImportDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const pnr = location?.state?.pnr;
  const system = location?.state?.system;

  useEffect(() => {
    if (Object.keys(tokenise?.staffdata).length > 0) {
      navigate("/agent/product");
    }
  }, [tokenise]);

  const fetchData = (e) => {
    setIsLoading(true);
    const url = `${import.meta.env.REACT_APP_API_URL}/agent/flight/booking/check/${system}/${pnr}`;
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(url, config)
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "error") {
          Swal.fire({
            icon: "error",
            title: data?.message,
            confirmButtonText: "Ok",
            confirmButtonColor: "var(--primary-color)",
          }).then(() => {
            navigate("/agent/product");
            setIsLoading(false);
          });
        } else if (data?.statusCode === 302) {
          setIsLoading(false);
          Swal.fire({
            icon: "error",
            title: data?.message,
            confirmButtonText: "Ok",
            confirmButtonColor: "var(--primary-color)",
          }).then(() => navigate("/agent/product"));
        } else if (data?.errors?.[0]?.type === "BOOKING_NOT_FOUND") {
          setIsLoading(false);
          Swal.fire({
            icon: "error",
            title: "Booking not found",
            confirmButtonText: "Ok",
            confirmButtonColor: "var(--primary-color)",
          }).then(() => navigate("/agent/product"));
        } else {
          setImportDetails(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Failed To Fetch",
          confirmButtonText: "Ok",
          confirmButtonColor: "var(--primary-color)",
        }).then(() => {
          navigate("/agent/product");
          setIsLoading(false);
        });
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleImport = async () => {
    setLoading(true);

    const config = {
      url: `${import.meta.env.REACT_APP_API_URL}/agent/flight/booking/import/${system}/${pnr}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.request(config);
      if (response.data.status === "error") {
        throw new Error(response.data.message);
      }
      Swal.fire({
        icon: "sucess",
        title: "Data Imported",
        confirmButtonText: "Ok",
        confirmButtonColor: "var(--primary-color)",
      }).then(() => {
        navigate("/agent/queues");
        setIsLoading(false);
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.message,
        confirmButtonText: "Ok",
        confirmButtonColor: "var(--red)",
      }).then(() => {
        navigate("/agent/product");
        setIsLoading(false);
      });
    } finally {
      setLoading(false);
    }
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
      <Container sx={{ mt: { xs: 12, sm: 12, md: 2 } }}>
        {importDetails ? (
          <Box textAlign="right">
            <Box mb={2}>
              {importDetails?.fares === undefined ||
                importDetails?.travelers[0]?.identityDocuments === undefined ? (
                <Button
                  sx={{
                    background: "var(--primary-color)",
                    color: "white",
                    padding: "5px 20px",
                    "&:hover": {
                      background: "var(--primary-color)",
                      color: "white",
                    },
                    width: "300px",
                  }}
                  onClick={() => setOpen(true)}
                >
                  Click to Import
                </Button>
              ) : (
                <Button
                  sx={{
                    background: "var(--primary-color)",
                    color: "white",
                    padding: "5px 20px",
                    "&:hover": {
                      background: "var(--primary-color)",
                      color: "white",
                    },
                    width: "300px",
                  }}
                  onClick={handleImport}
                >
                  {loading ? "Waiting for Response..." : "Click to Import"}
                </Button>
              )}
            </Box>
            <Box my={2}>
              <Typography
                sx={{
                  width: "100%",
                  color: "var(--white)",
                  fontWeight: "500",
                  bgcolor: "var(--primary-color)",
                  px: 2,
                  py: 1,
                }}
              >
                Flight Information
              </Typography>
              <Box className="flight-queue-detail">
                <Box>
                  <table width="100%">
                    <thead>
                      <tr>
                        <th width="15%">Flight</th>
                        <th width="23%">Departure From</th>
                        <th width="23%">Arrival To</th>
                        <th width="12%">Depart At</th>
                        <th width="12%">Arrive At</th>
                        <th width="15%">Info</th>
                      </tr>
                    </thead>
                    <tbody>
                      {importDetails?.flights
                        ? importDetails?.flights?.map((data, index) => (
                          <tr key={index}>
                            <td>
                              {data?.airlineName} {data?.airlineCode}-
                              {data?.flightNumber}
                              <br />
                              {data?.aircraftTypeName && (
                                data.aircraftTypeName.toUpperCase().includes("BOEING") || data.aircraftTypeName.toUpperCase().includes("AIRBUS")
                                  ? data.aircraftTypeName
                                  : data.aircraftTypeName.charAt(0) === "7"
                                  ? `Boeing ${data.aircraftTypeName}`
                                  : ["A3", "A2", "22", "32", "33", "34", "35", "38"].includes(data.aircraftTypeName.slice(0, 2))
                                  ? `Airbus ${data.aircraftTypeName}`
                                  : data.aircraftTypeName
                              )}
                            </td>
                            <td>
                              ({data.fromAirportCode}){" "}
                              <Address code={data.fromAirportCode} />
                              <br />
                              {data?.departureTerminalName || null}{" "}
                              {data?.departureGate
                                ? `Gate: ${data?.departureGate || null}`
                                : null}
                            </td>
                            <td>
                              ({data.toAirportCode}){" "}
                              <Address code={data.toAirportCode} />
                              <br />
                              {data?.arrivalTerminalName || null}{" "}
                              {data?.arrivalGate
                                ? `Gate: ${data?.arrivalGate || null}`
                                : null}
                            </td>
                            <td>
                              {format(
                                new Date(data?.departureDate),
                                "dd MMM yyyy"
                              )}{" "}
                              {data.departureTime?.slice(0, 5)}
                            </td>
                            <td>
                              {format(
                                new Date(data?.arrivalDate),
                                "dd MMM yyyy"
                              )}{" "}
                              {data.arrivalTime?.slice(0, 5)}
                            </td>
                            <td>
                              {data?.cabinTypeName?.toLowerCase()}-
                              {data?.bookingClass}
                            </td>
                          </tr>
                        ))
                        : null}
                    </tbody>
                  </table>
                </Box>
              </Box>
            </Box>
            <Box my={2}>
              <Typography
                sx={{
                  width: "100%",
                  color: "var(--white)",
                  fontWeight: "500",
                  bgcolor: "var(--primary-color)",
                  px: 2,
                  py: 1,
                }}
              >
                Price BreakDown
              </Typography>
              <Box className="flight-queue-detail">
                <Box>
                  <Box>
                    <table>
                      <tr>
                        <th width="20%">Passenger </th>
                        <th width="20%">Base Fare </th>
                        <th width="20%">Tax</th>
                        <th width="20%">Sub-Total Fare</th>
                        <th width="20%">Baggage</th>
                      </tr>

                      <tbody>
                        {importDetails?.fares
                          ? importDetails?.fares?.map((data, index) => (
                            <tr key={index}>
                              <td>
                                {data?.pricedTravelerType === "ADT"
                                  ? "Adult"
                                  : data?.pricedTravelerType === "INF"
                                    ? "Infant"
                                    : "Child"}
                                {" X "}
                                {data?.travelerIndices?.length || 1}
                              </td>
                              <td>{data?.totals?.subtotal} PKR</td>
                              <td>{data?.totals?.taxes} PKR</td>
                              <td>{data?.totals?.total} PKR</td>
                              <td>
                                {data?.fareConstruction[0]
                                  ?.checkedBaggageAllowance
                                  ?.totalWeightInKilograms
                                  ? `${data?.fareConstruction[0]?.checkedBaggageAllowance?.totalWeightInKilograms} Kg`
                                  : null}
                                {data?.fareConstruction[0]
                                  ?.checkedBaggageAllowance?.maximumPieces
                                  ? `${data?.fareConstruction[0]?.checkedBaggageAllowance?.maximumPieces} Peices`
                                  : null}
                              </td>
                            </tr>
                          ))
                          : null}
                      </tbody>
                    </table>
                  </Box>

                  <table className="flight-queue-detail table-data">
                    <tr>
                      <td width="20%">Total Passenger</td>
                      <td width="20%">
                        Total Base Fare{" "}
                        {(importDetails?.fares &&
                          `${importDetails?.fares[0]?.totals?.subtotal} PKR`) ||
                          "Please Load Fare"}
                      </td>
                      <td width="20%">
                        Total Taxes{" "}
                        {(importDetails?.fares &&
                          `${importDetails?.fares[0]?.totals?.taxes} PKR`) ||
                          "Please Load Fare"}
                      </td>
                      <td width="40%">
                        Total Amount{" "}
                        {(importDetails?.fares &&
                          `${importDetails?.fares[0]?.totals?.total} PKR`) ||
                          "Please Load Fare"}
                      </td>
                    </tr>
                  </table>
                </Box>
              </Box>
            </Box>
            <Box my={3}>
              <Typography
                sx={{
                  width: "100%",
                  color: "var(--white)",
                  fontWeight: "500",
                  bgcolor: "var(--primary-color)",
                  px: 2,
                  py: 1,
                }}
              >
                Passenger Information
              </Typography>
              <Box className="queue-detail-passenger-detail">
                {importDetails?.travelers
                  ? importDetails?.travelers?.map((traveler) => (
                    <Box>
                      <Box
                        p="3px 5px"
                        border="1px solid #DEDEDE"
                        borderRadius="4px"
                        my="2px"
                        display={"flex"}
                        justifyContent={"space-between"}
                        width={"100%"}
                      >
                        <h5
                          style={{
                            color: "var(--secondary-color)",
                            fontWeight: "500",
                            fontSize: "15px",
                          }}
                        >
                          {traveler?.givenName?.slice(
                            traveler?.givenName?.lastIndexOf(" ")
                          )}{" "}
                          {traveler?.givenName?.slice(
                            0,
                            traveler?.givenName?.lastIndexOf(" ") ||
                            "First Name"
                          )}{" "}
                          {traveler?.surname || "Last Name"}
                        </h5>
                      </Box>

                      <Box
                        border="1px solid #DEDEDE"
                        borderRadius="4px"
                        p="3px 5px"
                        mb={2}
                      >
                        <Grid container spacing={{ xs: 1, sm: 2 }}>
                          <Grid item xs={4} sm={3} md={2}>
                            <h5>First Name</h5>
                            <h6>
                              {traveler?.givenName?.slice(
                                0,
                                traveler?.givenName?.lastIndexOf(" ") ||
                                "First Name"
                              )}
                            </h6>
                          </Grid>
                          <Grid item xs={4} sm={3} md={2}>
                            <h5>Last Name</h5>
                            <h6>{traveler?.surname || "Last Name"}</h6>
                          </Grid>
                          <Grid item xs={4} sm={3} md={2}>
                            <h5>Nationality</h5>
                            <h6>
                              {(traveler?.identityDocuments &&
                                traveler?.identityDocuments[0]
                                  ?.residenceCountryCode) ||
                                "Country Code"}
                            </h6>
                          </Grid>

                          <Grid item xs={4} sm={3} md={2}>
                            <h5>Date of Birth</h5>
                            <h6>
                              {traveler?.identityDocuments &&
                                traveler?.identityDocuments[0]?.birthDate
                                ? format(
                                  new Date(
                                    traveler?.identityDocuments[0]?.birthDate
                                  ),
                                  "dd MMM yyyy"
                                )
                                : "Date of Birth"}
                            </h6>
                          </Grid>

                          <Grid item xs={4} sm={3} md={2}>
                            <h5>Gender</h5>
                            <h6>
                              {(traveler?.identityDocuments &&
                                traveler?.identityDocuments[0]?.gender) ||
                                "Gender"}
                            </h6>
                          </Grid>

                          <Grid item xs={4} sm={3} md={2}>
                            <h5>Pax Type</h5>
                            <h6>{traveler?.type || "Type"}</h6>
                          </Grid>

                          <Grid item xs={6} sm={3} md={2}>
                            <h5>Passport Number</h5>
                            <h6>
                              {(traveler?.identityDocuments &&
                                traveler?.identityDocuments[0]?.documentNumber?.toUpperCase()) ||
                                "Domestic Flight"}
                            </h6>
                          </Grid>
                          <Grid item xs={6} sm={3} md={2}>
                            <h5>Expire Date</h5>

                            <h6>
                              {traveler?.identityDocuments &&
                                traveler?.identityDocuments[0]?.expiryDate
                                ? format(
                                  new Date(
                                    traveler?.identityDocuments[0]?.expiryDate
                                  ),
                                  "dd MMM yyyy"
                                )
                                : "Expire Date"}
                            </h6>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  ))
                  : null}
              </Box>
            </Box>
          </Box>
        ) : null}
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={style} bgcolor="#fff" p="25px">
            <Typography
              sx={{ color: "crimson", fontWeight: 500, fontSize: 18 }}
            >
              You cannot import this pnr. This pnr not loaded and passenger
              passport number is missing. Please load fare and try again.
            </Typography>
            <Typography
              sx={{
                mt: 2,
                background: "var(--secondary-color)",
                color: "white",
                padding: "5px 20px",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => setOpen(false)}
            >
              Close
            </Typography>
          </Box>
          {/* </from> */}
        </Modal>
      </Container>
    </Box>
  );
};

export default PnrImport;
