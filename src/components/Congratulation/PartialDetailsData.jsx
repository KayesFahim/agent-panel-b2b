import { Box, Button, Grid } from '@mui/material';
import commaNumber from 'comma-number';
import { format } from 'date-fns';
import React from 'react';

const PartialDetailsData = ({ data, handlePayment, allData }) => {
  // 
  return (
    <Box>
      <Grid container spacing={2} alignItems={'center'}>
        <Grid item sx={{ textTransform: 'capitalize' }}>
          <Box
            sx={{
              span: {
                color: data?.status === 'paid' ? 'green' : 'red',
              },
            }}
          >
            Status: <span>{data?.status}</span>
          </Box>
        </Grid>
        <Grid item>
          <Box
            sx={{
              span: {
                color: data?.status === 'paid' ? 'green' : 'red',
              },
            }}
          >
            Due Amount:{' '}
            <span>{commaNumber(data?.dueamount?.toFixed(2) || 0)} PKR</span>
          </Box>
        </Grid>
        <Grid item>
          <Box
            sx={{
              span: {
                color: data?.status === 'paid' ? 'green' : 'red',
              },
            }}
          >
            Due Date:{' '}
            <span>
              {data?.dueAt !== '' || 'undefined' || null
                ? format(
                  new Date(data?.dueAt),
                  'dd MMM yy hh:mm a'
                )
                : 'Due Date'}
            </span>
          </Box>
        </Grid>
        {data?.status === 'unpaid' ? (
          <Grid item>
            <Button
              onClick={() => handlePayment(data)}
              size="small"
              sx={{
                bgcolor: 'var(--red)',
                px: 2,
                color: 'var(--white)',
                '&:hover': {
                  bgcolor: 'var(--red)',
                },
              }}
            >
              Pay Due
            </Button>
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
};

export default PartialDetailsData;
