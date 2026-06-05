import {
  Button,
  Collapse,
  Grid,
  Grow,
  SwipeableDrawer,
  Tab,
  Tabs,
  // ToggleButton,
  // ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useState } from 'react';
import seat1 from '../../images/Icon/bag.svg';
import bag from '../../images/Icon/seat.svg';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import toimg from '../../images/Icon/to.svg';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import CircleIcon from '@mui/icons-material/Circle';
import FlightIcon from '@mui/icons-material/Flight';
import commaNumber from 'comma-number';
import { format } from 'date-fns';
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import WorkIcon from '@mui/icons-material/Work';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

import './SingleFlight.css';
import RoundTransit from './RoundTransit';
import FlightLayout from './FlightLayout';
import MoreFlight from './MoreFlight';

const ToggleButton = styled(MuiToggleButton)(({ selectedColor }) => ({
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'white',
    backgroundColor: selectedColor,
  },
}));

const HtmlTooltip = styled(({ className, ...propss }) => (
  <Tooltip {...propss} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'var(--gray)',
    maxWidth: 220,
    fontSize: '5px',
    padding: '10px',
  },
}));
const RoundSingleFlight = (props) => {
  const navigate = useNavigate();
  const [toggleBtn, setToggleBtn] = useState('depart');
  const handleChangeToggleBtn = (event, newValue) => {
    setToggleBtn(newValue);
  };

  const {
    backarrival,
    backarrivalDate,
    backarrivalTime,
    backdeparture,
    backdepartureDate,
    backdepartureTime,
    backflightduration,
    bags,
    career,
    careerName,
    goarrival,
    goarrivalDate,
    goarrivalTime,
    godeparture,
    godepartureDate,
    godepartureTime,
    goflightduration,
    refundable,
    price,
    TotalFare,
    TotalWithMarkUp,
    Taxes,
    seat,
    segment,
    segments,
    stop,
    system,
    transit,
    bookingcode,
    BasePrice,
    pricebreakdown,
  } = props.roundData;

  const flightData = props?.roundData;

  const {
    adultCount,
    childCount,
    infant,
    agentFarePrice,
    setAgentFarePrice,
    commisionFarePrice,
    setCommisionFarePrice,
    customerFare,
    setCustomerFare,
  } = props;

  //todo:CF AF CM variable are here
  const [flightDetails, setFlightDetails] = useState(false);

  const [state, setState] = useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  const clientPrice = Math.round(
    parseInt(props.roundData.clientPrice || props.roundData.baseprice)
  );
  const percentRate = parseInt(7) / 100;
  const clientFare = parseInt(clientPrice);
  const agentFare = Math.round(parseInt(price));
  const commission = Math.round(clientFare - agentFare);
  //todo:end of CM AF CM variables
  //todo: booking functional work here
  const FlightInformation = (data) => {
    navigate('/agent/flightinformation', {
      state: {
        flightData,
        data,
        adultCount,
        childCount,
        infant,
      },
    });
  };

  return (
    <Box mb={2.5}>
      <Grid
        container
        sx={{
          boxShadow:
            '-0.452679px 4.97947px 36px rgba(0, 0, 0, 0.09), -0.0905357px 0.995893px 5.85px rgba(0, 0, 0, 0.045)',
          borderRadius: '10px',
        }}
      >
        <Grid item md={10} p={2}>
          {flightData?.AllLegs?.map((data, index) => (
            <Box key={index}>
              <FlightLayout flightData={data} allData={flightData} />
            </Box>
          ))}
        </Grid>

        <Grid
          item
          xs={12}
          sm={2}
          md={2}
          pt={{ xs: 0, sm: 2 }}
          pb={{ xs: 1.5, sm: 2 }}
          pr={2}
          textAlign={{ xs: 'center', sm: 'right' }}
        >
          <Box textAlign="end" mr={{ xs: '5px', sm: '0px' }}>
            <Typography
              sx={{
                fontSize: '18px',
                color: 'var(--secondary-color)',
                fontWeight: 500,
                display: { xs: 'none', sm: 'block' },
              }}
            >
              PKR {commaNumber(Math.round(flightData?.NetFare))}
            </Typography>
          </Box>

          <Box
            textAlign="end"
            mt={{ xs: 0, sm: 1 }}
            px={{ xs: 2, sm: '0' }}
            display={{ xs: 'flex', sm: 'block' }}
            justifyContent="space-between"
            alignItems={{ xs: 'center', sm: '' }}
          >
            <Button
              size="small"
              style={{
                color: 'var(--white)',
                fontWeight: 500,
                backgroundColor: 'var(--primary-color)',
                borderRadius: '5px',
              }}
              padding={{ xs: '7px 20px', sm: '' }}
              height={{ xs: '40px', sm: '' }}
              onClick={() => FlightInformation(flightData?.AllLegs)}
            >
              BOOK NOW
            </Button>
            <MoreFlight
              flightData={flightData}
              adultCount={adultCount}
              childCount={childCount}
              infant={infant}
              TripType={flightData?.TripType}
            />
          </Box>
        </Grid>
      </Grid>
      <Box>
        {flightData?.More?.length > 1 ? (
          <Typography
            sx={{
              fontSize: 12,
              bgcolor: 'var(--drawer-bgcolor)',
              width: 'fit-content',
              margin: 'auto',
              borderRadius: '10px',
              px: 2,
              py: 0.5,
              mt: -1.5,
              cursor: 'pointer',
              boxShadow:
                'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
            }}
            onClick={() => setFlightDetails(!flightDetails)}
          >
            Show {flightData?.More?.length - 1} more flight timing option for
            the same price
          </Typography>
        ) : null}
        <Grow in={flightDetails} display={!flightDetails ? 'none' : 'block'}>
          <Box mt={2}>
            {flightData?.More?.slice(1)?.map((data, index) => (
              <Grid
                container
                sx={{
                  boxShadow:
                    '-0.452679px 4.97947px 36px rgba(0, 0, 0, 0.09), -0.0905357px 0.995893px 5.85px rgba(0, 0, 0, 0.045)',
                  borderRadius: '10px',
                  mb: 1,
                }}
              >
                <Grid item md={10} p={2}>
                  <Box>
                    {data?.AllLegs?.map((item, index) => (
                      <FlightLayout
                        flightData={item}
                        index={index}
                        allData={data}
                      />
                    ))}
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={2}
                  md={2}
                  pt={{ xs: 0, sm: 2 }}
                  pb={{ xs: 1.5, sm: 2 }}
                  pr={2}
                  textAlign={{ xs: 'center', sm: 'right' }}
                >
                  <Box textAlign="end" mr={{ xs: '5px', sm: '0px' }}>
                    <Typography
                      sx={{
                        fontSize: '18px',
                        color: 'var(--secondary-color)',
                        fontWeight: 500,
                        display: { xs: 'none', sm: 'block' },
                      }}
                    >
                      PKR{commaNumber(Math.round(data?.NetFare))}
                    </Typography>
                  </Box>

                  <Box
                    textAlign="end"
                    mt={{ xs: 0, sm: 1 }}
                    px={{ xs: 2, sm: '0' }}
                    display={{ xs: 'flex', sm: 'block' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'center', sm: '' }}
                  >
                    <Button
                      size="small"
                      style={{
                        color: 'var(--white)',
                        fontWeight: 500,
                        backgroundColor: 'var(--primary-color)',
                        borderRadius: '5px',
                      }}
                      padding={{ xs: '7px 20px', sm: '' }}
                      height={{ xs: '40px', sm: '' }}
                      onClick={() => FlightInformation(data)}
                    >
                      BOOK NOW
                    </Button>
                    <MoreFlight
                      flightData={data}
                      index={index}
                      TripType={flightData?.TripType}
                    />
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Box>
        </Grow>
      </Box>
    </Box>
  );
};

export default RoundSingleFlight;
