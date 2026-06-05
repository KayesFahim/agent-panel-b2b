import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Box, Typography, Container, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ManIcon from "@mui/icons-material/Man";
import AccessibilityIcon from "@mui/icons-material/Accessibility";

import FlightUserInfoSabre from "../../components/FlightUserinfo/FlightUserInfoSabre";
import Loader from "../../images/loader/Render.gif";
import NotFound from "../../images/undraw/undraw_not_found_re_bh2e.svg";
import SessionTimer from "../../components/Shared/SessionTimer/SessionTimer";
import "./FlightInformation.css";
import Header from "../../components/Header/Header";
import FlightDetails from "../../components/SingleFlight/FlightDetails";
import getAuthToken from "../../Token/getAuthToken";

const FlightInformation = (props) => {
  const token = getAuthToken();

  const location = useLocation();
  const [loadData, setLoadData] = useState([]);
  const { adultCount, childCount, infant } = location.state;
  const [isLoaded, setIsLoaded] = useState(true);
  const navigate = useNavigate();

  const data = location.state?.flightData;

  // Ensure flightData is available and modify PaxType "C09" to "CNN"
  // if (data && data.PriceBreakDown) {

  //   data.PriceBreakDown.forEach((breakdown) => {
  //     if (breakdown.PaxType === "C09") {
  //       breakdown.PaxType = "CNN"; // Directly update the PaxType field
  //     }
  //   });
  // }

  let url = `${import.meta.env.REACT_APP_API_URL}/agent/flight/revalidation`;
  let body = data;
  // 

  useEffect(() => {
    if (location?.state?.flightData?.System === "GroupFare") {
      setIsLoaded(false);
      return;
    }
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        // New API returns flight object directly (System, AllLegsInfo, etc.)
        // Old API returned groupedItineraryResponse wrapper
        const isDirectFormat = res?.System || res?.AllLegsInfo;
        const isOldFormat = res?.groupedItineraryResponse;

        if (res?.statusCode === 500 || res?.statusCode === 400) {
          throw new Error(res?.message || "No Fare Available");
        } else if (isOldFormat) {
          // Legacy Sabre grouped format
          if (res.groupedItineraryResponse?.statistics?.itineraryCount === 0) {
            throw new Error("No Fare Available");
          }
          setLoadData(res);
          setIsLoaded(false);
        } else if (isDirectFormat) {
          // New direct format
          setLoadData(res);
          setIsLoaded(false);
        } else {
          throw new Error("No Fare Available");
        }
      })
      .catch((err) => {
        Swal.fire({
          imageUrl: NotFound,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: err?.message || "Something went wrong",
          confirmButtonText: "Search Another Flights...",
          confirmButtonColor: "var(--primary-color)",
        }).then(function () {
          navigate(-1);
          setIsLoaded(false);
        });
      });
  }, []);

  // Use the freshly revalidated data for display; fall back to original selection
  const displayData = (loadData && loadData?.AllLegsInfo) ? loadData : data;

  return (
    <Box>
      <Header />

      {!isLoaded ? (
        <Container sx={{ mt: { xs: 10, sm: 6, md: 2 } }}>
          {/* Session Timer at the very top */}
          <Box 
            sx={{ 
              mb: 3, 
              p: 2, 
              bgcolor: "#fff", 
              borderRadius: "12px", 
              boxShadow: "-0.452679px 4.97947px 36px rgba(0,0,0,0.09)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1.5
            }}
          >
            <Typography sx={{ color: "#122E55", display: "flex", gap: 1.5, alignItems: "center", fontWeight: 700, fontSize: "14px" }}>
              ⏱ Time Remaining
              <SessionTimer />
            </Typography>
            <Typography sx={{ fontSize: "12px", color: "#71727C", fontWeight: 500 }}>
              Session will close automatically for security
            </Typography>
          </Box>

          <Grid container mt={4} spacing={2}>
            {/* ── LEFT SIDEBAR ──────────────────────────────────── */}
            <Grid item xs={12} sm={12} md={4} lg={3.5} order={{ xs: 2, sm: 2, md: 2 }}>
              <Box sx={{ position: { md: "sticky" }, top: { md: "90px" }, display: "flex", flexDirection: "column", gap: 2 }}>

                {/* Pax count card */}
                <Box sx={{ p: 2, bgcolor: "#fff", borderRadius: "12px", boxShadow: "-0.452679px 4.97947px 36px rgba(0,0,0,0.09)" }}>
                  <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "var(--neutral-800)", mb: 1.5 }}>Passengers</Typography>
                  <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                    {adultCount > 0 && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, px: 1.4, py: 0.5, borderRadius: "20px", bgcolor: "rgba(4,135,199,0.08)", border: "1px solid rgba(4,135,199,0.2)" }}>
                        <ManIcon sx={{ fontSize: 16, color: "var(--primary-color)" }} />
                        <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "var(--primary-color)" }}>Adult × {adultCount}</Typography>
                      </Box>
                    )}
                    {childCount > 0 && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, px: 1.4, py: 0.5, borderRadius: "20px", bgcolor: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
                        <AccessibilityIcon sx={{ fontSize: 16, color: "#6366f1" }} />
                        <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#6366f1" }}>Child × {childCount}</Typography>
                      </Box>
                    )}
                    {infant > 0 && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, px: 1.4, py: 0.5, borderRadius: "20px", bgcolor: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
                        <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#d97706" }}>👶 Infant × {infant}</Typography>
                      </Box>
                    )}
                  </Box>
                </Box>

                {/* Price Breakdown */}
                {displayData?.PriceBreakDown?.length > 0 && (
                  <Box sx={{ p: 2, bgcolor: "#fff", borderRadius: "12px", boxShadow: "-0.452679px 4.97947px 36px rgba(0,0,0,0.09)" }}>
                    <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "var(--neutral-800)", mb: 1.5 }}>💰 Price Breakdown</Typography>

                    {displayData.PriceBreakDown.map((pax, pi) => (
                      <Box key={pi} sx={{ mb: pi < displayData.PriceBreakDown.length - 1 ? 2 : 0 }}>
                        {/* Pax label + fare basis */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1, pb: 0.8, borderBottom: "1px solid var(--neutral-200)", flexWrap: "wrap" }}>
                          <Box sx={{ px: 1.2, py: 0.25, borderRadius: "20px", fontSize: "11px", fontWeight: 700, bgcolor: "rgba(4,135,199,0.1)", color: "var(--primary-color)", border: "1px solid rgba(4,135,199,0.2)" }}>
                            {pax.PaxType === "ADT" ? "👤 Adult" : pax.PaxType === "INF" ? "👶 Infant" : "🧒 Child"} × {pax.PaxCount}
                          </Box>
                          {pax.FareComponent?.[0]?.FareBasisCode && (
                            <Box sx={{ px: 1, py: 0.25, borderRadius: "20px", fontSize: "9.5px", fontWeight: 600, bgcolor: "var(--neutral-100)", color: "var(--neutral-600)", border: "1px solid var(--neutral-200)" }}>
                              {pax.FareComponent[0].FareBasisCode}
                            </Box>
                          )}
                        </Box>

                        {/* Fare rows */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, mb: 1 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography sx={{ fontSize: "11.5px", color: "var(--neutral-600)", fontWeight: 500 }}>Base Fare</Typography>
                            <Typography sx={{ fontSize: "11.5px", color: "var(--neutral-700)", fontWeight: 600 }}>{displayData.Currency} {(pax.BaseFare * pax.PaxCount).toFixed(2)}</Typography>
                          </Box>
                          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography sx={{ fontSize: "11.5px", color: "var(--neutral-500)", fontWeight: 500 }}>Taxes & Fees</Typography>
                            <Typography sx={{ fontSize: "11.5px", color: "var(--neutral-600)", fontWeight: 600 }}>{displayData.Currency} {(pax.Taxes * pax.PaxCount).toFixed(2)}</Typography>
                          </Box>
                          <Box sx={{ display: "flex", justifyContent: "space-between", pt: 0.5, borderTop: "1px dashed var(--neutral-200)" }}>
                            <Typography sx={{ fontSize: "12px", color: "var(--primary-color)", fontWeight: 700 }}>Total</Typography>
                            <Typography sx={{ fontSize: "12px", color: "var(--primary-color)", fontWeight: 700 }}>{displayData.Currency} {(pax.TotalFare * pax.PaxCount).toFixed(2)}</Typography>
                          </Box>
                        </Box>

                        {/* Baggage */}
                        {pax.Bag?.length > 0 && (
                          <Box sx={{ display: "flex", gap: 0.6, flexWrap: "wrap", mb: 1 }}>
                            {pax.Bag.slice(0, 2).map((b, bi) => (
                              <Box key={bi} sx={{ px: 1, py: 0.3, borderRadius: "20px", fontSize: "10px", fontWeight: 600, bgcolor: bi === 0 ? "rgba(124,58,237,0.07)" : "rgba(217,119,6,0.07)", color: bi === 0 ? "#7c3aed" : "#d97706", border: `1px solid ${bi === 0 ? "rgba(124,58,237,0.18)" : "rgba(217,119,6,0.18)"}` }}>
                                {bi === 0 ? "💼" : "🎒"} {bi === 0 ? "Checked" : "Cabin"}: {b.Allowance}
                              </Box>
                            ))}
                          </Box>
                        )}

                        {/* Penalties */}
                        {pax.Penalty?.length > 0 && (
                          <Box>
                            <Typography sx={{ fontSize: "10px", fontWeight: 700, color: "var(--neutral-500)", mb: 0.8, textTransform: "uppercase", letterSpacing: "0.4px" }}>📋 Penalty</Typography>
                            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0.7 }}>
                              {pax.Penalty.map((pen, peni) => (
                                <Box key={peni} sx={{ p: 1, borderRadius: "8px", bgcolor: pen.type === "Refund" ? "rgba(239,68,68,0.05)" : "rgba(245,158,11,0.05)", border: `1px solid ${pen.type === "Refund" ? "rgba(239,68,68,0.15)" : "rgba(245,158,11,0.15)"}` }}>
                                  <Typography sx={{ fontSize: "9px", fontWeight: 700, color: pen.type === "Refund" ? "#ef4444" : "#d97706", mb: 0.3 }}>
                                    {pen.type === "Refund" ? "🔄" : "🔃"} {pen.type} · {pen.applicability}
                                  </Typography>
                                  <Typography sx={{ fontSize: "10.5px", fontWeight: 700, color: "var(--neutral-800)" }}>{pen.currency} {pen.amount}</Typography>
                                  {pen.minPenalty?.amount > 0 && (
                                    <Typography sx={{ fontSize: "9px", color: "var(--neutral-400)" }}>Min: {pen.minPenalty.amount}</Typography>
                                  )}
                                </Box>
                              ))}
                            </Box>
                          </Box>
                        )}
                      </Box>
                    ))}

                    {/* Grand Total */}
                    <Box sx={{ mt: 1.5, pt: 1.2, borderTop: "2px solid var(--neutral-200)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "var(--neutral-800)" }}>Grand Total</Typography>
                      <Typography sx={{ fontSize: "15px", fontWeight: 800, color: "var(--primary-color)" }}>
                        {displayData.Currency} {displayData?.NetFare?.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                )}



                {/* Support */}
                <Box sx={{ p: 2, bgcolor: "#fff", borderRadius: "12px", boxShadow: "-0.452679px 4.97947px 36px rgba(0,0,0,0.09)" }}>
                  <Typography sx={{ fontSize: "13px", color: "#293247", fontWeight: 600, mb: 1 }}>
                    For assistance, visit{" "}
                    <span style={{ color: "var(--primary-color)", fontWeight: 700 }}>support center</span>
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.8 }}>
                    <SupportAgentIcon sx={{ color: "var(--primary-color)", fontSize: 18 }} />
                    <a href="tel:880241356244" style={{ textDecoration: "none", fontSize: "13px", color: "var(--primary-color)", fontWeight: 500 }}>
                      +880241356244
                    </a>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <WhatsAppIcon sx={{ color: "var(--primary-color)", fontSize: 18 }} />
                    <a href="https://wa.me/8801409965900" target="_blank" rel="noreferrer" style={{ textDecoration: "none", fontSize: "13px", color: "var(--primary-color)", fontWeight: 500 }}>
                      +8801409965900
                    </a>
                  </Box>
                </Box>

              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              lg={8.5}
              order={{ xs: 2, sm: 2, md: 1 }}
            >
              <Box>
                {/* ── Flight Overview Header ─────────────────────────── */}
                <Box
                  sx={{
                    p: 2.5,
                    bgcolor: "#FFFFFF",
                    boxShadow: "-0.452679px 4.97947px 36px rgba(0,0,0,0.09)",
                    borderRadius: "12px",
                    mb: 2.5,
                  }}
                >
                  {/* Top row: airline + trip meta */}
                  <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1} mb={2}>
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <Box sx={{ width: 44, height: 44, borderRadius: "50%", overflow: "hidden", border: "1px solid #e5e7eb", p: 0.5, bgcolor: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img
                          src={displayData?.Carrier === "XY"
                            ? `https://airlineimages.s3.ap-southeast-1.amazonaws.com/128/XY.png`
                            : `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${displayData?.Carrier}.png`}
                          alt={displayData?.Carrier}
                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: "15px", color: "var(--neutral-800)" }}>
                          {displayData?.CarrierName}
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "var(--neutral-500)" }}>
                          {displayData?.Carrier} · {displayData?.System} · {displayData?.TripType}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Badges right side */}
                    <Box display="flex" gap={1} flexWrap="wrap">
                      <Box sx={{ px: 1.5, py: 0.4, borderRadius: "20px", fontSize: "11px", fontWeight: 600, bgcolor: displayData?.Refundable ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", color: displayData?.Refundable ? "#10b981" : "#ef4444", border: `1px solid ${displayData?.Refundable ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)"}` }}>
                        {displayData?.Refundable ? "✅ Refundable" : "❌ Non-Refundable"}
                      </Box>
                      <Box sx={{ px: 1.5, py: 0.4, borderRadius: "20px", fontSize: "11px", fontWeight: 600, bgcolor: "rgba(4,135,199,0.08)", color: "var(--primary-color)", border: "1px solid rgba(4,135,199,0.2)" }}>
                        {displayData?.Cabinclass || "Economy"}
                      </Box>
                      <Box sx={{ px: 1.5, py: 0.4, borderRadius: "20px", fontSize: "11px", fontWeight: 600, bgcolor: "rgba(99,102,241,0.08)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.2)" }}>
                        {displayData?.FareType}
                      </Box>
                    </Box>
                  </Box>

                  {/* Brand name row */}
                  {displayData?.AllLegsInfo?.[0]?.BrandName && (
                    <Box mb={1.5} display="flex" alignItems="center" gap={1}>
                      <Typography sx={{ fontSize: "11px", color: "var(--neutral-400)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Brand:</Typography>
                      <Box sx={{ px: 1.5, py: 0.3, borderRadius: "20px", fontSize: "11px", fontWeight: 700, bgcolor: "rgba(245,158,11,0.09)", color: "#d97706", border: "1px solid rgba(245,158,11,0.25)" }}>
                        ✨ {displayData.AllLegsInfo[0].BrandName}
                      </Box>
                    </Box>
                  )}


                </Box>

                {/* ── Segment Cards ─────────────────────────────────── */}
                <Box
                  sx={{
                    p: 2.5,
                    bgcolor: "#FFFFFF",
                    boxShadow: "-0.452679px 4.97947px 36px rgba(0,0,0,0.09)",
                    borderRadius: "12px",
                    mb: 3,
                  }}
                >
                  <Typography sx={{ fontSize: { xs: 15, sm: 18 }, color: "var(--neutral-800)", fontWeight: 700, mb: 2 }}>
                    ✈️ Flight Segment Details
                  </Typography>
                  {displayData?.AllLegsInfo?.map((leg, i) => (
                    <Box key={i} mb={i < displayData.AllLegsInfo.length - 1 ? 3 : 0}>
                      {displayData.AllLegsInfo.length > 1 && (
                        <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "var(--primary-color)", mb: 1.5, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          {i === 0 ? "✈️ Outbound" : "↩️ Inbound"} — {leg.DepFrom} → {leg.ArrTo}
                        </Typography>
                      )}
                      {leg?.Segments?.map((item, j) => (
                        <Box key={j} mb={j < leg.Segments.length - 1 ? 2 : 0}>
                          <FlightDetails
                            data={item}
                            checkedBaggage={displayData?.PriceBreakDown?.[0]?.Bag?.[0]?.Allowance}
                            cabinBaggage={displayData?.PriceBreakDown?.[0]?.Bag?.[1]?.Allowance}
                            brandFeatures={leg?.BrandFeaturesList || []}
                          />
                        </Box>
                      ))}
                    </Box>
                  ))}
                </Box>

                <Box>
                  <FlightUserInfoSabre
                    adultCount={adultCount}
                    childCount={childCount}
                    infantCount={infant}
                    flightData={data}
                    loadData={loadData}
                    isLoaded={isLoaded}
                    setIsLoaded={setIsLoaded}
                  />
                </Box>
                {/* <FlightUserInfoSabre
                  loadData={loadData}
                  flightData={location.state.flightData}
                  userData={location.state}
                  searchResult={loadData}
                  adultPrice={adultPrice}
                  childPrice={childPrice}
                  infPrice={infPrice}
                  adultTaxPrice={adultTaxPrice}
                  childTaxPrice={childTaxPrice}
                  infTaxPrice={infTaxPrice}
                  serviceFeeAdult={serviceFeeAdult}
                  serviceFeeChild={serviceFeeChild}
                  serviceFeeInfant={serviceFeeInfant}
                  inTotalBaseFare={inTotalBaseFare}
                  totalBaseFare={totalBaseFare}
                  totalTax={totalTax}
                  totalFare={totalFare}
                  limitTime={limitTime}
                  isLoaded={isLoaded}
                  setIsLoaded={setIsLoaded}
                  clientFare={location.state.clientFare}
                  coupon={coupon}
                  setCoupon={setCoupon}
                  couponAppliedMessage={couponAppliedMessage}
                  setCouponAppliedMessage={setCouponAppliedMessage}
                  adultBaggage={adultBaggage}
                  setAdultBaggage={setAdultBaggage}
                  childBaggage={childBaggage}
                  setChildBaggage={setChildBaggage}
                  infantBaggage={infantBaggage}
                  setInfantBaggage={setInfantBaggage}
                /> */}
              </Box>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
            width: "50vw",
            marginInline: "auto",
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
export default FlightInformation;
