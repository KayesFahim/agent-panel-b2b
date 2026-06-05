/* eslint-disable jsx-a11y/no-distracting-elements */
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Header from "../Header/Header";
import HomeSearchBox from "../HomeSearchBox/HomeSearchBox";
import FlightIcon from "@mui/icons-material/Flight";
import DownloadIcon from "@mui/icons-material/Download";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import "./Dashboard.css";
import "../../../src/pages/Home/home.css";
import { MoreDeals } from "../MoreDeals/MoreDeals";
import { useNavigate } from "react-router-dom";

const searchItems = [
  { name: "Flight", value: "flight", icon: "FlightIcon" },
];

const getSearchIcon = (value) => {
  const iconProps = { borderRadius: "50%", p: 0.5, fontSize: 30 };
  switch (value) {
    case "flight": return <FlightIcon sx={iconProps} />;
    case "group": return <Diversity2Icon sx={iconProps} />;
    case "hotel": return <LocationCityIcon sx={iconProps} />;
    case "umrah": return <NightlightRoundIcon sx={iconProps} />;
    case "package": return <TravelExploreIcon sx={iconProps} />;
    case "visa": return <ViewComfyIcon sx={iconProps} />;
    default: return <DownloadIcon sx={iconProps} />;
  }
};

const Dashboard = () => {
  const navigate = useNavigate();

  const [system, setSystem] = useState("flight");
  const [type, setType] = useState("flight");
  const [importData, setImportData] = useState({});

  const handleSystemChange = (newValue) => {
    if (newValue === "group") navigate("/agent/groupfare");
    setSystem(newValue);
  };
  const handleTypeChange = (event, newValue) => setType(newValue);
  const handleChange = (e) => setImportData({ ...importData, [e.target.name]: e.target.value });
  const handleSubmit = () => {
    navigate("/agent/pnrimport", { state: { system: importData?.system, pnr: importData?.pnr } });
  };

  return (
    <Box sx={{ background: "#f8fafc", minHeight: "100vh" }}>
      {/* Fixed Header */}
      <Box sx={{ position: "fixed", top: 0, zIndex: 10000, width: "100%" }}>
        <Header />
      </Box>

      {/* ── Main Content ── */}
      <Container
        maxWidth="xl"
        sx={{ pt: { xs: 18, sm: 18, md: 16, lg: 18 }, pb: 6, px: { xs: 2, sm: 3 } }}
      >
        {/* ── Flight Search Box ── */}
        <Box mb={5} sx={{ maxWidth: "1210px", mx: "auto" }}>
          <Box className="home-section-header" sx={{ justifyContent: "flex-start", gap: 1 }}>
            <FlightIcon sx={{ color: "var(--primary-color)", fontSize: 28 }} />
            <Typography className="home-section-title" sx={{ "&::before": { display: "none" } }}>Search Flights</Typography>
          </Box>
          <Box
            sx={{
              background: "var(--primary-color)",
              borderRadius: "12px",
              boxShadow: "0 8px 24px rgba(26,58,110,0.25)",
              overflow: "visible",
              position: "relative",
            }}
          >
            {/* Flight search */}
            {system === "flight" && (
              <Box sx={{ display: "flex", justifyContent: { xs: "center", lg: "left" } }}>
                <Box sx={{ width: "100%" }}>
                  <HomeSearchBox type={type} setType={setType} handleTypeChange={handleTypeChange} />
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        {/* ── Promotional Offers ── */}
        <Box mb={3} sx={{ maxWidth: "1210px", mx: "auto" }}>
          <Box className="home-section-header" mb={2} sx={{ justifyContent: "flex-start", gap: 1 }}>
            <LocalOfferIcon sx={{ color: "var(--primary-color)", fontSize: 28 }} />
            <Typography className="home-section-title" sx={{ "&::before": { display: "none" } }}>Promotional Offers</Typography>
          </Box>
          <MoreDeals />
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
