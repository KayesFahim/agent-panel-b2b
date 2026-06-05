import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import _Marquee from "react-fast-marquee";
import getAuthToken from "../../Token/getAuthToken";

const Marquee = _Marquee.default || _Marquee;

const Marque = () => {
  const token = getAuthToken();
  const apiUrl = import.meta.env.REACT_APP_API_URL;
  const apiEndpoint = "/agent/notice/all";
  const [marqueText, setMarqueText] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}${apiEndpoint}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (Array.isArray(response.data)) {
          setMarqueText(response.data);
        } else {
          setMarqueText([]);
        }
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, apiUrl]);

  if (!marqueText || marqueText.length === 0) {
    return null;
  }

  const combinedNotice = marqueText.map((item) => item.notice).join("   •   ");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        background: "var(--primary-color)",
        color: "#ffffff",
        border: "1px solid #ffffff",
        height: "36px",
        overflow: "hidden",
      }}
    >
      {/* Static Label Badge */}
      <Box
        sx={{
          bgcolor: "var(--primary-color)",
          color: "white",
          px: 2,
          height: "100%",
          display: "flex",
          alignItems: "center",
          fontWeight: 700,
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          zIndex: 10,
          boxShadow: "4px 0 8px rgba(0,0,0,0.2)",
          whiteSpace: "nowrap",
        }}
      >
        📢 Notice
      </Box>

      {/* Scrolling Content */}
      <Box sx={{ flexGrow: 1, overflow: "hidden", py: 0.5 }}>
        <Marquee
          gradient={false}
          speed={45}
          pauseOnHover={true}
          style={{
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          <span style={{ paddingRight: "50px" }}>{combinedNotice}</span>
        </Marquee>
      </Box>
    </Box>
  );
};

export default Marque;

