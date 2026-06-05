/* eslint-disable react/prop-types */
import { Box } from '@mui/material';

const FilterSelect = ({ data, value, handleChange }) => {
  return (
    <Box className="custom-input custom-select">
      <select
        required
        name="status"
        value={value}
        onChange={(e) => handleChange(e)}
        placeholder={'All'}
      >
        <option value={''}>{'All'}</option>

        {data.map((status, i) => (
          <option key={i} value={status?.value}>
            {status?.bankName
              ? `${status.bankName} ${status.accNumber}`
              : status.name}
          </option>
        ))}
      </select>
    </Box>
  );
};

export default FilterSelect;
