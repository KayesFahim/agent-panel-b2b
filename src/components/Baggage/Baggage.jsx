import React from "react";
import { Box } from "@mui/material";
import { useState } from "react";

const Baggage = ({ flightData, adultCount, childCount, infant }) => {
  const [value, setValue] = useState("0");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        bgcolor="var(--white)"
        margin={{ xs: "15px", md: "2vw 3vw" }}
        padding="8px 20px"
      >
        <Box className="flight-search-table">
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <tr>
              <th>Baggage</th>
              <th>Check-In</th>
              <th>Cabin</th>
            </tr>
            <tr>
              <td>Adult</td>
              <td>
                {/* {flightData?.bags === "3" ||
                                  flightData?.bags === "2" ||
                                  flightData?.bags === "1" ? (
                                    <>{flightData?.bags?.split(" ")[0]} Piece</>
                                  ) : flightData?.bags === " " ? (
                                    <>0 Kg</>
                                  ) : (
                                    <>{flightData?.bags?.slice(0, 2) || 0} Kg</>
                                  )} */}
              </td>
              <td>7 Kg</td>
            </tr>
            {childCount > 0 && (
              <tr>
                <td>Child</td>
                <td>
                  {/* {flightData?.bags === "3" ||
                                    flightData?.bags === "2" ||
                                    flightData?.bags === "1" ? (
                                      <>
                                        {flightData?.bags?.split(" ")[0]} Piece
                                      </>
                                    ) : flightData?.bags === " " ? (
                                      <>0 Kg</>
                                    ) : flightData?.bags.length === 6 ? (
                                      <>
                                        {flightData?.bags?.slice(2, 4) || 0} Kg{" "}
                                      </>
                                    ) : (
                                      <>
                                        {flightData?.bags?.slice(0, 2) || 0} Kg
                                      </>
                                    )} */}
                </td>
                <td>7 Kg</td>
              </tr>
            )}
            {infant > 0 && (
              <tr>
                <td>Infant</td>
                <td>
                  {/* {flightData?.bags === "3" ||
                                    flightData?.bags === "2" ||
                                    flightData?.bags === "1" ? (
                                      <>
                                        {flightData?.bags?.split(" ")[0]} Piece
                                      </>
                                    ) : flightData?.bags === " " ? (
                                      <>0 Kg</>
                                    ) : flightData?.bags.length === 6 ? (
                                      <>
                                        {flightData?.bags?.slice(4, 6) || 0} Kg{" "}
                                      </>
                                    ) : (
                                      <>
                                        {flightData?.bags?.slice(0, 2) || 0} Kg
                                      </>
                                    )} */}
                </td>
                <td>7 Kg</td>
              </tr>
            )}
          </table>
        </Box>
      </Box>
    </Box>
  );
};

export default Baggage;
