import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Modal,
  Typography,
  FormControlLabel,
  Checkbox,
  Stack,
  Button,
} from "@mui/material";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import Loader from "../../images/loader/Render.gif";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { Calendar } from "react-date-range";
import Invalid from "../../images/undraw/undraw_warning_re_eoyh.svg";
import ReConfirm from "../../images/undraw/undraw_confirmation_re_b6q5.svg";
import Issue from "../../images/undraw/undraw_booking_re_gw4j.svg";
import "./Congratulation.css";
import Header from "../Header/Header";
// import FareRules from './FareRules';
import AllPDF from "./ALLPDF/ALLPDF";
import FareDetails from "./FareDetails";
import PassengerDetails from "./PassengerDetails";
import moment from "moment";
// import SeatMap from './SeatMap';
import FileUploadSection from "../Shared/FileUploadSection/FileUploadSection";
import PriceBrekdown from "./PriceBrekdown";
import FlightInformation from "./FlightInformation";
import getAuthToken from "../../Token/getAuthToken";
import CustomProgressbar from "../../Common/CustomProgressbar";
import commaNumber from "comma-number";
import useAuthentication from "../../hooks/useAuthentication";
import SessionTimer from "../Shared/SessionTimer/SessionTimer";
const styles = {
  button: {
    padding: "6px 20px",
    marginRight: "20px",
    color: "#fff",
    backgroundColor: "var(--p2)",
    border: "none",
    cursor: "pointer",
  },
  buttonDisabled: {
    padding: "6px 20px",
    marginRight: "20px",
    color: "#fff",
    backgroundColor: "var(--p2)",
    border: "none",
    cursor: "not-allowed",
  },
};

const dateStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#fff",
  borderRadius: "10px",
  overflow: "auto",
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#fff",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const getStatusStyles = (status) => {
  switch (status?.toLowerCase()) {
    case "ticketed":
    case "reissued":
      return { bgcolor: "#e6f4ea", color: "#137333", border: "1px solid #c4eed0", label: status };
    case "hold":
      return { bgcolor: "#fef7e0", color: "#b06000", border: "1px solid #ffeab6", label: "On Hold" };
    case "cancelled":
    case "voided":
    case "void rejected":
    case "refund rejected":
      return { bgcolor: "#fce8e6", color: "#c5221f", border: "1px solid #fad2cf", label: status };
    case "issue in process":
    case "refund in processing":
    case "reissue in process":
    case "void in processing":
    case "reissue quotation send":
    case "refund quotation send":
      return { bgcolor: "#e8f0fe", color: "#1a73e8", border: "1px solid #d2e3fc", label: status };
    default:
      return { bgcolor: "#f1f3f4", color: "#5f6368", border: "1px solid #dadce0", label: status || "Unknown" };
  }
};

