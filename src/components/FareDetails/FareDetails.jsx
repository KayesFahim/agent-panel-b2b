import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import commaNumber from "comma-number";
import React from "react";

const FareDetails = ({ flightData }) => {
  const totalBaseFare = flightData.pricebreakdown.reduce(
    (cur, acc) => cur + parseInt(acc.BaseFare),
    0
  );
  const totalTax = flightData.pricebreakdown.reduce(
    (cur, acc) => cur + parseInt(acc.Tax),
    0
  );
  const ait = 0;
  const discount = 0;
  const others = 0;
  const totalFare = totalBaseFare + totalTax + ait + discount + others;

  return (
    <Box>
      <Box
        bgcolor="var(--white)"
        margin={{ xs: "15px", md: "2vw 3vw" }}
        padding="8px 20px"
        className="flight-search-table"
      >
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
          }}
        >
          <tr>
            <th width="10%">Pax&nbsp;Type</th>
            <th width="20%">Base&nbsp;Fare</th>
            <th width="20%">Tax&nbsp;+&nbsp;Fees</th>
            <th width="30%">Per&nbsp;Passenger</th>
            <th width="20%">Total&nbsp;Cost</th>
          </tr>
          {flightData?.pricebreakdown.map((data) => (
            <tr>
              <td>
                {data.PaxType === "ADT"
                  ? "Adult"
                  : data.PaxType === "INF"
                  ? "Infant"
                  : "Child"}
              </td>
              <td>PKR&nbsp;{commaNumber(data.BaseFare)}</td>
              <td>
                PKR&nbsp;
                {commaNumber(parseInt(data.Tax) + parseInt(data.ServiceFee))}
              </td>

              <td>
                PKR&nbsp;({commaNumber(data.BaseFare)}&nbsp;
                {"*"}&nbsp;{data.PaxCount})
              </td>

              <td>
                PKR&nbsp;
                {commaNumber(
                  (parseInt(data?.BaseFare) +
                    parseInt(data?.Tax) +
                    parseInt(data?.ServiceFee)) *
                    parseInt(data?.PaxCount)
                )}
              </td>
            </tr>
          ))}
        </table>
        <Grid container justifyContent="space-between" padding="20px">
          <Grid item>
            <Typography
              mb="5px"
              sx={{
                color: "var(--black)",
                fontSize: "12px",
              }}
            >
              Total (
              {flightData?.pricebreakdown.length === 3 ? (
                <>
                  {parseInt(flightData?.pricebreakdown[0].PaxCount) +
                    parseInt(flightData?.pricebreakdown[1].PaxCount) +
                    parseInt(flightData?.pricebreakdown[2].PaxCount)}
                </>
              ) : flightData?.pricebreakdown.length === 2 ? (
                <>
                  {parseInt(flightData?.pricebreakdown[0].PaxCount) +
                    parseInt(flightData?.pricebreakdown[1].PaxCount)}
                </>
              ) : (
                <>{parseInt(flightData?.pricebreakdown[0].PaxCount)}</>
              )}{" "}
              Traveler)
            </Typography>
            <Typography
              sx={{
                color: "var(--total-text-color)",
                fontSize: "12px",
              }}
            >
              Commission & Your Saving{" "}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              sx={{
                color: "var(--black)",
                fontSize: "12px",
              }}
            >
              PKR {flightData.clientPrice}
            </Typography>

            <Typography
              sx={{
                color: "var(--total-text-color)",
                fontSize: "12px",
              }}
            >
              PKR {flightData.comission}
            </Typography>
          </Grid>
        </Grid>
        <Box
          display="flex"
          justifyContent="space-between"
          bgcolor="var(--primary-color)"
          padding="8px 20px"
        >
          <Typography color="var(--white)" fontSize="13px">
            Total Payable
          </Typography>
          <Typography color="var(--white)" fontSize="13px">
            PKR {flightData.price}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FareDetails;
