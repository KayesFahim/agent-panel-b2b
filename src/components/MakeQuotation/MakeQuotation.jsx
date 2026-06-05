import React, { useState } from 'react';
import { Box, Button, Grid, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import QuotationPDF from './QuotationPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Header from './../Header/Header';
import FlightLayout from '../SingleFlight/FlightLayout';
import commaNumber from 'comma-number';

const MakeQuotation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { adultCount, childCount, infant, quotetionArr, tripType } = location.state;

  const [newQuotetionArr, setNewQuotetionArr] = useState(() => {
    return [...(quotetionArr || [])].sort((a, b) => {
      const priceA = Number(a?.NetFare || 0);
      const priceB = Number(b?.NetFare || 0);
      return priceA - priceB;
    });
  });
  const [markups, setMarkups] = useState({});
  const [checked, setChecked] = useState(true);

  const getFlightId = (item) => {
    if (!item?.AllLegsInfo) return "";
    return item.AllLegsInfo.map(leg => {
      if (!leg?.Segments) return "";
      return leg.Segments.map(seg => {
        return `${seg.MarketingCarrier || ""}-${seg.MarketingFlightNumber || ""}-${seg.DepTime || ""}`;
      }).join("-");
    }).join("--");
  };

  const calculateMarkupAmount = (item) => {
    const fid = getFlightId(item);
    const mk = markups[fid] || { value: 0, type: 'fixed' };
    if (mk.type === 'percent') {
      return Math.round((Math.round(item?.NetFare) * mk.value) / 100);
    }
    return Math.round(mk.value);
  };

  const handleBox = (data) => {
    const event = window.event;

    if (newQuotetionArr?.length > 1) {
      setChecked(event.target.checked);
    }
    if (!event.target.checked) {
      const filter = newQuotetionArr?.filter(
        (item) => getFlightId(item) !== getFlightId(data)
      );
      setNewQuotetionArr(filter);
    }
  };
  return (
    <Box>
      <Header />
      <Container
        sx={{
          padding: '10px 0px',
          background: 'var(--rgb-primary)',
          mt: { xs: 12, sm: 10, md: 3 },
          px: { xs: 1, md: 3 },
        }}
      >
        {newQuotetionArr.map((item, i) => (
          <Box
            key={i}
            sx={{
              boxShadow:
                '-0.452679px 4.97947px 36px rgba(0, 0, 0, 0.09), -0.0905357px 0.995893px 5.85px rgba(0, 0, 0, 0.045)',
              borderRadius: '10px',
              p: 2,
              mb: 2,
            }}
          >
            {item?.AllLegsInfo?.map((data, index, arr) => (
              <Box key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={10}>
                    <FlightLayout
                      flightData={data}
                      allData={item}
                      index={index}
                      arr={arr}
                      icon={'icon'}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    {index === 0 && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.5,
                          border: "1px solid var(--neutral-200)",
                          borderRadius: "8px",
                          p: 1.5,
                          bgcolor: "var(--neutral-50)",
                          boxShadow: "var(--premium-shadow-sm)",
                          mt: { xs: 0, md: 1.5 }
                        }}
                      >
                        <Box>
                          <Typography variant="caption" color="var(--neutral-500)" fontWeight={650}>
                            Customer Price
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "18px",
                              color: "var(--primary-color)",
                              fontWeight: 700,
                              lineHeight: 1.2
                            }}
                          >
                            PKR {commaNumber(
                              Math.round(item?.NetFare) + calculateMarkupAmount(item)
                            )}
                          </Typography>
                        </Box>

                        <Box sx={{ borderTop: "1px dashed var(--neutral-200)", pt: 1 }}>
                          <Typography variant="caption" sx={{ fontWeight: 600, color: "var(--neutral-650)", mb: 0.5, display: "block" }}>
                            Individual Markup
                          </Typography>
                          
                          <Box display="flex" gap={0.5}>
                            <input
                              type="number"
                              placeholder="Markup"
                              value={markups[getFlightId(item)]?.value || ""}
                              onChange={(e) => {
                                const val = Math.max(0, parseFloat(e.target.value) || 0);
                                const fid = getFlightId(item);
                                setMarkups(prev => ({
                                  ...prev,
                                  [fid]: { ...prev[fid], value: val }
                                }));
                              }}
                              style={{
                                width: "100%",
                                minWidth: 0,
                                padding: "6px 8px",
                                fontSize: "12px",
                                border: "1px solid var(--neutral-300)",
                                borderRadius: "4px",
                                outline: "none",
                                background: "var(--white)",
                                color: "var(--neutral-800)"
                              }}
                            />
                            <select
                              value={markups[getFlightId(item)]?.type || "fixed"}
                              onChange={(e) => {
                                const fid = getFlightId(item);
                                setMarkups(prev => ({
                                  ...prev,
                                  [fid]: { ...prev[fid], type: e.target.value }
                                }));
                              }}
                              style={{
                                padding: "4px",
                                fontSize: "12px",
                                border: "1px solid var(--neutral-300)",
                                borderRadius: "4px",
                                outline: "none",
                                background: "var(--white)",
                                color: "var(--neutral-800)",
                                cursor: "pointer"
                              }}
                            >
                              <option value="fixed">PKR Flat</option>
                              <option value="percent">% Percent</option>
                            </select>
                          </Box>
                        </Box>

                        {newQuotetionArr.length > 1 && (
                          <Box sx={{ borderTop: "1px solid var(--neutral-200)", pt: 1, textAlign: "center" }}>
                            <Button
                              size="small"
                              onClick={() => {
                                const filter = newQuotetionArr?.filter(
                                  (f) => getFlightId(f) !== getFlightId(item)
                                );
                                setNewQuotetionArr(filter);
                              }}
                              sx={{
                                color: "#ef4444",
                                fontSize: "11px",
                                fontWeight: 600,
                                textTransform: "none",
                                p: 0,
                                "&:hover": {
                                  background: "transparent",
                                  textDecoration: "underline"
                                }
                              }}
                            >
                              🗑️ Remove Flight
                            </Button>
                          </Box>
                        )}
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Box>
            ))}

            {/* Download PDF Buttons under this specific flight */}
            <Box 
              sx={{ 
                mt: 2.5, 
                pt: 2.5, 
                borderTop: '1px solid var(--neutral-200)',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                flexWrap: 'wrap'
              }}
            >
              <PDFDownloadLink
                document={
                  <QuotationPDF
                    quotationData={item}
                    markupPrice={calculateMarkupAmount(item)}
                    tripType={item?.TripType}
                    price="Price"
                  />
                }
                fileName={`${item?.AllLegsInfo[0].DepFrom}-${item?.AllLegsInfo[0].ArrTo}-${item?.TripType}-${item?.CarrierName}-with-price.pdf`}
                style={{ textDecoration: 'none' }}
              >
                {({ loading }) => (
                  <Button
                    size="small"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      textTransform: 'none',
                      fontSize: '12px',
                      fontWeight: 600,
                      px: 2.5,
                      py: 0.8,
                      bgcolor: 'var(--primary-color)',
                      '&:hover': { bgcolor: 'var(--primary-color)', opacity: 0.9 }
                    }}
                  >
                    {loading ? 'Generating PDF...' : 'Download Quotation (With Price)'}
                  </Button>
                )}
              </PDFDownloadLink>

              <PDFDownloadLink
                document={
                  <QuotationPDF
                    quotationData={item}
                    markupPrice={calculateMarkupAmount(item)}
                    tripType={item?.TripType}
                  />
                }
                fileName={`${item?.AllLegsInfo[0].DepFrom}-${item?.AllLegsInfo[0].ArrTo}-${item?.TripType}-${item?.CarrierName}-no-price.pdf`}
                style={{ textDecoration: 'none' }}
              >
                {({ loading }) => (
                  <Button
                    size="small"
                    variant="outlined"
                    disabled={loading}
                    sx={{
                      textTransform: 'none',
                      fontSize: '12px',
                      fontWeight: 600,
                      px: 2.5,
                      py: 0.8,
                      borderColor: 'var(--primary-color)',
                      color: 'var(--primary-color)',
                      '&:hover': { borderColor: 'var(--primary-color)', bgcolor: 'var(--primary-rgb)' }
                    }}
                  >
                    {loading ? 'Generating PDF...' : 'Download Quotation (Without Price)'}
                  </Button>
                )}
              </PDFDownloadLink>
            </Box>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default MakeQuotation;
