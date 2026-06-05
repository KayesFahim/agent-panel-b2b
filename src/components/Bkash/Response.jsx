import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Box, Typography, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const Response = () => {
  const { message } = useParams();
  const navigate = useNavigate();

  const success = message?.toLowerCase() === 'success';

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#2d2d2d',
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: '350px',
          padding: '40px 20px',
          borderRadius: '15px',
          textAlign: 'center',
          color: success ? '#4caf50' : '#f44336',
          position: 'relative',
          backgroundColor: '#fff',
        }}
      >
        {success ? (
          <>
            <CheckCircleIcon
              sx={{
                fontSize: 60,
                color: '#4caf50',
                position: 'absolute',
                top: '-30px',
                left: 'calc(50% - 30px)',
                backgroundColor: '#fff',
                borderRadius: '50%',
              }}
            />
            <Typography variant="h6" component="h3" gutterBottom>
              Payment {message}
            </Typography>
            <Typography variant="body1" gutterBottom>
              We've sent you an email with all the details

            </Typography>

            <Button
              variant="contained"
              color="success"
              sx={{ marginTop: '20px', padding: '10px 20px', borderRadius: '20px' }}
              onClick={() => navigate('/agent/deposit')}
            >
              Payment Complete
            </Button>
          </>
        ) : (
          <>
            <ErrorIcon
              sx={{
                fontSize: 60,
                color: '#f44336',
                position: 'absolute',
                top: '-30px',
                left: 'calc(50% - 30px)',
                backgroundColor: '#fff',
                borderRadius: '50%',
              }}
            />
            {/* <Typography variant="h5" component="h3" gutterBottom>
              Error!
            </Typography> */}
            <Typography variant="body1" gutterBottom>
              {message}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Unfortunately we have an issue with your payment,try again later

            </Typography>
            <Button
              variant="contained"
              color="error"
              sx={{ marginTop: '20px', padding: '10px 20px', borderRadius: '20px' }}
              onClick={() => navigate('/agent/adddeposit')}
            >
              Back to Home
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Response;







// import { useNavigate, useParams } from 'react-router-dom';

// const Response = () => {
//   const { message } = useParams();
//   const navigate = useNavigate();

//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       {message?.toLowerCase() === 'success' ? (
//         <div
//           style={{
//             boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
//             width: '300px',
//             padding: '10px 20px',
//             borderRadius: '10px',
//             marginBottom: '20px',
//             color: 'green',
//           }}
//         >
//           <div>
//             {/* <h3>Success</h3> */}
//             <h3>Payment {message}</h3>
//             <div style={{ textAlign: 'end' }}>
//               <button
//                 style={{ padding: '8px 20px' }}
//                 onClick={() => navigate('/agent/deposit')}
//               >
//                 Payment Complete
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div
//           style={{
//             boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
//             width: '300px',
//             padding: '100px',
//             borderRadius: '10px',
//             marginBottom: '20px',
//             color: 'red',
//           }}
//         >
//           <div>
//             <h3>{message}</h3>
//             <div style={{ textAlign: 'end' }}>
//               <button
//                 style={{ padding: '8px 20px' }}
//                 onClick={() => navigate('/agent/adddeposit')}
//               >
//                 Back to Home
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Response;
