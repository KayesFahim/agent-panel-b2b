import { Box, Modal, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import getAuthToken from "../../Token/getAuthToken";

const updateModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#fff",
  py: 3,
  px: 3,
  borderRadius: "10px",
  overflow: "auto",
};

const FareDetails = ({ allData }) => {
  const token = getAuthToken();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const fareCode =
    allData?.bookingdata?.itenary?.PriceBreakDown?.[0]?.FareComponent?.[0];
  const body = {
    System: "Sabre",
    ...fareCode,
  };

  const url = `${import.meta.env.REACT_APP_API_URL}/agent/flight/fare/rules`;

  const postData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(url, body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // 
      setData(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received from server");
      } else {
        console.error("Error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = async () => {
    postData(url, body);
    setOpen(true);
  };

  const formatPolicyText = (text) => {
    if (!text) return "Not Available";

    const formattedText = text
      .split("\n")
      .map((line, index) => <Typography key={index}>{line}</Typography>);

    return <>{formattedText}</>;
  };

  return (
    <Box>
      <Box
        sx={{
          cursor: "pointer",
          bgcolor: "var(--p2)",
          color: "var(--white)",
          p: "6px 20px",
          textAlign: "center",
          borderRadius: "5px",
        }}
        onClick={handleOpen}
        disabled={open}
      >
        Fare Policy
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          bgcolor="#fff"
          sx={{
            ...updateModalStyle,
            width: { xs: "95%", sm: "80%", md: "60%" },
            maxHeight: { xs: "40vh", sm: "60vh" },
            p: { xs: 2, sm: 3 },
            msOverflowY: "scrollable",
          }}
        >
          <Typography
            sx={{
              color: "#222222",
              fontSize: "20px",
              fontWeight: 500,
              mb: "10px",
              textAlign: "center",
            }}
          >
            Fare Policy Details
          </Typography>
          <Box my={2}>
            <Typography sx={{ color: "#dc143c" }}>Refund Policy</Typography>
            <Box sx={{ mt: 2, fontSize: 12 }}>
              {loading
                ? "Loading..."
                : formatPolicyText(data?.refundpolicy?.[0])}
            </Box>
          </Box>
          <Box my={2}>
            <Typography sx={{ color: "#dc143c" }}>Reissue Policy</Typography>
            <Box sx={{ mt: 2, fontSize: 12 }}>
              {loading
                ? "Loading..."
                : formatPolicyText(data?.reissuepolicy?.[0])}
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default FareDetails;
