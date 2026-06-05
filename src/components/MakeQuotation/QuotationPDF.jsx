import React from 'react';
import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import commaNumber from 'comma-number';
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import { ToWords } from 'to-words';
import moment from 'moment';

const QuotationPDF = ({ quotationData, markupPrice, tripType, price }) => {
  const toWords = new ToWords();
  const flight = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '5px',
  };
  const fifty = {
    width: '49%',
    border: '1px solid #1A3A6E',
    borderRadius: '5px',
    padding: '5px',
  };

  const flightFont = {
    fontSize: '10px',
    color: '#222222',
    display: 'block',
    marginBottom: '7px',
  };
  const flightFont1 = {
    fontSize: '8px',
    color: '#222222',
    display: 'block',
    marginBottom: '7px',
  };
  const adress = {
    fontSize: '10px',
    color: '#8b8b8b',
  };

  const users = secureLocalStorage.getItem('user-info');

  const minitConvert = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };
  return (
    <Document>
      <Page size="A4" style={{ padding: '27px 20px' }}>
        <View style={{ padding: '15px' }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  fontSize: '10px',
                  display: 'flex',
                  width: '800px',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                }}
              >
                <Text
                  style={{
                    fontSize: '14px',
                    fontWeight: 400,
                    paddingBottom: '5px',
                    color: '#1A3A6E',
                  }}
                >
                  {users?.company}
                </Text>
                <Text style={adress}>
                  Email: {users?.email},&nbsp;Phone: {users?.phone},&nbsp;
                  Address: {users?.address}
                </Text>
              </View>
            </View>
            {/* <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              {users?.companyLogo === '' ||
              users?.companyLogo === 'undefined' ? null : (
                <Image style={{ height: '50px' }} src={users.logo} />
              )}
            </View> */}
          </View>
          <View>
            {quotationData?.AllLegsInfo?.map((data, i, array) => (
              <View>
                <View style={flight}>
                  <Text style={{ fontSize: '15px' }}>
                    {i === 0 ? 'Departure Flight' : 'Return Flight'}
                  </Text>
                </View>
                <View style={flight}>
                  {data?.Segments?.map((item, index, arr) => (
                    <View style={fifty}>
                      <Text style={array.length > 2 ? flightFont1 : flightFont}>
                        Flight name :&nbsp;{item?.MarketingCarrierName}
                        ,&nbsp;({item.MarketingCarrier}&nbsp;-&nbsp;
                        {item?.MarketingFlightNumber})
                      </Text>
                      <Text style={array.length > 2 ? flightFont1 : flightFont}>
                        Departure : &nbsp;{item?.DepAirPort},&nbsp; (
                        {item?.DepFrom})
                      </Text>
                      <Text style={array.length > 2 ? flightFont1 : flightFont}>
                        Arrival : &nbsp;{item?.ArrAirPort},&nbsp;(
                        {item?.ArrTo})
                      </Text>
                      <Text style={array.length > 2 ? flightFont1 : flightFont}>
                        Depart At : &nbsp;{' '}
                        {moment(item?.DepTime?.split('+')[0]).format(
                          'DD MMM YYYY hh:mm A'
                        )}
                      </Text>
                      <Text style={array.length > 2 ? flightFont1 : flightFont}>
                        Arrive At : &nbsp;
                        {moment(item?.ArrTime?.split('+')[0]).format(
                          'DD MMM YYYY hh:mm A'
                        )}
                      </Text>
                      <Text style={array.length > 2 ? flightFont1 : flightFont}>
                        Duration: &nbsp;{minitConvert(item?.Duration)}
                      </Text>
                      <Text style={array.length > 2 ? flightFont1 : flightFont}>
                        Cabin Bag 7kg,&nbsp;Baggage:&nbsp;
                        {quotationData?.PriceBreakDown[0]?.Bag[0]?.Allowance ||
                          '0 kg'}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
          <View>
            <Text>
              {quotationData?.Refundable === true ? (
                <Text style={{ color: 'green', fontSize: 12 }}>
                  Refundable Fare
                </Text>
              ) : (
                <Text style={{ color: 'red', fontSize: 12 }}>
                  Non Refundable Fare
                </Text>
              )}
            </Text>
          </View>
          {price && (
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '70%',
                  fontSize: '10px',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  margin: '20px 0px',
                  border: '1px solid #1A3A6E',
                  padding: '10px',
                  borderRadius: '6px',
                }}
              >
                <View>
                  <View>
                    <Text style={{ marginBottom: '5px' }}>Base Fare</Text>
                    <Text style={{ marginBottom: '5px' }}>Tax</Text>
                    <Text style={{ color: '#1A3A6E' }}>
                      ---------------------------------------------------------------------------------------
                    </Text>
                    <Text style={{ color: '#1A3A6E' }}>
                      Customer Total Ticket Fare{' '}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={{ marginBottom: '5px' }}>
                    {`PKR ${commaNumber(
                      Number.parseInt(quotationData?.BaseFare) +
                        Math.ceil(markupPrice / 2)
                    ) || ''}`}
                  </Text>
                  <Text style={{ marginBottom: '5px' }}>
                    {`PKR ${commaNumber(
                      Number.parseInt(quotationData?.Taxes) +
                        Math.ceil(markupPrice / 2)
                    )}`}
                  </Text>
                  <Text style={{ color: '#1A3A6E' }}>------------------</Text>
                  <Text style={{ color: '#1A3A6E' }}>
                    {`PKR ${commaNumber(
                      Number.parseInt(quotationData?.NetFare) +
                        Number.parseInt(markupPrice)
                    )}`}
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: '11px',
                    color: '#1A3A6E',
                    padding: '10px 0px',
                  }}
                >
                  In Words:{' '}
                  {toWords.convert(
                    Number.parseInt(quotationData?.NetFare) +
                      Number.parseInt(markupPrice)
                  ) || ''}{' '}
                  Rupees Only
                </Text>
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default QuotationPDF;
