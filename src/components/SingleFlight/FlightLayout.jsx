import { Grid, Box, Typography, Tooltip, Stack } from "@mui/material";
import React from "react";
import Transit from "./Transit";
import CancelIcon from "@mui/icons-material/Cancel";
import moment from "moment";
const FlightLayout = ({
  flightData,
  allData,
  index,
  arr,
  icon,
}) => {
  // 
  // 

  // Calculate Layover Time
  const minitConvert = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };
  const transitCalculation = (date1, date2) => {
    const duration = moment.duration(moment(date1).diff(moment(date2)));

    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes()) - hours * 60;
    const transit = `${Math.abs(hours)}h:${Math.abs(minutes)}min`;
    return transit;
  };
    // Check if this flight is the cheapest (i.e., flightData[0])
    // const isCheapest = flightData === flightData[0];
  return (
    <Grid 
      container 
      alignItems="center" 
      spacing={2}
      sx={{
        py: 1.5,
        position: "relative"
      }}
    >
      {/* Airline / Carrier Column */}
      <Grid item xs={12} sm={3} md={3}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              overflow: "hidden",
              border: "1px solid var(--neutral-200)",
              p: 0.5,
              backgroundColor: "var(--white)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "var(--premium-shadow-sm)"
            }}
          >
            <img
              src={
                flightData?.Segments[0]?.MarketingCarrier === "XY"
                  ? `https://airlineimages.s3.ap-southeast-1.amazonaws.com/128/XY.png`
                  : `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData?.Segments[0]?.MarketingCarrier}.png`
              }
              alt={`${flightData?.Segments[0]?.MarketingCarrier}`}
              style={{ objectFit: "contain" }}
              width="100%"
              height="100%"
            />
          </Box>
          <Box minWidth={0}>
            <Tooltip title={flightData?.Segments[0]?.MarketingCarrierName || ""}>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color="var(--neutral-800)"
                noWrap
                sx={{ fontSize: "13px" }}
              >
                {flightData?.Segments[0]?.MarketingCarrierName}
              </Typography>
            </Tooltip>
            <Box display="flex" alignItems="center" gap={1} mt={0.2} flexWrap="wrap">
              <Typography variant="caption" color="var(--neutral-500)" fontWeight={500}>
                {allData?.Carrier || flightData?.Segments[0]?.MarketingCarrier} {flightData?.Segments[0]?.MarketingFlightNumber}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  bgcolor: "var(--neutral-100)", 
                  color: "var(--primary-color)", 
                  px: 0.8, 
                  py: 0.2, 
                  borderRadius: "4px",
                  fontWeight: 600,
                  fontSize: "9px"
                }}
              >
                {allData?.Cabinclass || "Economy"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>

      {/* Departure Column */}
      <Grid item xs={5} sm={2.5} md={2.5}>
        <Box>
          <Typography
            sx={{
              color: "var(--primary-color)",
              fontWeight: 700,
              fontSize: { xs: "18px", md: "22px" },
              lineHeight: 1.2
            }}
          >
            {flightData?.Segments[0]?.DepTime?.slice(11, 16)}
          </Typography>
          <Typography variant="subtitle2" fontWeight={600} color="var(--neutral-800)" mt={0.3} sx={{ fontSize: "13px" }}>
            {flightData?.Segments[0]?.DepAirPort}
          </Typography>
          <Typography variant="caption" color="var(--neutral-500)" display="block" noWrap>
            {flightData?.Segments[0]?.DepFrom}, {flightData?.Segments[0]?.DepLocation?.split(",")[0]}
          </Typography>
          <Typography variant="caption" sx={{ color: "var(--primary-color)", fontSize: "11px", fontWeight: 500 }}>
            {moment(flightData?.Segments[0]?.DepTime?.split("+")[0]).format("DD MMM, YYYY")}
          </Typography>
        </Box>
      </Grid>

      {/* Transit/Stops SVG Column */}
      <Grid item xs={12} sm={3.5} md={3.7}>
        <Transit transit={flightData} allData={allData} index={index} />
      </Grid>

      {/* Arrival Column */}
      <Grid item xs={5} sm={2.5} md={2.5}>
        <Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            <Typography
              sx={{
                color: "var(--primary-color)",
                fontWeight: 700,
                fontSize: { xs: "18px", md: "22px" },
                lineHeight: 1.2
              }}
            >
              {flightData?.Segments[flightData?.Segments?.length - 1]?.ArrTime?.slice(11, 16)}
            </Typography>
            {(() => {
              const depDate = moment(flightData?.Segments[0]?.DepTime?.split("+")[0]);
              const arrDate = moment(flightData?.Segments[flightData?.Segments?.length - 1]?.ArrTime?.split("+")[0]);
              const diffDays = arrDate.diff(depDate, 'days');
              if (diffDays > 0) {
                return (
                  <Typography
                    variant="caption"
                    sx={{
                      bgcolor: "rgba(239, 68, 68, 0.1)",
                      color: "#ef4444",
                      px: 0.6,
                      py: 0.2,
                      borderRadius: "4px",
                      fontWeight: 700,
                      fontSize: "10px"
                    }}
                  >
                    +{diffDays}d
                  </Typography>
                );
              }
              return null;
            })()}
          </Box>
          <Typography variant="subtitle2" fontWeight={600} color="var(--neutral-800)" mt={0.3} sx={{ fontSize: "13px" }}>
            {flightData?.Segments[flightData?.Segments?.length - 1]?.ArrAirPort}
          </Typography>
          <Typography variant="caption" color="var(--neutral-500)" display="block" noWrap>
            {flightData?.Segments[flightData?.Segments?.length - 1]?.ArrTo}, {flightData?.Segments[flightData?.Segments?.length - 1]?.ArrLocation?.split(",")[0]}
          </Typography>
          <Typography variant="caption" sx={{ color: "var(--primary-color)", fontSize: "11px", fontWeight: 500 }}>
            {moment(flightData?.Segments[flightData?.Segments?.length - 1]?.ArrTime?.split("+")[0]).format("DD MMM, YYYY")}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default React.memo(FlightLayout);
