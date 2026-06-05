import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";

const TextFieldGrid = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      {/* <Typography>
        {label}
        <Typography component={"span"} sx={{ color: "red" }}>
          *
        </Typography>
      </Typography> */}
      <Box style={{ marginTop: "30px" }}>
        {/* <input
          required
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        /> */}
        <TextField
          sx={{ width: "100%" }}
          required
          type={type}
          label={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </Box>
    </Grid>
  );
};

export default TextFieldGrid;