const Congratulation = () => {
  const token = getAuthToken();

  const params = useParams();
  const [allData, setAllData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Set loading state to true initially
  const [refetch, setRefetch] = useState(false);

  const [isDone, setIsDone] = useState(true);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  // Modal open Reissue Refund and void
  const [modalOpen, setModalOpen] = useState({
    quotation: false,
    value: "",
  });

  let today = new Date().toISOString().slice(0, 10);
  // visa and passport copy update state
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const handleOpenUpdateModal = () => setOpenUpdateModal(true);
  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    // navigate(0);
  };

  const updateModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#fff",
    py: 3,
    px: 3,
    borderRadius: "10px",
    overflow: "auto",
  };
  const bookingId = params?.bookingId;

  const [reason, setReason] = useState("");

  const handleChange = (event) => {
    setReason(event.target.value);
  };
  const [isDisabled, setIsDisabled] = useState(false);

  const [requestModal, setRequestModal] = useState({
    modal: false,
    value: "",
  });

  const url = `${import.meta.env.REACT_APP_API_URL}/agent/flight/booking/details/${params?.uid}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [bookingId, params?.uid, refetch]);

  const cancelBooking = async () => {
    const confirmation = await Swal.fire({
      imageUrl: ReConfirm,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      title: "Are you sure?",
      text: "Do you want to cancel this booking?",
      showCancelButton: true,
      confirmButtonColor: "var(--primary-color)",
      confirmButtonText: "Yes, Cancel it!",
      cancelButtonColor: "crimson",
      cancelButtonText: "Don't Cancel it!",
    });

    if (confirmation.isConfirmed) {
      try {
        setIsLoading(true);
        const url = `${import.meta.env.REACT_APP_API_URL}/agent/flight/booking/cancel/${params?.uid}`;
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          setIsDone(true);
          setIsLoading(false);
          setRefetch(!refetch);
          await Swal.fire({
            imageUrl: Issue, // Consider using a different image for cancellation
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Booking Cancelled",
            html: `For any query, please contact us at <strong>support@aatrips.pk</strong> or Call <strong>+8801409965900</strong>`,
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Ok",
          });
        } else {
          throw new Error("Failed to cancel booking");
        }
      } catch (err) {
        setIsDone(true);
        setIsLoading(false);
        console.error(err);
        Swal.fire({
          imageUrl: Invalid,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "Cancellation Failed!",
          confirmButtonColor: "var(--primary-color)",
          confirmButtonText: "Ok",
        });
      }
    }
  };



  async function handleIssueTicket(value) {
    const confirmation = await Swal.fire({
      imageUrl: ReConfirm,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      title: "Are you sure?",
      text: `Do you want to ${
        value === "partial" ? "partially pay for" : "issue"
      }  this ticket?`,
      showCancelButton: true,
      confirmButtonColor: "var(--primary-color)",
      confirmButtonText: "Yes, Issue it!",
      cancelButtonColor: "crimson",
      cancelButtonText: "Don't Issue it!",
    });

    if (confirmation.isConfirmed) {
      try {
        setIsDone(false);
        setIsLoading(true);
        const url = `${import.meta.env.REACT_APP_API_URL}/agent/ticketing/issue/request/${
          params?.uid
        }?payment=${value || "full"}`;
        const response = await fetch(url, {
          method: "POST", // Assuming this is a POST request
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          await Swal.fire({
            imageUrl: Issue,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Ticket Issue Complete",
            html: `For any query, please contact us at <strong>support@aatrips.pk</strong> or Call <strong>+8801409965900</strong>`,
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Ok",
          });
          setIsDone(true);
          setIsLoading(false);
          setRefetch(!refetch);
        } else {
          throw new Error(data.message); // Pass the API error message directly
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          imageUrl: Invalid,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          text: err.message, // Use the error message directly
          confirmButtonColor: "var(--primary-color)",
          confirmButtonText: "Ok",
        });
        setIsDone(true);
        setIsLoading(false);
        setRefetch(!refetch);
      }
    }
  }

  // Qoutation Show end
  // Refund and Reissue Qoutation Approve and Reject start
  const handleOption = async (value, option) => {
    try {
      setIsDisabled(true);

      const urlReissue = `${import.meta.env.REACT_APP_API_URL}/agent/${value?.toLowerCase()}/decision/${
        option === "yes" ? "accept" : "reject"
      }/${params?.uid}`;
      const urlRefund = `${import.meta.env.REACT_APP_API_URL}/agent/${value?.toLowerCase()}/quotation/${
        option === "yes" ? "accept" : "reject"
      }/${params?.uid}`;

      const response = await fetch(
        value?.toLowerCase() === "reissue" ? urlReissue : urlRefund,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setModalOpen(false);
        setIsLoading(true);
        Swal.fire({
          icon: "success",
          title: data.message,
          html: `For any queries, please contact us at <strong>support@aatrips.pk</strong> or call <strong>+8801409965900</strong>`,
          confirmButtonText: "OK",
        }).then(() => {
          setRefetch(!refetch);
        });
      } else {
        setIsDisabled(false);
        setModalOpen(false);
        throw new Error(data?.message || "Request Failed!");
      }
    } catch (error) {
      setIsDisabled(false);
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Request Failed!",
        html: `For any queries, please contact us at <strong>support@aatrips.pk</strong> or call <strong>+8801409965900</strong>`,
        confirmButtonText: "OK",
      });
    }
  };

  // Qoutation Approve and Reject end
  const ticketResult = [];
  if (!isLoading && allData && allData?.passengerdata) {
    allData?.passengerdata.forEach((passenger) => {
      const matchingTicket = allData?.ticketdetails?.find(
        (ticket) => ticket.givenname === passenger.givenname
      );
      if (matchingTicket) {
        const mergedObject = {
          ...passenger,
          ticketnumber: matchingTicket.ticketnumber,
        };
        ticketResult.push(mergedObject);
      }
    });
  }

  const [quotation, setQuotation] = useState([]);
  const handleBox = (traveler) => {
    const isAlreadySelected = quotation.find((item) => item.id === traveler.id);

    if (isAlreadySelected) {
      const filter = quotation.filter((item) => item.id !== traveler.id);
      setQuotation(filter);
    } else {
      setQuotation([...quotation, traveler]);
    }
  };

  let reissuebodyName =
    quotation &&
    quotation
      ?.map(
        (traveler) =>
          `${traveler?.givenname}/${traveler?.surname} - ${traveler?.ticketnumber}`
      )
      .join(",");

  let reissueBody = JSON.stringify({
    text: reissuebodyName,
    date: date,
  });

  let refundBody = JSON.stringify({
    text: reissuebodyName,
  });
  let voidBody = JSON.stringify({
    passengerdata: reissuebodyName,
    reason: reason || "",
  });

  const body = `${
    requestModal?.value === "Reissue"
      ? reissueBody
      : requestModal?.value === "Void"
      ? voidBody
      : refundBody
  }`;

  const handleReissueRefundVoid = async (e) => {
    setIsDisabled(true);
    setIsLoading(false);
    e.preventDefault();
    const reissueRefundVoid = `${import.meta.env.REACT_APP_API_URL}/agent/${requestModal?.value?.toLocaleLowerCase()}/request/${
      params?.uid
    }`;

    try {
      const response = await fetch(reissueRefundVoid, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      });

      const data = await response.json();

      setRequestModal({ modal: false });
      setIsLoading(false);

      Swal.fire({
        icon: response.ok ? "success" : "error",
        title: response.ok
          ? `${requestModal?.value} Quotation success`
          : `${data?.message}`,
        html: `For any query, please contact us at <strong>support@aatrips.pk</strong> or Call <strong>+8801409965900</strong>`,
        confirmButtonText: "OK",
      }).then(function () {
        setRequestModal({ modal: false });
        setIsDisabled(false);
        setRefetch(!refetch);
      });
    } catch (err) {
      setIsDisabled(false);
      console.error(err);
    }

    e.target.reset();
  };

  const handleButtonClick = (pdfUrl) => {
    window.open(pdfUrl, "_blank");
  };

  const checkp = allData?.passengerdata?.[0]?.passport;
  const checkv = allData?.passengerdata?.[0]?.visa;
  const checkDomestic =
    allData?.bookingdata?.itenary?.FarePolicy === "domestic";

  // Calculate paidamount based on status
  const refundableAmount =
    allData?.refunddata?.netfare -
    (allData?.refunddata?.refundpenalty + allData?.refunddata?.servicefee);

  // 

  // Account Data
  const { logout } = useAuthentication();

  const [account, setAccount] = useState();

  const [loading, setLoading] = useState(false);
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
        // setBalance(data?.balance);
        setAccount(data);
        if (data?.status !== "active") {
          logout();
        }
      } catch (error) {
        logout();
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);
  const priceData =
    allData?.bookingdata?.itenary?.FlightInfo?.PriceBreakDown ||
    allData?.bookingdata?.itenary?.PriceBreakDown;
  // 
  // 
  const transitCalculation = (date1, date2) => {
    const duration = moment.duration(moment(date1).diff(moment(date2)));

    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes()) - hours * 60;
    const transit = `${Math.abs(hours)}h:${Math.abs(minutes)}min`;
    return transit;
  };
  return (
    <Box sx={{ overflowX: "hidden " }}>
      <Header />
      {!isLoading ? (
        <Box sx={{ mt: { xs: 10, md: 0 } }}>
          {/* Modern Header Card */}
          <Box
            sx={{
              width: "100%",
              p: { xs: 2, md: 3 },
              bgcolor: "#FFFFFF",
              borderRadius: "12px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              mb: 3,
            }}
          >
            <Container maxWidth="lg" sx={{ p: "0 !important" }}>
              <Grid container spacing={2} alignItems="center">
                {/* Left side: Booking details */}
                <Grid item xs={12} md={8}>
                  <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                    <Typography
                      sx={{
                        color: "var(--neutral-800)",
                        fontSize: { xs: "20px", md: "24px" },
                        fontWeight: 700,
                      }}
                    >
                      Booking ID: <span style={{ color: "var(--p1)" }}>{bookingId || "BookingId"}</span>
                    </Typography>
                    
                    {/* Status Badge */}
                    {allData?.bookingdata?.status && (() => {
                      const statusStyles = getStatusStyles(allData.bookingdata.status);
                      return (
                        <Box
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: 700,
                            bgcolor: statusStyles.bgcolor,
                            color: statusStyles.color,
                            border: statusStyles.border,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {statusStyles.label}
                        </Box>
                      );
                    })()}

                  </Box>

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center" }}>
                    {allData?.bookingdata?.pnr && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Typography sx={{ fontSize: "13px", color: "var(--neutral-500)", fontWeight: 500 }}>Sabre PNR:</Typography>
                        <Box sx={{ px: 1.2, py: 0.3, borderRadius: "6px", bgcolor: "#f1f3f4", fontSize: "13px", fontWeight: 700, color: "var(--neutral-800)", border: "1px solid #dadce0" }}>
                          {allData.bookingdata.pnr}
                        </Box>
                      </Box>
                    )}
                    {allData?.bookingdata?.airlinespnr && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Typography sx={{ fontSize: "13px", color: "var(--neutral-500)", fontWeight: 500 }}>Airline PNR:</Typography>
                        <Box sx={{ px: 1.2, py: 0.3, borderRadius: "6px", bgcolor: "#f1f3f4", fontSize: "13px", fontWeight: 700, color: "var(--neutral-800)", border: "1px solid #dadce0" }}>
                          {allData.bookingdata.airlinespnr}
                        </Box>
                      </Box>
                    )}

                    {/* Refundable Badge */}
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: 700,
                        bgcolor: allData?.bookingdata?.refundable === "1" ? "#e6f4ea" : "#fce8e6",
                        color: allData?.bookingdata?.refundable === "1" ? "#137333" : "#c5221f",
                        border: allData?.bookingdata?.refundable === "1" ? "1px solid #c4eed0" : "1px solid #fad2cf",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {allData?.bookingdata?.refundable === "1" ? "Refundable" : "Non-Refundable"}
                    </Box>

                    {/* Hold Time Limit */}
                    {allData?.bookingdata?.status === "Hold" && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Box sx={{ px: 1.2, py: 0.4, borderRadius: "6px", bgcolor: "#fce8e6", border: "1px solid #fad2cf", display: "flex", alignItems: "center", gap: 0.5 }}>
                          <Typography sx={{ fontSize: "12px", color: "#c5221f", fontWeight: 600 }}>
                            ⏰ Hold Time Limit: {allData?.bookingdata?.timelimit?.length === 0
                              ? "Instant time limit"
                              : moment(allData?.bookingdata?.timelimit).format("DD-MMM-YYYY hh:mm A")}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Grid>

                {/* Right side: PDF Download / Hold Cancel Action */}
                <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, gap: 1.5, flexWrap: "wrap", alignItems: "center" }}>
                  {allData?.bookingdata?.status === "Hold" && (
                    <Button
                      variant="contained"
                      onClick={() => cancelBooking()}
                      disabled={!isDone}
                      sx={{
                        textTransform: "none",
                        borderRadius: "6px",
                        fontWeight: 600,
                        py: 0.8,
                        bgcolor: "#d32f2f",
                        color: "#ffffff",
                        "&:hover": {
                          bgcolor: "#c62828"
                        }
                      }}
                    >
                      {!isDone ? "Loading..." : "Cancel Flight"}
                    </Button>
                  )}

                  {allData?.bookingdata?.status === "Reissued" ? (
                    <Button
                      variant="contained"
                      onClick={() => handleButtonClick(allData?.reissuedata?.[0]?.reissuecopy)}
                      sx={{ bgcolor: "var(--p2)", textTransform: "none", borderRadius: "6px", fontWeight: 600, py: 0.8, "&:hover": { bgcolor: "var(--p2)" } }}
                    >
                      ReIssue Ticket Copy
                    </Button>
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography sx={{ fontSize: "12px", color: "var(--neutral-500)", fontWeight: 600 }}>PDF Download:</Typography>
                      <AllPDF allData={allData} ticketResult={ticketResult} />
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* Main Layout Grid */}
          <Container maxWidth="lg" sx={{ p: "0 !important" }}>
            <Grid container spacing={3}>
              
              {/* ── LEFT MAIN COLUMN ───────────────────────────────── */}
              <Grid
                item
                xs={12}
                md={8}
                lg={8.5}
                order={{ xs: 1, md: 1 }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  
                  {/* Flight Info Card */}
                  <Box
                    sx={{
                      bgcolor: "#FFFFFF",
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                      borderRadius: "12px",
                      border: "1px solid rgba(0, 0, 0, 0.05)",
                      overflow: "hidden",
                    }}
                  >
                    <FlightInformation allData={allData} />
                  </Box>

                  {/* Refund Details Table (If applicable) */}
                  {(allData?.bookingdata?.status === "Refund Quotation Send" ||
                    allData?.bookingdata?.status === "Refund Quotation Accepted" ||
                    allData?.bookingdata?.status === "Refunded") && (
                    <Box
                      sx={{
                        bgcolor: "#FFFFFF",
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                        borderRadius: "12px",
                        border: "1px solid rgba(0, 0, 0, 0.05)",
                        p: 2.5,
                      }}
                    >
                      <Typography sx={{ fontSize: "16px", fontWeight: 700, mb: 2, color: "var(--neutral-800)" }}>
                        🔄 Refund Details
                      </Typography>
                      <Box sx={{ overflowX: "auto" }}>
                        <table className="responsive-table congra" style={{ width: "100%", borderCollapse: "collapse" }}>
                          <thead>
                            <tr style={{ bgcolor: "var(--neutral-100)" }}>
                              <th style={{ padding: "12px", textAlign: "center", fontSize: "12px", fontWeight: 600, color: "var(--neutral-700)" }}>Net Fare</th>
                              <th style={{ padding: "12px", textAlign: "center", fontSize: "12px", fontWeight: 600, color: "var(--neutral-700)" }}>Refundable Amount</th>
                              <th style={{ padding: "12px", textAlign: "center", fontSize: "12px", fontWeight: 600, color: "var(--neutral-700)" }}>Refund Penalty</th>
                              <th style={{ padding: "12px", textAlign: "center", fontSize: "12px", fontWeight: 600, color: "var(--neutral-700)" }}>Service Charge</th>
                              <th style={{ padding: "12px", textAlign: "center", fontSize: "12px", fontWeight: 600, color: "var(--neutral-700)" }}>Remarks</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ padding: "12px", textAlign: "center", fontSize: "13px", borderBottom: "1px solid #eee" }}>{commaNumber(allData?.bookingdata?.netfare || 0)} PKR</td>
                              <td style={{ padding: "12px", textAlign: "center", fontSize: "13px", borderBottom: "1px solid #eee", fontWeight: 700, color: "var(--primary-color)" }}>{commaNumber(refundableAmount || 0)} PKR</td>
                              <td style={{ padding: "12px", textAlign: "center", fontSize: "13px", borderBottom: "1px solid #eee", color: "crimson" }}>{commaNumber(allData?.refunddata?.refundpenalty || 0)} PKR</td>
                              <td style={{ padding: "12px", textAlign: "center", fontSize: "13px", borderBottom: "1px solid #eee" }}>{commaNumber(allData?.refunddata?.servicefee || 0)} PKR</td>
                              <td style={{ padding: "12px", textAlign: "center", fontSize: "13px", borderBottom: "1px solid #eee", fontStyle: "italic" }}>{allData?.refunddata?.remarks || "N/A"}</td>
                            </tr>
                          </tbody>
                        </table>
                      </Box>
                    </Box>
                  )}

                  {/* Reissue Details Table (If applicable) */}
                  {(allData?.bookingdata?.status === "Reissue Quotation Send" ||
                    allData?.bookingdata?.status === "Reissue Quotation Accepted" ||
                    allData?.bookingdata?.status === "Reissued") && (
                    <Box
                      sx={{
                        bgcolor: "#FFFFFF",
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                        borderRadius: "12px",
                        border: "1px solid rgba(0, 0, 0, 0.05)",
                        p: 2.5,
                      }}
                    >
                      <Typography sx={{ fontSize: "16px", fontWeight: 700, mb: 2, color: "var(--neutral-800)" }}>
                        🔄 Reissue Details
                      </Typography>
                      <Box sx={{ overflowX: "auto" }}>
                        <table className="responsive-table congra" style={{ width: "100%", borderCollapse: "collapse" }}>
                          <thead>
                            <tr style={{ bgcolor: "var(--neutral-100)" }}>
                              <th style={{ padding: "12px", textAlign: "center", fontSize: "12px", fontWeight: 600, color: "var(--neutral-700)" }}>Net Fare</th>
                              <th style={{ padding: "12px", textAlign: "center", fontSize: "12px", fontWeight: 600, color: "var(--neutral-700)" }}>Reissue Penalty</th>
                              <th style={{ padding: "12px", textAlign: "center", fontSize: "12px", fontWeight: 600, color: "var(--neutral-700)" }}>Service Charge</th>
                              <th style={{ padding: "12px", textAlign: "center", fontSize: "12px", fontWeight: 600, color: "var(--neutral-700)" }}>Fare Difference</th>
                              <th style={{ padding: "12px", textAlign: "center", fontSize: "12px", fontWeight: 600, color: "var(--neutral-700)" }}>Pay Bill</th>
                              <th style={{ padding: "12px", textAlign: "center", fontSize: "12px", fontWeight: 600, color: "var(--neutral-700)" }}>Remarks</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ padding: "12px", textAlign: "center", fontSize: "13px", borderBottom: "1px solid #eee" }}>{commaNumber(allData?.bookingdata?.netfare || 0)} PKR</td>
                              <td style={{ padding: "12px", textAlign: "center", fontSize: "13px", borderBottom: "1px solid #eee", color: "crimson" }}>{commaNumber(allData?.reissuedata?.[0]?.exchangepenalty || 0)} PKR</td>
                              <td style={{ padding: "12px", textAlign: "center", fontSize: "13px", borderBottom: "1px solid #eee" }}>{commaNumber(allData?.reissuedata?.[0]?.servicefee || 0)} PKR</td>
                              <td style={{ padding: "12px", textAlign: "center", fontSize: "13px", borderBottom: "1px solid #eee" }}>{commaNumber(allData?.reissuedata?.[0]?.faredifference || 0)} PKR</td>
                              <td style={{ padding: "12px", textAlign: "center", fontSize: "13px", borderBottom: "1px solid #eee", fontWeight: 700, color: "var(--primary-color)" }}>{commaNumber(allData?.reissuedata?.[0]?.quotationamount || 0)} PKR</td>
                              <td style={{ padding: "12px", textAlign: "center", fontSize: "13px", borderBottom: "1px solid #eee", fontStyle: "italic" }}>{allData?.reissuedata?.[0]?.remarks || "N/A"}</td>
                            </tr>
                          </tbody>
                        </table>
                      </Box>
                    </Box>
                  )}

                  {/* Passenger Details Card */}
                  <Box
                    sx={{
                      bgcolor: "#FFFFFF",
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                      borderRadius: "12px",
                      border: "1px solid rgba(0, 0, 0, 0.05)",
                      p: 2.5,
                    }}
                  >
                    <PassengerDetails
                      allData={allData}
                      ticketResult={ticketResult}
                    />
                  </Box>

                </Box>
              </Grid>

              {/* ── RIGHT SIDEBAR COLUMN ────────────────────────────── */}
              <Grid
                item
                xs={12}
                md={4}
                lg={3.5}
                order={{ xs: 2, md: 2 }}
              >
                <Box
                  sx={{
                    position: { md: "sticky" },
                    top: { md: "90px" },
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  
                  {/* Price Breakdown Component */}
                  {priceData && (
                    <Box
                      sx={{
                        bgcolor: "#FFFFFF",
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                        borderRadius: "12px",
                        border: "1px solid rgba(0, 0, 0, 0.05)",
                        overflow: "hidden",
                      }}
                    >
                      <PriceBrekdown allData={allData} account={account} />
                    </Box>
                  )}

                  {/* Manage Booking Actions Card */}
                  {(!isLoading && (
                    allData?.bookingdata?.status === "Hold" ||
                    allData?.bookingdata?.status === "Ticketed" ||
                    allData?.bookingdata?.status === "Void Rejected" ||
                    allData?.bookingdata?.status === "Refund Rejected" ||
                    allData?.bookingdata?.status === "Refund Quotation Rejected" ||
                    allData?.bookingdata?.status === "Reissue Quotation Rejected" ||
                    allData?.bookingdata?.status === "Reissued" ||
                    allData?.bookingdata?.status === "Issue In Process" ||
                    allData?.bookingdata?.status === "Refund In Processing" ||
                    allData?.bookingdata?.status === "ReIssue In Process" ||
                    allData?.bookingdata?.status === "Void In Processing" ||
                    allData?.bookingdata?.status === "Reissue Quotation Send" ||
                    allData?.bookingdata?.status === "Refund Quotation Send"
                  )) && (
                    <Box
                      sx={{
                        p: 2.5,
                        bgcolor: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                        border: "1px solid rgba(0, 0, 0, 0.05)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "var(--neutral-800)" }}>
                        ⚙️ Manage Booking
                      </Typography>

                      {/* Wait statuses */}
                      {allData?.bookingdata?.status === "Issue In Process" && (
                        <Box sx={{ p: 1.5, bgcolor: "rgba(237,90,43,0.08)", border: "1px solid rgba(237,90,43,0.3)", borderRadius: "6px" }}>
                          <Typography sx={{ color: "#ED5A2B", fontSize: "13px", fontWeight: 600, textAlign: "center" }}>
                            ⌛ Wait For Ticketed
                          </Typography>
                        </Box>
                      )}
                      {allData?.bookingdata?.status === "Refund In Processing" && (
                        <Box sx={{ p: 1.5, bgcolor: "rgba(237,90,43,0.08)", border: "1px solid rgba(237,90,43,0.3)", borderRadius: "6px" }}>
                          <Typography sx={{ color: "#ED5A2B", fontSize: "13px", fontWeight: 600, textAlign: "center" }}>
                            ⌛ Wait For Refunded
                          </Typography>
                        </Box>
                      )}
                      {allData?.bookingdata?.status === "ReIssue In Process" && (
                        <Box sx={{ p: 1.5, bgcolor: "rgba(237,90,43,0.08)", border: "1px solid rgba(237,90,43,0.3)", borderRadius: "6px" }}>
                          <Typography sx={{ color: "#ED5A2B", fontSize: "13px", fontWeight: 600, textAlign: "center" }}>
                            ⌛ Wait For Reissued
                          </Typography>
                        </Box>
                      )}
                      {allData?.bookingdata?.status === "Void In Processing" && (
                        <Box sx={{ p: 1.5, bgcolor: "rgba(237,90,43,0.08)", border: "1px solid rgba(237,90,43,0.3)", borderRadius: "6px" }}>
                          <Typography sx={{ color: "#ED5A2B", fontSize: "13px", fontWeight: 600, textAlign: "center" }}>
                            ⌛ Wait For Voided
                          </Typography>
                        </Box>
                      )}

                      {/* Quotation Send statuses */}
                      {allData?.bookingdata?.status === "Reissue Quotation Send" && (
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{ bgcolor: "#ED5A2B", textTransform: "none", color: "#fff", "&:hover": { bgcolor: "#d44c1e" } }}
                          onClick={() => setModalOpen({ quotation: "true", value: "Reissue" })}
                        >
                          View Quotation
                        </Button>
                      )}
                      {allData?.bookingdata?.status === "Refund Quotation Send" && (
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{ bgcolor: "#ED5A2B", textTransform: "none", color: "#fff", "&:hover": { bgcolor: "#d44c1e" } }}
                          onClick={() => setModalOpen({ quotation: "true", value: "Refund" })}
                        >
                          View Refund Quotation
                        </Button>
                      )}

                      {/* Ticketed / Actions statuses */}
                      {(allData?.bookingdata?.status === "Ticketed" ||
                        allData?.bookingdata?.status === "Void Rejected" ||
                        allData?.bookingdata?.status === "Refund Rejected" ||
                        allData?.bookingdata?.status === "Refund Quotation Rejected" ||
                        allData?.bookingdata?.status === "Reissue Quotation Rejected" ||
                        allData?.bookingdata?.status === "Reissued") && (
                        <Stack spacing={1.5}>
                          <Button
                            variant="contained"
                            fullWidth
                            sx={{ bgcolor: "var(--p2)", textTransform: "none", "&:hover": { bgcolor: "var(--p2)" } }}
                            onClick={() => setRequestModal({ modal: true, value: "Reissue" })}
                          >
                            Re-Issue Ticket
                          </Button>

                          {allData?.bookingdata?.refundable === "1" && (
                            <Button
                              variant="outlined"
                              color="error"
                              fullWidth
                              sx={{ textTransform: "none" }}
                              onClick={() => setRequestModal({ modal: true, value: "Refund" })}
                            >
                              Request Refund
                            </Button>
                          )}

                          {allData?.bookingdata?.status === "Ticketed" &&
                          today <= allData?.bookingdata?.updated_at?.split("Z")[0] && (
                            <Button
                              variant="outlined"
                              color="warning"
                              fullWidth
                              sx={{ textTransform: "none" }}
                              onClick={() => setRequestModal({ modal: true, value: "Void" })}
                            >
                              Void Ticket
                            </Button>
                          )}
                        </Stack>
                      )}

                      {/* Hold statuses: Issue ticket buttons */}
                      {allData?.bookingdata?.status === "Hold" && (
                        <Stack spacing={1.5}>
                          {checkDomestic ? (
                            <>
                              <Button
                                variant="contained"
                                fullWidth
                                sx={{ bgcolor: "var(--p2)", textTransform: "none", "&:hover": { bgcolor: "var(--p2)" } }}
                                onClick={() => handleIssueTicket("full")}
                                disabled={!isDone}
                              >
                                {!isDone ? "Issuing..." : "Issue Ticket"}
                              </Button>
                            </>
                          ) : (
                            <>
                              {checkp === null && checkv === null ? (
                                <Button
                                  variant="contained"
                                  fullWidth
                                  sx={{ bgcolor: "var(--p2)", textTransform: "none", "&:hover": { bgcolor: "var(--p2)" } }}
                                  onClick={() => handleOpenUpdateModal()}
                                >
                                  Upload Document
                                </Button>
                              ) : (
                                <>
                                  <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ bgcolor: "var(--p2)", textTransform: "none", "&:hover": { bgcolor: "var(--p2)" } }}
                                    onClick={() => handleIssueTicket("full")}
                                    disabled={!isDone}
                                  >
                                    {!isDone ? "Issuing..." : "Issue Ticket"}
                                  </Button>
                                </>
                              )}
                            </>
                          )}
                        </Stack>
                      )}
                    </Box>
                  )}



                  {/* Fare Details Card */}
                  {allData?.bookingdata?.system !== "Groupfare" && (
                    <Box
                      sx={{
                        bgcolor: "#FFFFFF",
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                        borderRadius: "12px",
                        border: "1px solid rgba(0, 0, 0, 0.05)",
                        p: 2.5,
                      }}
                    >
                      <FareDetails allData={allData} />
                    </Box>
                  )}

                </Box>
              </Grid>

            </Grid>
          </Container>
                {/* ---------Modal Refund, Request, void Request start--------- */}

                <Box className="queues-detail-calcel-btn">
                  <Modal
                    open={requestModal.modal}
                    onClose={() => setRequestModal({ modal: false })}
                  >
                    <Box
                      bgcolor="#fff"
                      sx={{
                        ...updateModalStyle,
                        width: { xs: "80%", sm: "80%", md: "40%" },
                        p: { xs: 1, sm: 3 },
                      }}
                    >
                      <Box className="modal-table">
                        <Typography
                          sx={{
                            color: "#222222",
                            fontSize: "20px",
                            fontWeight: 500,
                            mb: "10px",
                          }}
                        >
                          Make {requestModal.value} Request
                        </Typography>

                        <table width="100%">
                          <thead>
                            <tr>
                              <th width="5%">Select</th>
                              <th width="25%">Passenger&nbsp;Name</th>
                              <th width="20%">Gender</th>
                              <th width="20%">Passenger&nbsp;Type</th>
                              <th width="30%">Ticket No</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ticketResult?.map((traveler, index) => (
                              <tr key={index}>
                                <td width="10px" style={{ border: "none" }}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        sx={{ p: "0px 0px 0px 25px" }}
                                        checked={quotation.some(
                                          (item) => item.id === traveler.id
                                        )}
                                        onChange={() => handleBox(traveler)}
                                      />
                                    }
                                  />
                                </td>
                                <td>
                                  {traveler?.prefix} {traveler?.givenname}{" "}
                                  {traveler?.surname}
                                </td>
                                <td>{traveler?.gender}</td>
                                <td>
                                  {traveler?.type === "ADT"
                                    ? "Adult"
                                    : traveler?.type === "INF"
                                    ? "Infant"
                                    : "Child"}
                                </td>
                                <td>
                                  {allData?.ticketdetails[index]?.ticketnumber}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <Grid
                          container
                          justifyContent={"space-between"}
                          alignItems="center"
                        >
                          <Grid item mt={2}>
                            {requestModal.value === "Void" ? (
                              <Box
                                sx={{
                                  textarea: {
                                    border: "1px solid",
                                    outline: "none",
                                    p: 1,
                                  },
                                }}
                              >
                                <textarea
                                  placeholder="Reason"
                                  name="reason"
                                  rows="2"
                                  cols="30"
                                  value={reason}
                                  onChange={handleChange}
                                />
                              </Box>
                            ) : requestModal.value === "Refund" ? null : (
                              <Box>
                                <label htmlFor="date">Select Date</label> <br />
                                <Box>
                                  <input
                                    style={{
                                      border: "2px solid #C4C4C4",
                                      padding: "5px",
                                      fontSize: "14px",
                                      cursor: "pointer",
                                    }}
                                    required
                                    type="text"
                                    name="date"
                                    readOnly
                                    value={format(
                                      new Date(date),
                                      "dd MMM yyyy"
                                    )}
                                    onClick={() => {
                                      setOpenDate((prev) => !prev);
                                    }}
                                  />
                                </Box>
                              </Box>
                            )}
                          </Grid>
                          <Grid item mt={4}>
                            <Box>
                              {isDisabled ? (
                                <button
                                  style={
                                    isDisabled
                                      ? styles.buttonDisabled
                                      : styles.button
                                  }
                                >
                                  Wait For Response
                                </button>
                              ) : (
                                <button
                                  disabled={
                                    quotation?.length > 0 ? false : true
                                  }
                                  style={
                                    isDisabled
                                      ? styles.buttonDisabled
                                      : styles.button
                                  }
                                  onClick={handleReissueRefundVoid}
                                >
                                  Submit
                                </button>
                              )}

                              <button
                                style={{
                                  padding: "6px 20px",
                                  color: "#fff",
                                  backgroundColor: "red",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                                type="reset"
                                onClick={() => {
                                  setRequestModal({
                                    modal: false,
                                  });
                                  setIsDisabled(false);
                                  setQuotation([]);
                                }}
                              >
                                Cancel
                              </button>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                    {/* </from> */}
                  </Modal>
                  <Modal open={openDate} onClose={() => setOpenDate(false)}>
                    <Box sx={dateStyle}>
                      <Calendar
                        color={"#222222"}
                        date={new Date(date)}
                        onChange={(date) => {
                          setDate(new Date(date).toLocaleDateString("sv"));
                          setOpenDate(false);
                        }}
                        minDate={new Date(date)}
                        months={1}
                        direction="horizontal"
                        // className="reissue-calendar"
                        name="dashboard-calendar"
                      />
                    </Box>
                  </Modal>
                </Box>

                {/* ---------Modal Refund, Request, void Request start--------- */}
                {/* ---------Quatiton Modla start--------- */}
                <Box>
                  <Modal
                    open={modalOpen.quotation}
                    onClose={() =>
                      setModalOpen({
                        quotation: false,
                      })
                    }
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                  >
                    <Box
                      sx={{ ...modalStyle, width: 500 }}
                      style={{
                        border: "none",
                        borderRadius: "5px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#003566",
                          fontSize: "20px",
                          mb: 1,
                        }}
                      >
                        <Box sx={{ fontSize: "20px", fontWeight: 500, mb: 1 }}>
                          Quotation
                        </Box>

                        {modalOpen?.value === "Refund" ? (
                          // (
                          //   <Box
                          //     sx={{
                          //       fontSize: "16px",
                          //       fontWeight: 500,
                          //       color: "primary-color",
                          //     }}
                          //   >
                          //     <Box
                          //       sx={{ fontSize: "14px", fontWeight: 500, color: "#000" }}
                          //     >
                          //       Net Fare : {allData?.bookingdata?.netfare || 0} PKR
                          //     </Box>
                          //     <Box>
                          //       Refund Charge: {allData?.refunddata?.refundpenalty || 0}{" "}
                          //       PKR
                          //     </Box>
                          //     <Box>
                          //       Refund Service Charges:{" "}
                          //       {allData?.refunddata?.servicefee || 0} PKR
                          //     </Box>
                          //     <Box sx={{ color: "var(--primary-color)" }}>
                          //       Refundable amount:{" "}
                          //       {allData?.refunddata?.quotationamount || 0} PKR
                          //     </Box>
                          //     <Typography
                          //       sx={{
                          //         fontSize: "14px",
                          //         fontWeight: 500,
                          //         color: "#000",
                          //         mb: 5,
                          //       }}
                          //     >
                          //       Description: {allData?.refunddata?.remarks}
                          //     </Typography>
                          //   </Box>
                          // )

                          <Box
                            sx={{
                              fontSize: "16px",
                              fontWeight: 500,
                              color: "primary-color",
                            }}
                          >
                            <Box
                              sx={{
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "#000",
                              }}
                            >
                              Net Fare : {allData?.bookingdata?.netfare || 0}{" "}
                              PKR
                            </Box>

                            <Box>
                              Refund Charge:{" "}
                              {allData?.refunddata?.refundpenalty || 0} PKR
                            </Box>
                            <Box>
                              Refund Service Charges:{" "}
                              {allData?.refunddata?.servicefee || 0} PKR
                            </Box>
                            <hr></hr>
                            <Box sx={{ color: "var(--primary-color)" }}>
                              Refundable amount: {refundableAmount || 0} PKR
                            </Box>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "#000",
                                mb: 5,
                              }}
                            >
                              Description: {allData?.refunddata?.remarks}
                            </Typography>
                          </Box>
                        ) : (
                          <Box>
                            <Box
                              sx={{
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "#000",
                                p: 2,
                                border: "1px solid var(--primary-color)",
                              }}
                            >
                              <Box
                                sx={{
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  color: "var(--primary-color)",
                                }}
                              >
                                Net Fare : {allData?.bookingdata?.netfare || 0}{" "}
                                PKR
                              </Box>

                              <Box>
                                Reissue Charge:{" "}
                                {allData?.reissuedata?.[0]?.exchangepenalty ||
                                  0}{" "}
                                PKR
                              </Box>
                              <Box>
                                Reissue Service Charges:{" "}
                                {allData?.reissuedata?.[0]?.servicefee || 0} PKR
                              </Box>
                              <Box>
                                Fare Difference:{" "}
                                {allData?.reissuedata?.[0]?.faredifference || 0}{" "}
                                PKR
                              </Box>
                              <Box sx={{ color: "var(--primary-color)" }}>
                                Pay Bill:{" "}
                                {allData?.reissuedata?.[0]?.quotationamount ||
                                  0}{" "}
                                PKR
                              </Box>
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: 500,
                                  color: "#000",
                                }}
                              >
                                Description:{" "}
                                {allData?.reissuedata?.[0]?.remarks}
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </Typography>

                      <Box className="balance-transaction">
                        <Stack direction="row" justifyContent="flex-end">
                          <Box>
                            {!isDisabled ? (
                              <Button
                                onClick={() =>
                                  handleOption(modalOpen?.value, "yes")
                                }
                                size="small"
                                disabled={isDisabled}
                                style={
                                  isDisabled
                                    ? styles.buttonDisabled
                                    : styles.button
                                }
                              >
                                Approve
                              </Button>
                            ) : (
                              <Button
                                size="small"
                                disabled={isDisabled}
                                style={
                                  isDisabled
                                    ? styles.buttonDisabled
                                    : styles.button
                                }
                              >
                                Wait For Response
                              </Button>
                            )}
                            {!isDisabled ? (
                              <Button
                                size="medium"
                                sx={{
                                  color: "#fff",
                                  bgcolor: "red",
                                  "&:hover": {
                                    bgcolor: "red",
                                  },
                                }}
                                onClick={() =>
                                  handleOption(modalOpen?.value, "no")
                                }
                              >
                                Decline
                              </Button>
                            ) : null}
                          </Box>
                        </Stack>
                      </Box>
                    </Box>
                  </Modal>
                </Box>
                {/* ---------Quatiton Modla end--------- */}

                {/* //todo: Update Document Modal */}
                <Modal open={openUpdateModal} onClose={handleCloseUpdateModal}>
                  <Box
                    sx={{
                      ...updateModalStyle,
                      minHeight: "20vh",
                      overflowY: "auto",
                    }}
                  >
                    <FileUploadSection
                      passengerData={allData?.passengerdata}
                      handleIssueTicket={handleIssueTicket}
                      handleCloseUpdateModal={handleCloseUpdateModal}
                    />
                  </Box>
                </Modal>
        </Box>
      ) : (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            style={{
              width: "50%",
              height: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={Loader}
              alt="loader"
              style={{
                width: "100%",
                objectFit: "center",
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Congratulation;
