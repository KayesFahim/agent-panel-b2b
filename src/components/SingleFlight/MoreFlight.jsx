import React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  SwipeableDrawer,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tooltip,
} from "@mui/material";
import commaNumber from "comma-number";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FlightDetails from "./FlightDetails";
import moment from "moment";

import { Tab } from "@mui/icons-material";
import { TabContext, TabPanel } from "@mui/lab";
import CheckIcon from "@mui/icons-material/Check";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";

const MoreFlight = ({
  flightData,
  adultCount,
  childCount,
  infant,
  FlightInformation,
  TripType,
  arr,
  allData,
  index,
  data,
  checked,
  handleBox,
}) => {
  const transitCalculation = (date1, date2) => {
    const duration = moment.duration(moment(date1).diff(moment(date2)));

    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes()) - hours * 60;
    const transit = `${Math.abs(hours)}h:${Math.abs(minutes)}min`;
    return transit;
  };

  const [state, setState] = useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const [activeTab, setActiveTab] = useState("Flight Details");

  const tabList = ["Flight Details", "Fare Summary", "Baggage", "Brand Features", "Fare Rules", "Fare Policy"];

  // ── Brand feature keyword → icon + color map ──────────────────────────
  const FEATURE_MAP = [
    { keys: ["REFUND"],                icon: "✅", color: "#10b981", label: (d) => d },
    { keys: ["CHANGEABLE", "CHANGE"],   icon: "🔄", color: "#0487c7", label: (d) => d },
    { keys: ["CHECKED BAGGAGE", "BAGGAGE UPTO", "BAGGAGE"], icon: "🧳", color: "#7c3aed", label: (d) => d },
    { keys: ["CABIN BAG", "CABIN BAGS"],icon: "🎒", color: "#d97706", label: (d) => d },
    { keys: ["MEAL", "BEVERAGE"],       icon: "🍽️", color: "#ef4444", label: (d) => d },
    { keys: ["EXTRA LEGROOM", "LEGROOM"], icon: "🦵", color: "#0487c7", label: (d) => d },
    { keys: ["PREFERRED SEAT", "STANDARD SEAT", "SEAT"], icon: "💺", color: "#64748b", label: (d) => d },
    { keys: ["WIFI"],                  icon: "📶", color: "#0ea5e9", label: (d) => d },
    { keys: ["LOUNGE"],                icon: "🛋️", color: "#a855f7", label: (d) => d },
    { keys: ["MILES"],                 icon: "⭐", color: "#f59e0b", label: (d) => d },
    { keys: ["PRIORITY"],              icon: "⚡", color: "#f97316", label: (d) => d },
  ];

  const getFeatureStyle = (desc = "") => {
    const upper = desc.toUpperCase();
    return FEATURE_MAP.find(f => f.keys.some(k => upper.includes(k))) || { icon: "✈️", color: "#94a3b8" };
  };

  return (
    <Accordion
      sx={{
        border: "none",
        boxShadow: "none",
        borderTop: "1px solid var(--neutral-200)",
        background: "transparent",
        display: arr.length - 1 === index ? "block" : "none",
        width: "100%",
        "&:before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary
        sx={{
          minHeight: "44px !important",
          px: 2.5,
          backgroundColor: "var(--neutral-50)",
          "& .MuiAccordionSummary-content": {
            margin: "8px 0 !important",
          }
        }}
        expandIcon={<PlayArrowIcon style={{ transform: "rotate(90deg)", color: "var(--primary-color)", fontSize: "16px" }} />}
      >
        <Box display="flex" justifyContent="space-between" width="100%" alignItems="center" pr={2}>
          {/* Left side list of brand feature icons (excluding refundable ticket) */}
          {(() => {
            const KEY_FILTERS = [
              { keys: ["CHANGEABLE"],                      icon: "🔄", color: "var(--primary-color)" },
              { keys: ["CHECKED BAGGAGE", "BAGGAGE UPTO"], icon: "🧳", color: "var(--primary-color)" },
              { keys: ["CABIN BAG"],                       icon: "🎒", color: "var(--primary-color)" },
              { keys: ["MEAL", "BEVERAGE"],                icon: "🍽️", color: "var(--primary-color)" },
              { keys: ["EXTRA LEGROOM", "LEGROOM"],        icon: "🦵", color: "var(--primary-color)" },
              { keys: ["WIFI"],                            icon: "📶", color: "var(--primary-color)" },
              { keys: ["LOUNGE"],                          icon: "🛋️", color: "var(--primary-color)" },
            ];
            const rawList = data?.BrandFeaturesList || [];
            const matched = [];
            for (const filter of KEY_FILTERS) {
              const found = rawList.find(f => {
                const desc = (typeof f === "string" ? f : f?.description || "").toUpperCase();
                return filter.keys.some(k => desc.includes(k));
              });
              if (found) {
                const label = typeof found === "string" ? found : found?.description || "";
                matched.push({ label, icon: filter.icon, color: filter.color });
              }
            }
            return (
              <Box display="flex" alignItems="center" gap={0.8}>
                {matched.map((feat, fi) => (
                  <Tooltip
                    key={fi}
                    title={feat.label.charAt(0) + feat.label.slice(1).toLowerCase()}
                    arrow
                    placement="top"
                  >
                    <Box
                      component="span"
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        color: "var(--primary-color)",
                        bgcolor: "rgba(26,58,110,0.06)",
                        border: `1px solid rgba(26,58,110,0.18)`,
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          transform: "scale(1.15)",
                          bgcolor: "rgba(26,58,110,0.15)",
                        },
                      }}
                    >
                      {feat.icon}
                    </Box>
                  </Tooltip>
                ))}
              </Box>
            );
          })()}

          {/* Center: Bag & Seats info */}
          <Box display="flex" alignItems="center" gap={1.2}>
            {/* Baggage pill */}
            {(() => {
              const bagAllow = allData?.PriceBreakDown?.[0]?.Bag?.[0]?.Allowance;
              const isNoBag = !bagAllow || bagAllow === "0" || bagAllow.toUpperCase().startsWith("0 ");
              return (
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    fontSize: "11px",
                    fontWeight: 600,
                    px: 1.2,
                    py: 0.3,
                    borderRadius: "20px",
                    border: isNoBag ? "1px solid #ef444440" : "1px solid rgba(26,58,110,0.18)",
                    bgcolor: isNoBag ? "rgba(239,68,68,0.06)" : "rgba(26,58,110,0.06)",
                    color: isNoBag ? "#ef4444" : "var(--primary-color)",
                  }}
                >
                  🎒 {isNoBag ? "No Bag" : bagAllow}
                </Box>
              );
            })()}

            {/* Seats Left pill */}
            {(() => {
              const seats = allData?.AllLegsInfo?.[0]?.Segments?.[0]?.SegmentCode?.seatsAvailable;
              if (seats === undefined || seats === null) return null;
              const isLow = seats <= 5;
              return (
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    fontSize: "11px",
                    fontWeight: 600,
                    px: 1.2,
                    py: 0.3,
                    borderRadius: "20px",
                    border: isLow ? "1px solid #ef444440" : "1px solid rgba(26,58,110,0.18)",
                    bgcolor: isLow ? "rgba(239,68,68,0.06)" : "rgba(26,58,110,0.06)",
                    color: isLow ? "#ef4444" : "var(--primary-color)",
                  }}
                >
                  💺 {seats} Seats Left
                </Box>
              );
            })()}
          </Box>

          {/* Right side trigger and Quote actions */}
          <Box display="flex" alignItems="center" gap={2}>
            {handleBox && (
              <Button
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBox(allData);
                }}
                variant={checked ? "contained" : "outlined"}
                startIcon={checked ? <CheckIcon sx={{ fontSize: "14px !important" }} /> : <RequestQuoteIcon sx={{ fontSize: "14px !important" }} />}
                sx={{
                  fontSize: "11px",
                  fontWeight: 600,
                  borderRadius: "20px",
                  px: 1.5,
                  py: 0.25,
                  textTransform: "capitalize",
                  minWidth: "auto",
                  height: "26px",
                  borderColor: "var(--primary-color)",
                  color: checked ? "white" : "var(--primary-color)",
                  backgroundColor: checked ? "var(--primary-color)" : "transparent",
                  "&:hover": {
                    backgroundColor: checked ? "var(--primary-color)" : "rgba(4, 135, 199, 0.08)",
                    borderColor: "var(--primary-color)",
                  }
                }}
              >
                Quote
              </Button>
            )}

            <Typography variant="caption" sx={{ color: "var(--primary-color)", fontWeight: 600 }}>
              Show Details
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      
      <AccordionDetails sx={{ p: 2.5, bgcolor: "var(--white)", borderBottomLeftRadius: "var(--premium-border-radius-lg)", borderBottomRightRadius: "var(--premium-border-radius-lg)" }}>
        {/* Pill-style active indicator tabs */}
        <Box sx={{ display: 'flex', gap: 1, pb: 2, mb: 3, borderBottom: '1px solid var(--neutral-200)', overflowX: 'auto', flexWrap: 'nowrap', '&::-webkit-scrollbar': { display: 'none' } }}>
          {tabList.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                sx={{
                  borderRadius: "20px",
                  px: 2.5,
                  py: 0.8,
                  textTransform: "capitalize",
                  fontSize: "12px",
                  fontWeight: 600,
                  transition: "var(--premium-transition)",
                  whiteSpace: "nowrap",
                  bgcolor: isActive ? "var(--primary-color)" : "var(--neutral-100)",
                  color: isActive ? "var(--white)" : "var(--neutral-650)",
                  border: isActive ? "1px solid var(--primary-color)" : "1px solid var(--neutral-200)",
                  "&:hover": {
                    bgcolor: isActive ? "var(--primary-color)" : "var(--neutral-200)",
                  }
                }}
              >
                {tab}
              </Button>
            );
          })}
        </Box>

        <Box sx={{ width: "100%" }}>
          {/* TAB 1: Flight Details */}
          {activeTab === "Flight Details" && (
            <Box>
              {allData?.AllLegsInfo?.map((leg, legIdx) => (
                <Box key={legIdx} mb={legIdx < allData.AllLegsInfo.length - 1 ? 3 : 0}>
                  <Typography variant="subtitle2" sx={{ color: "var(--primary-color)", fontWeight: 700, mb: 2 }}>
                    {allData.AllLegsInfo.length > 1 ? (legIdx === 0 ? "Outbound Flight" : "Inbound Flight") : "Flight Route"}
                  </Typography>
                  
                  {leg?.Segments?.map((segment, segIdx) => (
                    <Box key={segIdx}>
                      <FlightDetails 
                        data={segment} 
                        checkedBaggage={allData?.PriceBreakDown?.[0]?.Bag?.[0]?.Allowance}
                        cabinBaggage={allData?.PriceBreakDown?.[0]?.Bag?.[1]?.Allowance}
                        brandFeatures={leg?.BrandFeaturesList || []}
                      />
                      
                      {/* Connection Layover Alert */}
                      {segIdx < leg.Segments.length - 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2.5 }}>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1.2, 
                            bgcolor: 'rgba(4, 135, 199, 0.06)', 
                            color: '#0487c7', 
                            px: 3, 
                            py: 1, 
                            borderRadius: '30px', 
                            border: '1px solid rgba(4, 135, 199, 0.15)',
                            boxShadow: 'var(--premium-shadow-sm)'
                          }}>
                            <Typography variant="caption" fontWeight={600} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              ⏱️ Connection at {leg.Segments[segIdx + 1]?.DepAirPort} ({leg.Segments[segIdx + 1]?.DepLocation?.split(",")[0]})
                              • Layover: {transitCalculation(
                                leg.Segments[segIdx + 1]?.DepTime?.split("+")[0],
                                leg.Segments[segIdx]?.ArrTime?.split("+")[0]
                              )}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          )}

          {/* TAB 2: Fare Summary */}
          {activeTab === "Fare Summary" && (
            <Box>
              <Box className="responsive-table-container" sx={{ borderRadius: "8px", overflow: "hidden", border: "1px solid var(--neutral-200)", mb: 2.5 }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Poppins" }}>
                  <thead>
                    <tr style={{ background: "var(--primary-color)", color: "var(--white)" }}>
                      <th style={{ padding: "12px", textAlign: "left", fontSize: "12px", fontWeight: 600 }}>Pax Type</th>
                      <th style={{ padding: "12px", textAlign: "right", fontSize: "12px", fontWeight: 600 }}>Base Fare</th>
                      <th style={{ padding: "12px", textAlign: "right", fontSize: "12px", fontWeight: 600 }}>Taxes & Fees</th>
                      <th style={{ padding: "12px", textAlign: "center", fontSize: "12px", fontWeight: 600 }}>Count</th>
                      <th style={{ padding: "12px", textAlign: "right", fontSize: "12px", fontWeight: 600 }}>Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData?.PriceBreakDown?.map((breakdown, bIdx) => (
                      <tr key={bIdx} style={{ borderBottom: "1px solid var(--neutral-200)", fontSize: "12px", color: "var(--neutral-800)" }}>
                        <td style={{ padding: "12px", fontWeight: 500 }}>
                          {breakdown.PaxType === "ADT" ? "Adult" : breakdown.PaxType === "INF" ? "Infant" : "Child"}
                        </td>
                        <td style={{ padding: "12px", textAlign: "right" }}>
                          {allData?.Currency || 'USD'} {commaNumber(breakdown?.BaseFare)}
                        </td>
                        <td style={{ padding: "12px", textAlign: "right" }}>
                          {allData?.Currency || 'USD'} {commaNumber(parseInt(breakdown?.Taxes) + parseInt(breakdown?.ServiceFee || 0))}
                        </td>
                        <td style={{ padding: "12px", textAlign: "center" }}>
                          {breakdown?.PaxCount}
                        </td>
                        <td style={{ padding: "12px", textAlign: "right", fontWeight: 600 }}>
                          {allData?.Currency || 'USD'} {commaNumber(breakdown?.TotalFare * breakdown?.PaxCount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>

              {/* Fare Summary Totals */}
              <Box sx={{ p: 2, borderRadius: "8px", border: "1px solid var(--neutral-200)", bgcolor: "var(--neutral-50)", mb: 2 }}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="var(--neutral-650)">Total Customer Gross Fare</Typography>
                  <Typography variant="body2" fontWeight={600} color="var(--neutral-800)">
                    {allData?.Currency || 'USD'} {commaNumber(Math.round(allData?.GrossFare))}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1} pb={1} sx={{ borderBottom: '1px solid var(--neutral-200)' }}>
                  <Typography variant="body2" color="var(--p2)">Agent Margin / Savings</Typography>
                  <Typography variant="body2" fontWeight={600} color="var(--p2)">
                    {allData?.Currency || 'USD'} {commaNumber(Math.round(allData?.GrossFare - allData?.NetFare))}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" pt={0.5}>
                  <Typography variant="subtitle2" fontWeight={700} color="var(--primary-color)">Total Net Payable</Typography>
                  <Typography variant="subtitle2" fontWeight={700} color="var(--primary-color)">
                    {allData?.Currency || 'USD'} {commaNumber(Math.round(allData?.NetFare))}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}

          {/* TAB 3: Baggage */}
          {activeTab === "Baggage" && (
            <Box>
              {allData?.PriceBreakDown?.map((breakdown, bIdx) => {
                const bags = breakdown?.Bag || [];
                const paxLabel = breakdown.PaxType === "ADT" ? "Adult" : breakdown.PaxType === "INF" ? "Infant" : "Child";
                return (
                  <Box key={bIdx} mb={2.5}>
                    <Box px={1.5} py={1} mb={1.5} sx={{ bgcolor: 'var(--neutral-100)', borderRadius: '8px', border: '1px solid var(--neutral-200)' }}>
                      <Typography variant="caption" sx={{ color: 'var(--primary-color)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {paxLabel} — Baggage Allowance
                      </Typography>
                    </Box>

                    {bags.length === 0 ? (
                      <Box p={2} sx={{ border: '1px dashed var(--neutral-300)', borderRadius: '8px', textAlign: 'center' }}>
                        <Typography variant="body2" color="var(--neutral-500)">No baggage information available.</Typography>
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                        {bags.map((bag, bagIdx) => {
                          const rawAllow = (bag?.Allowance || '').trim();
                          const isNoBag = !rawAllow || rawAllow === '0' || rawAllow.toUpperCase().startsWith('0 ');
                          const isPiece = rawAllow.toUpperCase().includes('PIECE') || rawAllow.toUpperCase().includes('PC');
                          const bagType = bagIdx === 0 ? { label: '💼 Checked Baggage', color: 'var(--primary-color)', bg: 'rgba(26,58,110,0.06)', border: 'rgba(26,58,110,0.18)' }
                                        : { label: '🎒 Cabin Baggage', color: 'var(--primary-color)', bg: 'rgba(26,58,110,0.06)', border: 'rgba(26,58,110,0.18)' };
                          const desc1 = bag?.Description1 || '';
                          const desc2 = bag?.Description2 || '';
                          return (
                            <Box key={bagIdx} sx={{ border: `1px solid ${bagType.border}`, borderLeft: `3px solid ${bagType.color}`, borderRadius: '8px', px: 2, py: 1.4, bgcolor: bagType.bg }}>
                              {/* Header row */}
                              <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.6}>
                                <Typography variant="caption" sx={{ fontWeight: 700, color: bagType.color, fontSize: '12px' }}>
                                  {bagType.label}
                                </Typography>
                                {isNoBag ? (
                                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#ef4444', fontSize: '12px' }}>🚫 Not Included</Typography>
                                ) : (
                                  <Typography variant="caption" sx={{ fontWeight: 700, color: bagType.color, fontSize: '13px' }}>
                                    {isPiece ? `📦 ${rawAllow}` : `⚖️ ${rawAllow}`}
                                  </Typography>
                                )}
                              </Box>
                              {/* Descriptions */}
                              {(desc1 || desc2) && (
                                <Box sx={{ mt: 0.4, display: 'flex', flexDirection: 'column', gap: 0.2 }}>
                                  {desc1 && (
                                    <Typography variant="caption" sx={{ color: 'var(--neutral-600)', fontSize: '11px' }}>
                                      ⚖️ {desc1.charAt(0) + desc1.slice(1).toLowerCase()}
                                    </Typography>
                                  )}
                                  {desc2 && (
                                    <Typography variant="caption" sx={{ color: 'var(--neutral-500)', fontSize: '11px' }}>
                                      📐 {desc2.charAt(0) + desc2.slice(1).toLowerCase()}
                                    </Typography>
                                  )}
                                </Box>
                              )}
                              {/* Airline */}
                              {bag?.Airline && (
                                <Typography variant="caption" sx={{ color: 'var(--neutral-400)', fontSize: '10px', mt: 0.4, display: 'block' }}>
                                  Operated by: {bag.Airline}
                                </Typography>
                              )}
                            </Box>
                          );
                        })}
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          )}

          {/* TAB 4: Brand Features */}
          {activeTab === "Brand Features" && (() => {
            const allFeatures = allData?.AllLegsInfo?.flatMap(leg =>
              leg?.BrandFeaturesList?.map(f => typeof f === "string" ? f : f?.description || "")
            ).filter(Boolean) || [];
            const unique = [...new Set(allFeatures)];
            if (!unique.length) return (
              <Box p={3} sx={{ border: "1px dashed var(--neutral-300)", borderRadius: "8px", textAlign: "center" }}>
                <Typography variant="body2" color="var(--neutral-500)">No brand features available for this fare.</Typography>
              </Box>
            );
            return (
              <Box>
                <Typography variant="subtitle2" sx={{ color: "var(--primary-color)", fontWeight: 700, mb: 2 }}>Included Amenities</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                  {unique.map((desc, i) => {
                      const style = getFeatureStyle(desc);
                      return (
                        <Box key={i} sx={{
                          display: "flex", alignItems: "center", gap: 1,
                          border: `1px solid rgba(26,58,110,0.18)`,
                          borderLeft: `3px solid var(--primary-color)`,
                          borderRadius: "8px",
                          px: 1.5, py: 0.8,
                          bgcolor: `rgba(26,58,110,0.06)`,
                          minWidth: "220px",
                        }}>
                          <span style={{ fontSize: "16px" }}>{style.icon}</span>
                          <Typography sx={{ fontSize: "12px", fontWeight: 500, color: "var(--neutral-800)", textTransform: "capitalize", lineHeight: 1.3 }}>
                            {desc.charAt(0) + desc.slice(1).toLowerCase()}
                          </Typography>
                        </Box>
                      );
                  })}
                </Box>
              </Box>
            );
          })()}


          {activeTab === "Fare Rules" && (
            <Box>
              {(() => {
                const bagAllow = allData?.PriceBreakDown?.[0]?.Bag?.[0]?.Allowance;
                const isNoBag = !bagAllow || bagAllow === "0" || bagAllow.toUpperCase().startsWith("0 ");
                return (
                  <span className={`pill-badge ${isNoBag ? 'pill-non-refundable' : 'pill-baggage'}`} style={{ display: 'inline-block', marginBottom: '16px' }}>
                    {isNoBag ? '🚫 Bag not included' : `🎒 Bag: ${bagAllow}`}
                  </span>
                );
              })()}
              {allData?.PriceBreakDown?.[0]?.Penalty?.length > 0 ? (
                <Box sx={{ borderRadius: "8px", overflow: "hidden", border: "1px solid var(--neutral-200)" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Inter" }}>
                    <thead>
                      <tr style={{ background: "var(--primary-color)", color: "var(--white)" }}>
                        <th style={{ padding: "12px", textAlign: "left", fontSize: "12px", fontWeight: 600 }}>Rule Category</th>
                        <th style={{ padding: "12px", textAlign: "right", fontSize: "12px", fontWeight: 600 }}>Before Departure</th>
                        <th style={{ padding: "12px", textAlign: "right", fontSize: "12px", fontWeight: 600 }}>After Departure</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const penalties = allData.PriceBreakDown[0].Penalty;
                        const changeRuleBefore = penalties.find(p => (p.type?.toLowerCase().includes("exchange") || p.PenaltyType?.toLowerCase().includes("change")) && (p.applicability?.toLowerCase() === "before" || p.TimeLimit?.toLowerCase().includes("before")));
                        const changeRuleAfter  = penalties.find(p => (p.type?.toLowerCase().includes("exchange") || p.PenaltyType?.toLowerCase().includes("change")) && (p.applicability?.toLowerCase() === "after"  || p.TimeLimit?.toLowerCase().includes("after")));
                        const refundRuleBefore = penalties.find(p => (p.type?.toLowerCase().includes("refund")   || p.PenaltyType?.toLowerCase().includes("refund"))  && (p.applicability?.toLowerCase() === "before" || p.TimeLimit?.toLowerCase().includes("before")));
                        const refundRuleAfter  = penalties.find(p => (p.type?.toLowerCase().includes("refund")   || p.PenaltyType?.toLowerCase().includes("refund"))  && (p.applicability?.toLowerCase() === "after"  || p.TimeLimit?.toLowerCase().includes("after")));
                        const fmt = (rule) => rule ? `${allData.Currency || 'USD'} ${commaNumber(rule.amount ?? rule.Amount ?? 0)}` : "As per airline policy";
                        return (
                          <>
                            <tr style={{ borderBottom: "1px solid var(--neutral-200)", fontSize: "12px" }}>
                              <td style={{ padding: "12px", fontWeight: 600, color: "var(--neutral-800)" }}>🔄 Date Change / Reissue</td>
                              <td style={{ padding: "12px", textAlign: "right", color: "var(--neutral-800)" }}>{fmt(changeRuleBefore)}</td>
                              <td style={{ padding: "12px", textAlign: "right", color: "var(--neutral-800)" }}>{fmt(changeRuleAfter)}</td>
                            </tr>
                            <tr style={{ fontSize: "12px" }}>
                              <td style={{ padding: "12px", fontWeight: 600, color: "var(--neutral-800)" }}>❌ Cancellation / Refund</td>
                              <td style={{ padding: "12px", textAlign: "right", color: "var(--neutral-800)" }}>{fmt(refundRuleBefore)}</td>
                              <td style={{ padding: "12px", textAlign: "right", color: "var(--neutral-800)" }}>{fmt(refundRuleAfter)}</td>
                            </tr>
                          </>
                        );
                      })()}
                    </tbody>
                  </table>
                </Box>
              ) : (
                <Box p={3} sx={{ border: "1px dashed var(--neutral-300)", borderRadius: "8px", textAlign: "center" }}>
                  <Typography variant="body2" color="var(--neutral-500)">
                    Detailed structured fare rules are not available from the carrier API. Airline rules apply.
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          {/* TAB 5: Fare Policy */}
          {activeTab === "Fare Policy" && (
            <Box>
              <Box p={2.5} sx={{ border: "1px solid var(--neutral-200)", borderRadius: "8px", bgcolor: "var(--neutral-50)", mb: 2.5 }}>
                <Typography variant="subtitle2" sx={{ color: "var(--primary-color)", fontWeight: 700, mb: 1 }}>
                  Refund & Date Change Guidelines
                </Typography>
                <Typography variant="body2" sx={{ color: "var(--neutral-650)", lineHeight: 1.6, fontSize: "12px" }}>
                  1. <strong>Refund Amount</strong> = Received amount from customer - Airline Refund Charge (As per Airline Policy) - agent portal convenience fee.
                  <br />
                  2. <strong>Date Change Amount</strong> = Date change fee as per Airline + Fare Difference (if any) + agent portal convenience fee.
                  <br />
                  3. Non-refundable tickets cannot be cancelled for a refund unless specified otherwise by the airline.
                  <br />
                  4. For any dates changes or cancellations, please submit a request through the agent panel ticket queue at least 24 hours prior to flight departure.
                </Typography>
              </Box>

              {/* Penalty Table per Pax Type */}
              {allData?.PriceBreakDown?.map((breakdown, bIdx) => {
                const penalties = breakdown?.Penalty;
                if (!penalties?.length) return null;
                const exchangeBefore = penalties.find(p => p.type?.toLowerCase().includes("exchange") && p.applicability?.toLowerCase() === "before");
                const exchangeAfter  = penalties.find(p => p.type?.toLowerCase().includes("exchange") && p.applicability?.toLowerCase() === "after");
                const refundBefore   = penalties.find(p => p.type?.toLowerCase().includes("refund")   && p.applicability?.toLowerCase() === "before");
                const refundAfter    = penalties.find(p => p.type?.toLowerCase().includes("refund")   && p.applicability?.toLowerCase() === "after");
                const cur = allData?.Currency || 'USD';
                const fmt = (rule) => rule ? `${cur} ${commaNumber(rule.amount ?? 0)}` : "N/A";
                const paxLabel = breakdown.PaxType === "ADT" ? "Adult" : breakdown.PaxType === "INF" ? "Infant" : "Child";
                return (
                  <Box key={bIdx} mb={2} sx={{ borderRadius: "8px", overflow: "hidden", border: "1px solid var(--neutral-200)" }}>
                    <Box px={2} py={1.2} sx={{ bgcolor: "var(--neutral-100)", borderBottom: "1px solid var(--neutral-200)" }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: "var(--primary-color)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        {paxLabel} — Penalty Charges
                      </Typography>
                    </Box>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Inter", fontSize: "12px" }}>
                      <thead>
                        <tr style={{ background: "var(--primary-color)", color: "#fff" }}>
                          <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600 }}>Type</th>
                          <th style={{ padding: "10px 14px", textAlign: "right", fontWeight: 600 }}>Before Departure</th>
                          <th style={{ padding: "10px 14px", textAlign: "right", fontWeight: 600 }}>After Departure</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderBottom: "1px solid var(--neutral-100)" }}>
                          <td style={{ padding: "11px 14px", fontWeight: 600, color: "var(--neutral-800)" }}>🔄 Date Change / Exchange</td>
                          <td style={{ padding: "11px 14px", textAlign: "right", color: exchangeBefore?.changeable ? "#0487c7" : "var(--neutral-800)" }}>{fmt(exchangeBefore)}</td>
                          <td style={{ padding: "11px 14px", textAlign: "right", color: exchangeAfter?.changeable  ? "#0487c7" : "var(--neutral-800)" }}>{fmt(exchangeAfter)}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: "11px 14px", fontWeight: 600, color: "var(--neutral-800)" }}>❌ Cancellation / Refund</td>
                          <td style={{ padding: "11px 14px", textAlign: "right", color: refundBefore?.refundable ? "#10b981" : "#ef4444" }}>{fmt(refundBefore)}</td>
                          <td style={{ padding: "11px 14px", textAlign: "right", color: refundAfter?.refundable  ? "#10b981" : "#ef4444" }}>{fmt(refundAfter)}</td>
                        </tr>
                      </tbody>
                    </table>
                    {/* Min penalty note */}
                    {(refundBefore?.minPenalty?.amount > 0 || refundAfter?.minPenalty?.amount > 0) && (
                      <Box px={2} py={1} sx={{ bgcolor: "#fffbeb", borderTop: "1px solid #fef08a" }}>
                        <Typography variant="caption" color="#92400e">
                          ⚠️ Minimum refund penalty: {cur} {commaNumber(refundBefore?.minPenalty?.amount ?? refundAfter?.minPenalty?.amount ?? 0)}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default React.memo(MoreFlight);
