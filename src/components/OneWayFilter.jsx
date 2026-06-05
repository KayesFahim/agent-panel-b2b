import React, { useState } from 'react';

import Slider from '@mui/material/Slider';

import { Box, Grid, Typography } from '@mui/material';
import commaNumber from 'comma-number';

const OneWayFilter = ({ setfilteredData, data, noData, setNoData }) => {
  let arr = [];
  let flightprice = data;
  flightprice.map((data) => {
    arr.push(data.NetFare);
    return arr;
  });
  const maxPrice = Math.max(...arr);
  const minPrice = Math.min(...arr);
  const [selectPrice, setSelectPrice] = useState([minPrice, maxPrice]);

  const handleChangePrice = (event, newPrice) => {
    setSelectPrice(newPrice);
    let updatedflight = data;
    const selectMinPrice = selectPrice[0];
    const selectMaxPrice = selectPrice[1];
    if (selectPrice) {
      updatedflight = updatedflight.filter(
        (item) =>
          item.NetFare >= selectMinPrice && item.NetFare <= selectMaxPrice
      );
      setfilteredData(updatedflight);
    } else {
      setNoData(noData);
    }
  };

  return (
    <Box
      sx={{
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        px: 2,
        py:1,
        mb: 2,
        borderRadius: '5px',
      }}
    >
      <Grid item className="price-slider-line">
        <Slider
          value={selectPrice}
          onChange={handleChangePrice}
          valueLabelDisplay="auto"
          min={minPrice}
          max={maxPrice}
        />
      </Grid>
      <Grid container justifyContent={'space-between'}>
        <Typography
          sx={{
            color: 'var(--black)',
            fontWeight: '500',
            fontSize: '14px',
          }}
        >
          {commaNumber(Math.round(minPrice))}
        </Typography>
        <Typography
          sx={{
            color: 'var(--black)',
            fontWeight: '500',
            fontSize: '14px',
          }}
        >
          {commaNumber(Math.round(maxPrice))}
        </Typography>
      </Grid>
    </Box>
  );
};

export default OneWayFilter;
