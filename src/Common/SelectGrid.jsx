import {
  Grid,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import React from "react";

const SelectGrid = ({ label, options, value, onChange }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      {/* <Typography>
        {label}
        <Typography component={'span'} sx={{ color: 'red' }}>
          *
        </Typography>
      </Typography> */}
      <Box style={{ marginTop: "30px" }}>
        {/* <select
          style={{ marginTop: '5px' }}
          id="afterSelect"
          onChange={(e) => onChange(e.target.value)}
          required
        >
          <option value="">Deposit To A/C</option>
          {options?.map((bankName) => (
            <option
              value={`${bankName?.bankname} ${bankName?.accountname}`}
              key={`${bankName?.bankname}-${bankName?.accountname}`}
            >
              {`${bankName?.bankname} ${bankName?.accountname} (${bankName?.accountnumber})`}
            </option>
          ))}
        </select> */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Deposit To A/C</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label="Deposit To A/C"
            onChange={(e) => onChange(e.target.value)}
          >
            {options?.map((bankName) => (
              <MenuItem
                value={`${bankName?.bankname} ${bankName?.accountname}`}
                key={`${bankName?.bankname}-${bankName?.accountname}`}
              >
                {`${bankName?.bankname} ${bankName?.accountname} (${bankName?.accountnumber})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Grid>
  );
};

export default SelectGrid;
