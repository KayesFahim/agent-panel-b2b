import React from "react";
import { Box, Typography } from "@mui/material";
import _Marquee from "react-fast-marquee";
import "./TopAirlines.css";

const Marquee = _Marquee.default || _Marquee;

const airlines_departing_from_pakistan = [
  {
    "name": "Pakistan International Airlines",
    "iata": "PK",
    "icao": "PIA",
    "type": "Domestic & International",
    "logo": "https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/PK.png"
  },
  {
    "name": "Airblue",
    "iata": "PA",
    "icao": "ABQ",
    "type": "Domestic & International",
    "logo": "https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/PA.png"
  },
  {
    "name": "AirSial",
    "iata": "PF",
    "icao": "SIF",
    "type": "Domestic & International",
    "logo": "https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/PF.png"
  },
  {
    "name": "Fly Jinnah",
    "iata": "9P",
    "icao": "FJL",
    "type": "Domestic & International",
    "logo": "https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/9P.png"
  },
  {
    "name": "Serene Air",
    "iata": "ER",
    "icao": "SEP",
    "type": "Domestic & International",
    "logo": "https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/ER.png"
  },
  {
    "name": "Emirates",
    "iata": "EK",
    "icao": "UAE",
    "type": "International",
    "logo": "https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/EK.png"
  },
  {
    "name": "Qatar Airways",
    "iata": "QR",
    "icao": "QTR",
    "type": "International",
    "logo": "https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/QR.png"
  },
  {
    "name": "Etihad Airways",
    "iata": "EY",
    "icao": "ETD",
    "type": "International",
    "logo": "https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/EY.png"
  },
  {
    "name": "Flydubai",
    "iata": "FZ",
    "icao": "FDB",
    "type": "International",
    "logo": "https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/FZ.png"
  },
  {
    "name": "Turkish Airlines",
    "iata": "TK",
    "icao": "THY",
    "type": "International",
    "logo": "https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/TK.png"
  },
  {
    "name": "Saudia",
    "iata": "SV",
    "icao": "SVA",
    "type": "International",
    "logo": "https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/SV.png"
  }
];

const TopAirlines = () => {
  return (
    <Box className="airlines-section-wrapper">
      <Typography className="section-title" sx={{ textAlign: "left !important", mb: 1 }}>
        Top Airlines Partners
      </Typography>
      <Marquee gradient={true} gradientColor="243, 247, 250" speed={40}>
        {airlines_departing_from_pakistan.map((airline, index) => {
          return (
            <Box key={index} className="airline-logo-card">
              <img
                src={airline.logo}
                alt={`${airline.name} logo`}
              />
            </Box>
          );
        })}
      </Marquee>
    </Box>
  );
};

export default TopAirlines;
