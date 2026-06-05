import { Box, Grid, Stack, Tooltip, Typography, Chip } from "@mui/material";
import React from "react";
import { format } from "date-fns";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DurationConverter from "./DurationConverter";
import Address from "./Address/Address";

const formatDateSafe = (dateString, formatStr = "dd MMM yyyy") => {
  if (!dateString) return "N/A";
  try {
    const cleanDate = dateString.split("+")[0];
    return format(new Date(cleanDate), formatStr);
  } catch (err) {
    console.error("Invalid Date:", dateString, err);
    return dateString;
  }
};

const formatTimeSafe = (timeString) => {
  if (!timeString) return "";
  return timeString.slice(0, 5);
};

const getAirlineLogoUrl = (carrierCode) => {
  if (!carrierCode) return "";
  const upperCode = carrierCode.toUpperCase();
  if (upperCode === "XY") {
    return "https://airlineimages.s3.ap-southeast-1.amazonaws.com/128/XY.png";
  }
  return `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${upperCode}.png`;
};

const formatAircraftName = (name) => {
  if (!name) return "";
  const upperName = name.toUpperCase();
  if (upperName.includes("BOEING") || upperName.includes("AIRBUS")) {
    return name;
  }
  return name.charAt(0) === "7"
    ? `Boeing ${name}`
    : ["A3", "A2", "22", "32", "33", "34", "35", "38"].includes(name.slice(0, 2))
    ? `Airbus ${name}`
    : name;
};

const splitSegmentsIntoLegs = (segments, triptype) => {
  if (!segments || segments.length === 0) return [];
  const isReturn = triptype?.toLowerCase() === "return" || triptype?.toLowerCase() === "roundtrip";
  if (!isReturn || segments.length === 1) {
    return [segments];
  }
  let splitIndex = Math.floor(segments.length / 2);
  for (let i = 1; i < segments.length; i++) {
    const prevSeg = segments[i - 1];
    const currSeg = segments[i];
    const prevArrCode = prevSeg?.toAirportCode;
    const currDepCode = currSeg?.fromAirportCode;
    if (prevArrCode !== currDepCode) {
      splitIndex = i;
      break;
    }
    if (prevSeg?.arrivalDate && prevSeg?.arrivalTime && currSeg?.departureDate && currSeg?.departureTime) {
      try {
        const prevArr = new Date(`${prevSeg.arrivalDate.split("+")[0]}T${prevSeg.arrivalTime}`);
        const currDep = new Date(`${currSeg.departureDate.split("+")[0]}T${currSeg.departureTime}`);
        const diffHours = (currDep - prevArr) / (1000 * 60 * 60);
        if (diffHours > 12) {
          splitIndex = i;
          break;
        }
      } catch (e) {}
    }
  }
  return [segments.slice(0, splitIndex), segments.slice(splitIndex)];
};

const calculateLayover = (seg1, seg2, isFlightDataDirect) => {
  try {
    let arrTime, depTime, airportCode;
    if (isFlightDataDirect) {
      const arrStr = `${seg1.arrivalDate?.split("+")[0]}T${seg1.arrivalTime}`;
      const depStr = `${seg2.departureDate?.split("+")[0]}T${seg2.departureTime}`;
      arrTime = new Date(arrStr);
      depTime = new Date(depStr);
      airportCode = seg1.toAirportCode;
    } else {
      arrTime = new Date(seg1.ArrTime?.split("+")[0]);
      depTime = new Date(seg2.DepTime?.split("+")[0]);
      airportCode = seg1.ArrAirPort;
    }
    const diffMs = depTime - arrTime;
    if (isNaN(diffMs) || diffMs <= 0) return null;
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return {
      durationStr: `${hours}h ${minutes}m`,
      airportCode
    };
  } catch (e) {
    return null;
  }
};

