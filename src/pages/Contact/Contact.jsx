import { Box, Container, Grid, Typography } from "@mui/material";
import { Phone } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import LandingHeader from "../../components/LandingPage/LandingHeader";
import Footer from "../../components/LandingPage/Footer";
export default function Contact() {
  return (
    <>
      <LandingHeader />
      <Box sx={{ my: 4, py: 8 }}>
        <Box
          sx={{
            backgroundImage:
              "linear-gradient(rgba(18, 46, 85, 0.9), rgba(18, 46, 85, 0.6)), url(https://i.ibb.co/0nL5g5D/Add-a-subheading-2.png)",
            backgroundSize: "cover", // Ensure the background covers the whole area
            backgroundPosition: "center", // Center the image
            height: "200px", // Specify a height for the Box
            display: "flex", // Use flex to center the content
            alignItems: "center", // Vertically center the content
            justifyContent: "center", // Horizontally center the content
          }}
        >
          <div
            style={{
              width: "100px",
              backgroundColor: "#1A3A6E",
              height: "3px",
              marginRight: "5px",
            }}
          ></div>
          <Typography
            sx={{ fontSize: "36px", fontWeight: 600, color: "white" }}
          >
            Contact
          </Typography>
          <div
            style={{
              width: "100px",
              backgroundColor: "#1A3A6E",
              height: "3px",
              marginLeft: "5px",
            }}
          ></div>
        </Box>
        <Box
          sx={{
            maxWidth: "1300px",
            my: 12,
            display: "flex",
            mx: "auto",
          }}
        >
          <Grid container spacing={10}>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h4" style={{ fontWeight: "bold" }}>
                  Connect With Us
                </Typography>
                <div
                  style={{
                    width: "50px",
                    height: "4px",
                    backgroundColor: "#1976d2",
                    marginBottom: "1rem",
                  }}
                ></div>
                <Typography sx={{ fontWeight: 600, my: 2 }}>
                  Have a question or ready to book your dream vacation?
                </Typography>
                <Typography sx={{ textAlign: "justify" }}>
                  AATrips is here to help you every step of the way. Our
                  friendly travel experts are available to answer your
                  questions, provide personalized recommendations, and help you
                  create a travel itinerary that exceeds your expectations.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ p: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: "45px",
                      height: "45px",
                      bgcolor: "#1A3A6E",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <MdLocationPin
                      style={{ fontSize: "25px", color: "white" }}
                    />
                  </Box>

                  <Typography sx={{ fontWeight: 500 }}>
                    Chattogram Office: Aerial Legend, 11th Floor, <br /> CDA
                    Avenue GEC Circle, Chattogram, Bangladesh.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: "45px",
                      height: "45px",
                      bgcolor: "#1A3A6E",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <MdLocationPin
                      style={{ fontSize: "25px", color: "white" }}
                    />
                  </Box>

                  <Typography sx={{ fontWeight: 500 }}>
                    Dhaka Office: Haveily Complex (Ka-3H), Level-3, <br />{" "}
                    Bashundhara Main Road, Vatara, Dhaka.
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2,
                    zIndex: 10,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: "45px",
                      height: "45px",
                      bgcolor: "#1A3A6E",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <FaFacebookF style={{ fontSize: "25px", color: "white" }} />
                  </Box>

                  <Link
                    style={{ textDecoration: "none", color: "#122E55" }}
                    target="_blank"
                    to="https://facebook.com/people/AATripscom/61560020513281/"
                    color="inherit"
                  >
                    <Typography sx={{ fontWeight: 500 }}>
                      AATrips
                    </Typography>
                  </Link>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: "45px",
                      height: "45px",
                      bgcolor: "#1A3A6E",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <MdOutlineEmail
                      style={{ fontSize: "25px", color: "white" }}
                    />
                  </Box>

                  <Link
                    style={{ textDecoration: "none", color: "#122E55" }}
                    to="mailto:support@aatrips.pk"
                    color="inherit"
                  >
                    <Typography sx={{ fontWeight: 500 }}>
                      support@aatrips.pk
                    </Typography>
                  </Link>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    zIndex: 10,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: "45px",
                      height: "45px",
                      bgcolor: "#1A3A6E",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <Phone sx={{ color: "white" }} />
                  </Box>
                  <Link
                    to="tel:+88-01409 965900"
                    style={{ textDecoration: "none", color: "#122E55" }}
                  >
                    <Typography sx={{ fontWeight: 500 }}>
                      +880-1409 965900 (WhatsApp)
                    </Typography>
                  </Link>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    zIndex: 10,
                    mt: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: "45px",
                      height: "45px",
                      bgcolor: "#1A3A6E",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <Phone sx={{ color: "white" }} />
                  </Box>
                  <Link
                    to="tel:+88-0241356244"
                    style={{ textDecoration: "none", color: "#122E55" }}
                  >
                    <Typography sx={{ fontWeight: 500 }}>
                      +880-241356244
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "30px",
              fontWeight: 600,
            }}
          >
            Find Us On Map
          </Typography>
          <div
            style={{
              textAlign: "center",
              width: "100px",
              backgroundColor: "#1A3A6E",
              height: "3px",
              marginRight: "5px",
            }}
          ></div>
        </Box>
        <Container
          sx={{
            display: "flex",
            maxWidth: "1300px",

            justifyContent: "center",
            mx: "auto",
            mt: 8,
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography sx={{ fontSize: "18px", fontWeight: 500, mb: 2 }}>
                Chattogram Office
              </Typography>
              <iframe
                style={{
                  border: "none",
                  borderRadius: "9px",
                  width: "100%",
                  height: "250px",
                  boxShadow: "5px 2px 5px #F5F7F8",
                }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.7668720499632!2d91.81882537599489!3d22.362429840639404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd9d781cd260f%3A0xdffce64586c6984c!2sAATrips%2C%20EVAN%20INTERNATIONAL!5e0!3m2!1sen!2sbd!4v1719135508382!5m2!1sen!2sbd"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography sx={{ fontSize: "18px", fontWeight: 500, mb: 2 }}>
                Dhaka Office
              </Typography>
              <iframe
                style={{
                  border: "none",
                  borderRadius: "9px",
                  width: "100%",
                  height: "250px",
                  boxShadow: "5px 2px 5px #F5F7F8",
                }}
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d228.136667306059!2d90.4232866!3d23.81196!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7796c3e5177%3A0x796992388342f90e!2sHaveily%20Complex!5e0!3m2!1sen!2sbd!4v1721892200722!5m2!1sen!2sbd"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
