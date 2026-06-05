/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from "react";
import { Box, Button, Grid, Tab, Tabs, Container } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CircleIcon from "@mui/icons-material/Circle";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "var(--transit)",
    maxWidth: 300,
    padding: "8px",
  },
}));

const RoundTransit = ({ flightData, goflight, backflight }) => {
  return (
    <Box>
      {/* Go Transit  */}
      {goflight === "1" && (
        <Box textAlign={"center"} pr={1}>
          <Typography>
            {flightData?.segments?.go?.length === 3 ? (
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <Box display="flex">
                      <Box
                        borderRight="2px solid var(--secondary-color)"
                        px={1}
                      >
                        <Typography
                          sx={{
                            color: "var(--secondary-color)",
                            fontSize: "12px",
                            textAlign: "center",
                            fontWeight: 500,
                          }}
                        >
                          Transit: {flightData?.transit.go.transit1} <br />
                          <span
                            style={{
                              fontSize: "16px",
                              fontWeight: 600,
                            }}
                          >
                            {flightData?.segments.go[1]?.departure}{" "}
                          </span>
                        </Typography>
                        <Typography
                          sx={{
                            color: "var(--secondary-color)",
                            fontSize: "11px",
                            fontWeight: 500,
                          }}
                        >
                          {flightData?.segments.go[1]?.departureLocation} <br />
                          {flightData?.segments.go[1]?.marketingcareer}{" "}
                          {flightData?.segments.go[1]?.marketingflight}
                          {" & "}
                          {flightData?.segments.go[1]?.flightduration}
                          <br />
                          {format(
                            new Date(
                              flightData?.segments.go[1]?.departureTime?.toString()
                            ),
                            "dd MMM yyyy hh:mm a"
                          )}
                        </Typography>
                      </Box>

                      <Box px={1}>
                        <Typography
                          sx={{
                            color: "var(--secondary-color)",
                            fontSize: "12px",
                            textAlign: "center",
                            fontWeight: 500,
                          }}
                        >
                          Transit: {flightData?.transit.go.transit2} <br />
                          <span
                            style={{
                              fontSize: "16px",
                              fontWeight: 600,
                            }}
                          >
                            {flightData?.segments.go[2]?.departure}{" "}
                          </span>
                        </Typography>
                        <Typography
                          sx={{
                            color: "var(--secondary-color)",
                            fontSize: "11px",
                            fontWeight: 500,
                          }}
                        >
                          {flightData?.segments.go[2]?.departureLocation} <br />
                          {flightData?.segments.go[2]?.marketingcareer}{" "}
                          {flightData?.segments.go[2]?.marketingflight}
                          {" & "}
                          {flightData?.segments.go[2]?.flightduration}
                          <br />
                          {format(
                            new Date(
                              flightData?.segments.go[2]?.departureTime?.toString()
                            ),
                            "dd MMM yyyy hh:mm a"
                          )}
                        </Typography>
                      </Box>
                    </Box>
                  </React.Fragment>
                }
                followCursor
              >
                <Box>
                  <Typography
                    sx={{
                      color: "var(--gray)",
                      fontWeight: 500,
                      fontSize: {
                        xs: "12px",
                        sm: "10px",
                        md: "12px",
                      },
                    }}
                  >
                    {flightData?.goflightduration}
                  </Typography>
                  <Box className="stop-bar-parent">
                    <CircleIcon
                      sx={{ color: "var(--transit)", fontSize: "14px" }}
                    />
                    <CircleIcon
                      sx={{
                        color: "var(--primary-color)",
                        fontSize: "12px",
                      }}
                    />
                    <CircleIcon
                      sx={{
                        color: "var(--primary-color)",
                        fontSize: "12px",
                      }}
                    />
                    <CircleIcon
                      sx={{ color: "var(--transit)", fontSize: "14px" }}
                    />
                    <Box className="stop-bar-line"></Box>
                  </Box>
                  <Typography
                    sx={{
                      color: "var(--gray)",
                      fontWeight: 500,
                      fontSize: {
                        xs: "12px",
                        sm: "10px",
                        md: "12px",
                      },
                    }}
                  >
                    2 STOP
                  </Typography>
                </Box>
              </HtmlTooltip>
            ) : flightData?.segments?.go?.length === 2 ? (
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontSize: "12px",
                        textAlign: "center",
                        fontWeight: 500,
                      }}
                    >
                      Transit: {flightData?.transit.go.transit1} <br />
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        {flightData?.segments.go[1]?.departure}{" "}
                      </span>
                    </Typography>

                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontSize: "11px",
                        fontWeight: 500,
                      }}
                    >
                      {flightData?.segments.go[1]?.departureLocation} <br />
                      {flightData?.segments.go[1]?.marketingcareer}{" "}
                      {flightData?.segments.go[1]?.marketingflight}
                      {" & "}
                      {flightData?.segments.go[1]?.flightduration}
                      <br />
                      {format(
                        new Date(
                          flightData?.segments.go[1]?.departureTime?.toString()
                        ),
                        "dd MMM yyyy hh:mm a"
                      )}
                    </Typography>
                  </React.Fragment>
                }
                followCursor
              >
                <Box>
                  <Typography
                    sx={{
                      color: "var(--gray)",
                      fontWeight: 500,
                      fontSize: {
                        xs: "12px",
                        sm: "10px",
                        md: "12px",
                      },
                    }}
                  >
                    {flightData?.goflightduration}
                  </Typography>
                  <Box className="stop-bar-parent">
                    <CircleIcon
                      sx={{ color: "var(--transit)", fontSize: "14px" }}
                    />
                    <CircleIcon
                      sx={{
                        color: "var(--primary-color)",
                        fontSize: "12px",
                      }}
                    />

                    <CircleIcon
                      sx={{ color: "var(--transit)", fontSize: "14px" }}
                    />
                    <Box className="stop-bar-line"></Box>
                  </Box>
                  <Typography
                    sx={{
                      color: "var(--gray)",
                      fontWeight: 500,
                      fontSize: {
                        xs: "12px",
                        sm: "10px",
                        md: "12px",
                      },
                    }}
                  >
                    1 STOP
                  </Typography>
                </Box>
              </HtmlTooltip>
            ) : (
              <Box>
                <Typography
                  sx={{
                    color: "var(--gray)",
                    fontWeight: 500,
                    fontSize: {
                      xs: "12px",
                      sm: "10px",
                      md: "12px",
                    },
                  }}
                >
                  {flightData?.goflightduration}
                </Typography>
                <Box className="stop-bar-parent">
                  <CircleIcon
                    sx={{ color: "var(--transit)", fontSize: "14px" }}
                  />
                  <Box className="stop-bar-line"></Box>
                  <CircleIcon
                    sx={{ color: "var(--transit)", fontSize: "14px" }}
                  />
                </Box>
                <Typography
                  sx={{
                    color: "var(--gray)",
                    fontWeight: 500,
                    fontSize: {
                      xs: "12px",
                      sm: "10px",
                      md: "12px",
                    },
                  }}
                >
                  NON STOP
                </Typography>
              </Box>
            )}
          </Typography>
        </Box>
      )}

      {/* Back Transit  */}
      {backflight === "1" && (
        <Box textAlign={"center"} pr={1}>
          <Typography>
            {flightData?.segments?.back?.length === 3 ? (
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <Box display="flex">
                      <Box
                        borderRight="2px solid var(--secondary-color)"
                        px={1}
                      >
                        <Typography
                          sx={{
                            color: "var(--secondary-color)",
                            fontSize: "12px",
                            textAlign: "center",
                            fontWeight: 500,
                          }}
                        >
                          Transit: {flightData?.transit.back.transit1} <br />
                          <span
                            style={{
                              fontSize: "16px",
                              fontWeight: 600,
                            }}
                          >
                            {flightData?.segments.back[1]?.departure}{" "}
                          </span>
                        </Typography>
                        <Typography
                          sx={{
                            color: "var(--secondary-color)",
                            fontSize: "11px",
                            fontWeight: 500,
                          }}
                        >
                          {flightData?.segments.back[1]?.departureLocation}{" "}
                          <br />
                          {flightData?.segments.back[1]?.marketingcareer}{" "}
                          {flightData?.segments.back[1]?.marketingflight}
                          {" & "}
                          {flightData?.segments.back[1]?.flightduration}
                          <br />
                          {format(
                            new Date(
                              flightData?.segments.back[1]?.departureTime?.toString()
                            ),
                            "dd MMM yyyy hh:mm a"
                          )}
                        </Typography>
                      </Box>

                      <Box px={1}>
                        <Typography
                          sx={{
                            color: "var(--secondary-color)",
                            fontSize: "12px",
                            textAlign: "center",
                            fontWeight: 500,
                          }}
                        >
                          Transit: {flightData?.transit.back.transit2} <br />
                          <span
                            style={{
                              fontSize: "16px",
                              fontWeight: 600,
                            }}
                          >
                            {flightData?.segments.back[2]?.departure}{" "}
                          </span>
                        </Typography>
                        <Typography
                          sx={{
                            color: "var(--secondary-color)",
                            fontSize: "11px",
                            fontWeight: 500,
                          }}
                        >
                          {flightData?.segments.back[2]?.departureLocation}{" "}
                          <br />
                          {flightData?.segments.back[2]?.marketingcareer}{" "}
                          {flightData?.segments.back[2]?.marketingflight}
                          {" & "}
                          {flightData?.segments.back[2]?.flightduration}
                          <br />
                          {format(
                            new Date(
                              flightData?.segments.back[2]?.departureTime?.toString()
                            ),
                            "dd MMM yyyy hh:mm a"
                          )}
                        </Typography>
                      </Box>
                    </Box>
                  </React.Fragment>
                }
                followCursor
              >
                <Box>
                  <Typography
                    sx={{
                      color: "var(--gray)",
                      fontWeight: 500,
                      fontSize: {
                        xs: "12px",
                        sm: "10px",
                        md: "12px",
                      },
                    }}
                  >
                    {flightData?.backflightduration}
                  </Typography>
                  <Box className="stop-bar-parent">
                    <CircleIcon
                      sx={{ color: "var(--transit)", fontSize: "14px" }}
                    />
                    <CircleIcon
                      sx={{
                        color: "var(--primary-color)",
                        fontSize: "12px",
                      }}
                    />
                    <CircleIcon
                      sx={{
                        color: "var(--primary-color)",
                        fontSize: "12px",
                      }}
                    />
                    <CircleIcon
                      sx={{ color: "var(--transit)", fontSize: "14px" }}
                    />
                    <Box className="stop-bar-line"></Box>
                  </Box>
                  <Typography
                    sx={{
                      color: "var(--gray)",
                      fontWeight: 500,
                      fontSize: {
                        xs: "12px",
                        sm: "10px",
                        md: "12px",
                      },
                    }}
                  >
                    2 STOP
                  </Typography>
                </Box>
              </HtmlTooltip>
            ) : flightData?.segments?.back?.length === 2 ? (
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontSize: "12px",
                        textAlign: "center",
                        fontWeight: 500,
                      }}
                    >
                      Transit: {flightData?.transit.back.transit1} <br />
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        {flightData?.segments.back[1]?.departure}{" "}
                      </span>
                    </Typography>

                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontSize: "11px",
                        fontWeight: 500,
                      }}
                    >
                      {flightData?.segments.back[1]?.departureLocation} <br />
                      {flightData?.segments.back[1]?.marketingcareer}{" "}
                      {flightData?.segments.back[1]?.marketingflight}
                      {" & "}
                      {flightData?.segments.back[1]?.flightduration}
                      <br />
                      {format(
                        new Date(
                          flightData?.segments.back[1]?.departureTime?.toString()
                        ),
                        "dd MMM yyyy hh:mm a"
                      )}
                    </Typography>
                  </React.Fragment>
                }
                followCursor
              >
                <Box>
                  <Typography
                    sx={{
                      color: "var(--gray)",
                      fontWeight: 500,
                      fontSize: {
                        xs: "12px",
                        sm: "10px",
                        md: "12px",
                      },
                    }}
                  >
                    {flightData?.backflightduration}
                  </Typography>
                  <Box className="stop-bar-parent">
                    <CircleIcon
                      sx={{ color: "var(--transit)", fontSize: "14px" }}
                    />
                    <CircleIcon
                      sx={{
                        color: "var(--primary-color)",
                        fontSize: "12px",
                      }}
                    />

                    <CircleIcon
                      sx={{ color: "var(--transit)", fontSize: "14px" }}
                    />
                    <Box className="stop-bar-line"></Box>
                  </Box>
                  <Typography
                    sx={{
                      color: "var(--gray)",
                      fontWeight: 500,
                      fontSize: {
                        xs: "12px",
                        sm: "10px",
                        md: "12px",
                      },
                    }}
                  >
                    1 STOP
                  </Typography>
                </Box>
              </HtmlTooltip>
            ) : (
              <Box>
                <Typography
                  sx={{
                    color: "var(--gray)",
                    fontWeight: 500,
                    fontSize: {
                      xs: "12px",
                      sm: "10px",
                      md: "12px",
                    },
                  }}
                >
                  {flightData?.backflightduration}
                </Typography>
                <Box className="stop-bar-parent">
                  <CircleIcon
                    sx={{ color: "var(--transit)", fontSize: "14px" }}
                  />
                  <Box className="stop-bar-line"></Box>
                  <CircleIcon
                    sx={{ color: "var(--transit)", fontSize: "14px" }}
                  />
                </Box>
                <Typography
                  sx={{
                    color: "var(--gray)",
                    fontWeight: 500,
                    fontSize: {
                      xs: "12px",
                      sm: "10px",
                      md: "12px",
                    },
                  }}
                >
                  NON STOP
                </Typography>
              </Box>
            )}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default RoundTransit;
