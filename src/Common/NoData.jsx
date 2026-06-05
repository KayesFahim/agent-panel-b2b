import React from 'react';
import noData from '../images/No_data.gif';
import { Box } from '@mui/material';
const NoData = () => {
  return (
    <Box
      textAlign="center"
      sx={{
        width: '100%',
        '& img': {
          maxWidth: '100%',
          height: 'auto',
          objectFit: 'contain',
        },
      }}
    >
      <img src={noData} alt="No Data" />
    </Box>
  );
};

export default NoData;
