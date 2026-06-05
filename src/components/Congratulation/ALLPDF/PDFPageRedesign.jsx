import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import commaNumber from "comma-number";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";
import moment from "moment";
import Address from "../Address/Address";
import DurationConverterPdf from "./DurationConverterPdf";
import getAuthToken from "../../../Token/getAuthToken";
import TokenDecrypt from "../../../Token/TokenDecrypt";
import { all } from "axios";

const PDFPageRedesign = ({ copy, check, margin, allData }) => {
  const token = getAuthToken();
  const rootdata = allData?.bookingdata;
  const triptype = allData?.bookingdata?.triptype;
  // const flightData =
  //   allData?.bookingdata?.itenary?.FlightInfo?.AllLegsInfo ||
  //   allData?.bookingdata?.itenary?.AllLegsInfo;

  const [isLoading, setIsLoading] = useState(true);
  const [myAccount, setMyAccount] = useState(null);
  // 
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

  const allLegsInfo =
    allData?.bookingdata?.itenary?.FlightInfo?.AllLegsInfo ||
    allData?.bookingdata?.itenary?.AllLegsInfo ||
    allData?.bookingdata?.flightdata;
  const flightData =
    allData?.bookingdata?.itenary?.FlightInfo?.AllLegsInfo ||
    allData?.bookingdata?.itenary?.AllLegsInfo;
  const pricebrekDown =
    allData?.bookingdata?.itenary?.FlightInfo?.PriceBreakDown ||
    allData?.bookingdata?.itenary?.PriceBreakDown;
  const passengerData = allData?.passengerdata;
  // 
  // 
  const transitCalculation = (date1, date2) => {
    const duration = moment.duration(moment(date1).diff(moment(date2)));

    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes()) - hours * 60;
    const transit = `${Math.abs(hours)}h:${Math.abs(minutes)}min`;
    return transit;
  };
  const table = {
    display: "table",
    width: "auto",
    borderStyle: "solid ",
    borderWidth: "1px",
    borderColor: "#8E95AB",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  };
  const tableRow = {
    margin: "auto",
    flexDirection: "row",
    break: false,
  };

  const tableColBag = {
    width: "33.3%",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#8E95AB",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "1px",
  };
  //Passenger Details
  const tableCosurname = {
    width: "35%",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#8E95AB",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "1px",
  };
  const tableColGender = {
    width: "20%",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#8E95AB",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "1px",
  };
  const tableColType = {
    width: "20%",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#8E95AB",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "1px",
  };
  const tableColNumber = {
    width: "25%",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#8E95AB",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "1px",
  };

  const tableCell = {
    borderColor: "#8E95AB",
    // margin: "auto",
    margin: "1px",
    fontSize: "8px",
  };

  const DepartureTime = {
    marginVertical: 2,
    fontSize: "8px",
    fontWeight: "bold",
  };
  const DepartureDate = {
    marginVertical: 2,
    fontSize: "10px",
    fontWeight: "bold",
  };
  const users = TokenDecrypt();
  // 
  // 

  const styles = StyleSheet.create({
    container: {
      padding: 4,
      // backgroundColor: "#f0f0f0",
      borderBottomLeftRadius: 2,
      borderBottomRightRadius: 2,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#333",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 1,
    },
    label: {
      fontSize: 8,
      color: "#555",
    },
    value: {
      fontSize: 8,
      fontWeight: "bold",
      color: "#333",
    },
    totalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 1,
      paddingTop: 1,
      borderTopWidth: 1,
      borderTopColor: "#ccc",
    },
    totalLabel: {
      fontSize: 9,
      fontWeight: "bold",
      color: "#333",
    },
    totalValue: {
      fontSize: 9,
      fontWeight: "bold",
    },
    noBreak: {
      breakInside: "avoid",
    },
  });
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
                {myAccount?.logo ? (
                  <Image
                    src={myAccount.logo}
                    style={{ width: "120px", maxHeight: "40px" }}
                    alt={users?.company || "Company logo"}
                  />
                ) : (
                  <Text
                    style={{
                      color: "#272323",
                      fontSize: "14.4px",
                      fontWeight: "500",
                    }}
                  >
                    {users?.company || ""}
                  </Text>
                )}
              </View>

              <Text
                style={{
                  fontSize: "10px",
                  color: "#8b8b8b",
                  marginTop: "10px",
                }}
              >
                {myAccount?.address}
              </Text>
              <Text
                style={{
                  fontSize: "10px",
                  color: "#8b8b8b",
                  marginTop: "5px",
                }}
              >
                <Text
                  style={{
                    color: "#000000",
                  }}
                >
                  Email:
                </Text>{" "}
                {users?.email}
              </Text>
              <Text
                style={{
                  fontSize: "10px",
                  color: "#8b8b8b",
                  marginTop: "5px",
                }}
              >
                <Text
                  style={{
                    color: "#000000",
                  }}
                >
                  Phone:
                </Text>{" "}
                {users?.phone}
              </Text>
            </View>

            <View
              style={{
                color: "#D3D3D3",
                fontSize: "35px",
                fontWeight: 800,
                fontStyle: "Poppins",
                display: "flex",

                justifyContent: "flex-end",
              }}
            >
              <Text
                style={{
                  color: "#333333",
                  // opacity: "0.4",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                {copy} #{allData?.bookingdata?.bookingId}
              </Text>
              {copy === "e - Ticket" ? (
                <>
                  <Text
                    style={{
                      fontSize: "10px",
                      color: "#8b8b8b",
                      marginTop: "5px",
                      textAlign: "right",
                    }}
                  >
                    <Text
                      style={{
                        color: "#000000",
                      }}
                    >
                      PNR:
                    </Text>{" "}
                    {allData?.bookingdata?.pnr || ""}
                  </Text>
                  <Text
                    style={{
                      fontSize: "10px",
                      color: "#8b8b8b",
                      marginTop: "5px",
                      textAlign: "right",
                    }}
                  >
                    <Text
                      style={{
                        color: "#000000",
                      }}
                    >
                      Airlines PNR:
                    </Text>{" "}
                    {rootdata?.airlinespnr || ""}
                  </Text>
                  <Text
                    style={{
                      fontSize: "10px",
                      color: "#8b8b8b",
                      marginTop: "5px",
                      textAlign: "right",
                    }}
                  >
                    <Text
                      style={{
                        color: "#000000",
                      }}
                    >
                      Booking Date:
                    </Text>
                    {rootdata?.ticketed_at
                      ? ` ${format(
                          new Date(rootdata?.ticketed_at),
                          "dd MMM yyyy"
                        )}`
                      : ""}
                  </Text>
                </>
              ) : (
                <Text
                  style={{
                    fontSize: "10px",
                    color: "#8b8b8b",
                    marginTop: "5px",
                    textAlign: "right",
                  }}
                >
                  <Text
                    style={{
                      color: "#000000",
                    }}
                  >
                    Booking Date:{" "}
                  </Text>

                  {moment(rootdata?.created_at).format("YYYY-MMM-DD HH:mm")}
                </Text>
              )}
            </View>
          </View>

          {/* Passenger Details */}
          <View style={{ marginTop: "5px" }}>
            <Text
              style={{
                fontSize: "10px",
                color: "#003566",
                padding: "5px 0px",
              }}
            >
              Passenger Details
            </Text>
            <View style={table}>
              {/* Table Header */}
              <View style={tableRow}>
                <View
                  style={{
                    ...tableCosurname,
                    width: copy === "e - Ticket" ? "25%" : "33.33%", // Dynamically adjust width
                  }}
                >
                  <Text style={tableCell}>Passenger Name</Text>
                </View>
                <View
                  style={{
                    ...tableColGender,
                    width: copy === "e - Ticket" ? "25%" : "33.33%", // Dynamically adjust width
                  }}
                >
                  <Text style={tableCell}>Gender ( Passenger Type )</Text>
                </View>
                <View
                  style={{
                    ...tableColType,
                    width: copy === "e - Ticket" ? "25%" : "33.33%", // Dynamically adjust width
                  }}
                >
                  <Text style={tableCell}>Passport Number</Text>
                </View>
                {copy === "e - Ticket" &&
                ![
                  "Issue In Process",
                  "Hold",
                  "Cancelled",
                  "Issue Request Rejected",
                ].includes(allData?.bookingdata?.status) ? (
                  <View
                    style={{
                      ...tableColNumber,
                      width: copy === "e - Ticket" ? "25%" : "0%", // Dynamically adjust width
                    }}
                  >
                    <Text style={tableCell}>Ticket Number</Text>
                  </View>
                ) : null}
              </View>

              {/* Passenger Data Rows */}
              {passengerData?.map((data, index) => (
                <View style={tableRow} key={index}>
                  <View
                    style={{
                      ...tableCosurname,
                      width: copy === "e - Ticket" ? "25%" : "33.33%", // Dynamically adjust width
                    }}
                  >
                    <Text style={tableCell}>
                      {data?.prefix} {data?.givenname} {data?.surname}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...tableColGender,
                      width: copy === "e - Ticket" ? "25%" : "33.33%", // Dynamically adjust width
                    }}
                  >
                    <Text style={tableCell}>
                      {data?.gender?.split("_")[1] || data?.gender} (
                      {(data?.type === "ADT" && "Adult") ||
                        (data?.type === "CNN" && "Children") ||
                        (data?.type === "C09" && "Children") ||
                        (data?.type === "INF" && "Infant")}
                      )
                    </Text>
                  </View>
                  <View
                    style={{
                      ...tableColType,
                      width: copy === "e - Ticket" ? "25%" : "33.33%", // Dynamically adjust width
                    }}
                  >
                    <Text style={tableCell}>
                      {data?.document || "Domestic"}
                    </Text>
                  </View>
                  {copy === "e - Ticket" &&
                  ![
                    "Issue In Process",
                    "Hold",
                    "Cancelled",
                    "Issue Request Rejected",
                  ].includes(allData?.bookingdata?.status) ? (
                    <View
                      style={{
                        ...tableColNumber,
                        width: "25%", // Assuming you want to display when conditions are met
                      }}
                    >
                      <Text style={tableCell}>
                        {allData?.ticketdetails[index]?.ticketnumber}
                      </Text>
                    </View>
                  ) : null}
                </View>
              ))}
            </View>
          </View>
          {/*Flight Information */}
          <View>
            <Text
              style={{
                marginTop: "5px",
                fontSize: "10px",
                color: "#003566",
                padding: "5px 0px",
              }}
            >
              Flight Information
            </Text>

            {/* Data Headings */}
            <View
              style={{
                padding: "5px",
                flexDirection: "row",
                backgroundColor: "#D3D3D3", // Light gray background for the header row
                borderRadius: 2,
              }}
            >
              <Text
                style={{
                  flexBasis: "25%",
                  fontSize: "10px",
                  color: "#112e55",
                  fontWeight: "bold",
                }}
              >
                Airlines
              </Text>
              <Text
                style={{
                  flexBasis: "30%",
                  fontSize: "10px",
                  color: "#112e55",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                Departure
              </Text>
              <Text
                style={{
                  flexBasis: "15%",
                  fontSize: "10px",
                  color: "#112e55",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Duration
              </Text>
              <Text
                style={{
                  flexBasis: "30%",
                  fontSize: "10px",
                  color: "#112e55",
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                Arrival
              </Text>
            </View>

            {allLegsInfo?.map((data, index, arr) => {
              // Console log the data here
              // 
              const currentArrival = new Date(data.arrivalDate);
              const nextDeparture =
                index < arr.length - 1
                  ? new Date(arr[index + 1].departureTime)
                  : null;
              let layoverTime = null;

              if (nextDeparture) {
                const layoverDuration = nextDeparture - currentArrival;
                const hours = Math.floor(layoverDuration / (1000 * 60 * 60));
                const minutes = Math.floor(
                  (layoverDuration % (1000 * 60 * 60)) / (1000 * 60)
                );
                layoverTime = `${hours}h ${minutes}m`;
              }

              return (
                <View
                  key={index}
                  style={{
                    padding: 1,
                  }}
                >
                  {index === 1 && (
                    <>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: "-2px",
                          marginBottom: "4px",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          {Array(20) // Number of dashes, adjust as needed
                            .fill(0)
                            .map((_, index) => (
                              <View
                                key={index}
                                style={{
                                  width: 8, // Length of the dash
                                  height: 1.5, // Thickness of the dash
                                  backgroundColor: "#767676", // Dash color
                                  marginRight: 5, // Space between dashes
                                  opacity: 0.5, // Adjust opacity as needed
                                }}
                              />
                            ))}
                        </View>
                        <Text
                          style={{
                            marginHorizontal: 10,
                            fontSize: "10px",
                            color: "#003566",
                          }}
                        >
                          Return
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          {Array(20)
                            .fill(0)
                            .map((_, index) => (
                              <View
                                key={index}
                                style={{
                                  width: 8, // Length of the dash
                                  height: 1.5, // Thickness of the dash
                                  backgroundColor: "#767676",
                                  marginRight: 5, // Space between dashes
                                  opacity: 0.5,
                                }}
                              />
                            ))}
                        </View>
                      </View>

                      {/* Data Headings */}
                      <View
                        style={{
                          padding: "5px 5px",
                          flexDirection: "row",
                          backgroundColor: "#D3D3D3", // Light gray background for the header row
                          borderRadius: 2,
                        }}
                      >
                        <Text
                          style={{
                            flexBasis: "25%",
                            fontSize: "10px",
                            color: "#112e55",
                            fontWeight: "bold",
                          }}
                        >
                          Airlines
                        </Text>
                        <Text
                          style={{
                            flexBasis: "30%",
                            fontSize: "10px",
                            color: "#112e55",
                            fontWeight: "bold",
                            textAlign: "left",
                          }}
                        >
                          Departure
                        </Text>
                        <Text
                          style={{
                            flexBasis: "15%",
                            fontSize: "10px",
                            color: "#112e55",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          Duration
                        </Text>
                        <Text
                          style={{
                            flexBasis: "30%",
                            fontSize: "10px",
                            color: "#112e55",
                            fontWeight: "bold",
                            textAlign: "right",
                          }}
                        >
                          Arrival
                        </Text>
                      </View>
                    </>
                  )}

                  {allLegsInfo === allData?.bookingdata?.flightdata ? (
                    <>
                      <View
                        style={{
                          padding: "0px 5px",
                          borderRadius: 2,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        {/* Flight details for direct flight */}
                        <View
                          style={{
                            alignItems: "",
                            marginRight: 2,
                            flexBasis: "25%",
                          }}
                        >
                          <Image
                            style={{
                              width: 20,
                              height: 20,
                              marginRight: 5,
                              marginBottom: 2,
                            }}
                            src={`https://b2b-etripzone.sgp1.cdn.digitaloceanspaces.com/Logo/Airlines-Image/${data?.airlineCode}.png`}
                          />
                          <Text
                            style={{
                              fontSize: "8px",
                              color: "#112e55",
                            }}
                          >
                            {data?.airlineName}
                          </Text>
                          <Text style={{ marginVertical: 2, fontSize: "8px" }}>
                            {data?.airlineCode}-{data?.flightNumber}||
                            {data?.cabinTypeName?.toUpperCase()}-
                            {data?.bookingClass}
                          </Text>
                          {/* {layoverTime ? (
                            <Text
                              style={{
                                marginVertical: 2,
                                fontSize: "10px",
                                fontWeight: "bold",
                              }}
                            >
                              Layover: {layoverTime}
                            </Text>
                          ) : (
                            ""
                          )} */}
                        </View>

                        {/* From Airport */}
                        <View
                          style={{
                            alignItems: "left",
                            marginRight: 2,
                            flexBasis: "30%",
                          }}
                        >
                          <Text style={{ marginVertical: 2, fontSize: "8px" }}>
                            <Address code={data.fromAirportCode} />
                          </Text>

                          <Text
                            style={{
                              marginVertical: 2,
                              fontSize: "8px",
                              color: "#112e55",
                            }}
                          >
                            {data.fromAirportCode}
                          </Text>
                          <Text style={DepartureDate}>
                            {data?.departureDate} {data?.departureTime}
                          </Text>
                          <Text style={DepartureTime}>
                            {data?.departureGate
                              ? `Terminal: ${
                                  data?.departureGate ||
                                  data?.departureTerminalName ||
                                  null
                                }`
                              : null}
                          </Text>
                        </View>

                        {/* Duration */}
                        <View
                          style={{
                            alignItems: "center",
                            marginRight: 2,
                            flexBasis: "15%",
                            margin: "4px",
                            boxShadow: "40px",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 8,
                            }}
                          >
                            <DurationConverterPdf
                              duration={data.durationInMinutes}
                            />
                          </Text>
                        </View>

                        {/* To Airport */}
                        <View
                          style={{
                            textAlign: "right",
                            marginRight: 2,
                            flexBasis: "30%",
                          }}
                        >
                          <Text style={{ marginVertical: 2, fontSize: "8px" }}>
                            <Address code={data.toAirportCode} />
                          </Text>
                          <Text
                            style={{
                              marginVertical: 2,
                              fontSize: "8px",
                              color: "#112e55",
                            }}
                          >
                            {data.toAirportCode}
                          </Text>
                          <Text style={DepartureDate}>{data?.arrivalDate}</Text>
                          <Text style={DepartureTime}>
                            {data?.arrivalGate
                              ? `Terminal: ${
                                  data?.arrivalGate ||
                                  data?.arrivalTerminalName ||
                                  null
                                }`
                              : null}
                          </Text>
                        </View>
                      </View>
                      {layoverTime ? (
                        <View
                          style={{
                            display: "flex",
                            margin: "auto",
                            justifyContent: "center",
                            backgroundColor: "#E6EDF9",
                            padding: "1px",
                            width: "50%",
                            borderRadius: "10px",
                          }}
                        >
                          <Text
                            style={{
                              // marginVertical: 2,
                              fontSize: "8px",
                              fontWeight: "bold",
                              textAlign: "center",
                              color: "#0487C7",
                            }}
                          >
                            Layover: {layoverTime}
                          </Text>
                        </View>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    data?.Segments?.map((seg, segIndex, arr) => {
                      const currentArrival = new Date(seg.ArrTime);
                      const nextDeparture =
                        segIndex < arr.length - 1
                          ? new Date(arr[segIndex + 1].DepTime)
                          : null;
                      let layoverTime = null;

                      if (nextDeparture) {
                        const layoverDuration = nextDeparture - currentArrival;
                        const hours = Math.floor(
                          layoverDuration / (1000 * 60 * 60)
                        );
                        const minutes = Math.floor(
                          (layoverDuration % (1000 * 60 * 60)) / (1000 * 60)
                        );
                        layoverTime = `${hours}h ${minutes}m`;
                      }

                      //  // Console log for each segment

                      return (
                        <React.Fragment key={segIndex}>
                          <View
                            style={{
                              padding: "5px",
                              marginVertical: 0,
                              borderRadius: 2,
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 10,
                            }}
                          >
                            {/* Flight details for each segment */}
                            <View
                              style={{
                                alignItems: "",
                                marginRight: 2,
                                flexBasis: "25%",
                              }}
                            >
                              <Image
                                style={{
                                  width: 20,
                                  height: 20,
                                  marginRight: 5,
                                  marginBottom: 2,
                                }}
                                src={`https://b2b-etripzone.sgp1.cdn.digitaloceanspaces.com/Logo/Airlines-Image/${seg?.MarketingCarrier}.png`}
                              />
                              <Text
                                style={{
                                  fontSize: "8px",
                                  color: "#112e55",
                                }}
                              >
                                {seg?.MarketingCarrierName}
                              </Text>
                              <Text
                                style={{ marginVertical: 2, fontSize: "8px" }}
                              >
                                {seg?.MarketingCarrier}-
                                {seg?.MarketingFlightNumber} ||{" "}
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

                              {/* {layoverTime ? (
                              <Text
                                style={{
                                  marginVertical: 2,
                                  fontSize: "10px",
                                  fontWeight: "bold",
                                }}
                              >
                                Layover: {layoverTime}
                              </Text>
                            ) : (
                              ""
                            )} */}
                            </View>

                            {/* From Airport */}
                            <View
                              style={{
                                alignItems: "left",
                                marginRight: 2,
                                flexBasis: "30%",
                              }}
                            >
                              <Text
                                style={{ marginVertical: 2, fontSize: "8px" }}
                              >
                                {seg?.DepAirPort}
                              </Text>
                              <Text
                                style={{
                                  marginVertical: 2,
                                  fontSize: "8px",
                                  color: "#112e55",
                                }}
                              >
                                {seg.DepLocation}
                              </Text>
                              <Text style={DepartureDate}>
                                {format(
                                  new Date(seg?.DepTime?.split("+")[0]),
                                  "dd MMM yyyy"
                                )}{" "}
                                {seg?.DepTime?.slice(11, 16)}
                              </Text>
                              <Text style={DepartureTime}>
                                {seg?.DepartureGate &&
                                  `Terminal: ${seg?.DepartureGate}`}
                              </Text>
                            </View>

                            {/* Duration */}
                            <View
                              style={{
                                alignItems: "center",
                                marginRight: 2,
                                flexBasis: "15%",
                                margin: "4px",
                                boxShadow: "40px",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 8,
                                }}
                              >
                                <DurationConverterPdf duration={seg.Duration} />
                              </Text>
                            </View>

                            {/* To Airport */}
                            <View
                              style={{
                                textAlign: "right",
                                marginRight: 2,
                                flexBasis: "30%",
                              }}
                            >
                              <Text
                                style={{ marginVertical: 2, fontSize: "8px" }}
                              >
                                {seg?.ArrAirPort}
                              </Text>
                              <Text
                                style={{
                                  marginVertical: 2,
                                  fontSize: "8px",
                                  color: "#112e55",
                                }}
                              >
                                {seg.ArrLocation}
                              </Text>
                              <Text style={DepartureDate}>
                                {format(
                                  new Date(seg?.ArrTime?.split("+")[0]),
                                  "dd MMM yyyy"
                                )}{" "}
                                {seg?.ArrTime?.slice(11, 16)}
                              </Text>
                              <Text style={DepartureTime}>
                                {seg?.ArrivalGate &&
                                  `Terminal: ${seg?.ArrivalGate}`}
                              </Text>
                            </View>
                          </View>
                          {layoverTime ? (
                            <View
                              style={{
                                display: "flex",
                                margin: "auto",
                                justifyContent: "center",
                                backgroundColor: "#E6EDF9",
                                padding: "1px",
                                width: "50%",
                                borderRadius: "10px",
                              }}
                            >
                              <Text
                                style={{
                                  // marginVertical: 2,
                                  fontSize: "8px",
                                  fontWeight: "bold",
                                  textAlign: "center",
                                  color: "#0487C7",
                                }}
                              >
                                Layover: {layoverTime}
                              </Text>
                            </View>
                          ) : (
                            ""
                          )}
                        </React.Fragment>
                      );
                    })
                  )}
                </View>
              );
            })}
          </View>

          <View wrap={false}>
            <Text
              style={{
                marginTop: "0px",
                fontSize: "10px",
                color: "#003566",
                padding: "5px 0px",
                // backgroundColor: "#8E95AB",
              }}
            >
              Departure Baggage Info
            </Text>
            <View style={table}>
              <View style={{ margin: "auto", flexDirection: "row" }} fixed>
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
                      {data?.Bag?.[0]?.Allowance || "0 k"}
                    </Text>
                  </View>
                  <View style={tableColBag}>
                    <Text style={tableCell}>7Kg</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          {triptype === "Return" && (
            <View wrap={false}>
              <Text
                style={{
                  marginTop: "5px",
                  fontSize: "10px",
                  color: "#003566",
                  padding: "5px 0px",
                }}
              >
                Return Baggage Info
              </Text>
              <View style={table}>
                <View
                  style={{
                    margin: "auto",
                    flexDirection: "row",
                  }}
                  fixed
                >
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
                  <View style={tableRow} key={index} wrap={false}>
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
                        {data?.Bag?.[1]?.Allowance || "0 KG"}
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
            <View wrap={false}>
              <View>
                <Text
                  style={{
                    marginTop: triptype === "Return" ? "10px" : "10px",
                    fontSize: "10px",
                    color: "#FFFFFF",
                    padding: "5px 10px",
                    backgroundColor: "#8E95AB",
                  }}
                >
                  Price Breakdown
                </Text>
                <View style={[styles.container, styles.noBreak]} fixed>
                  {pricebrekDown.map((data, index) => (
                    <View key={index} style={styles.noBreak} fixed>
                      <View style={styles.row} wrap={false}>
                        <Text style={styles.label}>
                          {data.PaxType === "ADT"
                            ? "Adult"
                            : data.PaxType === "INF"
                            ? "Infant"
                            : "Child"}{" "}
                          x {data.PaxCount || 1}
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.label}>Base Fare:</Text>
                        <Text style={styles.value}>
                          {parseInt(data.BaseFare) *
                            parseInt(data.PaxCount || 1)}{" "}
                          PKR
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.label}>Tax:</Text>
                        <Text style={styles.value}>
                          {parseInt(data.Taxes) * parseInt(data.PaxCount || 1)}{" "}
                          PKR
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.label}>Sub Total:</Text>
                        <Text style={styles.value}>
                          {parseInt(data.TotalFare) *
                            parseInt(data.PaxCount || 1)}{" "}
                          PKR
                        </Text>
                      </View>
                    </View>
                  ))}
                  <View style={[styles.totalRow, styles.noBreak]}>
                    <Text style={styles.totalLabel}>Grand Total:</Text>
                    <Text style={styles.totalValue}>
                      {commaNumber(
                        allData?.bookingdata?.itenary?.GrossFare?.toFixed(2) ||
                          rootdata?.netfare
                      )}{" "}
                      PKR
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            ""
          )}

          <View
            style={{
              padding: "0 8px",
              textAlign: "justify",
              marginTop: "10px",
            }}
          >
            <Text
              style={{
                fontSize: "8px",
                color: "#003566",
              }}
            >
              Please carry a government-issued identification "like a passport
              or National Identification Card (for domestic travel only)" for
              check-in. Please report at check-in/boarding counter before the
              airline's standard time for avoiding No-Show.
            </Text>

            <Text
              style={{
                fontSize: "8px",
                marginTop: "3px",
                color: "#003566",
              }}
            >
              For ticket change/refund, please leave your query at{" "}
              {allData.bookingdata.email} To make your journey smoother, please
              carry a permissive dimension of baggage & check the flight status
              by using the manage booking option from the concerned airline's
              website. Baggage and other services provided by the airline are
              subject to conditions of the airline, which are hereby
              incorporated by reference. These conditions may be obtained from
              the issuing airlines's website or call centre.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFPageRedesign;
