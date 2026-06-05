import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import EventIcon from '@mui/icons-material/Event';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AirlinesIcon from '@mui/icons-material/Airlines';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const getStatusClass = (status) => {
  const s = (status || '').toLowerCase();
  if (s === 'cancelled') return 'cancelled';
  if (s === 'hold') return 'hold';
  if (s === 'ticketed' || s === 'issued') return 'issued';
  return 'confirmed';
};

const UpcommingTrips = ({ url, text, token }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const urls = url || location?.state?.url;
  const texts = text || location?.state?.text;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(urls, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (urls) fetchData();
  }, [urls, token]);

  const sendToQueuesDetails = (item) => {
    navigate(
      `/agent/bookingdetails/${item?.uid}/${item.bookingId}/${item?.triptype}`,
      {
        state: { data: item, pnr: item?.pnr, queues: 'queues' },
      }
    );
  };

  const displayData = data?.slice(0, showMore ? data.length : 4);

  if (!data?.length && !loading) return null;

  return (
    <Box mt={4}>
      {location?.state && <Header />}

      {/* Section Header */}
      <Box className="home-section-header" mb={2}>
        <Typography className="home-section-title">
          {texts} Trips
          {data?.length > 0 && (
            <Box
              component="span"
              className="section-badge"
            >
              {data.length}
            </Box>
          )}
        </Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress size={28} sx={{ color: 'var(--primary-color)' }} />
        </Box>
      ) : (
        <>
          <Grid container spacing={2}>
            {displayData?.map((item, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Box
                  className="trip-card"
                  onClick={() => sendToQueuesDetails(item)}
                >
                  {/* Route */}
                  <Box className="trip-card-route">
                    <FlightTakeoffIcon sx={{ fontSize: 18, color: '#0487c7' }} />
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: '#1e293b',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.depfrom}
                    </Typography>
                    <Box className="trip-card-dot-line" />
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: '#1e293b',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.arrto}
                    </Typography>
                    <FlightLandIcon sx={{ fontSize: 18, color: '#1A3A6E' }} />
                  </Box>

                  {/* Status + Trip type */}
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box
                      component="span"
                      className={`trip-status-badge ${getStatusClass(item.status)}`}
                    >
                      {item.status}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: '#f97316',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {item.triptype}
                    </Typography>
                  </Box>

                  {/* Date */}
                  <Box className="trip-card-meta">
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <EventIcon sx={{ fontSize: 14, color: '#94a3b8' }} />
                      <Typography sx={{ fontSize: 12, color: '#64748b' }}>
                        {moment(item.flightdate).format('ddd, DD MMM YYYY')}
                      </Typography>
                    </Stack>
                  </Box>

                  {/* Booking ID + PNR */}
                  <Box className="trip-card-meta">
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <ConfirmationNumberIcon sx={{ fontSize: 13, color: '#94a3b8' }} />
                      <Typography sx={{ fontSize: 11.5, color: '#94a3b8' }}>
                        {item.bookingId}
                      </Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: '#1A3A6E' }}>
                      PNR: {item.pnr}
                    </Typography>
                  </Box>

                  {/* Carrier + CTA */}
                  <Box display="flex" alignItems="center" justifyContent="space-between" mt="auto">
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <AirlinesIcon sx={{ fontSize: 14, color: '#94a3b8' }} />
                      <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>
                        {item.carrier}
                      </Typography>
                    </Stack>
                    <Button
                      size="small"
                      endIcon={<ArrowForwardIcon sx={{ fontSize: 13 }} />}
                      disabled={item.status === 'Cancelled'}
                      onClick={(e) => { e.stopPropagation(); sendToQueuesDetails(item); }}
                      sx={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: item.status === 'Cancelled' ? '#94a3b8' : '#ffffff',
                        textTransform: 'capitalize',
                        background: item.status === 'Cancelled'
                          ? '#e2e8f0'
                          : 'linear-gradient(135deg, #1A3A6E, #0487c7)',
                        borderRadius: '50px',
                        padding: '4px 12px',
                        boxShadow: item.status === 'Cancelled' ? 'none' : '0 2px 8px rgba(26,58,110,0.25)',
                        '&:hover': {
                          background: item.status === 'Cancelled'
                            ? '#e2e8f0'
                            : 'linear-gradient(135deg, #10264b, #036aa3)',
                          boxShadow: item.status === 'Cancelled' ? 'none' : '0 4px 12px rgba(26,58,110,0.35)',
                        },
                      }}
                    >
                      Itinerary
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          {data?.length > 4 && (
            <Box textAlign="center" mt={3}>
              <button
                className="view-more-btn"
                onClick={() => setShowMore((prev) => !prev)}
              >
                {showMore ? (
                  <>Show Less <ExpandLessIcon sx={{ fontSize: 16 }} /></>
                ) : (
                  <>Show All {data.length} Trips <ExpandMoreIcon sx={{ fontSize: 16 }} /></>
                )}
              </button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default UpcommingTrips;
