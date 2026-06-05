import React from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import WorkIcon from "@mui/icons-material/Work";
import commaNumber from "comma-number";
import { useState } from "react";

const Quotation = ({
  newQuotetionArr,
  setNewQuotetionArr,
  updatedPrice,
  flightData,
}) => {
  const [checked, setChecked] = useState(true);
  const handleBox = (data) => {
    const event = window.event;

    if (newQuotetionArr?.length > 1) {
      setChecked(event.target.checked);
    }
    if (!event.target.checked) {
      const filter = newQuotetionArr?.filter((item) => item?.uId !== data.uId);
      setNewQuotetionArr(filter);
    }
  };
  return (
    <Box>
      <Grid
        container
        sx={{
          mb: 2,
          display: {
            xs: "none",
            sm: "flex",
            md: "flex",
          },
          transition: "all .5s ease-in-out",
          bgcolor: "var(--card-color)",
          borderRadius: "5px",
        }}
      >
        <Grid item md={10} sx={{ height: "100%", padding: "10px 10px 0px" }}>
          <Grid container>
            {/* //todo:one */}
            <Grid item md={2.6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                }}
              >
                {/* //todo: Image Part */}
                <Box>
                  <img
                    src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[0]?.marketingcareer}.png`}
                    width="30px"
                    height="30px"
                    className={`${flightData?.system
                      ?.toLowerCase()
                      ?.split(" ")
                      ?.join("-")}-border"}
                    alt={`${flightData.segments[0]?.marketingcareer}`}
                  />
                </Box>
                {/* //todo: Text Part */}
                <Box width="90%">
                  <Tooltip
                    title={`${flightData.segments
                      .map((data) => data?.marketingcareerName)
                      .filter(
                        (value, index, arr) => arr.indexOf(value) === index
                      )
                      .join(", ")}"}
                  >
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontWeight: 400,
                        fontSize: {
                          xs: "14px",
                          sm: "14px",
                          md: "14px",
                          cursor: "pointer",
                        },
                        // width: "80%",
                      }}
                      noWrap
                    >{`${flightData.segments
                      .map((data) => data?.marketingcareerName)
                      .filter(
                        (value, index, arr) => arr.indexOf(value) === index
                      )
                      .join(", ")}"}</Typography>
                  </Tooltip>
                  <Tooltip
                    title={`${flightData.segments
                      .map(
                        (data) =>
                          `${
                            data.marketingcareer === data.operatingcareer
                              ? `${data.marketingcareer}-${data.marketingflight}`
                              : `${data.operatingcareer}-${data.operatingflight}`
                          }`
                      )
                      .join(", ")}"}
                  >
                    <Typography
                      sx={{
                        color: "var(--black)",
                        fontWeight: 400,
                        fontSize: {
                          xs: "12px",
                          sm: "12px",
                          md: "12px",
                          cursor: "pointer",
                        },
                      }}
                      noWrap
                    >
                      {`${flightData.segments
                        .map(
                          (data) =>
                            `${
                              data.marketingcareer === data.operatingcareer
                                ? `${data.marketingcareer}-${data.marketingflight}`
                                : `${data.operatingcareer}-${data.operatingflight}`
                            }`
                        )
                        .join(", ")}"}
                    </Typography>
                  </Tooltip>
                </Box>
              </Box>
            </Grid>
            <Grid item md={3.5}>
              <Box
                style={{
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    gap: "6px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontWeight: 400,
                      fontSize: {
                        xs: "12px",
                        sm: "13px",
                        md: "18px",
                      },
                    }}
                  >
                    {flightData?.departure} {flightData?.departureTime}
                  </Typography>
                  <Tooltip
                    title={`${flightData?.segments[0]?.departureAirport}`}
                  >
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontWeight: 400,
                        fontSize: {
                          xs: "12px",
                          sm: "11px",
                          md: "14px",
                        },
                        cursor: "pointer",
                        width: "97%",
                      }}
                      noWrap
                    >
                      {flightData?.segments[0]?.departureAirport}
                    </Typography>
                  </Tooltip>

                  <Typography
                    sx={{
                      color: "var(--gray)",
                      fontWeight: 400,
                      fontSize: {
                        xs: "12px",
                        sm: "11px",
                        md: "14px",
                      },
                    }}
                  >
                    {flightData?.departureDate}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {/* //todo:two */}
            <Grid item md={2.4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "fit-content",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FlightIcon
                    style={{
                      color: "var(--primary-color)",
                      transform: "rotate(90deg)",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "fit-content",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "var(--gray)",
                      fontWeight: 400,
                      fontSize: {
                        xs: "12px",
                        sm: "10px",
                        md: "12px",
                      },
                    }}
                  >
                    {flightData.segments.length === 1
                      ? "NO STOP"
                      : `${flightData.segments.length - 1} STOP`}
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--gray)",
                      fontWeight: "normal",
                      fontSize: {
                        xs: "12px",
                        sm: "10px",
                        md: "14px",
                      },
                    }}
                  >
                    {/* {flightData.segments.length === 1 ? (
                      ""
                    ) : (
                      <>{calDuration(totalTimeArr)}</>
                    )} */}
                    {flightData?.flightduration}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {/* //todo:Three */}
            <Grid item md={3.5}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                  gap: "6px",
                }}
              >
                <Typography
                  sx={{
                    color: "var(--secondary-color)",
                    fontWeight: 400,
                    fontSize: {
                      xs: "12px",
                      sm: "13px",
                      md: "18px",
                    },
                  }}
                >
                  {`${flightData?.arrival} ${flightData?.arrivalTime}`}
                </Typography>
                <Tooltip
                  title={`${
                    flightData?.segments[flightData?.segments?.length - 1]
                      ?.arrivalAirport
                  }`}
                >
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontWeight: 400,
                      fontSize: {
                        xs: "12px",
                        sm: "11px",
                        md: "14px",
                      },
                      width: "100%",
                      cursor: "pointer",
                    }}
                    noWrap
                  >
                    {
                      flightData?.segments[flightData?.segments?.length - 1]
                        ?.arrivalAirport
                    }
                  </Typography>
                </Tooltip>

                <Typography
                  sx={{
                    color: "var(--gray)",
                    fontWeight: 400,
                    fontSize: {
                      xs: "12px",
                      sm: "11px",
                      md: "14px",
                    },
                  }}
                >
                  {flightData?.arrivalDate}
                </Typography>
              </Box>
            </Grid>
            {/* //todo:Four */}
            <Grid
              item
              md={12}
              style={{
                width: "100%",
                height: "100%",
                marginTop: "15px",
                marginLeft: "-10px",
              }}
            >
              <Grid
                container
                style={{
                  width: "80%",
                  height: "100%",
                  backgroundColor: "var(--input-bgcolor)",
                  padding: "10px 0",
                }}
              >
                <Grid md={4}>
                  <Typography
                    sx={{
                      color: "var(--secondary-color)",
                      fontWeight: "normal",
                      fontSize: {
                        xs: "14px",
                        sm: "12px",
                        md: "14px",
                      },
                      width: "100%",
                      height: "fit-content",
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                    }}
                  >
                    {/* //todo: make quotation section */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled={newQuotetionArr?.length <= 1}
                          sx={{ p: "0px 0px 0px 25px" }}
                          checked={checked}
                          onChange={() => handleBox(flightData)}
                        />
                      }
                    />
                    {flightData?.refundable === "Refundable"
                      ? "Refundable"
                      : "Non Refundable"}
                  </Typography>
                </Grid>
                <Grid md={4}>
                  <Box
                    className="img-text-bag-0"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <WorkIcon style={{ color: "var(--secondary-color)" }} />
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontWeight: 400,
                        fontSize: {
                          xs: "12px",
                          sm: "12px",
                          md: "14px",
                          lg: "16px",
                        },
                      }}
                    >
                      {parseInt(flightData.bags) > 4 ? (
                        <>{flightData?.bags?.slice(0, 2) || 0} Kg</>
                      ) : flightData.bags === "2 N" ? (
                        <>2 N</>
                      ) : flightData.bags === "2 P" ? (
                        <>2 P</>
                      ) : parseInt(flightData.bags) < 4 ? (
                        <>{parseInt(flightData.bags)} Piece</>
                      ) : parseInt(flightData.bags) === isNaN ? (
                        <>{flightData.bags}</>
                      ) : (
                        <>0 Kg</>
                      )}
                    </Typography>
                  </Box>
                </Grid>
                <Grid md={4}>
                  <Box
                    className="img-text-bag-0"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontWeight: 400,
                        fontSize: {
                          xs: "12px",
                          sm: "12px",
                          md: "14px",
                          lg: "16px",
                        },
                      }}
                    >
                      {flightData?.seat || 9} Seat
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* //todo: price section */}
        <Grid item md={2} pr={2}>
          <Box
            sx={{
              // background: "var(--primary-color)",
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "space-between",
              borderLeft: "5px solid var(--input-bgcolor)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "end",
                flexDirection: "column",
                pt: 1,
              }}
            >
              <Typography
                style={{
                  fontSize: "18px",
                  color: "var(--secondary-color)",
                  fontWeight: "bold",
                }}
              >
                {`PKR ${commaNumber(
                  Number.parseInt(
                    flightData.system !== "Galileo"
                      ? flightData?.subagentprice || flightData.price
                      : flightData.subagentprice
                  )
                )}`}
              </Typography>
              <Typography
                style={{
                  fontSize: "14px",
                  color: "var(--secondary-color)",
                  // textDecoration: "line-through",
                  fontWeight: "normal",
                }}
              >
                {`PKR ${commaNumber(
                  Number.parseInt(
                    flightData.system !== "Galileo"
                      ? flightData?.customerPrice || flightData?.clientPrice
                      : flightData?.price || flightData?.customerPrice
                  ) + updatedPrice
                )}`}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Quotation;