const FlightInformation = ({ allData }) => {
  const allLegsInfo =
    allData?.bookingdata?.itenary?.FlightInfo?.AllLegsInfo ||
    allData?.bookingdata?.itenary?.AllLegsInfo ||
    allData?.bookingdata?.flightdata;

  const triptype = allData?.bookingdata?.triptype || "";
  const isFlightDataDirect = allLegsInfo === allData?.bookingdata?.flightdata;

  let processedLegs = [];
  if (isFlightDataDirect && allLegsInfo) {
    const splitLegs = splitSegmentsIntoLegs(allLegsInfo, triptype);
    processedLegs = splitLegs.map((segs, idx) => ({
      isDirectSegments: true,
      segments: segs,
      brandName: allData?.bookingdata?.itenary?.FlightInfo?.AllLegsInfo?.[idx]?.BrandName || allData?.bookingdata?.itenary?.AllLegsInfo?.[idx]?.BrandName,
    }));
  } else if (allLegsInfo) {
    processedLegs = allLegsInfo.map((leg, idx) => ({
      isDirectSegments: false,
      segments: leg?.Segments || [],
      brandName: leg?.BrandName || allData?.bookingdata?.itenary?.FlightInfo?.AllLegsInfo?.[idx]?.BrandName || allData?.bookingdata?.itenary?.AllLegsInfo?.[idx]?.BrandName,
    }));
  }

  const getLegTitle = (idx, totalLegs) => {
    const trip = triptype?.toLowerCase();
    if (trip === "oneway") {
      return "🛫 Outbound Flight";
    }
    if (trip === "return" || trip === "roundtrip") {
      if (idx === 0) return "🛫 Outbound Flight";
      if (idx === 1) return "🛬 Inbound Flight";
    }
    return `✈️ Flight Leg ${idx + 1}`;
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 700,
          color: "var(--neutral-800)",
          mb: 3,
          display: "flex",
          alignItems: "center",
          gap: 1
        }}
      >
        ✈️ Flight Information
      </Typography>

      <Stack spacing={3}>
        {processedLegs.map((leg, idx) => {
          const brandName = leg.brandName;
          const segments = leg.segments;

          return (
            <Box
              key={idx}
              sx={{
                p: 2.5,
                border: "1px solid var(--neutral-200)",
                borderRadius: "10px",
                bgcolor: "#ffffff",
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.02)"
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--neutral-100)", pb: 1.5, mb: 1.5 }}>
                <Typography sx={{ fontSize: "14px", color: "var(--primary-color)", fontWeight: 700 }}>
                  {getLegTitle(idx, processedLegs.length)}
                </Typography>
                {brandName && (
                  <Chip
                    label={`✨ ${brandName}`}
                    size="small"
                    sx={{
                      fontSize: "10.5px",
                      fontWeight: 700,
                      bgcolor: "rgba(245, 158, 11, 0.08)",
                      color: "#d97706",
                      border: "1px solid rgba(245, 158, 11, 0.2)",
                      px: 0.5
                    }}
                  />
                )}
              </Box>

              <Stack spacing={2}>
                {segments.map((item, sIdx) => {
                  if (leg.isDirectSegments) {
                    // Direct Flight Data Layout (camelCase keys)
                    return (
                      <React.Fragment key={sIdx}>
                        <Grid container spacing={2} alignItems="center">
                          {/* Airline & Aircraft Info */}
                          <Grid item xs={12} sm={4} md={2.5}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                              <Box sx={{ width: 40, height: 40, overflow: "hidden", borderRadius: "6px" }}>
                                <img
                                  width="100%"
                                  height="100%"
                                  style={{ objectFit: "contain" }}
                                  src={getAirlineLogoUrl(item?.airlineCode)}
                                  alt={item?.airlineName}
                                />
                              </Box>
                              <Box>
                                <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "var(--neutral-800)" }}>
                                  {item?.airlineName}
                                </Typography>
                                <Typography sx={{ fontSize: "11px", color: "var(--neutral-500)", fontWeight: 500 }}>
                                  {item?.airlineCode}-{item?.flightNumber}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1.5 }}>
                              <Chip
                                label={item?.cabinTypeName?.toUpperCase() || "Class"}
                                size="small"
                                sx={{ height: "18px", fontSize: "10px", fontWeight: 600, bgcolor: "rgba(4,135,199,0.06)", color: "var(--primary-color)" }}
                              />
                              <Chip
                                label={`Code: ${item?.bookingClass || "N/A"}`}
                                size="small"
                                sx={{ height: "18px", fontSize: "10px", fontWeight: 600, bgcolor: "var(--neutral-100)", color: "var(--neutral-600)" }}
                              />
                            </Box>
                            {item?.aircraftTypeName && (
                              <Typography sx={{ fontSize: "11px", color: "var(--neutral-400)", mt: 1 }}>
                                Aircraft: {formatAircraftName(item.aircraftTypeName)}
                              </Typography>
                            )}
                          </Grid>

                          {/* Departure Info */}
                          <Grid item xs={12} sm={4} md={3}>
                            <Box>
                              <Typography sx={{ fontSize: "15px", fontWeight: 700, color: "var(--neutral-800)" }}>
                                {formatDateSafe(item?.departureDate)}
                              </Typography>
                              <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "var(--primary-color)", mt: 0.2 }}>
                                {formatTimeSafe(item?.departureTime)}
                              </Typography>
                              
                              <Tooltip title={item?.fromAirportCode || ""}>
                                <Box sx={{ mt: 1 }}>
                                  <Typography sx={{ fontSize: "12px", color: "var(--neutral-600)", fontWeight: 500 }}>
                                    ({item?.fromAirportCode}) <Address code={item?.fromAirportCode} />
                                  </Typography>
                                  {item?.departureTerminalName && (
                                    <Typography sx={{ fontSize: "11px", color: "var(--neutral-400)" }}>
                                      Terminal: {item.departureTerminalName}
                                    </Typography>
                                  )}
                                </Box>
                              </Tooltip>
                            </Box>
                          </Grid>

                          {/* Visual Duration Line */}
                          <Grid item xs={12} sm={4} md={3.5} sx={{ textAlign: "center" }}>
                            <Box sx={{ px: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                              <Typography sx={{ fontSize: "11px", color: "var(--neutral-500)", fontWeight: 600, mb: 0.5 }}>
                                <DurationConverter duration={item?.durationInMinutes || 0} />
                              </Typography>
                              <Box sx={{ width: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", my: 1 }}>
                                <Box sx={{ width: "100%", height: "2px", bgcolor: "#cbd5e1" }} />
                                <ArrowForwardIcon sx={{ color: "var(--primary-color)", fontSize: "16px", position: "absolute", right: 0 }} />
                              </Box>
                              <Typography sx={{ fontSize: "11px", color: "var(--neutral-400)", fontWeight: 500 }}>
                                Non-stop
                              </Typography>
                            </Box>
                          </Grid>

                          {/* Arrival Info */}
                          <Grid item xs={12} sm={4} md={3} sx={{ textAlign: { xs: "left", md: "right" } }}>
                            <Box>
                              <Typography sx={{ fontSize: "15px", fontWeight: 700, color: "var(--neutral-800)" }}>
                                {formatDateSafe(item?.arrivalDate)}
                              </Typography>
                              <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "var(--primary-color)", mt: 0.2 }}>
                                {formatTimeSafe(item?.arrivalTime)}
                              </Typography>
                              
                              <Tooltip title={item?.toAirportCode || ""}>
                                <Box sx={{ mt: 1 }}>
                                  <Typography sx={{ fontSize: "12px", color: "var(--neutral-600)", fontWeight: 500 }}>
                                    ({item?.toAirportCode}) <Address code={item?.toAirportCode} />
                                  </Typography>
                                  {item?.arrivalTerminalName && (
                                    <Typography sx={{ fontSize: "11px", color: "var(--neutral-400)" }}>
                                      Terminal: {item.arrivalTerminalName}
                                    </Typography>
                                  )}
                                </Box>
                              </Tooltip>
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Layover Connection Banner */}
                        {sIdx < segments.length - 1 && (() => {
                          const layover = calculateLayover(item, segments[sIdx + 1], true);
                          if (!layover) return null;
                          return (
                            <Box
                              sx={{
                                my: 1.5,
                                py: 1,
                                px: 2,
                                bgcolor: "var(--neutral-50)",
                                border: "1px dashed var(--neutral-300)",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                justifyContent: "center"
                              }}
                            >
                              <Typography sx={{ fontSize: "12px", color: "var(--neutral-600)", fontWeight: 600 }}>
                                ⏱️ Connection layover: <span style={{ color: "var(--primary-color)" }}>{layover.durationStr}</span> at ({layover.airportCode}) <Address code={layover.airportCode} />
                              </Typography>
                            </Box>
                          );
                        })()}
                      </React.Fragment>
                    );
                  } else {
                    // Segment-based Layout (PascalCase keys)
                    const seg = item;
                    const cabinLabel =
                      seg?.SegmentCode?.cabinCode === "S"
                        ? "Premium Economy"
                        : seg?.SegmentCode?.cabinCode === "C"
                        ? "Business"
                        : seg?.SegmentCode?.cabinCode === "J"
                        ? "Premium Business"
                        : seg?.SegmentCode?.cabinCode === "P"
                        ? "First Class"
                        : "Economy";

                    return (
                      <React.Fragment key={sIdx}>
                        <Grid container spacing={2} alignItems="center">
                          {/* Airline Info */}
                          <Grid item xs={12} sm={4} md={2.5}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                              <Box sx={{ width: 40, height: 40, overflow: "hidden", borderRadius: "6px" }}>
                                <img
                                  width="100%"
                                  height="100%"
                                  style={{ objectFit: "contain" }}
                                  src={getAirlineLogoUrl(seg?.MarketingCarrier)}
                                  alt={seg?.MarketingCarrierName}
                                />
                              </Box>
                              <Box>
                                <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "var(--neutral-800)" }}>
                                  {seg?.MarketingCarrierName}
                                </Typography>
                                <Typography sx={{ fontSize: "11px", color: "var(--neutral-500)", fontWeight: 500 }}>
                                  {seg?.MarketingCarrier}-{seg?.MarketingFlightNumber}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1.5 }}>
                              <Chip
                                label={cabinLabel}
                                size="small"
                                sx={{ height: "18px", fontSize: "10px", fontWeight: 600, bgcolor: "rgba(4,135,199,0.06)", color: "var(--primary-color)" }}
                              />
                              <Chip
                                label={`Class: ${seg?.SegmentCode?.bookingCode || "N/A"}`}
                                size="small"
                                sx={{ height: "18px", fontSize: "10px", fontWeight: 600, bgcolor: "var(--neutral-100)", color: "var(--neutral-600)" }}
                              />
                            </Box>
                            {seg?.AircraftTypeName && (
                              <Typography sx={{ fontSize: "11px", color: "var(--neutral-400)", mt: 1 }}>
                                Aircraft: {formatAircraftName(seg.AircraftTypeName)}
                              </Typography>
                            )}
                          </Grid>

                          {/* Departure Info */}
                          <Grid item xs={12} sm={4} md={3}>
                            <Box>
                              <Typography sx={{ fontSize: "15px", fontWeight: 700, color: "var(--neutral-800)" }}>
                                {formatDateSafe(seg?.DepTime)}
                              </Typography>
                              <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "var(--primary-color)", mt: 0.2 }}>
                                {seg?.DepTime?.slice(11, 16) || ""}
                              </Typography>
                              
                              <Tooltip title={seg?.DepAirPort || ""}>
                                <Box sx={{ mt: 1 }}>
                                  <Typography sx={{ fontSize: "12px", color: "var(--neutral-600)", fontWeight: 500 }}>
                                    {seg?.DepAirPort} ({seg?.DepFrom})
                                  </Typography>
                                  {seg?.DepartureGate && (
                                    <Typography sx={{ fontSize: "11px", color: "var(--neutral-400)" }}>
                                      Terminal: {seg.DepartureGate}
                                    </Typography>
                                  )}
                                </Box>
                              </Tooltip>
                            </Box>
                          </Grid>

                          {/* Visual Duration Line */}
                          <Grid item xs={12} sm={4} md={3.5} sx={{ textAlign: "center" }}>
                            <Box sx={{ px: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                              <Typography sx={{ fontSize: "11px", color: "var(--neutral-500)", fontWeight: 600, mb: 0.5 }}>
                                <DurationConverter duration={seg?.Duration || 0} />
                              </Typography>
                              <Box sx={{ width: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", my: 1 }}>
                                <Box sx={{ width: "100%", height: "2px", bgcolor: "#cbd5e1" }} />
                                <ArrowForwardIcon sx={{ color: "var(--primary-color)", fontSize: "16px", position: "absolute", right: 0 }} />
                              </Box>
                            </Box>
                          </Grid>

                          {/* Arrival Info */}
                          <Grid item xs={12} sm={4} md={3} sx={{ textAlign: { xs: "left", md: "right" } }}>
                            <Box>
                              <Typography sx={{ fontSize: "15px", fontWeight: 700, color: "var(--neutral-800)" }}>
                                {formatDateSafe(seg?.ArrTime)}
                              </Typography>
                              <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "var(--primary-color)", mt: 0.2 }}>
                                {seg?.ArrTime?.slice(11, 16) || ""}
                              </Typography>
                              
                              <Tooltip title={seg?.ArrAirPort || ""}>
                                <Box sx={{ mt: 1 }}>
                                  <Typography sx={{ fontSize: "12px", color: "var(--neutral-600)", fontWeight: 500 }}>
                                    {seg?.ArrAirPort} ({seg?.ArrTo})
                                  </Typography>
                                  {seg?.ArrivalGate && (
                                    <Typography sx={{ fontSize: "11px", color: "var(--neutral-400)" }}>
                                      Terminal: {seg.ArrivalGate}
                                    </Typography>
                                  )}
                                </Box>
                              </Tooltip>
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Layover Connection Banner */}
                        {sIdx < segments.length - 1 && (() => {
                          const layover = calculateLayover(seg, segments[sIdx + 1], false);
                          if (!layover) return null;
                          return (
                            <Box
                              sx={{
                                my: 1.5,
                                py: 1,
                                px: 2,
                                bgcolor: "var(--neutral-50)",
                                border: "1px dashed var(--neutral-300)",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                justifyContent: "center"
                              }}
                            >
                              <Typography sx={{ fontSize: "12px", color: "var(--neutral-600)", fontWeight: 600 }}>
                                ⏱️ Connection layover: <span style={{ color: "var(--primary-color)" }}>{layover.durationStr}</span> at ({layover.airportCode}) <Address code={layover.airportCode} />
                              </Typography>
                            </Box>
                          );
                        })()}
                      </React.Fragment>
                    );
                  }
                })}
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default FlightInformation;
