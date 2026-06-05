import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import commaNumber from "comma-number";
import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Search from "../../images/undraw/undraw_web_search_re_efla.svg";

const RoundPriceGrid = ({
  tripType,
  agentId,
  depFrom,
  depDate,
  arrTo,
  arrDate,
  adultCount,
  childCount,
  infantCount,
  data2,
  setData2,
  data,
  setData,
  setIsLoaded,
  setPageCount,
  setFromSearchDate,
  setToSearchDate,
}) => {
  const navigate = useNavigate();
  const [priceData, setPriceData] = useState([]);
  useEffect(() => {
    let url = "demo";
    // let url = "https://api.flyjatt.com/v1/CalendarSearch/return.php";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        journeyfrom: depFrom,
        journeyto: arrTo,
        departuredate: new Date(
          new Date(depDate).setDate(new Date(depDate).getDate() - 2)
        ).toLocaleDateString("sv"),
        returndate: new Date(
          new Date(arrDate).setDate(new Date(arrDate).getDate() - 2)
        ).toLocaleDateString("sv"),
        adult: adultCount,
        child: childCount,
        infant: infantCount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPriceData(data);
      });
  }, []);

  const handleFetch = async (date, returndate) => {
    setFromSearchDate(date);
    setToSearchDate(returndate);
    setIsLoaded(false);
    let url = "demo";
    // let url = "https://api.flyjatt.com/v1/AirSearch/oneway.php";
    let body = {
      agentId: agentId || "TFA1000",
      tripType: tripType,
      journeyfrom: `${depFrom?.replace(/\s+/g, "")}",
      journeyto: `${ arrTo?.replace(/\s+/g, "")
  }",
  departuredate: `${new Date(date).toLocaleDateString("sv")}",
      returnDate: `${ new Date(returndate).toLocaleDateString("sv") } ",
  adult: adultCount,
    child: childCount,
      infant: infantCount,
    };
fetch(url, {
  method: "POST",
  headers: {
    Accept: "*/*",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
  body: JSON.stringify(body),
})
  .then((res) => {
    return res.json();
  })

  .then((data) => {
    if (data.length !== 0) {
      setIsLoaded(true);
      const uniqueData = data;
      const count = uniqueData.length;
      const pageNumber = Math.ceil(count / 30);
      setPageCount(pageNumber);
      setData(uniqueData);
      setData2(uniqueData);
    } else {
      throw new Error();
    }
  })
  .catch(async (err) => {
    await Swal.fire({
      imageUrl: Search,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      title: "No Flights Found",
      confirmButtonText: "Search Again...",
      confirmButtonColor: "var(--primary-color)",
    }).then(function () {
      navigate("/agent/dashboard");
    });
  });
  };
return (
  <Box
    style={{
      background: "var(--input-bgcolor)",
      width: "100%",
      height: "100%",
      padding: "5px 0px",
    }}
  >
    <Grid container spacing={1}>
      {priceData.map((item, index) => {
        return (
          <Grid item md={1.7} key={index}>
            <Tooltip title={item.TotalFare}>
              <Box
                sx={{
                  backgroundColor: "transparent",
                  color: "var(--secondary-color)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleFetch(item.DepDate, item?.ReturnDate);
                }}
              >
                <img
                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${item.Carrier}.png`}
                  alt="flight-icon"
                  style={{
                    width: "30px",
                    height: "30px",
                    border: "2px solid var(--white)",
                    borderRadius: "100%",
                  }}
                />
                <Box>
                  <Typography
                    marginX={2}
                    fontSize="12px"
                    color={"#222222"}
                    fontWeight={500}
                    textAlign="left"
                  >
                    {`${format(new Date(item?.DepDate), "dd MMM")}-${format(
                      new Date(item?.ReturnDate),
                      "dd MMM"
                    )}`}
                  </Typography>
                  <Typography
                    marginX={2}
                    fontSize="12px"
                    className="activecolor"
                    color={"var(--secondary-color)"}
                    fontWeight={500}
                  >
                    {commaNumber(item.TotalFare)}&nbsp;PKR
                  </Typography>
                </Box>
              </Box>
            </Tooltip>
          </Grid>
        );
      })}
    </Grid>
  </Box>
);
};

export default RoundPriceGrid;
