/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from "react";
import { Box, Button, Grid, Tooltip, tooltipClasses } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import commaNumber from "comma-number";
import GroupFareMoreFlight from "./GroupFareMoreFlight";
import GroupFareFlightLayout from "./GroupFareFlightLayout";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import { styled } from "@mui/material/styles";
import handleDeleteClick from "../../Common/handleDeleteClick";
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "var(--transit)",
    maxWidth: 300,
    padding: "8px",
    color: "var(--black)",
    fontSize: "16px",
  },
}));
const GroupFlight = ({
  flightData,
  adultCount,
  childCount,
  infant,
  user,
  refetch,
  setRefetch,
}) => {
  const navigate = useNavigate();
  const FlightInformation = (data) => {
    navigate("/agent/flightinformation", {
      state: {
        flightData,
        data,
        adultCount,
        childCount,
        infant,
      },
    });
  };
  const [isLoading, setIsLoading] = useState(false);
  const adminInfo = secureLocalStorage.getItem("admin-info");
  const token = adminInfo?.token;

  const handleDelete = (id) => {
    handleDeleteClick(id?.Uid, setIsLoading, token, refetch, setRefetch);
  };

  const PaxCount = adultCount + childCount + infant;
  let count = [];
  for (let i = 0; i < PaxCount; i++) {
    count.push(i);
  }

  // ----   --------Copy form ALL.js end----------
  return (
    <Box mb={2.5}>
      <Grid
        container
        sx={{
          boxShadow:
            "-0.452679px 4.97947px 36px rgba(0, 0, 0, 0.09), -0.0905357px 0.995893px 5.85px rgba(0, 0, 0, 0.045)",
          borderRadius: "10px",
        }}
      >
        <Grid item sm={12} md={10} lg={10} p={2}>
          {flightData?.AllLegsInfo?.map((data, index, arr) => (
            <Box key={index}>
              <GroupFareFlightLayout
                handleDelete={handleDelete}
                disabled={false}
                arr={arr}
                flightData={data}
                allData={flightData}
                index={index}
                user={user}
                isLoading={isLoading}
              />
            </Box>
          ))}
        </Grid>
        {/* last grid */}
        <Grid
          item
          xs={12}
          sm={12}
          md={2}
          lg={2}
          pt={{ xs: 0.5, md: 2 }}
          pb={{ xs: 0.5, md: 1 }}
          pr={2}
          textAlign={{ xs: "center", md: "right" }}
          // bgcolor="var(--bgcolor)"
          sx={{
            overflow: "hidden",
            borderTopRightRadius: { xs: "", md: "10px" },
            borderBottomRightRadius: { xs: "", md: "10px" },
          }}
        >
          <Box textAlign="end" mr={{ xs: "5px", md: "0px" }}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  {/* <span style={{ fontSize: "18px" }}>PKR</span>
              &nbsp;
              {commaNumber(Math.round(flightData?.NetFare))} */}

                  <Typography
                    variant="p"
                    sx={{
                      color: "var(--primary-color)",
                      fontWeight: 500,
                      fontSize: {
                        xs: "14px",
                        sm: "16px",
                        // md: "18px"
                      },
                      display: {
                        // xs: 'none',
                        xs: "flex",
                        md: "block",
                      },
                      mx: { xs: "20px", md: "0" },
                    }}
                  >
                    NetFare:&nbsp;
                    <span style={{ fontSize: "18px" }}>PKR</span>
                    &nbsp;
                    {commaNumber(Math.round(flightData?.NetFare))}
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{
                      color: "var(--font-color)",
                      fontWeight: 500,
                      fontSize: {
                        xs: "14px",
                        sm: "16px",
                        md: "16px",
                      },
                      display: {
                        // xs: 'none',
                        xs: "flex",
                        md: "block",
                      },
                      mx: { xs: "20px", md: "0" },
                    }}
                  >
                    {" "}
                    Gross Fare:&nbsp;
                    <span style={{ fontSize: "18px" }}>PKR</span>
                    &nbsp;
                    <span
                      style={{
                        fontSize: "16px",
                        textDecorationLine: "line-through",
                      }}
                    >
                      {commaNumber(Math.round(flightData?.GrossFare))}
                    </span>
                  </Typography>
                </React.Fragment>
              }
            >
              {/* <Typography
              variant='p'
              sx={{
                color: 'var(--primary-color)',
                fontWeight: 500,
                fontSize: {
                  xs: '14px',
                  sm: '16px',
                  md: "18px"
                },
                display: {
                  // xs: 'none',
                  xs: "flex",
                  md: 'block'
                },
                mx: { xs: "20px", md: "0" }
              }}
      
            >
              
              <span style={{ fontSize: "18px" }}>PKR</span>
              &nbsp;
              {commaNumber(Math.round(flightData?.NetFare))}
            </Typography> */}
              <Typography
                variant="p"
                sx={{
                  color: "var(--font-color)",
                  fontWeight: 500,
                  fontSize: {
                    xs: "14px",
                    sm: "16px",
                    md: "16px",
                  },
                  display: {
                    // xs: 'none',
                    xs: "flex",
                    md: "block",
                  },
                  mx: { xs: "20px", md: "0" },
                }}
              >
                <span style={{ fontSize: "18px" }}>PKR</span>
                &nbsp;
                <span
                  style={{ fontSize: "18px" }}
                // style={{ fontSize: '16px', textDecorationLine: 'line-through' }}
                >
                  {commaNumber(Math.round(flightData?.GrossFare))}
                </span>
              </Typography>
            </HtmlTooltip>
          </Box>
          <Box
            textAlign="end"
            mt={{ xs: 0, md: 1 }}
            px={{ xs: 2, md: "0" }}
            display={{ xs: "flex", md: "block" }}
            justifyContent="space-between"
            alignItems={{ xs: "center", md: "" }}
          >
            <Box
              sx={{
                cursor: "pointer",
              }}
              onClick={() => FlightInformation(flightData?.AllLegs)}
            >
              <Button
                size="medium"
                sx={{
                  color: "var(--white)",
                  fontWeight: 500,
                  backgroundColor: "var(--primary-color)",
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  borderRadius: "5px",
                  textTransform: "capitalize",

                  "&:hover": {
                    backgroundColor: "var(--primary-color)",
                  },
                  padding: { xs: "3px 10px", md: "6px 15px" },
                }}
              >
                Book Now
              </Button>
              <Box
                display={{ xs: "none", md: "block" }}
                position="relative"
                right="0px"
                bottom="30px"
                zIndex=""
              >
                <div class="svg-container">
                  <svg
                    style={{
                      zIndex: "-100px",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 200 200"
                  >
                    {/* <circle class="tap-1" cx="89.43" cy="64.48" r="19.46" /> */}
                    <path
                      class="hand-tap"
                      d="M139.93,102.68,98.81,95.75V65.2A9.25,9.25,0,0,0,89.56,56h0a9.25,9.25,0,0,0-9.25,9.25v57.36L71,111.77c-3.61-3.61-8.44-3.89-13.08,0,0,0-7.24,5.84-3.83,9.25l34,34h42.63a9.25,9.25,0,0,0,9.07-7.43l6.82-34.09A9.28,9.28,0,0,0,139.93,102.68Z"
                    />
                  </svg>
                </div>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* last grid */}
        <Grid lg={12}>
          {flightData?.AllLegsInfo?.map((data, index, arr) => (
            <GroupFareMoreFlight
              flightData={flightData}
              adultCount={adultCount}
              childCount={childCount}
              infant={infant}
              FlightInformation={FlightInformation}
              TripType={flightData?.TripType}
              arr={arr}
              data={data}
              index={index}
            />
          ))}
        </Grid>
      </Grid>
      <Box></Box>
    </Box>
  );
};

export default React.memo(GroupFlight);
