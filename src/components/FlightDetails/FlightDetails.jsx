import React from "react";
import {
  Box,
  Grid,
  Tab,
  Tabs,
  Container,
  Typography,
  Tooltip,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useState } from "react";
import FlightIcon from "@mui/icons-material/Flight";
import { format } from "date-fns";
import CircleIcon from "@mui/icons-material/Circle";

const FlightDetails = ({ flightData }) => {
  const [value, setValue] = useState("0");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        bgcolor="var(--white)"
        margin={{ xs: "15px", md: "2vw 3vw" }}
        padding="8px 20px"
      >
        <Grid
          container
          justifyContent="space-between"
          borderBottom="2px solid var(--primary-color)"
        >
          <Grid item>
            <Typography
              sx={{
                color: "var(--secondary-color)",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Depart:{" "}
              <span
                style={{
                  color: "var(--primary-color)",
                }}
              >
                {flightData?.departureDate}
              </span>{" "}
            </Typography>
            <Typography
              sx={{
                color: "var(--primary-color)",
                fontSize: "14px",
              }}
            >
              {flightData?.segment === 1 ? (
                <>Non</>
              ) : (
                <>{flightData?.segment - 1} </>
              )}
              Stop {flightData?.flightduration}{" "}
              <span
                style={{
                  color: "var(--gray)",
                }}
              >
                {flightData?.segments?.map((data) => (
                  <>
                    {flightData?.system === "Sabre" ? (
                      data?.marketingcareer !== data?.operatingcareer ? (
                        <>Operated By: {data?.operatingCarrierName}</>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </>
                ))}
              </span>
            </Typography>
          </Grid>
          <Grid item>
            {flightData?.segments[0]?.departureLocation?.split(",")[0]}
            {" - "}
            {
              flightData?.segments[
                flightData?.segments?.length - 1
              ]?.arrivalLocation?.split(",")[0]
            }{" "}
          </Grid>
        </Grid>

        {flightData?.segments.map((segment, i, arr) => (
          <Box my={2}>
            <Grid container spacing={2}>
              <Grid item sm={6} md={2.5}>
                <Box width="60px" height="60px">
                  <img
                    src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segment[0]?.marketingcareer}.png`}
                    alt="flight logo"
                    className={`${flightData?.system?.toLowerCase()}`}
                  />
                </Box>
                <Typography
                  sx={{
                    color: "var(--primary-color)",
                    fontWeight: 500,
                    fontSize: "12px",
                  }}
                >
                  {segment[0]?.marketingcareerName}
                  <br />
                  <span
                    style={{
                      color: "var(--fontcolor)",
                    }}
                  >
                    {segment[0]?.marketingcareer} {segment[0]?.marketingflight}{" "}
                    & {segment[0]?.bookingcode}
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
                    {segment[0]?.departureLocation?.split(" ,")[0]},{" "}
                  </span>
                  <span
                    style={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                    }}
                  >
                    {segment[0]?.departure}
                  </span>
                  <br />
                  <Tooltip title={`${segment[0]?.departureAirport}`}>
                    <Typography
                      style={{
                        color: "var(--secondary-color)",
                        fontSize: "13px",
                      }}
                      noWrap
                    >
                      {segment[0]?.departureAirport}
                    </Typography>
                  </Tooltip>

                  <span
                    style={{
                      color: "var(--fontcolor)",
                      fontSize: "12px",
                    }}
                  >
                    {format(
                      new Date(segment[0]?.departureTime?.toString()),
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
                        xs: "10px",
                        md: "12px",
                      },
                    }}
                  >
                    {segment[0]?.flightduration}
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
              <Grid item sm={6} md={3.5}>
                <Typography>
                  <span
                    style={{
                      color: "var(--primary-color)",
                      fontSize: "20px",
                    }}
                  >
                    {segment[0]?.arrivalLocation?.split(" ,")[0]},{" "}
                  </span>
                  <span
                    style={{
                      color: "var(--primary-color)",
                      fontSize: "13px",
                    }}
                  >
                    {segment[0]?.arrival}
                  </span>
                  <br />

                  <Tooltip title={`${segment[0]?.arrivalAirport}`}>
                    <Typography
                      style={{
                        color: "var(--secondary-color)",
                        fontSize: "13px",
                      }}
                      noWrap
                    >
                      {segment[0]?.arrivalAirport}
                    </Typography>
                  </Tooltip>

                  <span
                    style={{
                      color: "var(--fontcolor)",
                      fontSize: "12px",
                    }}
                  >
                    {format(
                      new Date(segment[0]?.arrivalTime?.toString()),
                      "dd MMM yyyy hh:mm a"
                    )}
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FlightDetails;
