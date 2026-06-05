import React from "react";
import { Box, Typography } from "@mui/material";
const CommonBreadCums = ({ title }) => {
  return (
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
      <Box
        sx={{
          width: "100px",
          backgroundColor: "#1A3A6E",
          height: "3px",
          marginRight: "5px",
          display: { md: "block", xs: "none" },
        }}
      ></Box>
      <Typography
        sx={{
          fontSize: { lg: "36px", xs: "22px" },
          fontWeight: 600,
          color: "white",
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          width: "100px",
          backgroundColor: "#1A3A6E",
          height: "3px",
          marginLeft: "5px",
          display: { md: "block", xs: "none" },
        }}
      ></Box>
    </Box>
  );
};

export default CommonBreadCums;
