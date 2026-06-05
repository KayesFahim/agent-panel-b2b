import { Box } from '@mui/material';
import React from 'react';

const DurationConverter = ({ duration }) => {
  const convertToHoursMinutes = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return { hours, minutes };
  };

  const { hours, minutes } = convertToHoursMinutes(duration);
  // 
  return (
    <Box sx={{ fontWeight: '500', mt: 0.5, pr: 2 }}>
      {hours}H {minutes}Min.
    </Box>
  );
};

export default DurationConverter;
