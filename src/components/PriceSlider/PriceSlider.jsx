import { Box, Button, Tooltip, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import commaNumber from "comma-number";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import _Slider from "react-slick";
const Slider = _Slider.default || _Slider;
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PrceSlider.css";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Search from "../../images/undraw/undraw_web_search_re_efla.svg";

const PriceSlider = ({
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
    // let url =
    //   tripType === "return"
    //     ? "https://api.flyjatt.com/v1/CalendarSearch/return.php"
    //     : "https://api.flyjatt.com/v1/CalendarSearch/oneway.php";
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
        returndate:
          tripType === "return"
            ? new Date(
              new Date(arrDate).setDate(new Date(arrDate).getDate() - 2)
            ).toLocaleDateString("sv")
            : null,
        adult: adultCount,
        child: childCount,
        infant: infantCount,
      }),
    })
      .then((res) => res.json())
      .then((data) => setPriceData(data));
  }, []);

  const handleFetch = async (date, returndate) => {
    setFromSearchDate(date);
    setToSearchDate(returndate);
    setIsLoaded(false);
    let url = `Demo`;
    // let url = `https://api.flyjatt.com/v1/AirSearch/oneway.php`;
    let body = {
      agentId: agentId || "TFA1000",
      tripType: tripType,
      journeyfrom: `${depFrom?.replace(/\s+/g, "")}",
      journeyto: `${ arrTo?.replace(/\s+/g, "")
  }",
  departuredate: `${new Date(date).toLocaleDateString("sv")}",
      returnDate:
        tripType === "return"
          ? `${ new Date(returndate).toLocaleDateString("sv") } "
          : null,
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
var settings = {
  dots: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 3,
  arrows: true,
  prevArrow: <ArrowBackIosNewIcon />,
  nextArrow: <ArrowForwardIosIcon />,
  responsive: [
    {
      breakpoint: 1450,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};
return (
  <Box
    className="price-slider"
    style={{
      background: "var(--input-bgcolor)",
      width: { lg: "100%", md: "70vw", sm: "90vw", xs: "90vw" },
      height: "100%",
      padding: "5px 0px",
    }}
  >
    <Slider {...settings}>
      {priceData.map((item, index) => {
        return (
          <Button key={index}>
            <Tooltip title={item.TotalFare}>
              <Box
                sx={{
                  backgroundColor: "transparent",
                  color: "var(--secondary-color)",
                  height: "40px",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  cursor: "pointer",
                  ".slick-slide > div": {
                    margin: "1px 10px",
                    width: "auto",
                  },
                  ".slick-list": {
                    margin: "0px -10px",
                  },
                }}
                onClick={() => {
                  handleFetch(item.Date || item.DepDate, item?.ReturnDate);
                }}
              >
                <img
                  src={
                    item?.Carrier === "XY"
                      ? `https://airlineimages.s3.ap-southeast-1.amazonaws.com/128/XY.png`
                      : `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${item?.Carrier}.png`
                  }
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
                    {format(new Date(item?.Date || item?.DepDate), "dd MMM")}
                    {tripType === "return"
                      ? `-${format(new Date(item?.ReturnDate), "dd MMM")}"
                        : ""}
                    </Typography>
                    <Typography
                      marginX={2}
                      fontSize="12px"
                      className="activecolor"
                      color={"var(--secondary-color)"}
                      fontWeight={500}
                      textAlign="left"
                    >
                      {commaNumber(item.TotalFare)}&nbsp;PKR
                    </Typography>
                  </Box>
                </Box>
              </Tooltip>
            </Button>
          );
        })}
        {/* </div> */}
      </Slider>
    </Box>
  );
};

export default PriceSlider;
