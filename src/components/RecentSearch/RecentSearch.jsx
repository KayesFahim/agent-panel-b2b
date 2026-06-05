import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import _Slider from "react-slick";
const Slider = _Slider.default || _Slider;

import moment from "moment/moment";
import "./RecentSearch.css";

export const RecentSearch = () => {
  const user = secureLocalStorage.getItem("user-info");
  const agentId = user?.uid;
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const slider = useRef(null);

  useEffect(() => {
    setIsLoaded(false);
    fetch(
      `${import.meta.env.REACT_APP_API_URL}/searchhistory/recent/${agentId}`
      //`https://api.flyjatt.com/v1/SearchHistory/index.php?agentId=${agentId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.length > 0) {
          setIsLoaded(true);
          setSearchHistory(
            data?.filter((item) => item?.TripType !== "multicity")
          );
        }
      });
  }, [agentId]);

  const len = searchHistory?.length > 4 ? 4 : searchHistory?.length;

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: len,
    slidesToScroll: 1,
    initialSlide: 1,
    autoplay: true,
    arrows: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleSearchBtn = (searchData) => {
    searchData.TripType === "oneway"
      ? navigate("/agent/searchresult", {
        state: {
          faddress: searchData?.DepFrom || "",
          toAddress: searchData?.ArrTo || "",
          fromSearchText: searchData?.DepAirport || searchData?.DepFrom,
          toSearchText: searchData?.ArrAirport || searchData?.ArrTo,
          departureDate:
            new Date(searchData?.GoDate) <= new Date()
              ? moment().format("YYYY-MM-DD")
              : moment(searchData?.GoDate).format("YYYY-MM-DD"),
          adultCount: searchData?.adult > "0" ? Number(searchData?.adult) : 1,
          childCount: Number(searchData?.child ?? 0),
          infant: Number(searchData?.infant ?? 0),
          tripType: searchData?.TripType || "oneway",
          fromSendData: searchData?.DepFrom || "",
          toSendData: searchData?.ArrTo || "",
          className: searchData?.class || "Economy",
        },
      })
      : navigate("/agent/roundsearchresult", {
        state: {
          faddress: searchData?.DepFrom || "",
          toAddress: searchData?.ArrTo || "",
          fromSearchText: searchData?.DepAirport || searchData?.DepFrom,
          toSearchText: searchData?.ArrAirport || searchData?.ArrTo,
          departureDate:
            new Date(searchData?.depTime) <= new Date()
              ? moment().format("YYYY-MM-DD")
              : moment(searchData?.GoDate).format("YYYY-MM-DD"),
          returningDate:
            new Date(searchData?.BackDate) <= new Date()
              ? moment().format("YYYY-MM-DD")
              : moment(searchData?.BackDate).format("YYYY-MM-DD"),
          adultCount: Number(searchData?.adult) ?? 1,
          childCount: Number(searchData?.child ?? 0),
          infant: Number(searchData?.infant ?? 0),
          tripType: searchData?.TripType || "return",
          fromSendData: searchData?.DepFrom || "",
          toSendData: searchData?.ArrTo || "",
          className: searchData?.class || "Economy",
        },
      });
  };
  return (
    <Container>
      <Box
        sx={{
          margin: "50px 0px 10px",
          width: { lg: "100%", md: "85vw", sm: "90vw", xs: "90vw" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "26px",
              color: "var(--secondary-color)",
              fontWeight: "500",
              margin: "20px 0px",
              paddingLeft: "5px",
            }}
          >
            Recent Search
          </Typography>
          <Box sx={{ display: "flex", gap: "5px" }}>
            <Box
              sx={{
                border: "1px solid var(--primary-color)",
                borderRadius: "50%",
                background: "var(--white)",
                color: "var(--primary-color)",
                height: "30px",
                width: "30px",
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": {
                  color: "var(--primary-color)",
                  background: "var(--white)",
                  justifyContent: "center",
                },
              }}
              onClick={() => slider?.current?.slickPrev()}
            >
              <ArrowBackIosIcon sx={{ fontSize: "20px" }} />
            </Box>
            <Box
              sx={{
                border: "1px solid var(--secondary-color)",
                borderRadius: "50%",
                background: "var(--secondary-color)",
                color: "var(--white)",
                height: "30px",
                width: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                transition: "all .5 ease",
                "&:hover": {
                  color: "var(--white)",
                  justifyContent: "end",
                },
              }}
              onClick={() => slider?.current?.slickNext()}
            >
              <ArrowForwardIosIcon sx={{ fontSize: "20px" }} />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            ".slick-slide > div": {
              margin: "1px 10px",
              width: "auto",
            },
            ".slick-list": {
              margin: "0px -10px",
            },
          }}
        >
          <Slider ref={slider} {...settings}>
            {searchHistory?.map((item, index) => (
              <Box
                key={index}
                sx={{
                  width: "fit-content",
                  height: "fit-content",
                  background: "var(--white)",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  borderRadius: "4px",
                  overflow: "hidden",
                  padding: "10px",
                  mt: "5px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    width: "100%",
                    height: "fit-content",
                  }}
                >
                  <Typography
                    sx={{
                      width: "fit-content",
                      fontSize: "14px",
                      fontWeight: "500",
                      padding: "5px",
                    }}
                    noWrap
                  >
                    {item?.TripType?.toUpperCase() || "SearchType"}
                  </Typography>

                  <FlightTakeoffIcon
                    style={{
                      fontSize: "20px",
                      height: "30px",
                      width: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                      backgroundColor: "var(--primary-color)",
                      color: "var(--white)",
                      padding: "5px",
                      margin: "5px",
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    width: "fit-content",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "var(--secondary-color)",
                    paddingLeft: "5px",
                  }}
                  noWrap
                >
                  {`${item?.DepFrom} - ${item?.ArrTo}`}
                </Typography>
                <Typography
                  sx={{
                    width: "fit-content",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "var(--primary-color)",
                    paddingLeft: "5px",
                  }}
                  noWrap
                >
                  {`${item?.GoDate} ${item?.BackDate ? "- " + item?.BackDate : ""
                    }`}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    width: "100%",
                    height: "fit-content",
                  }}
                >
                  <Typography
                    sx={{
                      width: "fit-content",
                      fontSize: "14px",
                      fontWeight: "500",
                      paddingLeft: "5px",
                    }}
                    noWrap
                  >
                    {item?.adult > 0 ? `${item.adult} ADULT` : null}{" "}
                    {item?.child > 0 ? `${item?.child} CHILDREN` : null}{" "}
                    {item?.infant > 0 ? `${item?.infant} INFANT` : null}
                  </Typography>
                  {item?.TripType?.toUpperCase === "MULTICITY" ? (
                    <Box
                      sx={{
                        color: "var(--primary-color)",
                        textDecoration: "underline",
                        paddingRight: "5px",
                      }}
                    >
                      Search
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        color: "var(--primary-color)",
                        textDecoration: "underline",
                        paddingRight: "5px",
                      }}
                      onClick={() => handleSearchBtn(item)}
                    >
                      Search
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
    </Container>
  );
};
