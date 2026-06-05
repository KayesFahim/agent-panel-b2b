import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';

const FilterLoader = () => {
  return (
    <Box
      style={{
        height: '100vh',
        width: '100%',
      }}
    >
      {[...new Array(5)].map((data, index) => (
        <Box mb={1}>
          {index === 0 && (
            <Skeleton
              variant="rectangular"
              width={'100%'}
              height={'50px'}
              sx={{ mb: 2 }}
            />
          )}
          <Stack direction="row" spacing={1}>
            <Skeleton variant="rectangular" width={'70%'} height={'30px'} />
            <Skeleton variant="rectangular" width={'30%'} height={'30px'} />
          </Stack>
          <Skeleton
            variant="rectangular"
            width={'100%'}
            height={'40px'}
            sx={{ mt: 2 }}
          />
          <Skeleton
            variant="rectangular"
            width={'100%'}
            height={'40px'}
            sx={{ mt: 2 }}
          />
          <Skeleton
            variant="rectangular"
            width={'100%'}
            height={'50px'}
            sx={{ mt: 2 }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default FilterLoader;
