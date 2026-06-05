import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Tooltip,
} from '@mui/material';

const AirlineCheckBox = ({ setfilteredData, data, setPageCount }) => {
  const [checkedItems, setCheckedItems] = useState({});
// 
  const uniqueAirlineNames = Array.from(
    new Map(
      data.map(item => [
        item['Carrier'],
        {
          CarrierName: item['CarrierName'],
          Carrier: item['Carrier'],
          clientPrice: item['NetFare'],
          isActive: false,
        },
      ])
    ).values()
  );

  const airlineDuplicateCount = uniqueAirlineNames.reduce((acc, curr) => {
    const str = JSON.stringify(curr.Carrier);
    acc[str] = (acc[str] || 0) + 1;
    return acc;
  }, {});

  uniqueAirlineNames.forEach(item => {
    item.count = airlineDuplicateCount[JSON.stringify(item.Carrier)];
  });

  const handleCheckBox = carrierName => {
    const event = window.event;
    const updatedCheckedItems = {
      ...checkedItems,
      [event.target.name]: event.target.checked,
    };

    setCheckedItems(updatedCheckedItems);

    const selectedNames = Object.keys(updatedCheckedItems).filter(
      name => updatedCheckedItems[name]
    );

    const filter =
      selectedNames.length > 0
        ? data.filter(item => selectedNames.includes(item.CarrierName))
        : data;

    setfilteredData(filter);
    setPageCount(Math.ceil(filter.length / 30));
  };

  return (
    <Box>
      {uniqueAirlineNames
        .sort((a, b) => a.NetFare - b.NetFare)
        .map((item, index) => (
          <AirlineCheckboxItem
            key={index}
            item={item}
            checked={checkedItems[item.CarrierName]}
            handleCheckBox={handleCheckBox}
          />
        ))}
    </Box>
  );
};

const AirlineCheckboxItem = ({ item, checked, handleCheckBox }) => (
  <Box width="100%">
    <Tooltip title={item.CarrierName}>
      <FormGroup className="check-box-text09">
        <FormControlLabel
          control={<Checkbox className="box-0" />}
          label={item.CarrierName}
          name={item.CarrierName}
          checked={checked}
          onChange={() => handleCheckBox(item.CarrierName)}
        />
      </FormGroup>
    </Tooltip>
  </Box>
);

export default AirlineCheckBox;
