import React, { useEffect, useState } from "react";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import commaNumber from "comma-number";
import moment from "moment";
import TokenDecrypt from "../../../Token/TokenDecrypt";
import getAuthToken from "../../../Token/getAuthToken";
import Address from "../Address/Address";

const PDFPageDesign = ({ copy, check, margin, allData }) => {
  const token = getAuthToken();
  const [isLoading, setIsLoading] = useState(true);
  const [myAccount, setMyAccount] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${import.meta.env.REACT_APP_API_URL}/agent/myaccount`;
        const config = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await fetch(url, config);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Failed to fetch account data: ${
              errorData.message || response.statusText
            }`
          );
        }
        const data = await response.json();
        setMyAccount(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const rootdata = allData?.bookingdata;
  const triptype = allData?.bookingdata?.triptype;

  const allLegsInfo =
    allData?.bookingdata?.itenary?.FlightInfo?.AllLegsInfo ||
    allData?.bookingdata?.itenary?.AllLegsInfo ||
    allData?.bookingdata?.flightdata;
  const pricebrekDown =
    allData?.bookingdata?.itenary?.FlightInfo?.PriceBreakDown ||
    allData?.bookingdata?.itenary?.PriceBreakDown;
  const passengerData = allData?.passengerdata;

  const table = {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#112e55",
    borderWidth: "1px",
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  };
  const tableRow = {
    margin: "auto",
    flexDirection: "row",
  };

  const tableColPrice = {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#112e55",
    borderWidth: "1px",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "2px",
  };
  const tableColBag = {
    width: "33.3%",
    borderStyle: "solid",
    borderColor: "#112e55",
    borderWidth: "1px",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "2px",
  };
  //Passenger Details
  const tableCosurname = {
    width: "35%",
    borderStyle: "solid",
    borderColor: "#112e55",
    borderWidth: "1px",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "2px",
  };
  const tableColGender = {
    width: "20%",
    borderStyle: "solid",
    borderColor: "#112e55",
    borderWidth: "1px",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "2px",
  };
  const tableColType = {
    width: "20%",
    borderStyle: "solid",
    borderColor: "#112e55",
    borderWidth: "1px",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "2px",
  };
  const tableColNumber = {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#112e55",
    borderWidth: "1px",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "2px",
  };

  const tableColfromto = {
    width: "22%",
    borderStyle: "solid",
    borderColor: "#112e55",
    borderWidth: "1px",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "2px",
  };
  const tableColtime = {
    width: "11%",
    borderStyle: "solid",
    borderColor: "#112e55",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "2px",
  };

  const tableColflight = {
    width: "17%",
    borderStyle: "solid",
    borderColor: "#112e55",
    borderWidth: "1px",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "2px",
  };
  const tableCol2 = {
    width: "100%",
    borderStyle: "solid",
    borderColor: "#112e55",
    borderWidth: "1px",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontWeight: "bold",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  };

  const tableCell = {
    // margin: "auto",
    margin: "3px",
    fontSize: "8px",
  };
  const tableCellInfo = {
    margin: "1px 3px",
    fontSize: "8px",
  };

  const adress = {
    fontSize: "10px",
    color: "#8b8b8b",
  };
  const terminal = {
    fontSize: "8px",
  };

  const users = TokenDecrypt();
  // const users = secureLocalStorage.getItem('user-info');
  // const companyLogo = users?.logo;

  return (
    <Document>
      <Page size="A4" style={{ padding: "27px 20px" }}>
        <View style={{ padding: "15px" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: `${margin || 0}`,
            }}
          >
            <View
              style={{
                fontSize: "10px",
                display: "flex",
                width: "200px",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {myAccount?.logo === "" ||
                myAccount?.logo === "undefined" ||
                myAccount?.logo === null ? (
                  <Text
                    style={{
                      fontSize: "14px",
                      fontWeight: 400,
                      paddingBottom: "5px",
                    }}
                  >
                    {users?.company}
                  </Text>
                ) : (
                  <Image
                    src={{
                      uri: myAccount?.logo,
                    }}
                    style={{ width: "120px", maxHeight: "40px" }}
                  />
                )}
              </View>

              <Text style={adress}>{users?.address}</Text>
              <Text style={adress}>Email: {users?.email}</Text>
              <Text style={adress}>Phone: {users?.phone}</Text>
            </View>

            <View
              style={{
                color: "#D3D3D3",
                fontSize: "35px",
                fontWeight: 800,
                fontStyle: "Poppins",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Text
                style={{ color: "#003566", opacity: "0.4", fontWeight: "bold" }}
              >
                {copy}
              </Text>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              fontSize: "11px",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "10px",
            }}
          >
            {/* <Text>Reference: {rootdata?.bookingId || ''}</Text> */}
            <Text>GDS PNR: {allData?.bookingdata?.pnr || ""}</Text>

            {copy === "e - Ticket" ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontSize: "11px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text>
                  {rootdata?.ticketed_at
                    ? `Ticketed: ${format(
                        new Date(rootdata?.ticketed_at),
                        "dd MMM yyyy"
                      )}`
                    : ""}
                </Text>
                <Text style={{ marginLeft: "15px" }}>
                  Airlines PNR: {allData?.bookingdata?.airlinespnr || ""}
                </Text>
              </View>
            ) : (
              <Text>
                Booking: {moment(rootdata?.created_at).format("YYYY MMM DD")}
                {", "}
                {rootdata?.created_at?.split("T")[1]?.slice(0, 5)}
              </Text>
            )}
          </View>
          {/* <View>
            <Image
              src={{
                uri: 'https://b2b-etripzone.sgp1.digitaloceanspaces.com/B2B/EZA1001/companylogo.png',
                method: 'GET',

                headers: {
                  'Cache-Control': 'no-cache',
                  allowOrigin: '*',
                },
              }}
              style={{ width: '20px', maxHeight: '40px' }}
            />
          </View> */}
          <View>
            <Text
              style={{
                marginTop: "10px",
                fontSize: "10px",
                color: "#FFFFFF",
                padding: "5px 10px",
                backgroundColor: "#112e55",
              }}
            >
              Passenger Details
            </Text>
            <View style={table}>
              <View style={{ margin: "auto", flexDirection: "row" }}>
                <View style={tableCosurname}>
                  <Text style={tableCell}>Passenger Name </Text>
                </View>
                <View style={tableColGender}>
                  <Text style={tableCell}>Gender</Text>
                </View>
                <View style={tableColType}>
                  <Text style={tableCell}>Passenger Type</Text>
                </View>
                <View style={tableColNumber}>
                  <Text style={tableCell}>
                    {copy === "e - Ticket"
                      ? "Ticket Number"
                      : "Passport Number"}
                  </Text>
                </View>
              </View>
              {/* passenger Data */}
              <View>
                {passengerData?.map((data, index) => (
                  <View style={tableRow} key={index}>
                    <View style={tableCosurname}>
                      <Text style={tableCell}>
                        <Text>
                          {data?.prefix} {data?.givenname} {data?.surname}
                        </Text>
                      </Text>
                    </View>
                    <View style={tableColGender}>
                      <Text style={tableCell}>
                        {data?.gender?.split("_")[1] || data?.gender}
                      </Text>
                    </View>
                    <View style={tableColType}>
                      <Text style={tableCell}> {data?.type}</Text>
                    </View>
                    <View style={tableColNumber}>
                      <Text style={tableCell}>
                        {allData?.bookingdata?.status === "Ticketed"
                          ? allData?.ticketdetails[index]?.ticketnumber
                          : data?.document || "Domestic"}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View>
            <Text
              style={{
                marginTop: "10px",
                fontSize: "10px",
                color: "#FFFFFF",
                padding: "5px 10px",
                backgroundColor: "#112e55",
              }}
            >
              Flight Information
            </Text>
            <View style={table}>
              <View style={{ margin: "auto", flexDirection: "row" }}>
                <View style={tableColflight}>
                  <Text style={tableCell}>Flight </Text>
                </View>
                <View style={tableColfromto}>
                  <Text style={tableCell}>Departure From</Text>
                </View>
                <View style={tableColfromto}>
                  <Text style={tableCell}>Arrival To</Text>
                </View>
                <View style={tableColtime}>
                  <Text style={tableCell}>Depart At</Text>
                </View>
                <View style={tableColtime}>
                  <Text style={tableCell}>Arrive At</Text>
                </View>
                <View style={tableColflight}>
                  <Text style={tableCell}>Info</Text>
                </View>
              </View>
              {allLegsInfo?.map((data, index) => {
                return (
                  <>
                    {allLegsInfo === allData?.bookingdata?.flightdata ? (
                      <View style={tableRow} key={index}>
                        <View style={tableColflight}>
                          <Text style={tableCell}>
                            {" "}
                            {data?.airlineName} {data?.airlineCode}-
                            {data?.flightNumber}
                          </Text>
                        </View>
                        <View style={tableColfromto}>
                          <Text style={tableCell}>
                            ({data.fromAirportCode}){" "}
                            <Address code={data.fromAirportCode} />
                          </Text>
                          <Text style={terminal}>
                            {data?.departureGate
                              ? `Terminal: ${
                                  data?.departureGate ||
                                  data?.departureTerminalName ||
                                  null
                                }`
                              : null}
                          </Text>
                        </View>
                        <View style={tableColfromto}>
                          <Text style={tableCell}>
                            ({data.toAirportCode}){" "}
                            <Address code={data.toAirportCode} />
                          </Text>
                          <Text style={terminal}>
                            {data?.arrivalGate
                              ? `Terminal: ${
                                  data?.arrivalGate ||
                                  data?.arrivalTerminalName ||
                                  null
                                }`
                              : null}
                          </Text>
                        </View>
                        <View style={tableColtime}>
                          <Text style={tableCell}>{data?.departureDate}</Text>
                        </View>
                        <View style={tableColtime}>
                          <Text style={tableCell}>{data?.arrivalDate}</Text>
                        </View>
                        <View style={tableColflight}>
                          <Text style={tableCellInfo}>
                            {data?.cabinTypeName?.toUpperCase()}-
                            {data?.bookingClass}
                          </Text>
                          <Text style={tableCell}>
                            {data?.aircraftTypeName && (
                              data.aircraftTypeName.toUpperCase().includes("BOEING") || data.aircraftTypeName.toUpperCase().includes("AIRBUS")
                                ? data.aircraftTypeName
                                : data.aircraftTypeName.charAt(0) === "7"
                                ? `Boeing ${data.aircraftTypeName}`
                                : ["A3", "A2", "22", "32", "33", "34", "35", "38"].includes(data.aircraftTypeName.slice(0, 2))
                                ? `Airbus ${data.aircraftTypeName}`
                                : data.aircraftTypeName
                            )}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      data?.Segments?.map((seg) => (
                        <View style={tableRow} key={index}>
                          <View style={tableColflight}>
                            <Text style={tableCell}>
                              {seg?.MarketingCarrierName}
                            </Text>
                            <Text
                              style={tableCell}
                              // style={{
                              //   fontSize: 8,
                              // }}
                            >
                              {seg?.MarketingCarrier}-
                              {seg?.MarketingFlightNumber}
                            </Text>
                          </View>
                          <View style={tableColfromto}>
                            <Text style={tableCell}>
                              {seg?.DepAirPort}({seg?.DepFrom})
                            </Text>
                            <Text style={terminal}>
                              {seg?.departureGate
                                ? `Terminal: ${seg?.departureGate || ""}`
                                : null}
                            </Text>
                          </View>
                          <View style={tableColfromto}>
                            <Text style={tableCell}>
                              {seg?.ArrAirPort}({seg?.ArrTo})
                            </Text>
                            <Text style={terminal}>
                              {seg?.arrivalGate
                                ? `Terminal: ${seg?.arrivalGate || ""}`
                                : null}
                            </Text>
                          </View>
                          <View style={tableColtime}>
                            <Text style={tableCell}>
                              {format(
                                new Date(seg?.DepTime?.split("+")[0]),
                                "dd MMM yyyy"
                              )}
                              {", "}
                              {seg?.DepTime?.slice(11, 16)}
                            </Text>
                          </View>
                          <View style={tableColtime}>
                            <Text style={tableCell}>
                              {format(
                                new Date(seg?.ArrTime?.split("+")[0]),
                                "dd MMM yyyy"
                              )}
                              {", "}
                              {seg?.ArrTime?.slice(11, 16)}
                            </Text>
                          </View>
                          <View style={tableColflight}>
                            <Text style={tableCellInfo}>
                              {seg?.SegmentCode?.cabinCode === "S"
                                ? "Premium Economy"
                                : seg?.SegmentCode?.cabinCode === "C"
                                ? "Business"
                                : seg?.SegmentCode?.cabinCode === "J"
                                ? "Premium Business"
                                : seg?.SegmentCode?.cabinCode === "P"
                                ? "First Class"
                                : "Economy"}
                              -{seg?.SegmentCode?.bookingCode}
                            </Text>
                            <Text
                              style={{
                                fontSize: 8,
                              }}
                            >
                              {seg?.aircraftTypeName && (
                                seg.aircraftTypeName.toUpperCase().includes("BOEING") || seg.aircraftTypeName.toUpperCase().includes("AIRBUS")
                                  ? seg.aircraftTypeName
                                  : seg.aircraftTypeName.charAt(0) === "7"
                                  ? `Boeing ${seg.aircraftTypeName}`
                                  : ["A3", "A2", "22", "32", "33", "34", "35", "38"].includes(seg.aircraftTypeName.slice(0, 2))
                                  ? `Airbus ${seg.aircraftTypeName}`
                                  : seg.aircraftTypeName
                              )}
                            </Text>
                          </View>
                        </View>
                      ))
                    )}
                  </>
                );
              })}
            </View>
          </View>
          <View>
            <Text
              style={{
                marginTop: "10px",
                fontSize: "10px",
                color: "#FFFFFF",
                padding: "5px 10px",
                backgroundColor: "#112e55",
              }}
            >
              Departure Baggage Info
            </Text>
            <View style={table}>
              <View style={{ margin: "auto", flexDirection: "row" }}>
                <View style={tableColBag}>
                  <Text style={tableCell}>Pax Type</Text>
                </View>
                <View style={tableColBag}>
                  <Text style={tableCell}>Check-In Baggage </Text>
                </View>
                <View style={tableColBag}>
                  <Text style={tableCell}>Cabin Baggage</Text>
                </View>
              </View>
              {pricebrekDown?.map((data, index) => (
                <View style={tableRow}>
                  <View style={tableColBag}>
                    <Text style={tableCell}>
                      {data?.PaxType === "ADT"
                        ? "Adult"
                        : data?.PaxType === "INF"
                        ? "Infant"
                        : "Child"}
                      {" X "}
                      {data?.PaxCount || 1}
                    </Text>
                  </View>
                  <View style={tableColBag}>
                    <Text style={tableCell}>
                      {data?.Bag?.[0]?.Allowance || "0KG"}
                    </Text>
                  </View>
                  <View style={tableColBag}>
                    <Text style={tableCell}>7KG</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          {triptype === "Return" && (
            <View>
              <Text
                style={{
                  marginTop: "10px",
                  fontSize: "10px",
                  color: "#FFFFFF",
                  padding: "5px 10px",
                  backgroundColor: "#112e55",
                }}
              >
                Return Baggage Info
              </Text>
              <View style={table}>
                <View style={{ margin: "auto", flexDirection: "row" }}>
                  <View style={tableColBag}>
                    <Text style={tableCell}>Pax Type</Text>
                  </View>
                  <View style={tableColBag}>
                    <Text style={tableCell}>Check-In Baggage </Text>
                  </View>
                  <View style={tableColBag}>
                    <Text style={tableCell}>Cabin Baggage</Text>
                  </View>
                </View>
                {pricebrekDown?.map((data, index) => (
                  <View style={tableRow}>
                    <View style={tableColBag}>
                      <Text style={tableCell}>
                        {data?.PaxType === "ADT"
                          ? "Adult"
                          : data?.PaxType === "INF"
                          ? "Infant"
                          : "Child"}
                        {" X "}
                        {data?.PaxCount || 1}
                      </Text>
                    </View>
                    <View style={tableColBag}>
                      <Text style={tableCell}>
                        {data?.Bag?.[1]?.Allowance || "0KG"}
                        {/* {data?.Bag[0]?.Allowance?.pieceCount === undefined
                          ? `${data?.Bag[1]?.Allowance?.weight} Kg`
                          : `${data?.Bag[1]?.Allowance?.pieceCount} Piece`} */}
                      </Text>
                    </View>
                    <View style={tableColBag}>
                      <Text style={tableCell}>7KG</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
          {check === "1" ? (
            <View>
              <View>
                <Text
                  style={{
                    marginTop: "10px",
                    fontSize: "10px",
                    color: "#FFFFFF",
                    padding: "5px 10px",
                    backgroundColor: "#112e55",
                  }}
                >
                  Price Breakdown
                </Text>
                <View style={table}>
                  <View style={{ margin: "auto", flexDirection: "row" }}>
                    <View style={tableColPrice}>
                      <Text style={tableCell}>Passenger</Text>
                    </View>
                    <View style={tableColPrice}>
                      <Text style={tableCell}>Base Fare</Text>
                    </View>
                    <View style={tableColPrice}>
                      <Text style={tableCell}>Tax</Text>
                    </View>
                    <View style={tableColPrice}>
                      <Text style={tableCell}>Sub Total</Text>
                    </View>
                  </View>
                  {pricebrekDown?.map((data, index) => (
                    <View style={tableRow}>
                      <View style={tableColPrice}>
                        <Text style={tableCell}>
                          {data?.PaxType === "ADT"
                            ? "Adult"
                            : data?.PaxType === "INF"
                            ? "Infant"
                            : "Child"}
                          {" X "}
                          {data?.PaxCount || 1}
                        </Text>
                      </View>
                      <View style={tableColPrice}>
                        <Text style={tableCell}>
                          {parseInt(data?.BaseFare) *
                            parseInt(data?.PaxCount || 1)}{" "}
                          PKR
                        </Text>
                      </View>
                      <View style={tableColPrice}>
                        <Text style={tableCell}>
                          {parseInt(data?.Taxes) *
                            parseInt(data?.PaxCount || 1)}{" "}
                          PKR
                        </Text>
                      </View>
                      <View style={tableColPrice}>
                        <Text style={tableCell}>
                          {parseInt(data?.TotalFare) *
                            parseInt(data?.PaxCount || 1)}{" "}
                          PKR
                        </Text>
                      </View>
                    </View>
                  ))}

                  <View style={tableRow}>
                    <View style={tableCol2}>
                      <Text
                        style={{
                          fontSize: "10px",
                          fontWeight: "bold",
                          margin: "3px",
                        }}
                      >
                        Grand Total:{" "}
                        {commaNumber(
                          allData?.bookingdata?.itenary?.GrossFare?.toFixed(
                            2
                          ) || rootdata?.netfare
                        )}{" "}
                        PKR
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "70%",
                  fontSize: "10px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "20px 0px",
                  border: "1px solid #112e55",
                  padding: "10px",
                }}
              >
                <View>
                  {/* <Text style={{ marginBottom: '5px' }}>
                    Base fare total amount
                  </Text>
                  <Text style={{ marginBottom: '5px' }}>Tax</Text>
                  {copy === 'Agent Invoice' ? (
                    <View>
                      <Text style={{ marginBottom: '5px' }}>Discount</Text>
                      <Text>
                        ---------------------------------------------------------------------------------
                      </Text>
                      <Text>Agent Total Ticket Fare Amount</Text>
                    </View>
                  ) : (
                    <View>
                      <Text>
                        ---------------------------------------------------------------------------------
                      </Text>
                      <Text>Customer Total Ticket Fare Amount</Text>
                    </View>
                  )} */}
                  <Text style={{ marginBottom: "5px" }}>Total Ticket Fare</Text>
                </View>
                <View>
                  <Text style={{ marginBottom: "5px" }}>
                    {commaNumber(
                      allData?.bookingdata?.itenary?.GrossFare?.toFixed(2) ||
                        rootdata?.netfare
                    )}{" "}
                    PKR
                  </Text>
                  {/* <Text style={{ marginBottom: '5px' }}>
                    {commaNumber(
                      allData?.sabredata?.payments?.flightTotals[0]?.taxes
                    )}{' '}
                    PKR
                  </Text>
                  <Text style={{ marginBottom: '5px' }}>
                    {commaNumber(
                      allData?.sabredata?.payments?.flightTotals[0]?.total
                    )}{' '}
                    PKR
                  </Text> */}
                </View>
              </View>
            </View>
          ) : (
            ""
          )}
          <View>
            <Text style={{ fontSize: "10px", marginTop: "10px" }}>
              Please carry a government-issued identification "like a passport
              or National Identification Card (for domestic travel only)" for
              check-in. Please report at check-in/boarding counter before the
              airline's standard time for avoiding No-Show.
            </Text>
            <Text style={{ fontSize: "10px", marginTop: "10px" }}>
              For ticket change/refund, please leave your query at{" "}
              {users?.email} To make your journey smoother, please carry a
              permissive dimension of baggage & check the flight status by using
              the manage booking option from the concerned airline's website.
              Baggage and other services provided by the airline are subject to
              conditions of the airline, which are hereby incorporated by
              reference. These conditions may be obtained from the issuing
              airlines's website or call centre
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFPageDesign;
