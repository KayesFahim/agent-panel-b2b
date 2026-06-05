import React from "react";
import { Box, Container, Grid, Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import LandingHeader from "./LandingHeader";
import Footer from "./Footer";
import CommonBreadCums from "./CommonBreadCums";

// Icons
import ExploreIcon from "@mui/icons-material/Explore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from "@mui/icons-material/Info";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SecurityIcon from "@mui/icons-material/Security";
import GavelIcon from "@mui/icons-material/Gavel";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import StorageIcon from "@mui/icons-material/Storage";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const publicRoutes = [
  { path: "/", label: "Home (Landing Portal)", desc: "Main landing gateway for B2B travel partners", icon: <ExploreIcon /> },
  { path: "/signin", label: "Sign In", desc: "Access the B2B agent dashboard portal", icon: <LoginIcon /> },
  { path: "/signup", label: "Register / Sign Up", desc: "Register as a verified B2B travel agent", icon: <HowToRegIcon /> },
  { path: "/resetpassword", label: "Reset Password", desc: "Recover access to your account", icon: <LockOpenIcon /> },
  { path: "/aboutus", label: "About Us", desc: "Learn about AATrips journey and mission", icon: <InfoIcon /> },
  { path: "/contactUs", label: "Contact Us", desc: "Get in touch with our office branches", icon: <ContactPageIcon /> },
];

const agentServices = [
  { path: "/agent/dashboard", label: "Agent Dashboard", desc: "Overview of your agent balance & flight searches", icon: <DashboardIcon /> },
  { path: "/agent/product", label: "Search Flights", desc: "Powerful multi-source search engine", icon: <FlightTakeoffIcon /> },
  { path: "/agent/groupfare", label: "Group Flight Bookings", desc: "Browse and book premium airline group fares", icon: <ExploreIcon /> },
  { path: "/agent/pnrimport", label: "PNR Import", desc: "Import external airline reservation PNRs", icon: <StorageIcon /> },
];

const bookingManagement = [
  { path: "/agent/queues", label: "Queue Bookings", desc: "Track, filter and manage ticket booking statuses", icon: <ReceiptLongIcon /> },
  { path: "/agent/searchhistory", label: "Search History", desc: "View history of previous search queries", icon: <StorageIcon /> },
  { path: "/agent/traveller", label: "Traveller Profiles", desc: "Directory of saved passenger profiles", icon: <PeopleIcon /> },
  { path: "/agent/staff", label: "Staff Directory", desc: "Manage sub-agent accounts and permissions", icon: <SettingsIcon /> },
];

const financialReports = [
  { path: "/agent/deposit", label: "Deposit Requests", desc: "View and request deposit load balances", icon: <AccountBalanceIcon /> },
  { path: "/agent/myaccount", label: "My Profile Account", desc: "View account profile details", icon: <SettingsIcon /> },
  { path: "/agent/sales", label: "Sales Report", desc: "Comprehensive dashboard of sales stats", icon: <MonetizationOnIcon /> },
  { path: "/agent/transaction", label: "Transaction Ledger", desc: "Account transaction statements", icon: <ReceiptLongIcon /> },
];

const supportLegal = [
  { path: "/faq", label: "FAQs / Help", desc: "Frequently asked questions for agents", icon: <HelpOutlineIcon /> },
  { path: "/privacy-policy", label: "Privacy Policy", desc: "Data privacy regulations & policies", icon: <SecurityIcon /> },
  { path: "/terms&condition", label: "Terms & Conditions", desc: "User agreements & operational terms", icon: <GavelIcon /> },
];

const Sitemap = () => {
  return (
    <Box sx={{ bgcolor: "#F8FAFc", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <LandingHeader />
      
      <Box sx={{ my: 4, py: 4 }}>
        <CommonBreadCums title="Sitemap" />
      </Box>

      <Container maxWidth="lg" sx={{ mb: 12, flexGrow: 1 }}>
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 800, 
              color: "var(--primary-color)", 
              mb: 1.5,
              fontSize: { xs: "24px", md: "32px" }
            }}
          >
            Explore B2B Site Directory
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: "#64748B", 
              maxWidth: "600px", 
              mx: "auto",
              fontSize: { xs: "14px", md: "16px" }
            }}
          >
            A comprehensive overview and directory structure of AATrips public portal and travel agent console pages.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Public Portal Cards */}
          <Grid item xs={12} md={6}>
            <Card 
              sx={{ 
                height: "100%", 
                borderRadius: "16px", 
                boxShadow: "0 4px 20px -2px rgba(26, 58, 110, 0.08)",
                border: "1px solid rgba(26, 58, 110, 0.05)"
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "var(--primary-color)", mb: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
                  <ExploreIcon /> Public Directory
                </Typography>
                <List sx={{ p: 0 }}>
                  {publicRoutes.map((route) => (
                    <ListItem 
                      key={route.path} 
                      component={Link} 
                      to={route.path}
                      sx={{ 
                        px: 1.5, 
                        py: 1.25, 
                        borderRadius: "8px",
                        transition: "all 0.2s ease-in-out",
                        color: "inherit",
                        "&:hover": {
                          bgcolor: "rgba(26, 58, 110, 0.05)",
                          transform: "translateX(4px)"
                        }
                      }}
                    >
                      <ListItemIcon sx={{ color: "var(--primary-color)", minWidth: 38 }}>
                        {route.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography sx={{ fontWeight: 600, fontSize: "14.5px", color: "#1E293B" }}>
                            {route.label}
                          </Typography>
                        } 
                        secondary={
                          <Typography sx={{ fontSize: "12px", color: "#64748B", mt: 0.25 }}>
                            {route.desc}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Agent Core Services Card */}
          <Grid item xs={12} md={6}>
            <Card 
              sx={{ 
                height: "100%", 
                borderRadius: "16px", 
                boxShadow: "0 4px 20px -2px rgba(26, 58, 110, 0.08)",
                border: "1px solid rgba(26, 58, 110, 0.05)"
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "var(--primary-color)", mb: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
                  <FlightTakeoffIcon /> B2B Booking Engines
                </Typography>
                <List sx={{ p: 0 }}>
                  {agentServices.map((route) => (
                    <ListItem 
                      key={route.path} 
                      component={Link} 
                      to={route.path}
                      sx={{ 
                        px: 1.5, 
                        py: 1.25, 
                        borderRadius: "8px",
                        transition: "all 0.2s ease-in-out",
                        color: "inherit",
                        "&:hover": {
                          bgcolor: "rgba(26, 58, 110, 0.05)",
                          transform: "translateX(4px)"
                        }
                      }}
                    >
                      <ListItemIcon sx={{ color: "var(--primary-color)", minWidth: 38 }}>
                        {route.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography sx={{ fontWeight: 600, fontSize: "14.5px", color: "#1E293B" }}>
                            {route.label}
                          </Typography>
                        } 
                        secondary={
                          <Typography sx={{ fontSize: "12px", color: "#64748B", mt: 0.25 }}>
                            {route.desc}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Booking & Profiles Card */}
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: "100%", 
                borderRadius: "16px", 
                boxShadow: "0 4px 20px -2px rgba(26, 58, 110, 0.08)",
                border: "1px solid rgba(26, 58, 110, 0.05)"
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "var(--primary-color)", mb: 2, display: "flex", alignItems: "center", gap: 1.2 }}>
                  <StorageIcon /> Records &amp; Profiles
                </Typography>
                <List sx={{ p: 0 }}>
                  {bookingManagement.map((route) => (
                    <ListItem 
                      key={route.path} 
                      component={Link} 
                      to={route.path}
                      sx={{ 
                        px: 1.25, 
                        py: 1, 
                        borderRadius: "8px",
                        transition: "all 0.2s ease-in-out",
                        color: "inherit",
                        "&:hover": {
                          bgcolor: "rgba(26, 58, 110, 0.05)",
                          transform: "translateX(4px)"
                        }
                      }}
                    >
                      <ListItemIcon sx={{ color: "var(--primary-color)", minWidth: 32 }}>
                        {route.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography sx={{ fontWeight: 600, fontSize: "13.5px", color: "#1E293B" }}>
                            {route.label}
                          </Typography>
                        } 
                        secondary={
                          <Typography sx={{ fontSize: "11px", color: "#64748B", mt: 0.15 }}>
                            {route.desc}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Finance & Reports Card */}
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: "100%", 
                borderRadius: "16px", 
                boxShadow: "0 4px 20px -2px rgba(26, 58, 110, 0.08)",
                border: "1px solid rgba(26, 58, 110, 0.05)"
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "var(--primary-color)", mb: 2, display: "flex", alignItems: "center", gap: 1.2 }}>
                  <MonetizationOnIcon /> Finance &amp; Reports
                </Typography>
                <List sx={{ p: 0 }}>
                  {financialReports.map((route) => (
                    <ListItem 
                      key={route.path} 
                      component={Link} 
                      to={route.path}
                      sx={{ 
                        px: 1.25, 
                        py: 1, 
                        borderRadius: "8px",
                        transition: "all 0.2s ease-in-out",
                        color: "inherit",
                        "&:hover": {
                          bgcolor: "rgba(26, 58, 110, 0.05)",
                          transform: "translateX(4px)"
                        }
                      }}
                    >
                      <ListItemIcon sx={{ color: "var(--primary-color)", minWidth: 32 }}>
                        {route.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography sx={{ fontWeight: 600, fontSize: "13.5px", color: "#1E293B" }}>
                            {route.label}
                          </Typography>
                        } 
                        secondary={
                          <Typography sx={{ fontSize: "11px", color: "#64748B", mt: 0.15 }}>
                            {route.desc}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Support & Legal Card */}
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: "100%", 
                borderRadius: "16px", 
                boxShadow: "0 4px 20px -2px rgba(26, 58, 110, 0.08)",
                border: "1px solid rgba(26, 58, 110, 0.05)"
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "var(--primary-color)", mb: 2, display: "flex", alignItems: "center", gap: 1.2 }}>
                  <SupportAgentIcon /> Support &amp; Legal
                </Typography>
                <List sx={{ p: 0 }}>
                  {supportLegal.map((route) => (
                    <ListItem 
                      key={route.path} 
                      component={Link} 
                      to={route.path}
                      sx={{ 
                        px: 1.25, 
                        py: 1, 
                        borderRadius: "8px",
                        transition: "all 0.2s ease-in-out",
                        color: "inherit",
                        "&:hover": {
                          bgcolor: "rgba(26, 58, 110, 0.05)",
                          transform: "translateX(4px)"
                        }
                      }}
                    >
                      <ListItemIcon sx={{ color: "var(--primary-color)", minWidth: 32 }}>
                        {route.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography sx={{ fontWeight: 600, fontSize: "13.5px", color: "#1E293B" }}>
                            {route.label}
                          </Typography>
                        } 
                        secondary={
                          <Typography sx={{ fontSize: "11px", color: "#64748B", mt: 0.15 }}>
                            {route.desc}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      
      <Footer />
    </Box>
  );
};

export default Sitemap;
