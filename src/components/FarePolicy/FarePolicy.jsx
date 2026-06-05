import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const FarePolicy = () => {
  return (
    <Box>
      <Box
        bgcolor="var(--white)"
        margin={{ xs: "15px", md: "2vw 3vw" }}
        padding="8px 20px"
      >
        <Typography
          sx={{
            color: "var(--fontcolor)",
            fontSize: "12px",
            fontWeight: 500,
            padding: "20px",
          }}
        >
          Pay attention to the following notifications in the CANCELLATIONS
          section:
          <br />
          <br />
          TICKET IS NON-REFUNDABLE — the ticket is non-refundable;
          <br />
          TICKET IS NON-REFUNDABLE FOR CANCEL/REFUND — the ticket is
          non-refundable;
          <br />
          REFUND IS NOT PERMITTED — the ticket is non-refundable;
          <br />
          ANY TIME TICKET IS NON-REFUNDABLE — the ticket is non-refundable;
          <br />
          TICKET IS NON-REFUNDABLE IN CASE OF NO-SHOW — the ticket cannot be
          refunded in case of no-show.
          <br />
          Change rules are described in the section with the CHANGES subtitle.
          <br />
          <br />
          The CHANGES ARE NOT PERMITTED line means that you cannot make any
          changes and in such a case, you are not allowed to change the
          date/time/route of the flight.
        </Typography>
      </Box>
    </Box>
  );
};

export default FarePolicy;
