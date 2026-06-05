import { Box, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import _Slider from "react-slick";
const Slider = _Slider.default || _Slider;
import "./MoreDeals.css";
import getAuthToken from "../../Token/getAuthToken";

export const MoreDeals = () => {
  const [moreDeals, setMoreDeals] = useState([]);
  const slider = useRef(null);
  const token = getAuthToken();

  useEffect(() => {
    let url = `${import.meta.env.REACT_APP_API_URL}/agent/promotion/offers`;
    const fetchDeals = async () => {
      try {
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setMoreDeals(data);
        } else {
          setMoreDeals([]);
        }
      } catch (err) {
        console.error("Error fetching deals:", err.message);
      }
    };

    if (token) {
      fetchDeals();
    }
  }, [token]);

  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (!moreDeals || moreDeals.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        py: 2,
        // Style custom slick arrows/dots
        "& .slick-dots": {
          bottom: "-30px",
        },
        "& .slick-dots li button:before": {
          fontSize: "10px",
          color: "rgba(4, 135, 199, 0.4)",
          opacity: 1,
        },
        "& .slick-dots li.slick-active button:before": {
          color: "#ED5A2B", // Brand Orange Accent
          fontSize: "12px",
          opacity: 1,
        },
        "& .slick-slide > div": {
          margin: "8px 12px",
        },
        "& .slick-list": {
          margin: "0 -12px",
        },
      }}
    >
      <Slider ref={slider} {...settings}>
        {moreDeals.map((item, index) => (
          <Box key={index}>
            <Box
              sx={{
                zIndex: 2,
                cursor: "pointer",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
                border: "1px solid rgba(0,0,0,0.05)",
                background: "#ffffff",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                display: "block",
                position: "relative",
                aspectRatio: "16/9",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.12)",
                  "& img": {
                    transform: "scale(1.05)",
                  },
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={item?.image}
                  alt={`Promotion Offer ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

