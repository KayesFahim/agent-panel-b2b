import React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  SwipeableDrawer,
  Stack,
  Tooltip,
  tooltipClasses,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import commaNumber from "comma-number";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import moment from "moment";
import GroupFareFlightDetails from "./GroupFareFlightDetails";
import { styled } from "@mui/material/styles";
import FlightDetails from "../SingleFlight/FlightDetails";
import "../SingleFlight/SingleFlight.css";
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "var(--transit)",
    maxWidth: 300,
    padding: "8px",
    color: "var(--black)",
    fontSize: "16px",
  },
}));
const GroupFareMoreFlight = ({
  flightData,
  FlightInformation,
  TripType,
  arr,
  data,
  index,
}) => {
  const [state, setState] = useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  const [activeTab, setActiveTab] = useState("Flight Details");

  const transitCalculation = (date1, date2) => {
    const duration = moment.duration(moment(date1).diff(moment(date2)));

    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes()) - hours * 60;
    const transit = `${Math.abs(hours)}h:${Math.abs(minutes)}min`;
    return transit;
  };
  return (
    <Box>
      {["right"].map((anchor) => (
        <Box key={anchor}>
          <Accordion
            sx={{
              borderTop: "1px solid #D7ECF9",
              display: arr.length - 1 === index ? "unset" : "none",
              width: "100%",
            }}
          >
            <AccordionSummary aria-controls="panel1-content" id="panel1-header">
              <Button
                // size="small"
                // onClick={toggleDrawer(anchor, true)}
                sx={{
                  width: "100%",
                  color: "var(--primary-color)",
                  fontWeight: 500,
                  fontSize: "12px",
                  padding: 0,
                  // py:2,
                  marginTop: { xs: 0 },
                  textTransform: "capitalize",

                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Typography
                    sx={{
                      display: arr.length - 1 === index ? "unset" : "none",
                    }}
                  >
                    {flightData?.Refundable === true ? (
                      <Typography
                        sx={{
                          color: "var(--p2)",
                          fontSize: { xs: "10px", md: "12px" },
                        }}
                      >
                        Refundable
                      </Typography>
                    ) : (
                      <Typography
                        sx={{
                          color: "var(--red)",
                          fontSize: { xs: "10px", md: "12px" },
                        }}
                      >
                        Non Refundable
                      </Typography>
                    )}
                  </Typography>

                  {index === arr?.length - 1 && (
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Typography
                        sx={{
                          color: "var(--fontcolor)",
                          fontWeight: 500,
                          fontSize: {
                            xs: "12px",
                          },
                        }}
                        noWrap
                      >
                        {flightData?.PriceBreakDown[0]?.Bag?.[0]?.Allowance ||
                          "0 kg"}
                      </Typography>

                      <Typography
                        sx={{
                          color: "var(--p2)",
                          fontWeight: 500,
                          fontSize: { xs: "10px", md: "12px" },
                        }}
                        noWrap
                      >
                        Seat:{" "}
                        {data?.Segments[0]?.SegmentCode?.seatsAvailable || 0}
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    zIndex: 10,
                  }}
                >
                  Flight Details
                  <PlayArrowIcon style={{ padding: "0", fontSize: "18px" }} />
                </Box>
              </Button>
            </AccordionSummary>
            <AccordionDetails sx={{ width: "100%" }}>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                    bottom: { md: 60, xs: 20 },
                  }}
                >
                  <Button
                    sx={{
                      fontSize: { xs: "8px", md: "10px" },
                      fontWeight: "500",
                      bgcolor:
                        activeTab === "Flight Details" ? "#222F44" : "#0487C7",
                      color: "white",
                      borderRadius: "0",
                      ":hover": {
                        bgcolor:
                          activeTab === "Flight Details"
                            ? "#222F44"
                            : "#0487C7",
                      },
                    }}
                    onClick={() => setActiveTab("Flight Details")}
                  >
                    Flight Details
                  </Button>

                  <Button
                    sx={{
                      fontSize: { xs: "8px", md: "10px" },
                      fontWeight: "500",
                      bgcolor: activeTab === "Baggage" ? "#222F44" : "#0487C7",
                      color: "white",
                      borderRadius: "0",
                      ":hover": {
                        bgcolor:
                          activeTab === "Baggage" ? "#222F44" : "#0487C7",
                      },
                    }}
                    onClick={() => setActiveTab("Baggage")}
                  >
                    Baggage
                  </Button>
                  <Button
                    sx={{
                      fontSize: { xs: "8px", md: "10px" },
                      fontWeight: "500",
                      bgcolor:
                        activeTab === "Fare Rules" ? "#222F44" : "#0487C7",
                      color: "white",
                      borderRadius: "0",
                      ":hover": {
                        bgcolor:
                          activeTab === "Fare Rules" ? "#222F44" : "#0487C7",
                      },
                    }}
                    onClick={() => setActiveTab("Fare Rules")}
                  >
                    Fare Rules
                  </Button>
                  <Button
                    sx={{
                      fontSize: { xs: "8px", md: "10px" },
                      fontWeight: "500",
                      bgcolor:
                        activeTab === "Fare Policy" ? "#222F44" : "#0487C7",
                      color: "white",
                      borderRadius: "0",
                      ":hover": {
                        bgcolor:
                          activeTab === "Fare Policy" ? "#222F44" : "#0487C7",
                      },
                    }}
                    onClick={() => setActiveTab("Fare Policy")}
                  >
                    Fare Policy
                  </Button>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Grid container spacing={1}>
                    {activeTab === "Flight Details" && (
                      <Box sx={{ width: "full" }}>
                        <Typography
                          sx={{
                            backgroundColor: "var(--p2)",
                            padding: "2px 0 2px 3vw",
                            color: "var(--white)",
                            fontWeight: 500,
                            width: { xs: "100%", sm: "30%", md: "35%" },
                          }}
                        >
                          Flight Details
                        </Typography>
                        <Box
                          bgcolor="var(--white)"
                          margin={{ xs: "15px", md: "1vw 3vw" }}
                          padding={{ xs: "7px 10px", sm: "8px 20px" }}
                          minWidth={{ xs: "100%", md: "800px", lg: "800px" }}
                          maxWidth={{ xs: "100%", md: "100%" }}
                        >
                          <Grid
                            container
                            justifyContent="space-between"
                            // borderBottom="2px solid var(--primary-color)"
                          >
                            <Grid item>
                              <Stack direction="row" spacing={2}>
                                <Typography
                                  sx={{
                                    color: "var(--secondary-color)",
                                    fontSize: { xs: 10, sm: 12 },
                                    fontWeight: 500,
                                  }}
                                >
                                  Depart:{" "}
                                  <span
                                    style={{
                                      color: "var(--primary-color)",
                                    }}
                                  >
                                    {moment(
                                      flightData?.AllLegsInfo[0]?.Segments[0]?.DepTime?.split(
                                        "+"
                                      )[0]
                                    )?.format("DD MMM YYYY")}
                                  </span>{" "}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: "var(--primary-color)",
                                    fontSize: { xs: 10, sm: 12 },
                                  }}
                                >
                                  {flightData?.AllLegsInfo[0]?.Segments
                                    ?.length === 1 ? (
                                    <>Non </>
                                  ) : (
                                    <>
                                      {flightData?.AllLegsInfo[0]?.Segments
                                        ?.length - 1}{" "}
                                    </>
                                  )}
                                  Stop{" "}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: "var(--primary-color)",
                                    fontSize: { xs: 10, sm: 12 },
                                  }}
                                >
                                  Seat:{" "}
                                  {
                                    flightData?.AllLegsInfo[0]?.Segments[0]
                                      ?.SegmentCode?.seatsAvailable
                                  }
                                </Typography>
                              </Stack>
                              <Typography
                                sx={{
                                  color: "var(--gray)",
                                  fontSize: { xs: 11, sm: 12 },
                                }}
                              >
                                {flightData?.AllLegsInfo[0]?.Segments?.map(
                                  (data) => (
                                    <>
                                      {data?.MarketingCarrier !==
                                      data?.OperatingCarrier ? (
                                        <>
                                          Operated By:{" "}
                                          {data?.OperatingCarrierName}
                                        </>
                                      ) : null}
                                    </>
                                  )
                                )}
                              </Typography>
                            </Grid>
                          </Grid>

                          {flightData?.AllLegsInfo?.map((data, i, arr) => (
                            <Box my={2} key={i}>
                              {data?.Segments?.map((item, j, arr) => (
                                <Box key={j} my={2}>
                                  <FlightDetails data={item} />
                                  <Grid container my={2}>
                                    <Grid Grid item xs={12} sm={12} md={12}>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            width: "60%",
                                            bgcolor: "#EFEFEF",
                                            display:
                                              arr?.length - 1 === j
                                                ? "none"
                                                : "flex",
                                            justifyContent: "center",
                                            p: "2px",
                                            borderRadius: "5px",
                                          }}
                                        >
                                          <Typography
                                            variant="p"
                                            sx={{
                                              color: "#0873B9",
                                              fontSize: "12px",
                                              textAlign: "center",
                                              fontWeight: 500,
                                            }}
                                          >
                                            {arr[j + 1]?.DepAirPort} [
                                            {
                                              arr[j + 1]?.DepLocation?.split(
                                                ","
                                              )[0]
                                            }
                                            ] Layover Time:{" "}
                                            {transitCalculation(
                                              arr[j + 1]?.DepTime?.split(
                                                "+"
                                              )[0],
                                              arr[j - 1 + 1]?.ArrTime?.split(
                                                "+"
                                              )[0]
                                            )}
                                          </Typography>
                                        </Box>
                                      </Box>
                                    </Grid>
                                  </Grid>
                                </Box>
                              ))}

                              <Box
                                display={
                                  arr?.length - 1 === i ? "none" : "flex"
                                }
                              >
                                <Stack direction="row" spacing={2}>
                                  <Typography
                                    sx={{
                                      color: "var(--secondary-color)",
                                      fontSize: { xs: 10, sm: 12 },
                                      fontWeight: 500,
                                    }}
                                  >
                                    Return:{" "}
                                    <span
                                      style={{
                                        color: "var(--primary-color)",
                                      }}
                                    >
                                      {moment(
                                        flightData?.AllLegsInfo[
                                          flightData?.AllLegsInfo?.length - 1
                                        ]?.Segments[0]?.DepTime?.split("+")[0]
                                      )?.format("DD MMM YYYY")}
                                    </span>{" "}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "var(--primary-color)",
                                      fontSize: { xs: 10, sm: 12 },
                                    }}
                                  >
                                    {flightData?.AllLegsInfo[
                                      flightData?.AllLegsInfo?.length - 1
                                    ]?.Segments?.length === 1 ? (
                                      <>Non </>
                                    ) : (
                                      <>
                                        {flightData?.AllLegsInfo[
                                          flightData?.AllLegsInfo?.length - 1
                                        ]?.Segments?.length - 1}{" "}
                                      </>
                                    )}
                                    Stop{" "}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "var(--primary-color)",
                                      fontSize: { xs: 10, sm: 12 },
                                    }}
                                  >
                                    Seat:{" "}
                                    {
                                      flightData?.AllLegsInfo[
                                        flightData?.AllLegsInfo?.length - 1
                                      ]?.Segments[0]?.SegmentCode
                                        ?.seatsAvailable
                                    }
                                  </Typography>
                                </Stack>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    )}

                    {activeTab === "Baggage" && (
                      <Box sx={{}}>
                        <Typography
                          sx={{
                            backgroundColor: "var(--p2)",
                            padding: "2px 0 2px 3vw",
                            color: "var(--white)",
                            fontWeight: 500,
                            width: { xs: "100%", sm: "30%", md: "35%" },
                          }}
                        >
                          Baggage
                        </Typography>
                        <Box
                          bgcolor="var(--white)"
                          margin={{ xs: "15px", md: "2vw 3vw" }}
                          padding={{ xs: "7px 10px", sm: "8px 20px" }}
                          minWidth={{ xs: "300px", sm: "400px", md: "700px" }}
                          maxWidth={{ xs: "550px", md: "100%" }}
                        >
                          <Typography
                            sx={{
                              fontSize: "13px",
                              color: "var(--primary-color)",
                            }}
                            pb={1}
                          >
                            {" "}
                            Departure Flight
                          </Typography>
                          <Box className="flight-search-table">
                            <table
                              style={{
                                borderCollapse: "collapse",
                                width: "100%",
                              }}
                            >
                              <tr>
                                <th>Baggage</th>
                                <th>Check-In</th>
                                <th>Cabin</th>
                              </tr>
                              {flightData?.PriceBreakDown?.map(
                                (data, index) => (
                                  <tr key={index}>
                                    <td>
                                      {data?.PaxType === "ADT"
                                        ? "Adult"
                                        : data?.PaxType === "INF"
                                        ? "Infant"
                                        : "Child"}
                                    </td>
                                    <td>
                                      {data?.Bag?.[0]?.Allowance || "0 kg"}
                                    </td>
                                    <td>7Kg</td>
                                  </tr>
                                )
                              )}
                            </table>
                          </Box>
                        </Box>
                        {TripType === "Return" && (
                          <Box
                            bgcolor="var(--white)"
                            margin={{ xs: "15px", md: "2vw 3vw" }}
                            padding={{ xs: "7px 10px", sm: "8px 20px" }}
                          >
                            <Typography
                              sx={{
                                fontSize: "13px",
                                color: "var(--primary-color)",
                              }}
                              pb={1}
                            >
                              {" "}
                              Return Flight
                            </Typography>
                            <Box className="flight-search-table">
                              <table
                                style={{
                                  borderCollapse: "collapse",
                                  width: "100%",
                                }}
                              >
                                <tr>
                                  <th>Baggage</th>
                                  <th>Check-In</th>
                                  <th>Cabin</th>
                                </tr>
                                {flightData?.PriceBreakDown?.map(
                                  (data, index) => (
                                    <tr key={index}>
                                      <td>
                                        {data?.PaxType === "ADT"
                                          ? "Adult"
                                          : data?.PaxType === "INF"
                                          ? "Infant"
                                          : "Child"}
                                      </td>
                                      <td>
                                        {data?.Bag?.[1]?.Allowance || "0 kg"}
                                      </td>
                                      <td>7Kg</td>
                                    </tr>
                                  )
                                )}
                              </table>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    )}

                    {activeTab === "Fare Rules" && (
                      <Box>
                        <Typography
                          sx={{
                            backgroundColor: "var(--p2)",
                            padding: "2px 0 2px 3vw",
                            color: "var(--white)",
                            fontWeight: 500,
                            width: { xs: "100%", sm: "30%", md: "35%" },
                          }}
                        >
                          Fare Rules
                        </Typography>
                        <Box
                          bgcolor="var(--white)"
                          margin={{ xs: "15px", md: "2vw 3vw" }}
                          padding={{ xs: "7px 10px", sm: "8px 20px" }}
                          minWidth={{ xs: "100%", md: "700px" }}
                          maxWidth={{ xs: "100%", md: "100%" }}
                        >
                          <Typography
                            sx={{
                              color: "var(--primary-color)",
                              fontSize: "12px",
                              fontWeight: 500,
                              padding: { xs: "5px", sm: "20px" },
                            }}
                          >
                            <Typography
                              sx={{
                                color: "var(--primary-color)",
                              }}
                            >
                              Refund or Date Change can be done as per the
                              following policies:
                            </Typography>
                            <br />
                            <br />
                            * Refund Amount = Received amount from customer -
                            Refund Charge (As per Airline Policy + AATrips
                            Convenience Fee).
                            <br />* Date Change Amount = Date change fee as per
                            Airline + Difference of fare if any + AATrips
                            Convenience Fee.
                          </Typography>
                        </Box>
                      </Box>
                    )}
                    {activeTab === "Fare Policy" && (
                      <Box>
                        <Typography
                          sx={{
                            backgroundColor: "var(--p2)",
                            padding: "2px 0 2px 3vw",
                            color: "var(--white)",
                            fontWeight: 500,
                            width: { xs: "100%", sm: "30%", md: "35%" },
                          }}
                        >
                          Fare Policy
                        </Typography>

                        <Box
                          bgcolor="var(--white)"
                          margin={{ xs: "15px", md: "2vw 3vw" }}
                          padding={{ xs: "7px 10px", sm: "8px 20px" }}
                          minWidth={{ xs: "100%", md: "700px" }}
                          maxWidth={{ xs: "100%", md: "100%" }}
                        >
                          <Typography
                            sx={{
                              color: "var(--primary-color)",
                              fontSize: "12px",
                              fontWeight: 500,
                              padding: { xs: "5px", sm: "20px" },
                            }}
                          >
                            <Typography
                              sx={{
                                color: "var(--primary-color)",
                              }}
                            >
                              Refund or Date Change can be done as per the
                              following policies:
                            </Typography>
                            <br />
                            <br />
                            * Refund Amount = Received amount from customer -
                            Refund Charge (As per Airline Policy + AATrips
                            Convenience Fee).
                            <br />* Date Change Amount = Date change fee as per
                            Airline + Difference of fare if any + AATrips
                            Convenience Fee.
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Grid>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      ))}
    </Box>
  );
};

export default React.memo(GroupFareMoreFlight);
