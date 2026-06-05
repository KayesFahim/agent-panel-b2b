import React, { useEffect, useState } from "react";
import { Box, Container, Fade, Grid, Slide, Typography } from "@mui/material";
import LandingHeader from "./LandingHeader";
import Footer from "./Footer";
import img3 from "../../images/Aboutus/team.jpg";
import CommonBreadCums from "./CommonBreadCums";

const Aboutus = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <Box>
      <LandingHeader />
      <Box sx={{ my: 4, py: 8 }}>
        <CommonBreadCums title="About Us" />
      </Box>

      {/* <img
        style={{
          height: "250px",
          width: "100%",
        }}
        src={img1}
        alt=""
      />
      <Typography
        sx={{
          textAlign: "center",
          color: "white",
          fontSize: "30px",
          fontWeight: "600",
          position: "relative",
          top: -130,
        }}
      >
        About Us
      </Typography> */}
      <Container>
        <Box sx={{ minHeight: "70vh", mt: 8 }}>
          <Grid container spacing={{ xs: 8, md: 20 }}>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  mt: 8,
                  fontSize: "18px",
                  fontWeight: "500",
                  color: "#222222",
                  textJustify: "inter-character",
                }}
              >
                Create the flying history,we are the faithful companion of you
                during this journey
              </Typography>
              <Fade in={show} timeout={2000}>
                <Slide direction="right" in={show} timeout={2000}>
                  <Typography
                    sx={{
                      mt: 1,
                      fontSize: "12px",
                      textAlign: "justify",
                    }}
                  >
                    AATrips is the reliable way to explore the world. It's
                    your onestop online travel agency for all your travel needs.
                    We offer acomprehensive range of services including flight
                    bookings, hotel reservations, tour packages, and visa
                    processing assistance to ensure hassle-free and enjoyable
                    travel experience. With our user-friendly platform, you can
                    easily search, compare and book the best deals on flights
                    and hotels. Our team of expert travel advisors is dedicated
                    to provide personalized service, offer expert advice and
                    assistance at every step of your journey.
                  </Typography>
                </Slide>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Fade in={show} timeout={2000}>
                <Slide direction="left" in={show} timeout={2000}>
                  <Box
                    sx={{
                      height: { xs: "400px", md: "500px" },
                      ml: { xs: "30px", md: 0 },

                      // mt:{xs:10}
                      // width: {xs:"90%",md:"60%"},
                    }}
                  >
                    <Box
                      sx={{
                        height: "350px",
                        width: "60%",
                        // width: {xs:"60%",md:"60%"},

                        //  borderRadius:"10px",
                        bgcolor: "var(--primary-color)",
                      }}
                    ></Box>
                    <img
                      style={{
                        height: "350px",
                        // width: {xs:"100%",md:"60%"},
                        width: "60%",
                        // borderRadius:"10px",
                        position: "relative",
                        top: -330,
                        left: 20,
                      }}
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                      alt="Our Team"
                    />
                  </Box>
                </Slide>
              </Fade>
            </Grid>
          </Grid>

          {/* Our Mission Content started here */}

          {/* <Typography
            sx={{
              fontSize: "30px",
              fontWeight: "600",
              textAlign: "center",
              mb: 7,
            }}
          >
            Our Mission
          </Typography>
          <Grid container spacing={4} sx={{}}>
            <Grid item md={3}>
              <Fade in={show} timeout={2000}>
                <Slide direction="right" in={show} timeout={2000}>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      textAlign: "center",
                      p: 2,
                      bgcolor: "#caf1ee91",
                      borderRadius: "10px",
                      // boxShadow:"5px 10px #6a6a6a"
                      boxShadow: "5px 10px 18px #888888",
                    }}
                  >
                    Our mission is to revolutionize the way people book flights
                    by offering a user-friendly online platform that ensures
                    hassle-free booking experiences. We aim to provide
                    competitive prices, reliable service, and personalized
                    support to meet the diverse needs of Traveller.
                  </Typography>
                </Slide>
              </Fade>
            </Grid>
            <Grid item md={3}>
              <Fade in={show} timeout={2500}>
                <Slide direction="right" in={show} timeout={2500}>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      textAlign: "center",
                      p: 2,
                      bgcolor: "#fbc4ab",
                      borderRadius: "10px",
                      // boxShadow:"5px 10px #6a6a6a"
                      boxShadow: "5px 10px 18px #888888",
                    }}
                  >
                    Our mission is to revolutionize the way people book flights
                    by offering a user-friendly online platform that ensures
                    hassle-free booking experiences. We aim to provide
                    competitive prices, reliable service, and personalized
                    support to meet the diverse needs of Traveller.
                  </Typography>
                </Slide>
              </Fade>
            </Grid>

            <Grid item md={3}>
              <Fade in={show} timeout={3000}>
                <Slide direction="left" in={show} timeout={2000}>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      textAlign: "center",
                      p: 2,
                      bgcolor: "#9bedff",
                      borderRadius: "10px",
                      // boxShadow:"5px 10px #6a6a6a"
                      boxShadow: "5px 10px 18px #888888",
                    }}
                  >
                    Our mission is to revolutionize the way people book flights
                    by offering a user-friendly online platform that ensures
                    hassle-free booking experiences. We aim to provide
                    competitive prices, reliable service, and personalized
                    support to meet the diverse needs of Traveller.
                  </Typography>
                </Slide>
              </Fade>
            </Grid>
            <Grid item md={3}>
              <Fade in={show} timeout={3500}>
                <Slide direction="left" in={show} timeout={2500}>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      textAlign: "center",
                      p: 2,
                      bgcolor: "#fffee0",
                      borderRadius: "10px",
                      // boxShadow:"5px 10px #6a6a6a"
                      boxShadow: "5px 10px 18px #888888",
                    }}
                  >
                    Our mission is to revolutionize the way people book flights
                    by offering a user-friendly online platform that ensures
                    hassle-free booking experiences. We aim to provide
                    competitive prices, reliable service, and personalized
                    support to meet the diverse needs of Traveller.
                  </Typography>
                </Slide>
              </Fade>
            </Grid>
          </Grid> */}

          {/* Our Mission Content started here */}

          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: "600",
              textAlign: "center",
              my: 7,
            }}
          >
            Our Journey
          </Typography>

          <Grid container spacing={2}>
            <Grid item md={6}>
              <Box
                sx={{
                  // height:{md:"500px"},
                  height: { xs: "400px", md: "500px" },
                  marginLeft: 10,
                }}
              >
                <Box
                  sx={{
                    height: "350px",
                    width: "60%",
                    //  borderRadius:"10px",
                    bgcolor: "var(--primary-color)",
                  }}
                ></Box>
                <img
                  style={{
                    height: "350px",
                    width: "60%",
                    // borderRadius:"10px",
                    position: "relative",
                    top: -330,
                    left: 20,
                  }}
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"
                  alt="Our Journey"
                />
              </Box>
            </Grid>
            <Grid item md={6}>
              <Typography
                sx={{
                  mt: 8,
                  fontSize: "18px",
                  fontWeight: "500",
                  color: "#222222",
                  textJustify: "inter-character",
                }}
              >
                Hassle-Free Seamless and Affordable Travel with AATrips
              </Typography>
              <Typography
                sx={{
                  mt: 1,
                  fontSize: "12px",
                  textAlign: "justify",
                }}
              >
                In 2023, we see that people are struggling to gain a
                hassle-free, seamless and affordable experience while
                travelling. That's why we embarked on our journey to
                AATrips with the determination to provide a hassle-free,
                seamless and affordable travel experience for people.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* <Container>
     
        <Box sx={{ minHeight: '70vh' }}>
      
          <h3>About Our AATrips</h3>
          <p>
            Welcome to our online travel agency, your premier destination for
            booking flight tickets!
          </p>

          <p>
            At our company, we are dedicated to providing Traveller with
            convenient and efficient ways to book flights to destinations around
            the world. With our easy-to-use platform and comprehensive selection
            of airlines and routes, we strive to make the flight booking process
            seamless and stress-free for our customers.
          </p>

          <h3>Our Mission</h3>
          <p>
            Our mission is to revolutionize the way people book flights by
            offering a user-friendly online platform that ensures hassle-free
            booking experiences. We aim to provide competitive prices, reliable
            service, and personalized support to meet the diverse needs of
            Traveller.
          </p>

          <h3>What Sets Us Apart</h3>
          <p>
            What sets our company apart is our commitment to customer
            satisfaction and our dedication to innovation in the travel
            industry. Here are some key features of our service:
          </p>
          <ul>
            <li>
              <strong>Wide Selection:</strong> We offer a vast range of flight
              options from leading airlines, allowing Traveller to find the best
              routes and prices to suit their preferences.
            </li>
            <li>
              <strong>Easy Booking:</strong> Our intuitive online platform makes
              it simple for customers to search, compare, and book flights
              quickly and securely.
            </li>
            <li>
              <strong>24/7 Support:</strong> Our customer support team is
              available around the clock to assist with any inquiries or issues,
              ensuring that Traveller have peace of mind throughout their
              booking process and journey.
            </li>
          </ul>

          <h3>Let Us Help You Plan Your Next Trip</h3>
          <p>
            Ready to book your next flight? Let our company be your trusted
            partner in travel. Explore our website today to find great deals on
            flights and start planning your next adventure!
          </p>
        </Box>
      </Container> */}
      <Footer />
    </Box>
  );
};

export default Aboutus;
