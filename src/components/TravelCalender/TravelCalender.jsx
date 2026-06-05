import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  IconButton,
  Tooltip,
  Stack,
  Chip,
} from "@mui/material";

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EventIcon from "@mui/icons-material/Event";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AirlinesIcon from "@mui/icons-material/Airlines";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import React, { useEffect, useState } from "react";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getStatusStyle = (status) => {
  const s = (status || "").toLowerCase();
  if (s === "cancelled") return { bg: "#f1f5f9", color: "#64748b" };
  if (s === "hold") return { bg: "rgba(26, 58, 110, 0.08)", color: "var(--primary-color)" };
  if (s.includes("ticket") || s === "issued") return { bg: "rgba(26, 58, 110, 0.15)", color: "var(--primary-color)" };
  return { bg: "rgba(26, 58, 110, 0.08)", color: "var(--primary-color)" };
};

const TravelCalender = ({ token }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState(moment().format("YYYY-MM"));
  const [thatDayBookings, setThatDayBookings] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.REACT_APP_API_URL}/agent/booking/calendare/${month}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookingData(response.data);
      // Re-select current selected date from new data
      const dateBookings =
        response.data.find((item) => item.date === selectedDate)?.data || [];
      setThatDayBookings(dateBookings);
    } catch (error) {
      console.error("Error fetching calendar data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [month]);

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    const bookings = bookingData.find((item) => item.date === date)?.data || [];
    setThatDayBookings(bookings);
    setShowAll(false);
  };

  const prevMonth = () =>
    setMonth(moment(month).subtract(1, "months").format("YYYY-MM"));
  const nextMonth = () =>
    setMonth(moment(month).add(1, "months").format("YYYY-MM"));

  // Build a proper calendar grid with leading blank cells
  const firstDayOfMonth = moment(month).startOf("month").day(); // 0=Sun
  const daysInMonth = moment(month).daysInMonth();
  const bookingCountMap = {};
  bookingData.forEach((item) => {
    bookingCountMap[item.date] = item.count;
  });

  const today = moment().format("YYYY-MM-DD");
  const displayBookings = thatDayBookings.slice(
    0,
    showAll ? thatDayBookings.length : 3
  );

  return (
    <Box>
      <Grid container spacing={3}>
        {/* ── Calendar Panel ── */}
        <Grid item xs={12} md={5}>
          {/* Month Navigation */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2.5,
              px: 0.5,
            }}
          >
            <Tooltip title="Previous Month">
              <IconButton
                onClick={prevMonth}
                size="small"
                sx={{
                  background: "#f1f5f9",
                  "&:hover": { background: "var(--primary-color)", color: "#fff" },
                  transition: "all 0.2s ease",
                }}
              >
                <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Tooltip>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: 17,
                color: "#1e293b",
                letterSpacing: "-0.02em",
              }}
            >
              {moment(month).format("MMMM YYYY")}
            </Typography>
            <Tooltip title="Next Month">
              <IconButton
                onClick={nextMonth}
                size="small"
                sx={{
                  background: "#f1f5f9",
                  "&:hover": { background: "var(--primary-color)", color: "#fff" },
                  transition: "all 0.2s ease",
                }}
              >
                <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Weekday Headers */}
          <Grid container columns={7} sx={{ mb: 1 }}>
            {WEEKDAYS.map((d) => (
              <Grid item xs={1} key={d}>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#94a3b8",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    py: 0.5,
                  }}
                >
                  {d}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {/* Calendar Days */}
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              py={6}
            >
              <CircularProgress size={28} sx={{ color: "var(--primary-color)" }} />
            </Box>
          ) : (
            <Grid container columns={7} spacing={0.5}>
              {/* Leading blank cells */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <Grid item xs={1} key={`blank-${i}`}>
                  <Box sx={{ height: 44 }} />
                </Grid>
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const dateStr = `${month}-${String(dayNum).padStart(2, "0")}`;
                const count = bookingCountMap[dateStr] || 0;
                const isSelected = selectedDate === dateStr;
                const isToday = today === dateStr;

                return (
                  <Grid item xs={1} key={dayNum}>
                    <Tooltip
                      title={
                        count > 0
                          ? `${count} booking${count > 1 ? "s" : ""}`
                          : "No bookings"
                      }
                      arrow
                      placement="top"
                    >
                      <Box
                        onClick={() => handleSelectDate(dateStr)}
                        sx={{
                          height: 44,
                          borderRadius: "10px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          position: "relative",
                          transition: "all 0.2s ease",
                          background: isSelected
                            ? "linear-gradient(135deg, var(--primary-color), #204682)"
                            : count > 0
                              ? "rgba(26, 58, 110, 0.08)"
                              : "transparent",
                          border: isToday && !isSelected
                            ? "2px solid var(--primary-color)"
                            : isSelected
                              ? "2px solid transparent"
                              : "2px solid transparent",
                          "&:hover": {
                            background: isSelected
                              ? "linear-gradient(135deg, var(--primary-color), #204682)"
                              : "rgba(26, 58, 110, 0.07)",
                            transform: "scale(1.08)",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 13,
                            fontWeight: isSelected || isToday ? 700 : 500,
                            color: isSelected
                              ? "#ffffff"
                              : isToday
                                ? "var(--primary-color)"
                                : "#475569",
                            lineHeight: 1,
                          }}
                        >
                          {dayNum}
                        </Typography>

                        {/* Booking dot indicator */}
                        {count > 0 && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: 5,
                              right: 5,
                              width: 16,
                              height: 16,
                              borderRadius: "50%",
                              background: isSelected ? "rgba(255,255,255,0.85)" : "var(--primary-color)",
                              color: isSelected ? "var(--primary-color)" : "#fff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 9,
                              fontWeight: 800,
                            }}
                          >
                            {count > 9 ? "9+" : count}
                          </Box>
                        )}
                      </Box>
                    </Tooltip>
                  </Grid>
                );
              })}
            </Grid>
          )}

          {/* Legend */}
          <Box
            display="flex"
            gap={2}
            mt={3}
            flexWrap="wrap"
          >
            <Box display="flex" alignItems="center" gap={0.8}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "var(--primary-color)",
                }}
              />
              <Typography sx={{ fontSize: 11, color: "#64748b" }}>
                Has bookings
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.8}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  border: "2px solid var(--primary-color)",
                }}
              />
              <Typography sx={{ fontSize: 11, color: "#64748b" }}>
                Today
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.8}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--primary-color), #204682)",
                }}
              />
              <Typography sx={{ fontSize: 11, color: "#64748b" }}>
                Selected
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* ── Bookings Panel ── */}
        <Grid item xs={12} md={7}>
          {/* Panel Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
              pb: 2,
              borderBottom: "1.5px solid #f1f5f9",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#1e293b",
                  letterSpacing: "-0.01em",
                }}
              >
                {moment(selectedDate).format("dddd, MMMM Do YYYY")}
              </Typography>
              <Typography sx={{ fontSize: 12, color: "#94a3b8", mt: 0.3 }}>
                {thatDayBookings.length > 0
                  ? `${thatDayBookings.length} booking${thatDayBookings.length > 1 ? "s" : ""} found`
                  : "No bookings on this date"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                background: "rgba(26, 58, 110, 0.06)",
                borderRadius: "50px",
                px: 2,
                py: 0.7,
              }}
            >
              <CalendarTodayIcon sx={{ fontSize: 14, color: "var(--primary-color)" }} />
              <Typography sx={{ fontSize: 12, fontWeight: 700, color: "var(--primary-color)" }}>
                {thatDayBookings.length}
              </Typography>
            </Box>
          </Box>

          {/* Booking Cards */}
          {thatDayBookings.length > 0 ? (
            <Box>
              <Stack spacing={1.5}>
                {displayBookings.map((booking, index) => {
                  const statusStyle = getStatusStyle(booking.status);
                  return (
                    <Box
                      key={index}
                      sx={{
                        background: "#ffffff",
                        border: "1.5px solid #f1f5f9",
                        borderRadius: "12px",
                        padding: "14px 16px",
                        transition: "all 0.22s ease",
                        cursor: "pointer",
                        "&:hover": {
                          borderColor: "rgba(17, 46, 85, 0.2)",
                          boxShadow: "0 6px 18px rgba(17, 46, 85, 0.1)",
                          transform: "translateX(2px)",
                        },
                      }}
                      onClick={() =>
                        navigate(
                          `/agent/bookingdetails/${booking.uid}/${booking.bookingId}/${booking.triptype}`
                        )
                      }
                    >
                      <Grid container alignItems="center" spacing={1}>
                        {/* Route */}
                        <Grid item xs={12} sm={5}>
                          <Box display="flex" alignItems="center" gap={0.8} mb={0.8}>
                            <FlightTakeoffIcon sx={{ fontSize: 16, color: "var(--primary-color)" }} />
                            <Typography sx={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>
                              {booking.depfrom}
                            </Typography>
                            <ArrowForwardIcon sx={{ fontSize: 14, color: "#94a3b8" }} />
                            <Typography sx={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>
                              {booking.arrto}
                            </Typography>
                            <FlightLandIcon sx={{ fontSize: 16, color: "var(--primary-color)" }} />
                          </Box>

                          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                            <Box display="flex" alignItems="center" gap={0.4}>
                              <ConfirmationNumberIcon sx={{ fontSize: 13, color: "#94a3b8" }} />
                              <Typography sx={{ fontSize: 11.5, color: "#64748b" }}>
                                PNR: <b style={{ color: "var(--primary-color)" }}>{booking.pnr}</b>
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={0.4}>
                              <AirlinesIcon sx={{ fontSize: 13, color: "#94a3b8" }} />
                              <Typography sx={{ fontSize: 11.5, color: "#64748b" }}>
                                {booking.carrier}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>

                        {/* Date */}
                        <Grid item xs={6} sm={4}>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <EventIcon sx={{ fontSize: 13, color: "#94a3b8" }} />
                            <Typography sx={{ fontSize: 11.5, color: "#64748b" }}>
                              Fly: {moment(booking.flightdate).format("DD MMM YYYY")}
                            </Typography>
                          </Box>
                          <Typography sx={{ fontSize: 11, color: "#94a3b8", mt: 0.4 }}>
                            ID: {booking.bookingId}
                          </Typography>
                        </Grid>

                        {/* Status */}
                        <Grid item xs={6} sm={3} display="flex" justifyContent="flex-end">
                          <Stack spacing={1} alignItems="flex-end">
                            <Box
                              sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                px: 1.5,
                                py: 0.4,
                                borderRadius: "50px",
                                background: statusStyle.bg,
                                color: statusStyle.color,
                                fontSize: 11,
                                fontWeight: 700,
                              }}
                            >
                              {booking.status}
                            </Box>
                            <Box
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(
                                  `/agent/bookingdetails/${booking.uid}/${booking.bookingId}/${booking.triptype}`
                                );
                              }}
                              sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 0.4,
                                px: 1.5,
                                py: 0.4,
                                borderRadius: "50px",
                                background: booking.status === "Cancelled"
                                  ? "#e2e8f0"
                                  : "linear-gradient(135deg, var(--primary-color), #204682)",
                                color: booking.status === "Cancelled" ? "#94a3b8" : "#fff",
                                fontSize: 11,
                                fontWeight: 700,
                                cursor: "pointer",
                                boxShadow: booking.status === "Cancelled"
                                  ? "none"
                                  : "0 2px 8px rgba(26,58,110,0.25)",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                  opacity: 0.9,
                                  transform: "scale(1.03)",
                                },
                                pointerEvents: booking.status === "Cancelled" ? "none" : "auto",
                              }}
                            >
                              View
                              <ArrowForwardIcon sx={{ fontSize: 12 }} />
                            </Box>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Box>
                  );
                })}
              </Stack>

              {/* Show More / Less */}
              {thatDayBookings.length > 3 && (
                <Box display="flex" justifyContent="center" mt={2}>
                  <Box
                    component="button"
                    onClick={() => setShowAll((prev) => !prev)}
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.5,
                      px: 3,
                      py: 1,
                      background: "transparent",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: "50px",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--primary-color)",
                      cursor: "pointer",
                      transition: "all 0.22s ease",
                      "&:hover": {
                        background: "var(--primary-color)",
                        color: "#fff",
                        borderColor: "var(--primary-color)",
                      },
                    }}
                  >
                    {showAll ? (
                      <>Show Less <ExpandLessIcon sx={{ fontSize: 16 }} /></>
                    ) : (
                      <>
                        Show all {thatDayBookings.length} bookings{" "}
                        <ExpandMoreIcon sx={{ fontSize: 16 }} />
                      </>
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          ) : (
            /* Empty State */
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 6,
                px: 3,
                textAlign: "center",
                background: "#f8fafc",
                borderRadius: "12px",
                border: "1.5px dashed #e2e8f0",
              }}
            >
              <Box sx={{ fontSize: 40, mb: 1.5, opacity: 0.3 }}>✈️</Box>
              <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#94a3b8" }}>
                No Bookings Found
              </Typography>
              <Typography sx={{ fontSize: 13, color: "#cbd5e1", mt: 0.5 }}>
                Click on a highlighted date to view bookings
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TravelCalender;
