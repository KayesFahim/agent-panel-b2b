import { Box, Grid, Skeleton, Stack } from '@mui/material';
import React from 'react';

const ResultLoader = ({ count, mt }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        mt: mt,
      }}
    >
      {[...new Array(count)].map((data, index) => (
        <Box
          sx={{
            bgcolor: 'var(--white)',
            mb: 2.5,
            p: 2,
            boxShadow:
              '-0.452679px 4.97947px 36px rgba(0, 0, 0, 0.09), -0.0905357px 0.995893px 5.85px rgba(0, 0, 0, 0.045)',
            borderRadius: '10px',
          }}
        >
          <Grid container spacing={1} alignItems={'center'}>
            <Grid item xs={6} md={3}>
              <Box>
                <Skeleton
                  variant="circular"
                  sx={{
                    width: { xs: '30px', md: '40px' },
                    height: { xs: '30px', md: '40px' },
                    mb: 0.5,
                  }}
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <Skeleton
                  variant="rectangular"
                  width={'90%'}
                  height={'20px'}
                  sx={{ mb: 0.7 }}
                />
                <Skeleton variant="rectangular" width={'70%'} height={'20px'} />
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: { xs: '40%', md: '40%' },
                    height: '15px',
                    mb: 0.5,
                  }}
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <Skeleton
                  variant="rectangular"
                  width={'90%'}
                  height={'20px'}
                  sx={{ mb: 0.7 }}
                />
                <Skeleton variant="rectangular" width={'70%'} height={'20px'} />
              </Box>
            </Grid>
            <Grid item md={1} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box>
                  <Skeleton
                    variant="circular"
                    sx={{
                      width: { xs: '30px', md: '40px' },
                      height: { xs: '30px', md: '40px' },
                      mb: 0.5,
                    }}
                  />
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Skeleton
                    variant="rectangular"
                    width={'100%'}
                    height={'20px'}
                    sx={{ mb: 0.7 }}
                  />
                </Box>
              </Stack>
            </Grid>
            <Grid
              item
              xs={6}
              md={3}
              sx={{
                display: 'flex',
                justifyContent: { xs: 'start', md: 'end' },
              }}
            >
              <Box width="90%">
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: { xs: 'start', md: 'end' },
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: { xs: '40%', md: '40%' },
                      height: '15px',
                      mb: 0.5,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: { xs: 'start', md: 'end' },
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={'90%'}
                    height={'20px'}
                    sx={{ mb: 0.7 }}
                  />
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: { xs: 'start', md: 'end' },
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={'70%'}
                    height={'20px'}
                    sx={{ mb: 0.7 }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Box mt={-1}>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: { xs: '40%', md: '40%' },
                    height: '15px',
                    mb: 0.5,
                  }}
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <Skeleton
                  variant="rectangular"
                  width={'90%'}
                  height={'20px'}
                  sx={{ mb: 0.7 }}
                />
                <Skeleton variant="rectangular" width={'70%'} height={'20px'} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default ResultLoader;
