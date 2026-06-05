import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Modal } from '@mui/material';
const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#fff',
  py: 3,
  px: 3,
  borderRadius: '10px',
  overflow: 'auto',
  textAlign: 'center',
};
const CustomProgressbar = ({ content }) => {
  return (
    <Box>
      <Modal open={true}>
        <Box sx={{ ...styles, width: { xs: '80%', sm: '50%', md: '40%' } }}>
          <Box>{content || ''}</Box>
          <LinearProgress />
        </Box>
      </Modal>
    </Box>
  );
};

export default CustomProgressbar;
