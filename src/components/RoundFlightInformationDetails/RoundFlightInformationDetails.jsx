import React from 'react';
import { useState } from 'react';
import { Box, Button, Tooltip, Typography, Grid } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import FlightIcon from '@mui/icons-material/Flight';
import CircleIcon from '@mui/icons-material/Circle';
import { format } from 'date-fns';
import './RoundFlightInformationDetails.css';

const RoundFlightInformationDetails = ({ flightData }) => {
  const [showGo, setShowGo] = useState(true);

  return (
    <Box mt={1}>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item>
          <Typography
            sx={{
              fontSize: { xs: '14', sm: '22px' },
              color: 'var(--secondary-color)',
              fontWeight: 500,
            }}
          >
            Flight Information Details
          </Typography>
        </Grid>
        <Grid item>
          <Tooltip
            title={
              showGo
                ? 'Click to See Depart Flight'
                : 'Click to See Return Flight'
            }
          >
            <Button
              size="small"
              sx={{
                background: 'var(--primary-color)',
                color: 'var(--white)',
                fontWeight: 400,
                '&:hover': {
                  background: 'var(--primary-color)',
                  color: 'var(--white)',
                  fontWeight: 400,
                },
              }}
              onClick={() => setShowGo((prev) => !prev)}
            >
              {showGo ? (
                <Box px={{ xs: '0', md: 3 }}>
                  {flightData?.backdeparture} - {flightData?.backarrival}
                </Box>
              ) : (
                <Box px={{ xs: '0', md: 3 }}>
                  {flightData?.godeparture} - {flightData?.goarrival}
                </Box>
              )}
            </Button>
          </Tooltip>
        </Grid>
      </Grid>

      {showGo ? (
        <Box>
          {flightData?.segments?.go?.map((data, index, arr) => (
            <Box my={2}>
              <Grid container spacing={2}>
                <Grid item sm={6} md={2.5}>
                  <Box
                    width="50px"
                    height="50px"
                    borderRadius="50%"
                    boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
                    overflow="hidden"
                  >
                    <img
                      src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${data?.marketingcareer}.png`}
                      alt="flight logo"
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
                  >
                    {data?.marketingcareerName}
                    <br />
                    <span
                      style={{
                        color: 'var(--fontcolor)',
                      }}
                    >
                      {data?.marketingcareer} {data?.marketingflight} &{' '}
                      {data?.bookingcode}
                    </span>
                  </Typography>
                </Grid>
                <Grid item sm={6} md={3.5}>
                  <Typography>
                    <span
                      style={{
                        color: 'var(--primary-color)',
                        fontSize: '20px',
                      }}
                    >
                      {data?.departureLocation?.split(' ,')[0]},{' '}
                    </span>
                    <span
                      style={{
                        color: 'var(--primary-color)',
                        fontSize: '13px',
                      }}
                    >
                      {data?.departure}
                    </span>
                    <br />
                    <Tooltip title={`${data?.departureAirport}`}>
                      <Typography
                        style={{
                          color: 'var(--secondary-color)',
                          fontSize: '13px',
                        }}
                        noWrap
                      >
                        {data?.departureAirport}
                      </Typography>
                    </Tooltip>

                    <span
                      style={{
                        color: 'var(--fontcolor)',
                        fontSize: '12px',
                      }}
                    >
                      {format(
                        new Date(data?.departureTime?.toString()),
                        'dd MMM yyyy hh:mm a'
                      )}
                    </span>
                  </Typography>
                </Grid>
                <Grid item sm={6} md={2.5} margin="auto">
                  <Box textAlign="center">
                    <Typography
                      sx={{
                        color: 'var(--primary-color)',
                        fontWeight: 500,
                        fontSize: {
                          xs: '12px',
                          sm: '10px',
                          md: '12px',
                        },
                      }}
                    >
                      {data?.flightduration}
                    </Typography>
                    <Box className="stop-bar-parent">
                      <CircleIcon
                        sx={{
                          color: 'var(--transit)',
                          fontSize: '15px',
                        }}
                      />
                      <Box className="stop-bar-line-details"></Box>
                      <CircleIcon
                        sx={{
                          color: 'var(--transit)',
                          fontSize: '15px',
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item sm={6} md={3.5} textAlign="end">
                  <Typography>
                    <span
                      style={{
                        color: 'var(--primary-color)',
                        fontSize: '20px',
                      }}
                    >
                      {data?.arrivalLocation?.split(' ,')[0]},{' '}
                    </span>
                    <span
                      style={{
                        color: 'var(--primary-color)',
                        fontSize: '13px',
                      }}
                    >
                      {data?.arrival}
                    </span>
                    <br />

                    <Tooltip title={`${data?.arrivalAirport}`}>
                      <Typography
                        style={{
                          color: 'var(--secondary-color)',
                          fontSize: '13px',
                        }}
                        noWrap
                      >
                        {data?.arrivalAirport}
                      </Typography>
                    </Tooltip>

                    <span
                      style={{
                        color: 'var(--fontcolor)',
                        fontSize: '12px',
                      }}
                    >
                      {format(
                        new Date(data?.arrivalTime?.toString()),
                        'dd MMM yyyy hh:mm a'
                      )}
                    </span>
                  </Typography>
                </Grid>
              </Grid>
              {/* Transit time go start  */}
              <Box textAlign="center">
                <Typography
                  style={{
                    fontWeight: '500',
                    fontSize: '12px',
                    textAlign: 'center',
                    color: 'var(--secondary-color)',
                    display: index === arr.length - 1 ? 'none' : 'block',
                  }}
                >
                  {index === 0 && (
                    <Box
                      sx={{
                        width: '50%',
                        margin: 'auto',
                        bgcolor: 'var(--transit)',
                        py: '3px',
                        textAlign: 'center',
                        borderRadius: '25px',
                      }}
                    >
                      Transit Time: {flightData?.transit?.go?.transit1}
                    </Box>
                  )}
                  {index === 1 && (
                    <Box
                      sx={{
                        width: '50%',
                        margin: 'auto',
                        bgcolor: 'var(--transit)',
                        py: '3px',
                        textAlign: 'center',
                        borderRadius: '25px',
                      }}
                    >
                      Transit Time: {flightData?.transit?.go?.transit2}
                    </Box>
                  )}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Box>
          {flightData?.segments?.back?.map((data, index, arr) => (
            <Box my={2}>
              <Grid container spacing={2}>
                <Grid item sm={6} md={2.5}>
                  <Box
                    width="50px"
                    height="50px"
                    borderRadius="50%"
                    boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
                    overflow="hidden"
                  >
                    <img
                      src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${data?.marketingcareer}.png`}
                      alt="flight logo"
                      width="50px"
                      height="50px"
                    />
                  </Box>
                  <Typography
                    sx={{
                      color: 'var(--primary-color)',
                      fontWeight: 500,
                      fontSize: '12px',
                    }}
                  >
                    {data?.marketingcareerName}
                    <br />
                    <span
                      style={{
                        color: 'var(--fontcolor)',
                      }}
                    >
                      {data?.marketingcareer} {data?.marketingflight} &{' '}
                      {data?.bookingcode}
                    </span>
                  </Typography>
                </Grid>
                <Grid item sm={6} md={3.5}>
                  <Typography>
                    <span
                      style={{
                        color: 'var(--primary-color)',
                        fontSize: '20px',
                      }}
                    >
                      {data?.departureLocation?.split(' ,')[0]},{' '}
                    </span>
                    <span
                      style={{
                        color: 'var(--primary-color)',
                        fontSize: '13px',
                      }}
                    >
                      {data?.departure}
                    </span>
                    <br />
                    <Tooltip title={`${data?.departureAirport}`}>
                      <Typography
                        style={{
                          color: 'var(--secondary-color)',
                          fontSize: '13px',
                        }}
                        noWrap
                      >
                        {data?.departureAirport}
                      </Typography>
                    </Tooltip>

                    <span
                      style={{
                        color: 'var(--fontcolor)',
                        fontSize: '12px',
                      }}
                    >
                      {format(
                        new Date(data?.departureTime?.toString()),
                        'dd MMM yyyy hh:mm a'
                      )}
                    </span>
                  </Typography>
                </Grid>
                <Grid item sm={6} md={2.5} margin="auto">
                  <Box textAlign="center">
                    <Typography
                      sx={{
                        color: 'var(--primary-color)',
                        fontWeight: 500,
                        fontSize: {
                          xs: '12px',
                          sm: '10px',
                          md: '12px',
                        },
                      }}
                    >
                      {data?.flightduration}
                    </Typography>
                    <Box className="stop-bar-parent">
                      <CircleIcon
                        sx={{
                          color: 'var(--transit)',
                          fontSize: '15px',
                        }}
                      />
                      <Box className="stop-bar-line-details"></Box>
                      <CircleIcon
                        sx={{
                          color: 'var(--transit)',
                          fontSize: '15px',
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item sm={6} md={3.5} textAlign="end">
                  <Typography>
                    <span
                      style={{
                        color: 'var(--primary-color)',
                        fontSize: '20px',
                      }}
                    >
                      {data?.arrivalLocation?.split(' ,')[0]},{' '}
                    </span>
                    <span
                      style={{
                        color: 'var(--primary-color)',
                        fontSize: '13px',
                      }}
                    >
                      {data?.arrival}
                    </span>
                    <br />

                    <Tooltip title={`${data?.arrivalAirport}`}>
                      <Typography
                        style={{
                          color: 'var(--secondary-color)',
                          fontSize: '13px',
                        }}
                        noWrap
                      >
                        {data?.arrivalAirport}
                      </Typography>
                    </Tooltip>

                    <span
                      style={{
                        color: 'var(--fontcolor)',
                        fontSize: '12px',
                      }}
                    >
                      {format(
                        new Date(data?.arrivalTime?.toString()),
                        'dd MMM yyyy hh:mm a'
                      )}
                    </span>
                  </Typography>
                </Grid>
              </Grid>
              {/* Transit time go start  */}
              <Box textAlign="center">
                <Typography
                  style={{
                    fontWeight: '500',
                    fontSize: '12px',
                    textAlign: 'center',
                    color: 'var(--secondary-color)',
                    display: index === arr.length - 1 ? 'none' : 'block',
                  }}
                >
                  {index === 0 && (
                    <Box
                      sx={{
                        width: '50%',
                        margin: 'auto',
                        bgcolor: 'var(--transit)',
                        py: '3px',
                        textAlign: 'center',
                        borderRadius: '25px',
                      }}
                    >
                      Transit Time: {flightData?.transit?.back?.transit1}
                    </Box>
                  )}
                  {index === 1 && (
                    <Box
                      sx={{
                        width: '50%',
                        margin: 'auto',
                        bgcolor: 'var(--transit)',
                        py: '3px',
                        textAlign: 'center',
                        borderRadius: '25px',
                      }}
                    >
                      Transit Time: {flightData?.transit?.back?.transit2}
                    </Box>
                  )}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default RoundFlightInformationDetails;
