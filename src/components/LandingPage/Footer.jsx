import React from "react";
import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import FooterLogo from "../../images/logo.png";
import "./Footer.css";

const quickLinks = [
  { label: "About Us", to: "/aboutUs" },
  { label: "Contact Us", to: "/contactUs" },
  { label: "Tour Guide", to: "/" },
  { label: "Terms & Conditions", to: "/terms&condition" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "FAQs", to: "/faq" },
];

const services = [
  { label: "Flight Booking", to: "/agent/flights" },
  { label: "Hotel Reservation", to: "/" },
  { label: "Umrah Packages", to: "/" },
  { label: "Tour Packages", to: "/" },
  { label: "Visa Processing", to: "/" },
  { label: "Group Fares", to: "/agent/groupfare" },
];

const offices = [
  {
    city: "Chattogram Office",
    address: "Aerial Legend 11th Floor, 1080 CDA Avenue, GEC Circle, Chattogram",
    mapUrl: "https://maps.app.goo.gl/CCqd2sqhYTknMYwj6",
  },
  {
    city: "Dhaka Office",
    address: "Haveily Complex (Ka-3H), Level-3, Bashundhara Main Road, Vatara, Dhaka-1229",
    mapUrl: "https://maps.app.goo.gl/jyFVfB83qnCJx99N7",
  },
];

const socials = [
  {
    icon: <FacebookRoundedIcon />,
    href: "https://www.facebook.com/people/AATripscom/61560020513281/?mibextid=ZbWKwL",
    label: "Facebook",
    color: "#1877f2",
  },
  {
    icon: <InstagramIcon />,
    href: "https://www.instagram.com/AATrips/",
    label: "Instagram",
    color: "#e1306c",
  },
  { icon: <XIcon />, href: "/", label: "X (Twitter)", color: "#fff" },
];


const Footer = () => {
  return (
    <Box component="footer" className="footer-root">
      {/* ── Newsletter Strip ───────────────────────────────────── */}
      <Box className="footer-newsletter-strip">
        <Container maxWidth="lg">
          <Box className="footer-newsletter-inner">
            <Box className="footer-newsletter-left">
              <FlightTakeoffIcon className="footer-newsletter-icon" />
              <Box>
                <Typography className="footer-newsletter-title">
                  Ready to fly smarter?
                </Typography>
                <Typography className="footer-newsletter-sub">
                  Join thousands of B2B agents already saving with AATrips.
                </Typography>
              </Box>
            </Box>
            <Link to="/signup" className="footer-newsletter-btn">
              Get Started <ArrowForwardIosIcon sx={{ fontSize: 13, ml: 0.5 }} />
            </Link>
          </Box>
        </Container>
      </Box>

      {/* ── Main Footer Body ───────────────────────────────────── */}
      <Box className="footer-body">
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            {/* Brand Column */}
            <Grid item xs={12} md={4} lg={3}>
              <Link to="/">
                <img
                  src={FooterLogo}
                  alt="AATrips logo"
                  className="footer-logo-img"
                />
              </Link>
              <Typography className="footer-brand-desc">
                AATrips is Pakistan's leading B2B travel platform — offering
                exclusive fares on flights, hotels, Umrah &amp; tour packages to
                verified travel agents nationwide.
              </Typography>

              {/* Social Icons */}
              <Box className="footer-social-row">
                {socials.map((s) => (
                  <Link
                    key={s.label}
                    to={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    aria-label={s.label}
                  >
                    <IconButton className="footer-social-btn" size="small">
                      {s.icon}
                    </IconButton>
                  </Link>
                ))}
              </Box>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={6} md={2} lg={2}>
              <Typography className="footer-col-heading">Discover</Typography>
              <Box className="footer-link-list">
                {quickLinks.map((l) => (
                  <Link key={l.label} to={l.to} className="footer-nav-link">
                    <ArrowForwardIosIcon className="footer-link-arrow" />
                    {l.label}
                  </Link>
                ))}
              </Box>
            </Grid>

            {/* Services */}
            <Grid item xs={6} md={2} lg={2}>
              <Typography className="footer-col-heading">Services</Typography>
              <Box className="footer-link-list">
                {services.map((l) => (
                  <Link key={l.label} to={l.to} className="footer-nav-link">
                    <ArrowForwardIosIcon className="footer-link-arrow" />
                    {l.label}
                  </Link>
                ))}
              </Box>
            </Grid>

            {/* Contact Us */}
            <Grid item xs={12} sm={6} md={2.5} lg={2.5}>
              <Typography className="footer-col-heading">Contact Us</Typography>
              <Box className="footer-contact-list">
                <Link to="tel:+8801409965900" className="footer-contact-item">
                  <Box className="footer-contact-icon-wrap">
                    <PhoneIcon sx={{ fontSize: 16 }} />
                  </Box>
                  <span>+880-1409965900</span>
                </Link>
                <Link to="tel:+8802241356244" className="footer-contact-item">
                  <Box className="footer-contact-icon-wrap">
                    <PhoneIcon sx={{ fontSize: 16 }} />
                  </Box>
                  <span>+880-241356244</span>
                </Link>
                <Link to="mailto:support@aatrips.pk" className="footer-contact-item">
                  <Box className="footer-contact-icon-wrap">
                    <MailOutlineIcon sx={{ fontSize: 16 }} />
                  </Box>
                  <span>support@aatrips.pk</span>
                </Link>
              </Box>
            </Grid>

            {/* Office Address */}
            <Grid item xs={12} sm={6} md={2.5} lg={2.5}>
              <Typography className="footer-col-heading">Office Address</Typography>
              <Box className="footer-office-cards">
                {offices.map((o) => (
                  <Box key={o.city} className="footer-office-card">
                    <Box className="footer-office-header">
                      <Typography className="footer-office-city">{o.city}</Typography>
                      <Link
                        to={o.mapUrl}
                        target="_blank"
                        className="footer-map-link"
                      >
                        <LocationOnOutlinedIcon sx={{ fontSize: 14, mr: 0.3 }} />
                        Map
                      </Link>
                    </Box>
                    <Typography className="footer-office-address">
                      {o.address}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>




      {/* ── Bottom Bar ────────────────────────────────────────── */}
      <Box className="footer-bottom-bar">
        <Container maxWidth="lg">
          <Box className="footer-bottom-inner">
            <Typography className="footer-copyright">
              © {new Date().getFullYear()} AATrips. All rights reserved.
            </Typography>
            <Typography className="footer-developed-by">
              Developed By <a href="https://www.projectota.com" target="_blank" rel="noopener noreferrer" className="footer-dev-link">Project OTA</a>
            </Typography>
            <Box className="footer-bottom-links">
              <Link to="/privacy-policy" className="footer-bottom-link">Privacy Policy</Link>
              <span className="footer-bottom-dot">·</span>
              <Link to="/terms&condition" className="footer-bottom-link">Terms</Link>
              <span className="footer-bottom-dot">·</span>
              <Link to="/sitemap" className="footer-bottom-link">Sitemap</Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;