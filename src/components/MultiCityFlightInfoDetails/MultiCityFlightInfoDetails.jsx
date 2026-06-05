import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import commaNumber from "comma-number";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";
import { Container } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;

export const MultiCityFlightInfoDetails = ({
  loadData,
  searchData,
  totalFares,
  adultCount,
  childCount,
  infant,
}) => {
  const users = secureLocalStorage.getItem("user-info");
  const [expanded, setExpanded] = useState("panel1");
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const pricebreakdown = searchData?.pricebreakdown;
  // pricebreakdown[0].BaseFare

  let totalBaseFare;
  let totalTax;

  if (adultCount >= 1 && childCount >= 1 && infant >= 1) {
    const adultBaseFare = parseInt(pricebreakdown[0]?.BaseFare) * adultCount;
    const childBaseFare = parseInt(pricebreakdown[1]?.BaseFare) * childCount;
    const infantBaseFare = parseInt(pricebreakdown[2]?.BaseFare) * infant;
    const adultTax = parseInt(pricebreakdown[0]?.Tax) * adultCount;
    const childTax = parseInt(pricebreakdown[1]?.Tax) * childCount;
    const infantTax = parseInt(pricebreakdown[2]?.Tax) * infant;
    totalBaseFare = adultBaseFare + childBaseFare + infantBaseFare;
    totalTax = adultTax + childTax + infantTax;
  } else if (adultCount >= 1 && childCount >= 1) {
    const adultBaseFare = parseInt(pricebreakdown[0]?.BaseFare) * adultCount;
    const childBaseFare = parseInt(pricebreakdown[1]?.BaseFare) * childCount;
    const adultTax = parseInt(pricebreakdown[0]?.Tax) * adultCount;
    const childTax = parseInt(pricebreakdown[1]?.Tax) * childCount;
    totalBaseFare = adultBaseFare + childBaseFare;
    totalTax = adultTax + childTax;
  } else if (adultCount >= 1 && infant >= 1) {
    const adultBaseFare = parseInt(pricebreakdown[0]?.BaseFare) * adultCount;
    const infantBaseFare = parseInt(pricebreakdown[2]?.BaseFare) * infant;
    const adultTax = parseInt(pricebreakdown[0]?.Tax) * adultCount;
    const infantTax = parseInt(pricebreakdown[2]?.Tax) * infant;
    totalBaseFare = adultBaseFare + infantBaseFare;
    totalTax = adultTax + infantTax;
  } else {
    const adultBaseFare = parseInt(pricebreakdown[0]?.BaseFare) * adultCount;
    const adultTax = parseInt(pricebreakdown[0]?.Tax) * adultCount;
    totalBaseFare = adultBaseFare;
    totalTax = adultTax;
  }

  return (
    <Container>
      <Box style={{ marginTop: "20px" }}>
        {/*  //TODO:price break down start here */}
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            boxShadow: "none",
            borderRadius: "0px",
            border: "2px solid var(--gray)",
          }}
        >
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            style={{
              background: "var(--gray)",
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
              <Typography
                style={{
                  fontSize: "14px",
                  color: "var(--white)",
                  fontFamily: "poppins",
                  fontWeight: "500",
                }}
              >
                Price Breakdown
              </Typography>
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
                style={{
                  color: "var(--black)",
                  fontFamily: "poppins",
                  fontSize: "14px",
                  fontWeight: "500",
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
                {commaNumber(totalFares)} PKR
              </Typography>
            </Box>
            {adultCount >= 1 && childCount >= 1 && infant >= 1 ? (
              <Box>
                <Box>
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "var(-third-color)",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    Adult x{adultCount}
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
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(
                        parseInt(pricebreakdown[0]?.BaseFare) * adultCount
                      )}{" "}
                      PKR
                    </Typography>
                  </Grid>

                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Taxes
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(
                        parseInt(pricebreakdown[0]?.Tax) * adultCount
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
                      Service Fee
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(
                        parseInt(pricebreakdown[0]?.ServiceFee || 0) *
                          adultCount
                      )}{" "}
                      PKR
                    </Typography>
                  </Grid>
                </Box>
                <Box className="eticket-hr-line"></Box>

                <Box>
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "#222222",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    Child x{childCount}
                  </Typography>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Base
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(
                        parseInt(pricebreakdown[1]?.BaseFare) * childCount
                      )}{" "}
                      PKR
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Taxes
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(
                        parseInt(pricebreakdown[1]?.Tax) * childCount
                      )}{" "}
                      PKR
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Service Fee
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(
                        parseInt(pricebreakdown[1]?.ServiceFee || 0) *
                          childCount
                      )}{" "}
                      PKR
                    </Typography>
                  </Grid>
                </Box>
                <Box className="eticket-hr-line"></Box>

                <Box>
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "#222222",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    Infant x{infant}
                  </Typography>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Base
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(
                        parseInt(pricebreakdown[2]?.BaseFare) * infant
                      )}{" "}
                      PKR
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Taxes
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(parseInt(pricebreakdown[2]?.Tax) * infant)}{" "}
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
                      Service Fee
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(
                        parseInt(pricebreakdown[2]?.ServiceFee || 0) * infant
                      )}{" "}
                      PKR
                    </Typography>
                  </Grid>
                </Box>
              </Box>
            ) : adultCount >= 1 && childCount >= 1 ? (
              <Box>
                <Box>
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "var(-third-color)",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    Adult x{adultCount}
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
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(
                        parseInt(pricebreakdown[0]?.BaseFare) * adultCount
                      )}{" "}
                      PKR
                    </Typography>
                  </Grid>

                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Taxes
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(
                        parseInt(pricebreakdown[0]?.Tax) * adultCount
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
                      Service Fee
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(
                        parseInt(pricebreakdown[0]?.ServiceFee || 0) *
                          adultCount
                      )}{" "}
                      PKR
                    </Typography>
                  </Grid>
                </Box>
                <Box className="eticket-hr-line"></Box>

                <Box>
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "#222222",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    Child x{childCount}
                  </Typography>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Base
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(
                        parseInt(pricebreakdown[1]?.BaseFare) * childCount
                      )}{" "}
                      PKR
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Taxes
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(
                        parseInt(pricebreakdown[1]?.Tax) * childCount
                      )}{" "}
                      PKR
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Service Fee
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(
                        parseInt(pricebreakdown[1]?.ServiceFee || 0) *
                          childCount
                      )}{" "}
                      PKR
                    </Typography>
                  </Grid>
                </Box>
                <Box className="eticket-hr-line"></Box>
              </Box>
            ) : adultCount >= 1 && infant >= 1 ? (
              <Box>
                <Box>
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "var(-third-color)",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    Adult x{adultCount}
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
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(
                        parseInt(pricebreakdown[0]?.BaseFare) * adultCount
                      )}{" "}
                      PKR
                    </Typography>
                  </Grid>

                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Taxes
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(
                        parseInt(pricebreakdown[0]?.Tax) * adultCount
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
                      Service Fee
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(
                        parseInt(pricebreakdown[0]?.ServiceFee || 0) *
                          adultCount
                      )}{" "}
                      PKR
                    </Typography>
                  </Grid>
                </Box>

                <Box className="eticket-hr-line"></Box>
                <Box>
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "#222222",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    Infant x{infant}
                  </Typography>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Base
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(
                        parseInt(pricebreakdown[1]?.BaseFare) * infant
                      )}{" "}
                      PKR
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Taxes
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(parseInt(pricebreakdown[1]?.Tax) * infant)}{" "}
                      PKR
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Service Fee
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(
                        parseInt(pricebreakdown[1]?.ServiceFee || 0) * infant
                      )}{" "}
                      PKR
                    </Typography>
                  </Grid>
                </Box>
                <Box className="eticket-hr-line"></Box>
              </Box>
            ) : (
              <Box>
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "var(-third-color)",
                    fontFamily: "poppins",
                    fontWeight: "500",
                  }}
                >
                  Adult x{adultCount}
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
                      color: "var(--secondary-color)",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    {commaNumber(
                      parseInt(pricebreakdown[0]?.BaseFare) * adultCount
                    )}{" "}
                    PKR
                  </Typography>
                </Grid>

                <Grid container justifyContent="space-between">
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "#222222",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    Taxes
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "var(--secondary-color)",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    {commaNumber(parseInt(pricebreakdown[0]?.Tax) * adultCount)}{" "}
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
                    Service Fee
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "var(--secondary-color)",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    {commaNumber(
                      parseInt(pricebreakdown[0]?.ServiceFee || 0) * adultCount
                    )}{" "}
                    PKR
                  </Typography>
                </Grid>
              </Box>
            )}
            <Box my={2} height="2px" bgcolor="#DEDEDE"></Box>
            <Grid container justifyContent="space-between">
              <Typography
                style={{
                  fontSize: "12px",
                  color: "#222222",
                  fontFamily: "poppins",
                  fontWeight: "500",
                }}
              >
                Total PAX
              </Typography>
              <Typography
                style={{
                  fontSize: "12px",
                  color: "var(--secondary-color)",
                  fontFamily: "poppins",
                  fontWeight: "500",
                }}
              >
                {adultCount + childCount + infant}&#128100;
              </Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography
                style={{
                  fontSize: "12px",
                  color: "#222222",
                  fontFamily: "poppins",
                  fontWeight: "500",
                }}
              >
                Total Base Fare
              </Typography>
              <Typography
                style={{
                  fontSize: "12px",
                  color: "var(--secondary-color)",
                  fontFamily: "poppins",
                  fontWeight: "500",
                }}
              >
                {commaNumber(totalBaseFare)} PKR
              </Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography
                style={{
                  fontSize: "12px",
                  color: "#222222",
                  fontFamily: "poppins",
                  fontWeight: "500",
                }}
              >
                Total TAX
              </Typography>
              <Typography
                style={{
                  fontSize: "12px",
                  color: "var(--secondary-color)",
                  fontFamily: "poppins",
                  fontWeight: "500",
                }}
              >
                {commaNumber(totalTax)} PKR
              </Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography
                style={{
                  fontSize: "12px",
                  color: "#222222",
                  fontFamily: "poppins",
                  fontWeight: "500",
                }}
              >
                Agent Total
              </Typography>
              <Typography
                style={{
                  fontSize: "12px",
                  color: "var(--secondary-color)",
                  fontFamily: "poppins",
                  fontWeight: "500",
                }}
              >
                {commaNumber(totalFares)} PKR
              </Typography>
            </Grid>
          </AccordionDetails>
        </Accordion>
        {/* //TODO: price break down end here */}
        {/* //TODO: Baggage Policy */}

        {/* //TODO: End Baggage Policy */}
        {/* //Todo: Cancellation Policy Section */}

        {/* //Todo: End Cancellation Policy Section */}
      </Box>
    </Container>
  );
};
