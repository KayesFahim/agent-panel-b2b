import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box, Grid, Modal } from "@mui/material";
const seatStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#fff",
  overflow: "scroll",
};
const SeatMap = ({ flightData }) => {
  const [data, setData] = useState([]);
  const [seatOpen, setSeatOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = {
          System: "Sabre",
          DepDate: flightData[0]?.departureDate,
          Origin: flightData[0]?.fromAirportCode,
          Destination: flightData[flightData?.length - 1]?.toAirportCode,
          Carrier: flightData[0]?.airlineCode,
          FlightNumber: flightData[0]?.flightNumber,
          CabinClass: flightData[0]?.cabinTypeCode,
        };
        const response = await axios.post(
          `${import.meta.env.REACT_APP_API_URL}/agent/flight/seatmap`,
          body
        );
        setData(response.data);
      } catch (error) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return;
  }
  const cabin =
    data["soap-env:Envelope"]["soap-env:Body"]?.EnhancedSeatMapRS?.SeatMap
      ?.Cabin;
  const row = cabin?.Row;
  const column = cabin?.Column;
  const charac = (text) => {
    for (const colEntry of column) {
      const colText = colEntry?.Column?._text;
      const characteristics = colEntry?.Characteristics?._text;

      if (text === colText) {
        return characteristics;
      }
    }
  };

  return (
    // <Container>
    <Box>
      <Box
        sx={{
          cursor: "pointer",
          bgcolor: "var(--primary-color)",
          color: "var(--white)",
          p: "6px 20px",
          textAlign: "center",
          borderRadius: "5px",
        }}
        onClick={() => setSeatOpen(true)}
      >
        SeatMap
      </Box>
      <Modal open={seatOpen} onClose={() => setSeatOpen(false)}>
        <Box
          sx={{
            ...seatStyle,
            width: {
              xs: "95%",
              sm: "80%",
              md: "50%",
              lg: column?.length > 4 ? "800px" : "400px",
            },
            height: { xs: "60%", sm: "80%", md: "50%", lg: "60%" },
          }}
        >
          <Box
            sx={{
              bgcolor: "var(--primary-color)",
              p: 2,
              color: "var(--white)",
              fontSize: { xs: 12, md: 14 },
            }}
          >
            Check Out the Seating Arrangement on This Flight
          </Box>
          <Box p={{ xs: 1, md: 2 }}>
            {row?.map((seat, i) => (
              <Grid container spacing={{ xs: 0.3, md: 1 }}>
                {seat?.Seat ? (
                  seat?.Seat?.map((item, i) => (
                    <Grid
                      item
                      xs={1.2}
                      sm={1.2}
                      md={1.2}
                      lg={column?.length > 4 ? 1.2 : 2}
                    >
                      <Box
                        sx={{
                          boxShadow: "0 0 10px rgba(9, 152, 138, 0.5)",
                          textAlign: "center",
                          borderRadius: "5px",
                          px: { xs: 0, sm: 0.7, md: 1 },
                          py: 0.5,
                          mb: 1,
                        }}
                      >
                        <Box
                          sx={{
                            color: "var(--primary-color)",
                            fontSize: { xs: 10, md: 12 },
                          }}
                        >
                          {seat.RowNumber._text}
                        </Box>
                        <Box
                          sx={{
                            color: "var(--secondary)",
                            fontSize: { xs: 8, md: 9 },
                          }}
                        >
                          {item.Number._text}
                        </Box>
                        <Box
                          sx={{
                            color: "var(--secondary)",
                            fontSize: { xs: 6, sm: 8, md: 9 },
                          }}
                        >
                          {charac(item.Number._text) === "CenterSeat"
                            ? "Center"
                            : charac(item.Number._text)}
                        </Box>
                      </Box>
                    </Grid>
                  ))
                ) : (
                  <Grid xs={12} sx={{ py: 2, textAlign: "center" }}>
                    Seat Does Not Exist
                  </Grid>
                )}
              </Grid>
            ))}
          </Box>
        </Box>
      </Modal>
    </Box>

    // </Container>
  );
};

export default SeatMap;
