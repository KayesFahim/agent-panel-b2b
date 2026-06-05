import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// eslint-disable-next-line react/prop-types
const CustomSearchInput = ({ name, placeholder, onChange, width, value }) => {
  return (
    <Box
      sx={{
        input: {
          border: '1px solid var(--bgcolor)',
          outline: 'none',
          p: '8px 8px 8px 40px',
          fontSize: 14,
          borderRadius: '5px',
          width: width || { xs: '160px', sm: '160px', md: '200px' },
        },
        position: 'relative',
      }}
      className="custom-input"
    >
      <SearchIcon
        sx={{
          position: 'absolute',
          top: '30%',
          left: '5%',
        }}
      />
      <input
        type="text"
        name={name}
        id={name}
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </Box>
  );
};
export default CustomSearchInput;
