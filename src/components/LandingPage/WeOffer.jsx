import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PaymentIcon from "@mui/icons-material/Payment";
import "./WeOffer.css";

const features = [
  {
    icon: <NearMeIcon />,
    title: "World's Biggest Travel Inventory",
    description:
      "AATrips stands as the region's premier travel search platform, offering direct B2B access to flights, hotels, and customized packages worldwide.",
  },
  {
    icon: <AirplanemodeActiveIcon />,
    title: "Optimized Air Ticketing",
    description:
      "Access competitive B2B flight tickets and net fares instantly. Build higher profit margins with real-time global consolidators.",
  },
  {
    icon: <SupportAgentIcon />,
    title: "24/7 Dedicated Agent Desk",
    description:
      "Get real-time booking support anytime. Our travel desks operate continuously to assist with quick reissues, voids, and ticketing queues.",
  },
  {
    icon: <PaymentIcon />,
    title: "Flexible Payment Options",
    description:
      "Manage effortless agent deposits via credit cards, bank transfers, and mobile financial services (MFS) with immediate auto-credit facilities.",
  },
];

const WeOffer = () => {
  return (
    <Box className="features-section-wrapper">
      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box className="feature-card">
              <Box className="feature-icon-box">
                {feature.icon}
              </Box>
              <Box>
                <Typography className="feature-title" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography className="feature-description">
                  {feature.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WeOffer;
