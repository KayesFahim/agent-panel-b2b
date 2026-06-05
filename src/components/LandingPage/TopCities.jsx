import React, { useState } from "react";
import { Box, Typography, Button, Card, CardMedia, Grid } from "@mui/material";
import "./TopCities.css";
const destinationsByRegion = {
  All: [
    { name: "Sydney", country: "Australia", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80" },
    { name: "Istanbul", country: "Turkey", image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80" },
    { name: "Singapore", country: "Singapore", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80" },
    { name: "Jubel", country: "UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80" },
  ],
  Asia: [
    { name: "Manila", country: "Philippines", image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=80" },
    { name: "Da Nang", country: "Vietnam", image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80" },
    { name: "Malé", country: "Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80" },
    { name: "Bali (Denpasar)", country: "Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80" },
  ],
  "Middle East": [
    { name: "Istanbul", country: "Turkey", image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80" },
    { name: "Dubai", country: "UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80" },
    { name: "Petra", country: "Jordan", image: "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?auto=format&fit=crop&w=800&q=80" },
    { name: "Sharm El Sheik", country: "Egypt", image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80" },
  ],
  Europe: [
    { name: "Paris", country: "France", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80" },
    { name: "Rome", country: "Italy", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80" },
    { name: "London", country: "England", image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=800&q=80" },
    { name: "Greek Islands", country: "Greece", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80" },
  ],
  America: [
    { name: "New York", country: "USA", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80" },
    { name: "Rio de Janeiro", country: "Brazil", image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80" },
    { name: "Los Angeles", country: "USA", image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80" },
    { name: "Buenos Aires", country: "Argentina", image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=800&q=80" },
  ],
  Africa: [
    { name: "Cairo", country: "Egypt", image: "https://images.unsplash.com/photo-1639157451911-365bf4fc26ed?q=80&w=927&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Cape Town", country: "South Africa", image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=800&q=80" },
    { name: "Serengeti National Park", country: "Tanzania", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80" },
    { name: "Victoria Falls", country: "Zambia/Zimbabwe", image: "https://plus.unsplash.com/premium_photo-1694475518753-4b00e53e93ef?q=80&w=1278&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ],
};

const regions = ["All", "Asia", "Middle East", "Europe", "America", "Africa"];

const TopCities = () => {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const currentDestinations = destinationsByRegion[selectedRegion] || [];

  return (
    <Box className="cities-section-wrapper">
      <Typography className="section-title">
        Popular B2B Destinations
      </Typography>

      {/* Region Tabs */}
      <Box className="regions-tabs-container">
        {regions.map((region, index) => (
          <Button
            key={index}
            onClick={() => setSelectedRegion(region)}
            className={`region-tab-btn ${region === selectedRegion ? "active" : ""}`}
          >
            {region}
          </Button>
        ))}
      </Box>

      {/* Destinations Grid */}
      <Grid container spacing={3}>
        {currentDestinations.map((dest, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className="destination-card">
              <CardMedia
                component="img"
                image={dest.image}
                alt={dest.name}
              />
              <Box className="destination-scrim">
                <Typography className="destination-title">
                  {dest.name}
                </Typography>
                <Typography className="destination-country">
                  {dest.country}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TopCities;
