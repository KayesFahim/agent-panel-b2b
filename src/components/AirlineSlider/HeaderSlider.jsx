/* eslint-disable react/prop-types */
import _Slider from 'react-slick';
const Slider = _Slider.default || _Slider;
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Stack, Tooltip } from '@mui/material';
import './HeaderSlider.css';
import React from 'react';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import commaNumber from 'comma-number';
const HeaderSlider = ({ uniqueCarriers, selectedAirlins, handleAirLine }) => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };
  const sliderRef = React.createRef();

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };
  const getBoxColor = (row, col) => {
    return (row + col) % 2 === 0 ? 'red' : 'blue';
  };
  return (
    <Box
      className="airlines-slide"
      sx={{
        width: { xs: '95vw', sm: '95vw', md: '88vw', lg: '100%' },
        button: {
          border: 'none',
          outline: 'none',
          backgroundColor: 'var(--primary-color)',
          color: 'var(--white)',
          cursor: 'pointer',
          borderRadius: '50%',
          height: '25px',
          width: '25px',
          margin: 'auto',
          marginLeft: '5px',
          marginRight: { xs: '5px', md: '1px' },
          overflow: 'hidden',
          paddingTop: '4px',
          '&:hover': {
            color: 'var(--black)',
            backgroundColor: 'var(--bgcolor)',
          },
        },
        '.slick-next': {
          display: 'none !important',
        },
        '.slick-prev': {
          display: 'none !important',
        },

        '.slick-track': {
          marginLeft: 0,
        },
        '.slick-slide > div': {
          margin: '1px 5px',
          width: 'auto',
        },
        '.slick-list': {
          margin: '0px -10px',
        },
        px: 1,
      }}
      position="relative"
    >
      <Box
        sx={{
          // boxShadow:
          //   '-0.452679px 4.97947px 36px rgba(0, 0, 0, 0.09), -0.0905357px 0.995893px 5.85px rgba(0, 0, 0, 0.045)',
          borderRadius: '10px',
        }}
      >
        <Slider ref={sliderRef} {...settings} nextArrow={null} prevArrow={null}>
          {uniqueCarriers.map((item, i) => {
            const isEven = i % 2 === 0;
            const boxColor = isEven ? 'even-color' : 'odd-color';
            return (
              <Box
                key={i}
                sx={{ borderRadius: '6px' }}
                className={`${boxColor}`}
              >
                <input
                  type="checkbox"
                  id={item.code}
                  checked={selectedAirlins.includes(item.code)}
                  onChange={() => handleAirLine(item.code)}
                  style={{
                    position: 'absolute',
                    zIndex: '-1',
                    visibility: 'hidden',
                  }}
                />
                <label htmlFor={item.code}>
                  <div>
                    <Tooltip title={item?.name}>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          zIndex: 2,
                          cursor: 'pointer',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: '6px',
                          p: 1,
                          backgroundColor: selectedAirlins.includes(item.code)
                            ? 'var(--primary-color)'
                            : 'initial',
                          color: selectedAirlins.includes(item.code)
                            ? 'var(--white)'
                            : 'var(--secondary-color)',
                        }}
                      >
                        <Box
                          sx={{
                            fontSize: { xs: 11, md: 14 },
                          }}
                        >
                          {item.code}
                        </Box>
                        <Box sx={{ width: '25px' }}>
                          <img
                            src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${item.code}.png`}
                            alt=""
                            style={{
                              width: '100%',
                              height: '100%',
                              border: '1px solid var(--primary-color)',
                              borderRadius: '50%',
                              padding: '2px',
                            }}
                          />
                        </Box>
                        <Stack direction="column">
                          <Box
                            sx={{
                              fontSize: 12,
                              fontWeight: 500,
                            }}
                          >
                            {commaNumber(item.price)}{' '}
                            <span style={{ fontSize: '10px' }}>{item.currency || 'PKR'}</span>
                          </Box>
                        </Stack>
                      </Stack>
                    </Tooltip>
                  </div>
                </label>
              </Box>
            );
          })}
        </Slider>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          left: { xs: -2, md: -1 },
          top: '50%',
          transform: 'translateY(-50%)',
          display: uniqueCarriers.length > 6 ? 'flex' : 'none',
          height: '100%',
          // background: 'var(--bgcolor)',
        }}
      >
        <button onClick={goToPrev}>
          <ArrowForwardIosRoundedIcon
            sx={{ transform: 'rotate(180deg)', fontSize: 16, py: 0.1 }}
          />
        </button>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          right: { xs: -3, md: -2 },
          top: '50%',
          transform: 'translateY(-50%)',
          display: uniqueCarriers.length > 6 ? 'flex' : 'none',
          height: '100%',
          // background: 'var(--bgcolor)',
        }}
      >
        <button onClick={goToNext}>
          <ArrowForwardIosRoundedIcon sx={{ fontSize: 16, py: 0.1 }} />
        </button>
      </Box>
    </Box>
  );
};

export default HeaderSlider;
