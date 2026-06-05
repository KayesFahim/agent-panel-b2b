import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Tooltip,
  Button,
  Collapse,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import commaNumber from "comma-number";
import WorkIcon from "@mui/icons-material/Work";
import { format } from "date-fns";
import "./SingleMultiCityItem.css";
import FlightDetails from "../FlightDetails/FlightDetails";
import FareDetails from "../FareDetails/FareDetails";
import FarePolicy from "../FarePolicy/FarePolicy";
import Baggage from "../Baggage/Baggage";
import CommissionInvoice from "../CommissionInvoice/CommissionInvoice";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import Transit from "../SingleFlight/Transit";
import CircleIcon from "@mui/icons-material/Circle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import FlightLayout from "../SingleFlight/FlightLayout";
import MoreFlight from "../SingleFlight/MoreFlight";

const SingleMultiCityItem = ({
  flightData,
  adultCount,
  childCount,
  infant,
  to,
  from,
  tripType,
  fromAddress,
  toAddress,
  dDate,
  agentFarePrice,
  setAgentFarePrice,
  commisionFarePrice,
  setCommisionFarePrice,
  customerFare,
  setCustomerFare,
  isLoaded,
}) => {
  const [state, setState] = useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const clientPrice = parseInt(
    flightData.system !== "Galileo"
      ? flightData?.customerPrice || flightData?.clientPrice
      : flightData?.price || flightData?.customerPrice
  );

  const clientFare = Math.round(clientPrice);
  const agentFare = Math.round(
    parseInt(
      flightData.system !== "Galileo"
        ? flightData?.subagentprice || flightData.price
        : flightData.subagentprice
    )
  );
  const commission = Math.round(clientFare - agentFare);

  const navigate = useNavigate();
  const FlightInformation = (data) => {
    navigate("/agent/flightinformation", {
      state: {
        flightData,
        data,
        adultCount,
        childCount,
        infant,
      },
    });
  };

  const paxCount = adultCount + childCount + infant;
  let count = [];
  for (let i = 0; i < paxCount; i++) {
    count.push(i);
  }
  //todo: calculate total flight duration
  const calDuration = (arr) => {
    const timeArr = arr.map((item) => item.flightduration);
    const convertTime = timeArr.map(
      (item) =>
        parseInt(item.split(" ")[0]) * 3600 * 1000 +
        parseInt(item.split(" ")[1]) * 60 * 1000
    );
    const milliseconds = convertTime.reduce((cur, acc) => cur + acc, 0);
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = seconds >= 30 ? minutes + 1 : minutes;
    minutes = minutes % 60;
    hours = hours % 24;
    return `${hours.toString().padStart(2, 0)}H:${minutes
      .toString()
      .padStart(2, 0)}Min`;
  };

  return (
    <Box mb={2.5}>

    </Box>
  );
};

export default SingleMultiCityItem;
