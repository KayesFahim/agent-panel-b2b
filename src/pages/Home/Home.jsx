import { Box, Container, Typography } from "@mui/material";
import React from "react";
import "./home.css";
import Header from "../../components/Header/Header";
import HomePageStack from "../../components/HomePageStack/HomePageStack";
import TravelCalender from "../../components/TravelCalender/TravelCalender";
import UpcommingTrips from "./UpcommingTrips";
import getAuthToken from "../../Token/getAuthToken";

const Home = () => {
  const token = getAuthToken();
  const url2 = `${import.meta.env.REACT_APP_API_URL}/agent/report/dashboard`;
  const upcomingUrl = `${import.meta.env.REACT_APP_API_URL}/agent/booking/upcoming`;
  const pastUrl = `${import.meta.env.REACT_APP_API_URL}/agent/booking/past`;

  return (
    <Box sx={{ background: "#f8fafc", minHeight: "100vh" }}>
      <Header />

      <Container
        maxWidth="xl"
        sx={{ pt: { xs: 12, sm: 12, md: 6, lg: 4 }, pb: 6, px: { xs: 2, sm: 3 } }}
      >
        {/* ── Stats Cards ── */}
        <Box mb={3}>
          <Box className="home-section-header">
            <Typography className="home-section-title">Dashboard Overview</Typography>
          </Box>
          <HomePageStack url={url2} token={token} />
        </Box>

        {/* ── Travel Calendar ── */}
        <Box mb={3}>
          <Box className="home-section-header">
            <Typography className="home-section-title">Travel Calendar</Typography>
          </Box>
          <Box className="calendar-widget">
            <TravelCalender token={token} />
          </Box>
        </Box>

        {/* ── Upcoming & Past Trips ── */}
        <UpcommingTrips url={upcomingUrl} text="Upcoming" token={token} />
        <UpcommingTrips url={pastUrl} text="Past" token={token} />
      </Container>
    </Box>
  );
};

export default Home;
