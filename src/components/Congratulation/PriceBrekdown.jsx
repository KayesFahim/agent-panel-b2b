import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Chip
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const commaNumber = (num) => {
  if (num === null || num === undefined) return "0";
  return num.toLocaleString();
};

const PriceBreakdown = ({ allData, account }) => {
  const [expanded, setExpanded] = useState("panel1");

  useEffect(() => {
    if (allData?.bookingdata?.status !== "Ticketed") {
      setExpanded("panel1");
    } else {
      setExpanded(false);
    }
  }, [allData?.bookingdata?.status]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const priceData =
    allData?.bookingdata?.itenary?.FlightInfo?.PriceBreakDown ||
    allData?.bookingdata?.itenary?.PriceBreakDown;

  return (
    <Box>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{
          boxShadow: "none",
          border: "none",
          "&:before": { display: "none" },
          bgcolor: "transparent"
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "var(--neutral-600)" }} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{
            background: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
            minHeight: "48px !important",
            "& .MuiAccordionSummary-content": {
              margin: "12px 0 !important",
            }
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              pr: 1
            }}
          >
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "var(--neutral-800)",
                  fontWeight: 700,
                }}
              >
                💰 Price Breakdown
              </Typography>
              <Typography
                sx={{
                  fontSize: "11px",
                  color: "var(--neutral-500)",
                  fontWeight: 500,
                }}
              >
                (PKR)
              </Typography>
            </Box>
          </Box>
        </AccordionSummary>

        <AccordionDetails sx={{ p: 2, bgcolor: "#ffffff" }}>
          {priceData?.map((data, idx) => (
            <Box key={data.PaxType + data.PaxCount + idx} sx={{ mb: 2 }}>
              {/* Passenger Badge Label */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, pb: 0.5, borderBottom: "1px dashed #e2e8f0" }}>
                <Chip
                  label={`${data.PaxType === "ADT" ? "👤 Adult" : data.PaxType === "INF" ? "👶 Infant" : "🧒 Child"} × ${data?.PaxCount}`}
                  size="small"
                  sx={{
                    height: "20px",
                    fontSize: "11px",
                    fontWeight: 600,
                    bgcolor: "rgba(4, 135, 199, 0.06)",
                    color: "var(--primary-color)",
                  }}
                />
              </Box>

              {/* Fare Items */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.6, pl: 0.5 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontSize: "12px", color: "var(--neutral-500)" }}>Base Fare</Typography>
                  <Typography sx={{ fontSize: "12px", color: "var(--neutral-700)", fontWeight: 500 }}>
                    PKR {commaNumber(data?.BaseFare * data?.PaxCount)}
                  </Typography>
                </Box>
                
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontSize: "12px", color: "var(--neutral-500)" }}>Taxes & Fees</Typography>
                  <Typography sx={{ fontSize: "12px", color: "var(--neutral-700)", fontWeight: 500 }}>
                    PKR {commaNumber((parseInt(data?.Taxes || 0) + parseInt(data?.ServiceFee || 0)) * data?.PaxCount)}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.2 }}>
                  <Typography sx={{ fontSize: "12px", color: "var(--neutral-600)", fontWeight: 600 }}>Subtotal</Typography>
                  <Typography sx={{ fontSize: "12px", color: "var(--neutral-800)", fontWeight: 600 }}>
                    PKR {commaNumber(parseInt(data?.TotalFare || 0) * data?.PaxCount)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}

          {/* Customer Summary Card Block */}
          <Box sx={{ bgcolor: "#f8fafc", p: 1.5, borderRadius: "8px", mt: 2, border: "1px solid #e2e8f0" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
              
              {/* Gross Fare */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: "12px", color: "var(--neutral-600)" }}>Total Customer Fare</Typography>
                <Typography sx={{ fontSize: "12px", color: "var(--neutral-700)", fontWeight: 500 }}>
                  PKR {commaNumber(Math.round(allData?.bookingdata?.itenary?.GrossFare || 0))}
                </Typography>
              </Box>

              {/* Commission Details */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ fontSize: "12px", color: "#e05e00", fontWeight: 500 }}>Commission & Saving</Typography>
                <Typography sx={{ fontSize: "12px", color: "#e05e00", fontWeight: 700 }}>
                  - PKR {commaNumber(Math.round(
                    (allData?.bookingdata?.itenary?.GrossFare || 0) -
                    (allData?.bookingdata?.itenary?.NetFare || 0)
                  ))}
                </Typography>
              </Box>

              <Box sx={{ my: 0.5, height: "1px", bgcolor: "#cbd5e1" }} />

              {/* Net Payable */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ fontSize: "13px", color: "var(--neutral-800)", fontWeight: 700 }}>Total Payable</Typography>
                <Typography sx={{ fontSize: "15px", color: "var(--primary-color)", fontWeight: 800 }}>
                  PKR {commaNumber(Math.round(allData?.bookingdata?.itenary?.NetFare || 0))}
                </Typography>
              </Box>



            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default PriceBreakdown;
