import { Box, Button, Grid, Typography } from "@mui/material";
import commaNumber from "comma-number";
import Loader from "../../images/loader/Render.gif";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import { format } from "date-fns";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import PeopleIcon from "@mui/icons-material/People";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LanguageIcon from "@mui/icons-material/Language";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import Swal from "sweetalert2";

const LiveQueues = ({ totalData }) => {
  const navigate = useNavigate();
  const users = secureLocalStorage.getItem("user-info");
  let agentId = users?.user?.agentId;
  const [allQueuesData, setAllQueuesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // Sets the state of the const for the given page and state.

  useEffect(() => {
    setIsLoading(true);
    fetch()
      // `https://api.flyjatt.com/v1/Queues/index.php?agentId=${agentId}&all`
      .then((res) => res.json())
      .then((data) => {
        setAllQueuesData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Failed To Fetch",
          confirmButtonText: "ok",
          confirmButtonTextColor: "var(--primary-color)",
        }).then(() => {
          navigate("/agent/product");
        });
      });
    //todo: end of fetch all data
  }, [agentId]);

  const sendToQueuesDetails = (agentId, BookingId, tripType, pnr, gds) => {
    navigate("/agent/queuesdetail", {
      state: {
        agentId,
        BookingId,
        tripType,
        pnr,
        gds,
        path: "queues",
      },
    });
  };
  if (isLoading) {
    return (
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
          width: "70vw",
          marginInline: "auto",
        }}
      >
        <Box
          style={{
            width: "50%",
            height: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={Loader}
            alt="loader"
            style={{
              width: "100%",
              objectFit: "center",
            }}
          />
        </Box>
      </Box>
    );
  }
  return (
    <Box>
      <Box
        sx={{
          margin: "10px 0px 0",
          borderRadius: "4px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        <Grid container spacing={0}>
          <Grid item md={0.5}>
            <Box
              sx={{
                background: "var(--secondary-color)",
                borderRadius: "3px",
                height: "100%",
                display: { xs: "none", sm: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "space-evenly",
                a: {
                  textDecoration: "none",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
            >
              <NavLink>
                <AirplanemodeActiveIcon />
              </NavLink>
              <NavLink>
                <PeopleIcon />
              </NavLink>
              <NavLink>
                <TravelExploreIcon />
              </NavLink>
              <NavLink>
                <DarkModeIcon />
              </NavLink>
              <NavLink>
                <PersonSearchIcon />
              </NavLink>
              <NavLink>
                <LanguageIcon />
              </NavLink>
            </Box>
          </Grid>
          <Grid item md={11.5}>
            <Box
              className="table-wrapper"
              sx={{
                "&::-webkit-scrollbar": {
                  width: "5px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "var(--secondary-color)",
                  borderRadius: "0px",
                },
                height: "calc(100vh - 220px)",
                overflowY: "scroll",
              }}
            >
              {allQueuesData?.length !== 0 ? (
                <table className="responsive-table">
                  <thead>
                    <tr>
                      <th width="10%">ReferenceId</th>
                      <th width="12%">Airlines</th>
                      <th width="10%">Status</th>
                      <th width="10%">Route</th>
                      <th width="10%">Type</th>
                      <th width="5%">Pax</th>
                      <th width="12%">BookedDate</th>
                      <th width="10%">FlightDate</th>
                      <th width="10%">Passenger</th>
                      <th width="10%">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allQueuesData?.map((bookingDetail, index) => (
                      <tr key={{ index }}>
                        <td>
                          <Button
                            disabled={
                              bookingDetail.Status === "Cancelled"
                                ? true
                                : false
                            }
                            sx={{
                              border: "none",
                              cursor: "pointer",
                              background: "#d1e9ff",
                              color: "var(--secondary-color)",
                              padding: "5px 10px",
                              textDecoration: "underline",
                              borderRadius: "4px",
                              fontSize: "12px",
                              width: "100%",
                              "&:hover": {
                                background: "#d1e9ff",
                                color: "#003566",
                              },
                            }}
                            onClick={() =>
                              sendToQueuesDetails(
                                bookingDetail?.AgentId,
                                bookingDetail?.BookingId,
                                bookingDetail?.TripType,
                                bookingDetail?.Pnr,
                                bookingDetail?.gdsSystem
                              )
                            }
                          >
                            {bookingDetail.BookingId ?? "Reference No"}
                          </Button>
                        </td>
                        <td>{bookingDetail.Career ?? "Airlines"}</td>
                        <td>
                          <Typography
                            sx={{ fontSize: "12px", textAlign: "center" }}
                            className={`${bookingDetail.Status?.toLowerCase()
                              ?.split(" ")
                              ?.join("-")}-btn"}
                          >
                            {bookingDetail.Status}
                          </Typography>
                        </td>
                        <td>
                          {bookingDetail.DepFrom ?? "From"} -{" "}
                          {bookingDetail.ArrTo ?? "To"}
                        </td>
                        <td>{bookingDetail.TripType ?? "Flight Type"}</td>
                        <td>{bookingDetail.TotalPax ?? "Total Pax"}</td>

                        <td>
                          {bookingDetail?.created_at !== "" ||
                          "undefined" ||
                          null
                            ? format(
                                new Date(bookingDetail?.created_at),
                                "dd MMM yy hh:mm a"
                              )
                            : "Booked Date"}
                        </td>
                        <td>{bookingDetail?.journeyDate || "Flight Date"}</td>
                        <td>{bookingDetail?.Name || "Passenger Name"}</td>
                        <td>
                          {commaNumber(bookingDetail.InvoicePrice) + "PKR" ||
                            "Gross Cost"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <Typography
                  sx={{
                    fontSize: "20px",
                    color: "var(--secondary-color)",
                    background: "var(--primary-color)",
                    padding: "5px",
                    margin: "5px",
                    textAlign: "center",
                    borderRadius: "4px",
                  }}
                >
                  No Ticketed Found
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LiveQueues;
