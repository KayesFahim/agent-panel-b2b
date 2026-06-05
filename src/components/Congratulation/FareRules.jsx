import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';

const FareRules = ({ data, index }) => {
  return (
    <Box>
      <Grid container spacing={{ xs: 2, md: 2 }}>
        <Grid item xs={12}>
          {data?.isRefundable === false && index === 0 && (
            <Box sx={{ color: 'var(--Red)', fontSize: 12 }}>No Fare Rules</Box>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            mb={2}
            sx={{ border: '1px solid var(--gray)', p: 2, borderRadius: '5px' }}
          >
            <Typography>
              {data?.passengerCode === 'ADT'
                ? 'Adult'
                : data?.passengerCode === 'INF'
                ? 'Infant'
                : 'Child'}
            </Typography>
            {data.isRefundable === true && (
              <Box>
                <Typography
                  sx={{ color: 'var(--primary-color)', fontSize: 13 }}
                >
                  Refund Penalties
                </Typography>

                {data?.refundPenalties?.map((data) => (
                  <Stack
                    spacing={1}
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Typography
                      sx={{ color: 'var(--secondary-color)', fontSize: 12 }}
                    >
                      {data?.applicability || null}
                    </Typography>
                    <Typography
                      sx={{ color: 'var(--secondary-color)', fontSize: 12 }}
                    >
                      {data?.penalty?.amount || null}
                    </Typography>
                  </Stack>
                ))}
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{ border: '1px solid var(--gray)', p: 2, borderRadius: '5px' }}
          >
            <Typography>
              {data?.passengerCode === 'ADT'
                ? 'Adult'
                : data?.passengerCode === 'INF'
                ? 'Infant'
                : 'Child'}
            </Typography>
            {data.isChangeable === true && (
              <Box>
                <Typography
                  sx={{ color: 'var(--primary-color)', fontSize: 13 }}
                >
                  Exchange Penalties
                </Typography>

                {data?.exchangePenalties?.map((data) => (
                  <Stack
                    spacing={1}
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Typography
                      sx={{ color: 'var(--secondary-color)', fontSize: 12 }}
                    >
                      {data?.applicability || null}
                    </Typography>
                    <Typography
                      sx={{ color: 'var(--secondary-color)', fontSize: 12 }}
                    >
                      {data?.penalty?.amount || null}
                    </Typography>
                  </Stack>
                ))}
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FareRules;
