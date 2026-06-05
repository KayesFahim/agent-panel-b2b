import React from "react";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import VerifiedIcon from "@mui/icons-material/Verified";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import bg from "../../images/landingPage/banner.jpg";
import "./Banner.css";

const stats = [
  { icon: <FlightTakeoffIcon />, value: "500+", label: "Airlines Worldwide" },
  { icon: <VerifiedIcon />, value: "10K+", label: "Trusted B2B Agents" },
  { icon: <SupportAgentIcon />, value: "24/7", label: "Expert Support" },
  { icon: <TrendingUpIcon />, value: "98%", label: "Satisfaction Rate" },
];

const Banner = () => {
  const navigate = useNavigate();

  return (
    <Box
      className="hero-banner-container"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(26, 58, 110, 0.92) 0%, rgba(30, 80, 150, 0.65) 100%), url(${bg})`,
      }}
    >
      {/* Animated floating orbs */}
      <Box className="hero-orb hero-orb-1" />
      <Box className="hero-orb hero-orb-2" />
      <Box className="hero-orb hero-orb-3" />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 5 }}>
        {/* Badge */}
        <Box className="hero-badge-wrapper">
          <Box className="hero-badge">
            <span className="hero-badge-dot" />
            Trusted B2B Travel Platform
          </Box>
        </Box>

        {/* Main Headline */}
        <Typography className="hero-headline">
          Your Gateway to{" "}
          <span className="hero-headline-accent">Smarter</span>{" "}
          Travel Deals
        </Typography>

        {/* Sub-headline */}
        <Typography className="hero-subheadline">
          Access exclusive B2B fares on flights, hotels, Umrah packages &amp; more —
          <br className="hero-br" />
          all in one powerful platform built for travel agents.
        </Typography>

        {/* CTA Buttons */}
        <Box className="hero-cta-row">
          <Button
            className="hero-btn-primary"
            onClick={() => navigate("/signup")}
            size="large"
          >
            Get Started Free
          </Button>
          <Button
            className="hero-btn-secondary"
            onClick={() => navigate("/signin")}
            size="large"
          >
            Explore Flights
          </Button>
        </Box>

        {/* Stats Row */}
        <Grid container spacing={3} className="hero-stats-grid">
          {stats.map((s, i) => (
            <Grid item xs={6} sm={3} key={i}>
              <Box className="hero-stat-card">
                <Box className="hero-stat-icon">{s.icon}</Box>
                <Typography className="hero-stat-value">{s.value}</Typography>
                <Typography className="hero-stat-label">{s.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Banner;
