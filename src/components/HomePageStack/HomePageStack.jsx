import { Box, Grid, Tooltip, Typography } from "@mui/material";
import {
  Event as CalendarIcon,
  CheckCircle as ConfirmIcon,
  Search as SearchIcon,
  ArrowForward as ArrowIcon,
} from "@mui/icons-material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import commaNumber from "comma-number";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getAuthToken from "../../Token/getAuthToken";

const fetchApiData = async (url, token, setData, errorHandler) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error(`Failed: ${response.statusText}`);
    const data = await response.json();
    setData(data);
  } catch (error) {
    errorHandler(error);
  }
};

const StatCard = ({ icon, iconBg, accentColor, count, label, tooltip, link }) => {
  const navigate = useNavigate();
  return (
    <Tooltip title={tooltip} arrow placement="top">
      <Box className="stat-card-box" onClick={() => navigate(link)}>
        <Box
          className="stat-card-accent"
          sx={{ background: accentColor }}
        />
        <Box className="stat-card-box-icon" sx={{ background: iconBg }}>
          {icon}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, width: "100%" }}>
          <Typography className="stat-card-box-value">{count}</Typography>
          <Typography className="stat-card-box-label">{label}</Typography>
        </Box>
      </Box>
    </Tooltip>
  );
};

const HomePageStack = ({ url }) => {
  const [allQueuesData, setAllQueuesData] = useState({});
  const token = getAuthToken();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchApiData(
      `${import.meta.env.REACT_APP_API_URL}/agent/myaccount`,
      token,
      (data) => setBalance(data?.balance),
      (error) => console.error(error)
    );
  }, [token]);

  useEffect(() => {
    fetchApiData(
      url,
      token,
      (data) => setAllQueuesData(data),
      (error) => console.error(error)
    );
  }, [token]);

  const mainCards = [
    {
      icon: <SearchIcon sx={{ fontSize: 24, color: "var(--primary-color)" }} />,
      iconBg: "rgba(26, 58, 110, 0.1)",
      accentColor: "linear-gradient(90deg, var(--primary-color), #2f538a)",
      count: allQueuesData?.todaysearch || 0,
      label: "Today's Searches",
      tooltip: "Total flight searches performed today",
      link: "/agent/queues",
    },
    {
      icon: <CalendarIcon sx={{ fontSize: 24, color: "var(--primary-color)" }} />,
      iconBg: "rgba(26, 58, 110, 0.1)",
      accentColor: "linear-gradient(90deg, var(--primary-color), #2f538a)",
      count: allQueuesData?.todaybooking || 0,
      label: "Bookings Today",
      tooltip: "Total flights booked today",
      link: "/agent/queues",
    },
    {
      icon: <ConfirmIcon sx={{ fontSize: 24, color: "var(--primary-color)" }} />,
      iconBg: "rgba(26, 58, 110, 0.1)",
      accentColor: "linear-gradient(90deg, var(--primary-color), #2f538a)",
      count: allQueuesData?.todayticketed || 0,
      label: "Tickets Issued Today",
      tooltip: "Total tickets issued today",
      link: "/agent/queues",
    },
    {
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 24, color: "var(--primary-color)" }} />,
      iconBg: "rgba(26, 58, 110, 0.1)",
      accentColor: "linear-gradient(90deg, var(--primary-color), #2f538a)",
      count: `${commaNumber(Number(balance || 0).toFixed(2))} PKR`,
      label: "Current Balance",
      tooltip: "Your current account balance in PKR",
      link: "/agent/adddeposit",
    },
  ];

  return (
    <Box>
      {/* Main Stats */}
      <Grid container spacing={2}>
        {mainCards.map((card, i) => (
          <Grid item xs={6} sm={6} md={3} key={i}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePageStack;
