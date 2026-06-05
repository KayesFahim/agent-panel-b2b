import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import './Footer.css';

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          bgcolor: "#122E55",
          color: "white",
          py: 12,
          margin: "auto",
        }}
      >
        <Grid sx={{ maxWidth: "1300px", mx: "auto" }} container spacing={4}>
          <Grid item xs={12} md={5}>
            <Box>
              <img
                style={{ width: "130px" }}
                src="https://i.ibb.co/Xk0Jdsq/0487-C7-2.png"
                alt="Logo"
              />
            </Box>
            <Typography
              variant="body2"
              paragraph
              sx={{ textAlign: "justify", pr: 2, mt: 2 }}
            >
              Welcome to AATrips, your one-stop travel agency for all your
              travel needs. We offer a comprehensive range of services including
              flight bookings, hotel reservations, tour packages, and visa
              processing assistance to ensure your travel experience is
              hassle-free and enjoyable.
            </Typography>
            <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
              <Link
                to="https://www.facebook.com/people/AATripscom/61560020513281/?mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookRoundedIcon
                  sx={{
                    alignItems: "center",
                    color: "white",
                    fontSize: "40px",
                  }}
                />
              </Link>

              <Link to="/">
                <InstagramIcon
                  sx={{
                    alignItems: "center",
                    color: "white",
                    fontSize: "40px",
                  }}
                />
              </Link>

              <Link to="/">
                <XIcon
                  sx={{
                    alignItems: "center",
                    color: "white",
                    fontSize: "36px",
                  }}
                />
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Discover
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                <span>About Us</span>
              </Link>
              <Link style={{ textDecoration: "none", color: "white" }} to="/contactUs">
                <span>Contact Us</span>
              </Link>
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                <span>Tour Guide</span>
              </Link>
              <Link style={{ textDecoration: "none", color: "white" }} to="/terms&condition">
                <span>Terms & Condition</span>
              </Link>
              <Link style={{ textDecoration: "none", color: "white" }} to="/privacy-policy">
                <span>Privacy Policy</span>
              </Link>
              <Link style={{ textDecoration: "none", color: "white" }} to="/faq">
                <span>FAQs</span>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Main Office
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
              Aerial Legend, 11th Floor,
              <br />
              CDA Avenue GEC Circle
              <br />
              Chattogram, Bangladesh
              <br />
              <Link
                to="https://maps.app.goo.gl/CCqd2sqhYTknMYwj6"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#4fc3f7", fontWeight: 500 }}
              >
                <span>View Map</span>
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Have Queries?
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
              <Link
                to="tel:+8801409965900"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <span>+88-01409 965900</span>
              </Link>
              <br />
              <Link
                to="mailto:info@aatrips.pk"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <span>info@aatrips.pk</span>
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ bgcolor: "white", py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img
            style={{
              maxWidth: "100%",
            }}
            src="https://i.ibb.co/TLC6LDj/0487-C7-1.png"
            alt="Payment Partners"
          />
        </Box>
        <Box
          sx={{
            mt: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ fontSize: "16px", color: "gray" }}>
            &copy; {date} AATrips All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
