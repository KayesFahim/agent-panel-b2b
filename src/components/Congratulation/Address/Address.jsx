import flightData from '../../flightData';

const Address = ({ code }) => {
  const flightName = flightData;
  let address;
  {
    flightName?.map((item) => {
      if (item?.code === code?.replace(/ /g, '')) {
        address = item?.name;
      }
    });
  }
  return address;
};

export default Address;
