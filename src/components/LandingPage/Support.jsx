import React from 'react';
import { Box, Typography, Grid, Stack, Container } from '@mui/material';
import support from '../../images/Landingpae/support.svg';
const Support = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${BG})`,
        backgroundSize: 'cover',
        height: '50vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container>
        <Box>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={4}
              md={6}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  maxWidth: '60%', // Limit maximum width to 90% of the viewport width
                }}
              >
                <img
                  src={support}
                  alt="logo"
                  style={{
                    width: '100%', // Ensure the image fills the container horizontally
                    height: 'auto', // Maintain aspect ratio
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={6}>
              <Box>
                <Box
                  sx={{
                    fontSize: { xs: 25, sm: 26, md: 30 },
                    color: 'var(--white)',
                    fontWeight: 500,
                  }}
                >
                  Remarkable Support
                </Box>
                <Box
                  sx={{ fontSize: { xs: 12, sm: 13 }, color: 'var(--gray)' }}
                >
                  Best price, Customizable Interface, Largest Inventory
                </Box>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    bgcolor: '#1C1A17',
                    borderRadius: 1,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: 'var(--white)',
                      }}
                    >
                      24/7 Assistance
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 11,
                        fontWeight: 400,
                        color: 'var(--white)',
                      }}
                    >
                      Our support center is always ready to guide you through
                      any difficulties in booking. We will be waiting to hear
                      from you.
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    bgcolor: '#1C1A17',
                    borderRadius: 1,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: 'var(--white)',
                      }}
                    >
                      Need More?
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 11,
                        fontWeight: 400,
                        color: 'var(--white)',
                      }}
                    >
                      Not just flight and hotel, we promise to give you an
                      all-round service. Need visa assistance? Tours? Transfers?
                      Just contact your ShareTrip Representative.
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    bgcolor: '#1C1A17',
                    borderRadius: 1,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: 'var(--white)',
                      }}
                    >
                      Personalized Support
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 11,
                        fontWeight: 400,
                        color: 'var(--white)',
                      }}
                    >
                      Designated ShareTrip Representatives are always there to
                      help you if you face any issues. We value your association
                      with us.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Support;
