/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Grow,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import commaNumber from "comma-number";
import "./SingleFlight.css";
import MoreFlight from "./MoreFlight";
import FlightLayout from "./FlightLayout";
import { styled } from "@mui/material/styles";

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

const SingleFlight = ({
  flightData,
  groupedFlights,
  adultCount,
  childCount,
  infant,
  quotetionArr,
  setQuotetionArr,
  ischeapest,
}) => {
  const navigate = useNavigate();
  const [currentFlight, setCurrentFlight] = useState(flightData);

  useEffect(() => {
    setCurrentFlight(flightData);
  }, [flightData]);

  const FlightInformation = (data) => {
    navigate("/agent/flightinformation", {
      state: {
        flightData: currentFlight,
        data,
        adultCount,
        childCount,
        infant,
      },
    });
  };

  const [checked, setChecked] = useState(false);
  const handleBox = (data) => {
    const isChecked = !checked; // Use the inverse of the current state
    setChecked(isChecked);

    if (isChecked) {
      setQuotetionArr([...quotetionArr, data]); // Use 'data' instead of 'flightData'
    } else {
      const filteredArr = quotetionArr.filter(
        (item) => item.Carrier !== data.Carrier
      );
      setQuotetionArr(filteredArr);
    }
  };

  const PaxCount = adultCount + childCount + infant;
  let count = [];
  for (let i = 0; i < PaxCount; i++) {
    count.push(i);
  }

  // ----   --------Copy form ALL.js end----------
  return (
    <Box mb={2.5}>
      <Grid
        container
        className={`premium-flight-card ${ischeapest ? 'cheapest-card-highlight' : ''}`}
      >
        {ischeapest && (
          <Box className="cheapest-badge">
            Cheapest Flight
          </Box>
        )}

        {/* Left Section - Legs & Details */}
        <Grid item xs={12} md={9.5} lg={9.5} p={2.5}>
          {currentFlight?.AllLegsInfo?.map((data, index, arr) => (
            <Box key={index} mb={index < arr.length - 1 ? 2.5 : 0}>
              {/* Brand Name Badge at the top of each Leg */}
              {data?.BrandName && (
                <Box mb={1.5} display="flex" gap={1.5} alignItems="center" flexWrap="wrap">
                  {/* Grouped Fare Brand Options */}
                  {groupedFlights && groupedFlights.length >= 1 ? (
                    <Box display="flex" gap={1} alignItems="center" flexWrap="wrap">
                      {groupedFlights.map((opt, oi) => {
                        const optLeg = opt?.AllLegsInfo?.[index];
                        if (!optLeg?.BrandName) return null;

                        const isSelected = optLeg.BrandName === data.BrandName;
                        const priceDiff = (opt.NetFare || opt.GrossFare || 0) - (currentFlight.NetFare || currentFlight.GrossFare || 0);
                        const diffText = priceDiff === 0 ? "" : (priceDiff > 0 ? `(+$${Math.round(priceDiff)})` : `(-$${Math.round(Math.abs(priceDiff))})`);

                        return (
                          <Button
                            key={oi}
                            onClick={() => setCurrentFlight(opt)}
                            variant={isSelected ? "contained" : "outlined"}
                            size="small"
                            sx={{
                              fontSize: "10px",
                              px: 1.2,
                              py: 0.2,
                              borderRadius: "15px",
                              textTransform: "none",
                              minWidth: "auto",
                              fontWeight: 600,
                              borderColor: "var(--primary-color)",
                              color: isSelected ? "white" : "var(--primary-color)",
                              backgroundColor: isSelected ? "var(--primary-color)" : "transparent",
                              "&:hover": {
                                backgroundColor: isSelected ? "var(--primary-color)" : "rgba(4, 135, 199, 0.08)",
                                borderColor: "var(--primary-color)",
                              }
                            }}
                          >
                            {optLeg.BrandName} {diffText}
                          </Button>
                        );
                      })}
                    </Box>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        fontSize: "10px",
                        px: 1.2,
                        py: 0.2,
                        borderRadius: "15px",
                        textTransform: "none",
                        minWidth: "auto",
                        fontWeight: 600,
                        backgroundColor: "var(--primary-color)",
                        color: "white",
                        pointerEvents: "none"
                      }}
                    >
                      {data.BrandName}
                    </Button>
                  )}
                </Box>
              )}

              <FlightLayout
                arr={arr}
                flightData={data}
                allData={currentFlight}
                index={index}
              />
            </Box>
          ))}
        </Grid>

        {/* Right Section - Pricing & Booking */}
        <Grid
          item
          xs={12}
          md={2.5}
          lg={2.5}
          p={2.5}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderLeft: { xs: "none", md: "1px solid var(--neutral-200)" },
            borderTop: { xs: "1px solid var(--neutral-200)", md: "none" },
            background: "var(--neutral-50)",
          }}
        >
          {/* Price display with Tooltip */}
          <Box display="flex" flexDirection="column" alignItems={{ xs: "center", md: "flex-end" }}>
            <Typography variant="caption" color="var(--neutral-500)" sx={{ fontWeight: 650 }}>
              Total Fare ({currentFlight?.Currency || 'USD'})
            </Typography>
            <HtmlTooltip
              title={
                <Box p={1} sx={{ minWidth: 150 }}>
                  <Typography variant="body2" sx={{ color: "var(--primary-color)", fontWeight: 600 }}>
                    Net Fare: {currentFlight?.Currency || 'USD'} {commaNumber(Math.round(currentFlight?.NetFare))}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "var(--fontcolor)", textDecoration: "line-through" }}>
                    Gross Fare: {currentFlight?.Currency || 'USD'} {commaNumber(Math.round(currentFlight?.GrossFare))}
                  </Typography>
                  {currentFlight?.PriceBreakDown?.map((breakdown, pIdx) => (
                    <Box key={pIdx} mt={1} pt={1} borderTop="1px solid var(--neutral-300)">
                      <Typography variant="caption" display="block">
                        Pax Type: {breakdown.PaxType} (x{breakdown.PaxCount})
                      </Typography>
                      <Typography variant="caption" display="block">
                        Base: {currentFlight?.Currency} {commaNumber(breakdown.BaseFare)}
                      </Typography>
                      <Typography variant="caption" display="block">
                        Taxes: {currentFlight?.Currency} {commaNumber(breakdown.Taxes)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              }
            >
              <Box display="flex" flexDirection="column" alignItems={{ xs: "center", md: "flex-end" }} sx={{ cursor: 'pointer' }}>
                {/* Amount — h1 size with inline currency */}
                <Typography className="net-fare-text" sx={{ fontSize: '28px !important', fontWeight: '800 !important', lineHeight: 1.1, letterSpacing: '-0.5px' }}>
                  {currentFlight?.Currency === 'USD' ? '$' : (currentFlight?.Currency || 'USD') + ' '}
                  {commaNumber(Math.round(currentFlight?.NetFare))}
                </Typography>
                {currentFlight?.GrossFare > currentFlight?.NetFare && (
                  <Typography className="gross-fare-text">
                    {currentFlight?.Currency === 'USD' ? '$' : (currentFlight?.Currency || '')} {commaNumber(Math.round(currentFlight?.GrossFare))}
                  </Typography>
                )}
              </Box>
            </HtmlTooltip>
          </Box>

          {/* Badges Column */}
          <Box display="flex" flexDirection="column" gap={0.8} my={1.5} alignItems={{ xs: "center", md: "flex-end" }}>
            {/* Refundable Badge */}
            <span className={`pill-badge ${currentFlight?.Refundable ? 'pill-refundable' : 'pill-non-refundable'}`}>
              {currentFlight?.Refundable ? 'Refundable' : 'Non-Refundable'}
            </span>

            {/* Baggage Badge moved to accordion bar */}
            {/* Seats Left Badge moved to accordion bar */}

            {/* Partial Fare Option Badge
            {currentFlight?.PartialOption && (
              <span className="pill-badge pill-partial">
                💳 Partial: {currentFlight?.Currency === 'USD' ? '$' : ''}{currentFlight?.PartialFare}
              </span>
            )}
            */}
          </Box>

          {/* Booking CTA Button */}
          <Box display="flex" flexDirection="column" gap={1} width="100%">
            <Button
              onClick={() => FlightInformation(currentFlight?.AllLegs)}
              sx={{
                background: "var(--premium-gradient-primary)",
                color: "var(--white)",
                fontWeight: 600,
                borderRadius: "var(--premium-border-radius-sm)",
                py: 1,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                fontSize: "13px",
                boxShadow: "var(--premium-shadow-sm)",
                transition: "var(--premium-transition)",
                "&:hover": {
                  background: "var(--premium-gradient-primary)",
                  opacity: 0.95,
                  transform: "translateY(-1px)",
                  boxShadow: "var(--premium-shadow-md)",
                },
              }}
            >
              Book Now
            </Button>
          </Box>
        </Grid>

        {/* Accordion (MoreFlight) details */}
        <Grid item xs={12}>
          {currentFlight?.AllLegsInfo?.map((data, index, arr) => (
            <Box key={index}>
              <MoreFlight
                data={data}
                flightData={currentFlight}
                adultCount={adultCount}
                childCount={childCount}
                infant={infant}
                FlightInformation={FlightInformation}
                TripType={currentFlight?.TripType}
                allData={currentFlight}
                arr={arr}
                index={index}
                checked={checked}
                handleBox={handleBox}
              />
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default React.memo(SingleFlight);
