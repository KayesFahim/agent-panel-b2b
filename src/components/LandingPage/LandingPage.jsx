import React from "react";
import { Box } from "@mui/system";
import LandingHeader from "./LandingHeader";
import Banner from "./Banner";
import WhyOTA from "./WhyOTA";
import WeOffer from "./WeOffer";
import Support from "./Support";
import Question from "./Question";
import Footer from "./Footer";
import vector from "../../images/Landingpae/Vector.svg";
import TopAirlines from "./TopAirlines";
import TopCities from "./TopCities";
const LandingPage = () => {
  
  return (
    <Box>
      <LandingHeader />
      <Banner />
      {/* <Box>
        <Banner />
        <Box>
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              position: "absolute",
              maxWidth: "30%", // Limit maximum width to 90% of the viewport width
            }}
          >
            <img
              src={vector}
              alt="logo"
              style={{
                width: "100%", // Ensure the image fills the container horizontally
                height: "auto", // Maintain aspect ratio
              }}
            />
          </Box>
        </Box>
      </Box> */}
      {/* <WhyOTA /> */}
      <WeOffer />
      {/* <Support /> */}
      {/* <Question /> */}
      <TopCities />
      <TopAirlines />
      <Footer />
    </Box>
  );
};

export default LandingPage;
