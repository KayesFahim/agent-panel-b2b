import React from 'react';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import w1 from '../../images/Landingpae/w1.svg';
import w2 from '../../images/Landingpae/w2.svg';
import w3 from '../../images/Landingpae/w3.svg';
import whyota from '../../images/Landingpae/whyota.svg';
const WhyOTA = () => {
  return (
    <Box mt={{ xs: 5, sm: 10, md: 10, lg: 10 }}>
      <Container>
        <Box
          sx={{
            fontSize: { xs: 25, sm: 26, md: 30 },
            color: 'var(--secondary-color)',
            fontWeight: 500,
            mt: 3,
          }}
        >
          Why OTA Project?
        </Box>
        <Box sx={{ fontSize: { xs: 12, sm: 13 }, color: 'var(--gray)' }}>
          Best price, Customizable Interface, Largest Inventory
        </Box>
        <Box>
          <Grid container>
            <Grid item xs={12} sm={8} md={6}>
              <Box>
                <Stack
                  direction="row"
                  spacing={{ xs: 1.5, md: 2 }}
                  alignItems="center"
                  sx={{
                    mt: 2,
                    p: 2,
                    bgcolor: 'var(--bgcolor)',
                    borderRadius: 1,
                  }}
                >
                  <img
                    src={w1}
                    alt="w1"
                    style={{
                      height: '100%',
                    }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: 'var(--secondary-color)',
                      }}
                    >
                      Best Rates
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 400 }}>
                      We find the best sources/suppliers for airfare and
                      accommodation worldwide, and partner with them to get you
                      the best deal.
                    </Typography>
                  </Box>
                </Stack>
                <Stack
                  direction="row"
                  spacing={{ xs: 1.5, md: 2 }}
                  alignItems="center"
                  sx={{
                    mt: 2,
                    p: 2,
                    bgcolor: 'var(--bgcolor)',
                    borderRadius: 1,
                  }}
                >
                  <img
                    src={w2}
                    alt="w1"
                    style={{
                      height: '100%',
                    }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: 'var(--secondary-color)',
                      }}
                    >
                      Availability
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 400 }}>
                      Select and Book your preferred flight and hotel from
                      thousands of options
                    </Typography>
                  </Box>
                </Stack>
                <Stack
                  direction="row"
                  spacing={{ xs: 1.5, md: 2 }}
                  alignItems="center"
                  sx={{
                    mt: 2,
                    p: 2,
                    bgcolor: 'var(--bgcolor)',
                    borderRadius: 1,
                  }}
                >
                  <img
                    src={w3}
                    alt="w1"
                    style={{
                      height: '100%',
                    }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: 'var(--secondary-color)',
                      }}
                    >
                      Multiple Payment Methods
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 400 }}>
                      Flexible payment methods. Pay with your debit or credit
                      card, mobile banking & bank account.
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>
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
                  src={whyota}
                  alt="logo"
                  style={{
                    width: '100%', // Ensure the image fills the container horizontally
                    height: 'auto', // Maintain aspect ratio
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default WhyOTA;
