import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import commaNumber from "comma-number";
import AddIcon from "@mui/icons-material/Add";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import RemoveIcon from "@mui/icons-material/Remove";
import "./FlightInfoDetails.css";
import { useState } from "react";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import ManIcon from "@mui/icons-material/Man";
import { FaBaby } from "react-icons/fa";
import SessionTimer from "../Shared/SessionTimer/SessionTimer";
// import infant from '../../images/Icon/noun-baby-165803.svg';
import SupportIcon from "../../images/Icon/supportIcon.svg";
import smsIcon from "../../images/Icon//smsIcon.svg";
import Link from "@mui/material/Link";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
const FlightInfoDetails = ({
  flightData,
  loadData,
  adultCount,
  childCount,
  infantCount,
  isLoaded,
  setIsLoaded,
}) => {
  const users = secureLocalStorage.getItem("user-info");
  const [expanded, setExpanded] = useState("panel1");
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ marginTop: { sm: "20px", md: "0px" } }}>
      {/*  //TODO:price break down start here */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "column", lg: "row" },
          justifyContent: { lg: "space-between" },
          alignItems: { lg: "center" },
        }}
      >
        <Typography
          variant="p"
          sx={{
            fontSize: "14px",
            color: "#293247",
            fontFamily: "poppins",
            fontWeight: "500",
          }}
        >
          Price Breakdown
        </Typography>
        <Typography
          variant="p"
          sx={{
            fontSize: "12px",
            color: "#71727C",
            fontFamily: "poppins",
            fontWeight: "500",
            mr: 1,
          }}
        >
          Price are shown in PKR
        </Typography>
      </Box>

      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          style={{
            background: "var(--primary-color)",
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              height: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <ManIcon style={{ color: "#fff", fontSize: "25px" }} />
                <Typography sx={{ color: "#fff", fontSize: "14px" }}>
                  {adultCount}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                }}
              >
                <AccessibilityIcon
                  style={{ color: "#fff", fontSize: "25px" }}
                />
                <Typography sx={{ color: "#fff", fontSize: "14px" }}>
                  {childCount}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                }}
              >
                <svg
                  width="25px"
                  height="25px"
                  version="1.1"
                  viewBox="0 0 1200 1200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="white">
                    <path d="m1122 424.8c0 100.07-81.125 181.2-181.2 181.2s-181.2-81.125-181.2-181.2 81.125-181.2 181.2-181.2 181.2 81.125 181.2 181.2" />
                    <path d="m1064.4 795.6h-72l-135.6-162c-4.8008-4.8008-9.6016-9.6016-14.398-13.199-33.602-30-76.801-48-124.8-48l-226.8-0.003906 30 374.4h198c51.602 0 99.602-21.602 133.2-56.398l21.602 26.398c14.398 18 36 27.602 57.602 30h4.8008 4.8008 123.6c40.801 0 75.602-33.602 75.602-75.602-1.207-41.996-34.809-75.594-75.609-75.594z" />
                    <path d="m330 752.4-42 43.203h-147.6c-40.801 0-75.602 33.602-75.602 75.602 0 40.801 33.602 75.602 75.602 75.602h178.8c24 0 44.398-10.801 58.801-27.602l58.801-58.801c28.801-28.801 28.801-76.801 0-106.8s-76.801-30-106.8-1.2031z" />
                  </g>
                </svg>
                {/* <img style={{width:"25px",height:"25px", backgroundColor: '#fff', color:"red", fontSize: '25px' }} src={infant} /> */}
                {/* <FaBaby style={{ color: '#fff', fontSize: '23px' }} /> */}
                <Typography sx={{ color: "#fff", fontSize: "14px" }}>
                  {infantCount}
                </Typography>
              </Box>
            </Box>
            {/* <Typography
              style={{
                fontSize: '14px',
                color: 'var(--white)',
                fontFamily: 'poppins',
                fontWeight: '500',
              }}
            >
              Price Breakdown
            </Typography> */}
            <Box>
              {expanded === "panel1" ? (
                <RemoveIcon style={{ color: "#fff", fontSize: "25px" }} />
              ) : (
                <AddIcon style={{ color: "#fff", fontSize: "25px" }} />
              )}
            </Box>
          </Box>
        </AccordionSummary>
        {/* Total Payable Amount */}
        <AccordionDetails className="flight-accordian2">
          <Box>
            <Typography
              sx={{
                color: "var(--black)",
                fontFamily: "poppins",
                fontSize: "14px",
                fontWeight: "500",
                mt: 1,
              }}
            >
              Total Payable
            </Typography>
            <Typography
              style={{
                color: "var(--black)",
                fontFamily: "poppins",
                fontSize: "22px",
                fontWeight: "500",
              }}
            >
              {/* {commaNumber(totalFares)} PKR */}
            </Typography>
          </Box>

          <Box>
            {flightData?.PriceBreakDown?.map((data) => (
              <Box mb={2}>
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "var(-third-color)",
                    fontFamily: "poppins",
                    fontWeight: "500",
                  }}
                >
                  {data?.PaxType === "ADT"
                    ? "Adult"
                    : data?.PaxType === "INF"
                    ? "Infant"
                    : "Child"}{" "}
                  x {data?.PaxCount}
                </Typography>

                <Grid container justifyContent="space-between">
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "var(-third-color)",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    Base
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "var(-third-color)",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    {commaNumber(
                      parseInt(data?.BaseFare) * parseInt(data?.PaxCount)
                    )}{" "}
                    PKR
                  </Typography>
                </Grid>

                <Grid container justifyContent="space-between">
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "var(-third-color)",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    Taxes
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "var(-third-color)",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    {commaNumber(
                      parseInt(data?.Taxes) * parseInt(data?.PaxCount)
                    )}{" "}
                    PKR
                  </Typography>
                </Grid>

                <Grid container justifyContent="space-between">
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "#22222",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    Total Fare
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "var(-third-color)",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    {commaNumber(
                      parseInt(data?.TotalFare) * parseInt(data?.PaxCount)
                    )}{" "}
                    PKR
                  </Typography>
                </Grid>
                <Box my={2} height="2px" bgcolor="#DEDEDE"></Box>
              </Box>
            ))}
          </Box>
          {/* <Box my={2} height="2px" bgcolor="#DEDEDE"></Box> */}
          <Grid container justifyContent="space-between">
            <Typography
              style={{
                fontSize: "12px",
                color: "var(-third-color)",
                fontFamily: "poppins",
                fontWeight: "500",
              }}
            >
              Total PAX
            </Typography>
            <Typography
              style={{
                fontSize: "12px",
                color: "var(-third-color)",
                fontFamily: "poppins",
                fontWeight: "500",
              }}
            >
              {adultCount + childCount + infantCount}&#128100;
            </Typography>
          </Grid>
          <Grid container justifyContent="space-between">
            <Typography
              style={{
                fontSize: "12px",
                color: "var(-third-color)",
                fontFamily: "poppins",
                fontWeight: "500",
              }}
            >
              Total Base Fare
            </Typography>
            <Typography
              style={{
                fontSize: "12px",
                color: "var(-third-color)",
                fontFamily: "poppins",
                fontWeight: "500",
              }}
            >
              {commaNumber(flightData?.BaseFare)} PKR
            </Typography>
          </Grid>
          <Grid container justifyContent="space-between">
            <Typography
              style={{
                fontSize: "12px",
                color: "var(-third-color)",
                fontFamily: "poppins",
                fontWeight: "500",
              }}
            >
              Total TAX
            </Typography>
            <Typography
              style={{
                fontSize: "12px",
                color: "var(-third-color)",
                fontFamily: "poppins",
                fontWeight: "500",
              }}
            >
              {commaNumber(flightData?.Taxes)} PKR
            </Typography>
          </Grid>
          <Grid container justifyContent="space-between">
            <Typography
              style={{
                fontSize: "12px",
                color: "var(-third-color)",
                fontFamily: "poppins",
                fontWeight: "500",
              }}
            >
              Total Gross Fare
            </Typography>
            <Typography
              style={{
                fontSize: "12px",
                color: "var(-third-color)",
                fontFamily: "poppins",
                fontWeight: "500",
              }}
            >
              {commaNumber(flightData?.GrossFare)} PKR
            </Typography>
          </Grid>
          <Box my={2} height="2px" bgcolor="#DEDEDE"></Box>
          <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="p"
                sx={{ color: "#ED5A2B", fontSize: "12px" }}
              >
                Commission & Saving
              </Typography>
              <Typography
                variant="p"
                sx={{ color: "#ED5A2B", fontSize: "12px" }}
              >
                {commaNumber(
                  Math.round(
                    flightData?.GrossFare -
                    flightData?.NetFare?.toFixed(2) || 0
                  )
                )}{" "} PKR&nbsp;
              </Typography>
            </Box>
          <Grid container justifyContent="space-between">
            <Typography
              style={{
                fontSize: "12px",
                color: "#222222",
                fontFamily: "poppins",
                fontWeight: "500",
              }}
            >
              Grand Total
            </Typography>
            <Typography
              style={{
                fontSize: "12px",
                color: "var(--secondary-color)",
                fontFamily: "poppins",
                fontWeight: "500",
              }}
            >
              {commaNumber(Math.round(flightData?.NetFare).toFixed(2))} PKR
            </Typography>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {/* //TODO: price break down end here */}
      {/* //TODO: Baggage Policy */}

      {/* //TODO: End Baggage Policy */}
      {/* //Todo: Cancellation Policy Section */}

      {/* //Todo: End Cancellation Policy Section */}

      {/* Session Timer */}
      <Box
        sx={{
          my: 2,
          p: 2,
          bgcolor: "#FFFFFF",
          boxShadow:
            "-0.452679px 4.97947px 36px rgba(0, 0, 0, 0.09), -0.0905357px 0.995893px 5.85px rgba(0, 0, 0, 0.045)",

          borderRadius: "5px",
        }}
      >
        <Typography variant="p" sx={{ fontSize: "14px", color: "#222222" }}>
          For any assistance visit{" "}
          <span style={{ color: "var(--primary-color)", fontWeight: "500" }}>
            support center
          </span>
        </Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 1 }}>
          <SupportAgentIcon
            sx={{
              color: "var(--primary-color)",

              cursor: "pointer",
            }}
          />

          <a
            style={{
              textDecoration: "none",
              fontSize: "13px",
              color: "var(--primary-color)",
              fontWeight: 500,
            }}
            href="tel:880241356244"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            +880241356244
          </a>
        </Box>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center", my: "4px" }}>
          <WhatsAppIcon
            sx={{
              color: "var(--primary-color)",

              cursor: "pointer",
            }}
          />

          <a
            style={{
              textDecoration: "none",
              fontSize: "13px",
              color: "var(--primary-color)",
              fontWeight: 500,
            }}
            href="https://wa.me/8801409965900"
            target="_blank"
            rel="noreferrer"
          >
            +8801409965900
          </a>
        </Box>
      </Box>
      <Box
        sx={{
          p: 2,
          bgcolor: "#FFFFFF",
          boxShadow:
            "-0.452679px 4.97947px 36px rgba(0, 0, 0, 0.09), -0.0905357px 0.995893px 5.85px rgba(0, 0, 0, 0.045)",

          borderRadius: "5px",
        }}
      >
        <Typography
          sx={{
            color: "#122E55",
            display: "flex",
            gap: 2,
            alignItems: "center",
            fontWeight: 500,
          }}
        >
          Time Remaining
          <SessionTimer />
        </Typography>

        <Typography
          variant="p"
          sx={{ fontSize: "12px", marginTop: "8px", color: "#71727C" }}
        >
          For security Reason your season will close autometically
        </Typography>
      </Box>
    </Box>
  );
};

export default FlightInfoDetails;
