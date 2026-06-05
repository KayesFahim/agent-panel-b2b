import { Grid, Box, Typography, Tooltip, Stack, Button } from '@mui/material';
import React from 'react';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import Transit from '../SingleFlight/Transit';
const GroupFareFlightLayout = ({
  flightData,
  allData,
  index,
  arr,
  handleDelete,
  isLoading,
  disabled,
  user,
}) => {
  return (
    <Grid container columnSpacing={{ xs: 1, sm: 2 }}>
      <Grid item xs={5} sm={2.5} md={2.5}>
        <Box>
          <Box
            sx={{
              width: { xs: '30px', md: '40px' },
              height: { xs: '30px', md: '40px' },
            }}
          >
            <img
              src={
                flightData?.Segments[0]?.MarketingCarrier === 'XY'
                  ? `https://airlineimages.s3.ap-southeast-1.amazonaws.com/128/XY.png`
                  : `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData?.Segments[0]?.MarketingCarrier}.png`
              }
              alt={`${flightData?.Segments[0]?.MarketingCarrier}`}
              width="100%"
              height="100%"
            />
          </Box>

          <Tooltip title={`${flightData?.Segments[0]?.MarketingCarrierName}`}>
            <Typography
              fontSize={{ xs: '10px', md: '13px' }}
              sx={{
                width: '100%',
                cursor: 'pointer',
                color: 'var(--primary-color)',
                fontWeight: 500,
              }}
              noWrap
            >
              {`${flightData?.Segments[0]?.MarketingCarrierName}`}
            </Typography>
          </Tooltip>
          <Typography
            sx={{
              display: arr.length - 1 === index ? 'unset' : 'none',
            }}
          >
            {allData?.Refundable === true ? (
              <Typography
                sx={{
                  color: 'var(--gray)',
                  fontSize: { xs: '10px', md: '12px' },
                }}
              >
                Refundable
              </Typography>
            ) : (
              <Typography
                sx={{
                  color: 'var(--gray)',
                  fontSize: { xs: '10px', md: '12px' },
                }}
              >
                Non Refundable
              </Typography>
            )}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={7} sm={3.5} md={3.5}>
        <Box sx={{ position: 'relative' }}>
          {index === 0 ? (
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                display: { xs: 'flex', sm: 'none' },
                justifyContent: 'end',
              }}
            >
              {user ? (
                ''
              ) : (
                <Button disabled={isLoading}>
                  <DeleteIcon onClick={() => handleDelete(allData)} />
                </Button>
              )}
            </Box>
          ) : (
            ''
          )}
          <Typography sx={{ fontSize: 12, color: 'var(--gray)' }}>
            From
          </Typography>
          <Stack direction="row" spacing={0.3} alignItems="center">
            <Typography
              sx={{
                color: 'var(--primary-color)',
                fontWeight: 500,
                fontSize: {
                  xs: '14px',
                  sm: '16px',
                },
              }}
            >
              {moment(flightData?.Segments[0]?.DepTime?.split('+')[0])?.format(
                'h:mmA'
              )}
            </Typography>
            <Typography
              sx={{
                color: 'var(--secondary-color)',
                fontWeight: 500,
                fontSize: {
                  xs: '12px',
                },
              }}
              noWrap
            >
              {' - '}
              {flightData?.Segments[0]?.DepLocation?.split(',')[0]}
            </Typography>
          </Stack>

          <Tooltip
            title={`${flightData?.Segments[0]?.DepAirPort}${', '}${
              flightData?.Segments[0]?.DepFrom
            }`}
          >
            <Typography
              sx={{
                width: '100%',
                cursor: 'pointer',
                color: 'var(--fontcolor)',
                fontWeight: 400,
                fontSize: {
                  xs: '12px',
                },
              }}
              noWrap
            >
              {flightData?.Segments[0]?.DepFrom}
              {' - '}
              {flightData?.Segments[0]?.DepAirPort}
            </Typography>
          </Tooltip>
          <Typography
            sx={{
              width: '100%',
              cursor: 'pointer',
              color: 'var(--primary-color)',
              fontWeight: 500,
              fontSize: {
                xs: '12px',
              },
            }}
            noWrap
          >
            {moment(flightData?.Segments[0]?.DepTime).format('YYYY-MMM-DD')}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={5} sm={2.5} md={2.5} mt={{ xs: 1.5, sm: '0' }}>
        {/* <Transit transit={flightData} group="group" /> */}
        <Transit
          transit={flightData}
          allData={allData}
          index={index}
          group="group"
        />
      </Grid>
      <Grid item xs={7} sm={3.5} md={3.5}>
        <Box position={'relative'}>
          {index === 0 ? (
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                display: { xs: 'none', sm: 'flex' },
                justifyContent: 'end',
              }}
            >
              {user ? (
                ''
              ) : (
                <Button
                  disabled={isLoading}
                  sx={{
                    visibility: disabled ? 'hidden' : 'unset',
                    color: 'crimson',
                  }}
                >
                  <DeleteIcon onClick={() => handleDelete(allData)} />
                </Button>
              )}
            </Box>
          ) : (
            ''
          )}
          <Typography sx={{ fontSize: 12, color: 'var(--gray)' }}>
            To
          </Typography>
          <Stack direction="row" spacing={0.3} alignItems="center">
            <Typography
              sx={{
                color: 'var(--primary-color)',
                fontWeight: 500,
                fontSize: {
                  xs: '14px',
                  sm: '16px',
                },
              }}
            >
              {moment(
                flightData?.Segments[
                  flightData?.Segments?.length - 1
                ]?.ArrTime?.split('+')[0]
              )?.format('h:mmA')}
            </Typography>
            <Typography
              sx={{
                color: 'var(--secondary-color)',
                fontWeight: 500,
                fontSize: {
                  xs: '12px',
                },
              }}
              noWrap
            >
              {' - '}
              {
                flightData?.Segments[
                  flightData?.Segments?.length - 1
                ]?.ArrLocation.split(',')[0]
              }
            </Typography>
          </Stack>
          <Tooltip
            title={`${
              flightData?.Segments[flightData?.Segments?.length - 1]?.ArrAirPort
            }${', '}${
              flightData?.Segments[flightData?.Segments?.length - 1]?.ArrTo
            }`}
          >
            <Typography
              sx={{
                width: '100%',
                cursor: 'pointer',
                color: 'var(--fontcolor)',
                fontWeight: 400,
                fontSize: {
                  xs: '12px',
                },
              }}
              noWrap
            >
              {flightData?.Segments[flightData?.Segments?.length - 1]?.ArrTo}
              {' - '}
              {
                flightData?.Segments[flightData?.Segments?.length - 1]
                  ?.ArrAirPort
              }
            </Typography>
          </Tooltip>{' '}
          <Typography
            sx={{
              width: '100%',
              cursor: 'pointer',
              color: 'var(--primary-color)',
              fontWeight: 500,
              fontSize: {
                xs: '12px',
              },
            }}
            noWrap
          >
            {moment(
              flightData?.Segments[flightData?.Segments?.length - 1]?.ArrTime
            ).format('YYYY-MMM-DD')}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default React.memo(GroupFareFlightLayout);
