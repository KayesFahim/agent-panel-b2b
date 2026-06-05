import { Grid, Box, Typography, Tooltip, Stack } from '@mui/material';
import React from 'react';
import moment from 'moment';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
const GroupFareFlightDetails = ({ data }) => {
  const minitConvert = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };
  return (
    <Grid container spacing={{ xs: 1, sm: 2 }}>
      <Grid
        item
        xs={5}
        sm={6}
        md={2.5}
        textAlign={{ xs: 'start', md: 'start' }}
      >
        <Box>
          <Box
            sx={{
              width: {
                xs: '30px',
                sm: '40px',
              },
              height: {
                xs: '30px',
                sm: '40px',
              },
            }}
          >
            <img
              src={
                data?.MarketingCarrier === 'XY'
                  ? `https://airlineimages.s3.ap-southeast-1.amazonaws.com/128/XY.png`
                  : `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${data?.MarketingCarrier}.png`
              }
              alt={data?.MarketingCarrier}
              width="100%"
              height="100%"
            />
          </Box>
          <Typography
            sx={{
              color: 'var(--primary-color)',
              fontWeight: 500,
              fontSize: '12px',
            }}
            noWrap
          >
            {data?.MarketingCarrierName}
            <br />
            <span
              style={{
                color: 'var(--fontcolor)',
              }}
            >
              {data?.MarketingCarrier} {data?.MarketingFlightNumber} &{' '}
              {data?.SegmentCode?.bookingCode}
            </span>
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={7} sm={6} md={3.5} textAlign={{ xs: 'end', md: 'start' }}>
        <Typography fontSize={{ xs: 13, sm: 20 }} noWrap>
          <span
            style={{
              color: 'var(--primary-color)',
            }}
          >
            {data?.DepFrom}
          </span>

          <Tooltip title={`${data?.DepAirPort}`}>
            <Typography
              sx={{
                color: 'var(--secondary-color)',
                fontSize: { xs: 12, sm: 13 },
              }}
              noWrap
            >
              {data?.DepAirPort}
            </Typography>
          </Tooltip>

          <Typography
            style={{
              color: 'var(--primary-color)',
              fontSize: '12px',
            }}
          >
            {moment(data?.DepTime?.split('+')[0])?.format('DD MMM YYYY HH:mm')}
          </Typography>
        </Typography>
      </Grid>
      <Grid item xs={5} sm={6} md={2.5} margin="auto">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            boxShadow: 'rgba(153, 206, 201, 0.384) 0px 7px 29px 0px',
            borderRadius: '5px',
            py: 0.5,
          }}
        >
          <Box>
            <Box
              sx={{
                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                width: { xs: '25px', md: '40px' },
                height: { xs: '25px', md: '40px' },
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                ml: {
                  xs: 0,
                  md: data?.length - 1 > 0 ? 1 : 0.5,
                },
              }}
            >
              <EastRoundedIcon
                sx={{
                  color: 'var(--fontcolor)',
                  bgcolor: 'var(--bgcolor)',
                  borderRadius: '50%',
                  p: 0.5,
                  fontSize: { xs: '20px', md: '30px' },
                }}
              />
            </Box>
            <Typography
              sx={{
                color: 'var(--primary-color)',
                fontWeight: 500,
                fontSize: {
                  xs: '10px',
                  md: '12px',
                },
              }}
            >
              {minitConvert(data?.Duration)}
            </Typography>
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={7} sm={6} md={3.5} textAlign="end">
        <Typography fontSize={{ xs: 13, sm: 20 }} noWrap>
          <span
            style={{
              color: 'var(--primary-color)',
            }}
          >
            {data?.ArrTo}
          </span>

          <Tooltip title={`${data?.ArrAirPort}`}>
            <Typography
              sx={{
                color: 'var(--secondary-color)',
                fontSize: { xs: 12, sm: 13 },
              }}
              noWrap
            >
              {data?.ArrAirPort}
            </Typography>
          </Tooltip>

          <Typography
            style={{
              color: 'var(--primary-color)',
              fontSize: '12px',
            }}
          >
            {moment(data?.ArrTime?.split('+')[0])?.format('DD MMM YYYY HH:mm')}
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default GroupFareFlightDetails;
